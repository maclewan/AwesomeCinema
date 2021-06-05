import datetime

import pytz
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import QuerySet
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from cinema.mailing import send_qr_code, verify_qr_code
from cinema.tickets.models import Hall, Screening, Ticket
from cinema.tickets.serializers import HallSerializer, ScreeningSerializer, TicketSerializer, FreeTicketSerializer
from cinema.utils import parse_raw_date, timezonize_date


class AllHallsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request):
        """
        Returns all halls
        """
        halls = Hall.objects.all()
        serialized = HallSerializer(halls, many=True).data

        payload = {
            'halls': serialized
        }
        return Response(payload, status=status.HTTP_200_OK)


class SingleHallView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request, hall_id):
        """
        Returns hall by id if exists
        """
        try:
            hall = Hall.objects.get(id=hall_id)
        except ObjectDoesNotExist:
            return Response({'message': 'Hall not found'}, status=status.HTTP_404_NOT_FOUND)
        serialized = HallSerializer(hall).data

        payload = {
            'hall': serialized
        }
        return Response(payload, status=status.HTTP_200_OK)


class AllScreeningsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request):
        """
        Returns filtered (if parms provided) screenings
        """
        hall_id = request.query_params.get(key='hall_id', default=None)
        raw_date = request.query_params.get(key='date', default=None)
        movie_id = request.query_params.get(key='movie_id', default=None)

        date = parse_raw_date(raw_date)

        screenings: QuerySet = Screening.objects.all()
        screenings = screenings.filter(hall__id=hall_id) if hall_id else screenings
        screenings = screenings.filter(date__year=date.year,
                                       date__month=date.month,
                                       date__day=date.day) if date else screenings
        screenings = screenings.filter(movie__id=movie_id) if movie_id else screenings

        serialized = ScreeningSerializer(screenings, many=True).data
        print(type(serialized))
        serialized = list(serialized)
        serialized.sort(key=lambda x:x['date'])
        print(type(serialized))
        payload = {
            'screenings': serialized
        }
        return Response(payload, status=status.HTTP_200_OK)


class SingleScreeningView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request, screening_id):
        """
        Return single screening if exists
        """
        try:
            screening = Screening.objects.get(id=screening_id)

        except ObjectDoesNotExist:
            return Response({'message': 'Screening not found'}, status=status.HTTP_404_NOT_FOUND)

        serialized = ScreeningSerializer(screening).data
        payload = {
            'screening': serialized
        }
        return Response(payload, status=status.HTTP_200_OK)


class ScreeningsNowView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request):
        """
        Returns screenings after now minus 30 minutes
        """
        date = datetime.datetime.now() - datetime.timedelta(minutes=30)
        date = timezonize_date(date)

        screenings = Screening.objects.filter(date__gte=date).order_by('date', 'hall_id')
        serialized = ScreeningSerializer(screenings, many=True).data
        payload = {
            'screenings': serialized
        }
        return Response(payload, status=status.HTTP_200_OK)


class AvailableScreeningTicketsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request, screening_id):
        """
        Returns all available tickets for this screening
        """

        tickets = Ticket.objects.filter(screening__id=screening_id, owner=None)
        serialized = FreeTicketSerializer(tickets, many=True).data
        payload = {
            'tickets': serialized
        }
        return Response(payload, status=status.HTTP_200_OK)


class BuyTicketView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request: Request):
        """
        Changes ticket owner to user, if ticketis available (owner==null)
        """
        ticket_id = request.data['ticket_id']
        try:
            ticket = Ticket.objects.get(id=ticket_id)
        except ObjectDoesNotExist:
            return Response({'message': 'Ticket not found'}, status=status.HTTP_404_NOT_FOUND)

        if ticket.owner:
            return Response({'message': 'Ticket is not available'}, status=status.HTTP_403_FORBIDDEN)

        TicketSerializer().update_owner(ticket, request.user)

        send_qr_code(ticket)

        payload = {
            'message': f'Successfully changed owner to {request.user.id}',
            'ticket': TicketSerializer(ticket).data
        }
        return Response(payload, status=status.HTTP_200_OK)


class VerifyTicketView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request: Request):
        """
        Changes ticket owner to user, if ticketis available (owner==null)
        """
        ticket_id = request.data['ticket_id']
        try:
            ticket = Ticket.objects.get(id=ticket_id)
        except ObjectDoesNotExist:
            return Response({'message': 'Ticket not found'}, status=status.HTTP_404_NOT_FOUND)

        hashed = request.data['hash']

        if not verify_qr_code(ticket, hashed):
            return Response({'message': 'Incorrect qr code'}, status=status.HTTP_403_FORBIDDEN)

        if ticket.used:
            return Response({'message': 'Ticket already used'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        TicketSerializer().use(ticket)

        payload = {
            'message': f'Successfully verified ticket',
            'ticket': TicketSerializer(ticket).data
        }
        return Response(payload, status=status.HTTP_202_ACCEPTED)
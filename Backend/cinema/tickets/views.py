from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from cinema.tickets.models import Hall, Screening, Ticket
from cinema.tickets.serializers import HallSerializer, ScreeningSerializer, TicketSerializer

'''
class TestView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        halls = Ticket.objects.all()
        serial = TicketSerializer(halls, many=True).data
        content = serial
        return Response(content)
'''
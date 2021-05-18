import json

from cinema.config import MAIL_UNAME
from cinema.tickets.models import Ticket
from django.core.mail import send_mail, EmailMessage
import hashlib
import pyqrcode


def send_qr_code(t: Ticket):
    message = f'{t.id}_{t.owner.id}_{t.screening.id}_jasna_dupa'
    hashed = hashlib.sha224(message.encode('utf8')).hexdigest()
    qr_info = json.dumps({
        'ticket_id': t.id,
        'hash': hashed,
    })
    qr = pyqrcode.create(qr_info)

    qr.png('temp', scale=8)

    img = open('temp', 'rb')

    mail = EmailMessage(
        f'MobilkiCinema - Twój bilet na `{t.screening.movie.title}` ({t.screening.date.strftime("%d-%m-%Y, %H:%M")})',
        'Bilet w załaczniku\n\n\n\n\nElo pozdro', MAIL_UNAME, ['maciek.lewandowicz@gmail.com', t.owner.email])
    mail.attach('bilet.png', img.read(), mimetype="image/png")
    mail.send()
    pass


def verify_qr_code(t: Ticket, hashed_code):
    message = f'{t.id}_{t.owner.id}_{t.screening.id}_jasna_dupa'
    return hashed_code == hashlib.sha224(message.encode('utf8')).hexdigest()

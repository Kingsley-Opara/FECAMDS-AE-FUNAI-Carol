from ninja import Schema, NinjaAPI, Query
from .models import Ticket
from typing import List
import requests
from django.conf import settings


api = NinjaAPI()

class RegisterTicket(Schema):
    email: str
    number_of_ticket: str


class RegisterTicketOut(Schema):
    id: int
    email: str
    number_of_ticket: int

class PaystackInitOut(Schema):
    status: bool
    message: str
    data: dict


def initilaize_payment(email, ticket_number):
    url = "https://api.paystack.co/transaction/initialize/"
    headers = {
        "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
        "Content-Type": "application/json",
    }
    data = {
        "email": email,
        "amount": (ticket_number * 1000) * 100
    }

    res = requests.post(url, json=data, headers=headers)

    res.raise_for_status()

    return res.json()



@api.post("/", response=PaystackInitOut)
def create_ticket(request, payload: RegisterTicket):
    ticket = Ticket.objects.create(**payload.dict())
    email = ticket.email
    number_t = int(ticket.number_of_ticket)
    print(email, number_t)
    data = initilaize_payment(email, number_t)
    print(data)
    return data




@api.get("list/", response=List[RegisterTicketOut])
def list_ticket(request):
    return Ticket.objects.all()

@api.get("paystack/verify/{reference}")
def paystack_verify(request, reference:str):
    paystack_secret_key = settings.PAYSTACK_SECRET_KEY
    print(reference, "Hello")

    url = f"https://api.paystack.co/transaction/verify/{reference}"
    headers = {
        "Authorization": f"Bearer {paystack_secret_key}"
    }

    res = requests.get(url, headers=headers)
    data = res.json()
    print(data)

    if data["status"] and data["data"]["status"] == "success":
        pass

    return data
        
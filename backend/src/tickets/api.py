from ninja import Schema, NinjaAPI, Query
from .models import Ticket, Payment
from typing import List
import requests
from django.conf import settings
import json
from enum import Enum

api = NinjaAPI()

class FecamdsEnum(str, Enum):
    ST_JOAN_CLASS = "St Joan class"
    ST_ANSELEM_CLASS = "St Anselem class"
    ST_FRANCIS_CLASS = "St Francis class"
    ST_MARY_CLASS = "St Mary class"
    ST_RAPHAEL_CLASS = "St Raphael class"


class SetEnum(str, Enum):
    SET_2017 = "2017"
    SET_2018 = "2018"
    SET_2019 = "2019"
    SET_2020 = "2020"
    SET_2021 = "2021"
    SET_2022 = "2022"
    SET_2023 = "2023"
    SET_2024 = "2024"



class RegisterTicket(Schema):
    email: str
    number_of_ticket: str
    name: str
    fecamds_class: FecamdsEnum
    set_year: SetEnum



class RegisterTicketOut(Schema):
    id: int
    email: str
    number_of_ticket: int

class PaystackInitOut(Schema):
    status: bool
    message: str
    data: dict
    ticket_id: int | None = None



@api.post("debug/")
def debug_raw(request):
    # request.body is bytes; decode to string
    try:
        body = request.body.decode("utf-8")
    except Exception:
        body = str(request.body)
    print("---- RAW BODY START ----")
    print(body)
    print("---- RAW BODY END ----")
    # Attempt to parse JSON so you can inspect in logs
    try:
        import json
        print("Parsed JSON:", json.loads(body))
    except Exception as e:
        print("Failed to parse JSON:", e)
    return {"ok": True, "received": body}



def initilaize_payment(email, ticket_number, name):
    url = "https://api.paystack.co/transaction/initialize/"
    headers = {
        "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
        "Content-Type": "application/json",
    }
    data = {
        "email": email,
        "amount": ((ticket_number * 1020) * 100),
        "first_name": name
        
    }

    res = requests.post(url, json=data, headers=headers)

    res.raise_for_status()

    return res.json()



@api.post("/", response=PaystackInitOut)
def create_ticket(request, payload: RegisterTicket):
    # data = {"name": "udo"}
    # print(**payload.dict())
    ticket = Ticket.objects.create(**payload.dict())
    email = ticket.email
    number_t = int(ticket.number_of_ticket)
    name = ticket.name
    data_v = {
        "email": email,
        "name": name,
        "ticket_id": ticket.id

    }

    print(email, number_t, name)
    ticket_obj_id = {
        "ticket_id": ticket.id
    }
    data = initilaize_payment(email, number_t, name)
    
    data["ticket_id"] = ticket.id
    print(data, "Help")
    return data




@api.get("list/", response=List[RegisterTicketOut])
def list_ticket(request):
    return Ticket.objects.all()

@api.get("paystack/verify/{reference}/")
def paystack_verify(request, reference:str):
    paystack_secret_key = settings.PAYSTACK_SECRET_KEY
    print(reference, "Hello")

    url = f"https://api.paystack.co/transaction/verify/{reference}"
    headers = {
        "Authorization": f"Bearer {paystack_secret_key}"
    }

    res = requests.get(url, headers=headers)
    data = res.json()

    # print(data)
    # print(Ticket.objects.get(id=ticket_id))
    
    ticket_id = data["data"]["metadata"]["ticket_id"]
    ticket_obj = Ticket.objects.get(id=ticket_id)

    

    if data["status"] and data["data"]["status"] == "success":
        customer = data["data"]["customer"]
        email = ticket_obj.email
        name = ticket_obj.name
        referenceId = data["data"]["reference"]
        print(email, name, "details")
        amount = int(data["data"]["amount"]) /100

        # print(email, name, referenceId, "udo")
        # print("Hello boy")
        # print(amount)
        # print(customer.keys, "customer")
        # ticket = Ticket.objects.filter(name__icontains = name).first()
        # print(dir(ticket), "ticket dir -----")
        # print(ticket)
        obj = Payment.objects.create(
            email=email, 
            referenceId=referenceId, 
            name=name, 
            amount = amount,
            ticket = ticket_obj

        )
        # ticket_fecmads_class = ticket.fecamds_class
        # ticket_set_year = ticket.set_year

        # obj.fecamds_class = ticket_fecmads_class
        # obj.set_year = ticket_set_year
        obj.save()
        return data
        
        

    return data
        
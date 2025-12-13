from django.shortcuts import render
import requests
from django.conf import settings

# Create your views here.

def verify_payment(request, reference_id):
    url = f"https://api.paystack.co/transaction/verify/{reference_id}"
    PAYSTACK_SECRET_KEY = settings.PAYSTACK_SECRET_KEY

    headers = {
        "Authorization": f"Bearer {PAYSTACK_SECRET_KEY}"
    }
    print(reference_id)
    response = requests.get(url, headers=headers)
    # print(response.json())
    if response.status_code == 200:
        data = response.json()
        transaction_status = data["data"].get("status")
        if transaction_status == "success":
            print("good")
            return render(request, "paymentSuccess.html")
    

    return render(request, "index.html")

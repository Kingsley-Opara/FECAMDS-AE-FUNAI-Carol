import qrcode
from io import BytesIO
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from email.mime.image import MIMEImage

def send_styled_payment_email(payment_obj):
    # Generate QR code
    referenceId = payment_obj.referenceId
    name = payment_obj.name
    

    verify_url = f"http://localhost:8000/ticket/home/{referenceId}"
    qr_img = qrcode.make(verify_url)

    qr_buffer = BytesIO()
    qr_img.save(qr_buffer, format="PNG")
    qr_buffer.seek(0)

    subject = "Payment Confirmation ✔"
    from_email = settings.DEFAULT_FROM_EMAIL
    to_email = ["nwadigwekessed10@gmail.com"]

    # Render HTML template
    context = {
        "first_name": name,
        "reference": referenceId,
        "verify_url": verify_url,
    }

    html_content = render_to_string("email/payment_email.html", context)
    text_content = f"Thank you for your payment! Payment Ref: {referenceId}"

    email = EmailMultiAlternatives(subject, text_content, from_email, to_email)
    email.attach_alternative(html_content, "text/html")

    # Attach QR inline
    qr_mime = MIMEImage(qr_buffer.getvalue(), _subtype="png")
    qr_mime.add_header('Content-ID', f'<qr_code_{referenceId}>')
    qr_mime.add_header('Content-Disposition', 'inline', filename="qr.png")

    email.attach(qr_mime)

    email.send()

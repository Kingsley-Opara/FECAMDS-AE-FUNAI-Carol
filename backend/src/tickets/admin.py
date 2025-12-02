from django.contrib import admin
from .models import Ticket, Payment

# Register your models here.
admin.site.register(Ticket)
admin.site.register(Payment)
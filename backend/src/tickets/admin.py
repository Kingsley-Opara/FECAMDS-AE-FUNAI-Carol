from django.contrib import admin
from .models import Ticket, Payment

# Register your models here.
admin.site.register(Ticket)

# class TicketAdmin(admin.StackedInline):
#     model = Payment
#     extra = 0





@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ["name", "fecamds_class"]
    list_filter = ["set_year", "fecamds_class"]
    fields = ["email", "referenceId", "name", "amount", "ticket", "fecamds_class", "set_year", "time_of_payment"]
    readonly_fields = ["ticket", "time_of_payment"]

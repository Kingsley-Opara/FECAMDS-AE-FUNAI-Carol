from django.db import models
from django.utils import timezone


def return_current_time():
    return timezone.now()


class FecamdsClassName(models.TextChoices):
    ST_JOAN_CLASS = "St Joan class", "St Joan class"
    ST_ANSELEM_CLASS = "St Anselem class", "St Anselem class"
    ST_FRANCIS_CLASS = "St Francis class", "St Francis class"
    ST_MARY_CLASS = "St Mary class", "St Mary class"
    ST_RAPHAEL_CLASS = "St Raphael class", "St Raphael class"

class SetYearList(models.TextChoices):
    SET_2017 = "2017", "2017"
    SET_2018 = "2018", "2018"
    SET_2019 = "2019", "2019"
    SET_2020 = "2020", "2020"
    SET_2021 = "2021", "2021"
    SET_2022 = "2022", "2022"
    SET_2023 = "2023", "2023"
    SET_2024 = "2024", "2024"



# Create your models here.
class Ticket(models.Model):
    email = models.EmailField(max_length=256, unique=False)
    number_of_ticket = models.IntegerField()
    name = models.CharField(max_length=300, null=True, blank=True, unique=True)
    fecamds_class = models.CharField(
        max_length=300, 
        null=True, 
        blank=True, 
        choices=FecamdsClassName.choices
    )
    set_year = models.CharField(
        max_length=256, 
        null=True, 
        blank=True,
        choices=SetYearList.choices
    )

    def __str__(self):
        return self.email
    


class Payment(models.Model):
    email = models.EmailField(max_length=256)
    referenceId = models.CharField(max_length=300)
    name = models.CharField(max_length=256)
    amount = models.IntegerField(null=True, blank=True)
    ticket = models.ForeignKey(Ticket, on_delete=models.SET_NULL, blank=True, null=True)
    fecamds_class = models.CharField(
        max_length=300, 
        null=True, 
        blank=True,
        choices=FecamdsClassName.choices
        
    )
    set_year = models.CharField(
        max_length=256, 
        null=True, 
        blank=True,
        choices=SetYearList.choices
    )
    time_of_payment = models.DateTimeField(auto_now=True)

    


    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        ticket = self.ticket
        ticket_fecamds_class = ticket.fecamds_class
        ticket_set_year = ticket.set_year
        if self.fecamds_class is None and ticket_fecamds_class is not None:
            self.fecamds_class = ticket_fecamds_class

        if self.set_year is None:
            self.set_year = ticket_set_year

        
        return super().save(*args, **kwargs)




    

from django.db import models

# Create your models here.
class Ticket(models.Model):
    email = models.EmailField(max_length=256, unique=False)
    number_of_ticket = models.IntegerField()
    name = models.CharField(max_length=300, null=True, blank=True, unique=True)

    def __str__(self):
        return self.email
    
class Payment(models.Model):
    email = models.EmailField(max_length=256)
    referenceId = models.CharField(max_length=300)
    name = models.CharField(max_length=256)
from django.db import models

# Create your models here.
class Ticket(models.Model):
    email = models.EmailField(max_length=256, unique=False)
    number_of_ticket = models.IntegerField()

    def __str__(self):
        return self.email
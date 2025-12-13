from django.urls import path
from .api import api
# from .views import verify_payment

urlpatterns = [
    path("api/", api.urls),
    # path("home/<str:reference_id>/", verify_payment, name="home")
]
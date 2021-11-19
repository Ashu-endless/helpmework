from django.contrib import admin

# Register your models here.
from .models import MainProfile
from .models import helpmework
        
admin.site.register(MainProfile)
admin.site.register(helpmework)

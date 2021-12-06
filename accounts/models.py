from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from django.contrib.postgres.fields import ArrayField
import datetime
class MainProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    bio = models.TextField( blank=True)
    pending_works = ArrayField(models.IntegerField(blank=False),default=[])
    def __str__(self):
        return f"{self.user}   {self.created} {self.user.pk}"

class helpmework(models.Model):
    postedby = models.ForeignKey(User, on_delete=models.CASCADE,related_name="postedby%(app_label)s_%(class)s_related")
    #postedby = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True,)
    description = models.TextField(max_length=300,blank=True)
    subject = models.CharField(max_length=20,blank=False,default="not specified")
    upvoted_by = models.ManyToManyField(User,related_name="upvotedby%(app_label)s_%(class)s_related")
    posttime = models.DateTimeField(auto_now_add=True)
    #imgsrcs = models.TextField(blank=False,default="")
    imgsrcs = ArrayField(models.TextField(blank=False),default=["no_img"])
    workdone_date = models.DateField(default=datetime.date.today)
    def __str__(self):
        return f"{self.postedby.pk} {self.postedby}  {self.description}  {self.pk}"



class Questions(models.Model):
    user =models.ForeignKey(User, on_delete=models.CASCADE,related_name="askedby%(app_label)s_%(class)s_related")
    waiting = models.ManyToManyField(User,related_name="waiting%(app_label)s_%(class)s_related")
    homework_ids = ArrayField(models.IntegerField(blank=False),default=[])
    question = models.TextField(max_length=300,blank=True)
    posttime = models.DateTimeField(auto_now_add=True,)
    def __str__(self):
        return f"{self.pk} {self.question}  {self.homework_ids}"

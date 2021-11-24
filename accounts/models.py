from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from django.contrib.postgres.fields import ArrayField

class MainProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    bio = models.TextField( blank=True)

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
    def __str__(self):
        return f"{self.postedby.pk} {self.postedby}  {self.description}  {self.pk}"



    

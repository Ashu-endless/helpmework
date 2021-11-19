from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class MainProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    bio = models.TextField( blank=True)

    def __str__(self):
        return f"{self.user}   {self.created}"

class helpmework(models.Model):
    postedby = models.OneToOneField(User, on_delete=models.CASCADE,related_name="postedby%(app_label)s_%(class)s_related")
    #postedby = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True,)
    description = models.TextField(max_length=300,blank=True)
    subject = models.CharField(max_length=20,blank=False)
    upvoted_by = models.ManyToManyField(User,related_name="upvotedby%(app_label)s_%(class)s_related")
    posttime = models.DateTimeField(auto_now_add=True)
    imgsrcs = models.TextField(blank=False,default="")
    def __str__(self):
        return f"{self.postedby.pk} {self.postedby}  {self.upvoted_by} {self.pk}"



    

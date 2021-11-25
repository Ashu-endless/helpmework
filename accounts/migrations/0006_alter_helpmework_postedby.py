# Generated by Django 3.2.8 on 2021-11-23 11:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0005_alter_helpmework_imgsrcs'),
    ]

    operations = [
        migrations.AlterField(
            model_name='helpmework',
            name='postedby',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='postedbyaccounts_helpmework_related', to=settings.AUTH_USER_MODEL),
        ),
    ]
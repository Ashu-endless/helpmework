# Generated by Django 3.2.8 on 2021-11-17 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='helpmework',
            name='imgsrcs',
            field=models.TextField(default=''),
        ),
    ]

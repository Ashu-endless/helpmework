# Generated by Django 3.2.8 on 2021-12-04 14:57

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_alter_helpmework_postedby'),
    ]

    operations = [
        migrations.AddField(
            model_name='mainprofile',
            name='pending_works',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), default=[], size=None),
        ),
    ]

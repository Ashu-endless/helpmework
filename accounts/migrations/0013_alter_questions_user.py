# Generated by Django 3.2.8 on 2021-12-06 05:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0012_questions_posttime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questions',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='askedbyaccounts_questions_related', to=settings.AUTH_USER_MODEL),
        ),
    ]
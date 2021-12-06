# Generated by Django 3.2.8 on 2021-12-05 11:54

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0009_alter_mainprofile_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Questions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('homework_ids', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), default=[], size=None)),
                ('question', models.TextField(blank=True, max_length=300)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('waiting', models.ManyToManyField(related_name='waitingaccounts_questions_related', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
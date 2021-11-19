# Generated by Django 3.2.8 on 2021-11-16 17:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='MainProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('bio', models.TextField(blank=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='helpmework',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(blank=True, max_length=300)),
                ('subject', models.CharField(max_length=20)),
                ('posttime', models.DateTimeField(auto_now_add=True)),
                ('postedby', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='postedbyaccounts_helpmework_related', to=settings.AUTH_USER_MODEL)),
                ('upvoted_by', models.ManyToManyField(related_name='upvotedbyaccounts_helpmework_related', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

# Generated by Django 3.2.8 on 2021-12-05 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_helpmework_workdone_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='questions',
            name='posttime',
            field=models.DateTimeField(auto_now_add=True, default='2021-06-25 07:58:56.550604'),
            preserve_default=False,
        ),
    ]

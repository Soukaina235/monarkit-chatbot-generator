# Generated by Django 5.1 on 2024-08-22 08:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chatbots', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chatbot',
            old_name='user',
            new_name='owner',
        ),
    ]

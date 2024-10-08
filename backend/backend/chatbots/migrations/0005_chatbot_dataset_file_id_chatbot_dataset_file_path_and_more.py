# Generated by Django 5.1 on 2024-08-23 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chatbots', '0004_chatbot_training_step'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatbot',
            name='dataset_file_id',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='chatbot',
            name='dataset_file_path',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='chatbot',
            name='openai_job_id',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='chatbot',
            name='openai_model_id',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='chatbot',
            name='training_step',
            field=models.CharField(blank=True, choices=[('scraping', 'Scraping Website'), ('processing', 'Processing Content'), ('extraction', 'Extracting Questions and Responses'), ('augmentation', 'Augmenting Data'), ('validation', 'Validating Training File'), ('upload', 'Upload Training File'), ('training', 'Training Model'), ('completed', 'Completed')], max_length=50, null=True),
        ),
    ]

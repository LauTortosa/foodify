# Generated by Django 5.0.6 on 2024-06-15 13:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('planning', '0002_alter_planning_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='planning',
            name='state',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.RESTRICT, to='planning.state'),
        ),
    ]

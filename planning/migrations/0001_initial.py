# Generated by Django 5.0.6 on 2024-06-12 08:13

import django.db.models.deletion
from django.db import migrations, models
from planning.utils import populate_options


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=30)),
                ('label', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Planning',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('load', models.IntegerField()),
                ('tracebility', models.IntegerField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='product.product')),
                ('state', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='planning.state')),
            ],
        ),
        migrations.RunPython(populate_options, reverse_code=migrations.RunPython.noop),
    ]

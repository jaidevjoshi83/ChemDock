from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """
    This command will print a command line argument.
    """
    help = 'This command will import locations from a CSV file into the hivapp Locations model.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--printme',
            action='store',
            dest='printme',
            default="Hello world!",
            help='''The string to print.'''
        )

    def handle(self, *args, **options):
        print(options['printme'])
# -*- coding: utf-8 -*-
{
    'name': 'Website Slides Addon',
    'version': '12.0.0.1',
    'description': """Extension for website slides""",
    'summary': """Extension for website slides""",
    'category': 'eLearning',
    'data': [
        'views/website_slides_view.xml',
        'templates/template.xml',
    ],
    'depends': ['website_slides', 'website_slides_local_video'],
    'application': True,
}

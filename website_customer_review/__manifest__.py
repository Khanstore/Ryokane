# -*- coding: utf-8 -*-
{
    'name': 'Website Customer Review',
    'summary': "Ask customer to give review for your service and have facility to publish that review on your website",
    'description': "Ask customer to give review for your service and have facility to publish that review on your website",

    'author': 'iPredict IT Solutions Pvt. Ltd.',
    'website': 'http://ipredictitsolutions.com',
    'support': 'ipredictitsolutions@gmail.com',

    'category': 'Website',
    'version': '12.0.0.1.0',
    'depends': ['contacts', 'website'],

    'data': [
        'data/mail_template_data.xml',
        'security/ir.model.access.csv',
        'views/assets.xml',
        'views/res_partner_review_views.xml',
        'views/res_partner_views.xml',
        'views/customer_review_template.xml',
        'views/customer_review_snippets.xml',
    ],

    'license': "OPL-1",
    'price': 45,
    'currency': "EUR",

    'auto_install': False,
    'installable': True,

    'images': ['static/description/banner.png'],
}

# -*- coding: utf-8 -*-
{
    'name': "upload video in website builder",

    'summary': """
        allow users to upload video in website builder""",

    'description': """
        change the behavior of uploading video, when user build website, they can select video from their computer and upload to server
    """,
    'author': "harry",
    'website': "https://www.zdctech.top/",
    'category': 'Website',
    'version': '1.0.1',
    'depends': ['base', 'website'],
    'images': [
        'images/screen.png'
    ],
    'data': [
        'security/ir.model.access.csv',
        'views/assets.xml',
        'views/snippets/s_video.xml',
        'views/snippets/snippets.xml',
    ],
    'qweb': [
        'static/src/xml/*.xml',
    ],
}

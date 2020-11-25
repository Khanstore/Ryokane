# -*- coding: utf-8 -*-
import logging

# optional python-slugify import (https://github.com/un33k/python-slugify)
try:
    import slugify as slugify_lib
except ImportError:
    slugify_lib = None

from odoo import models
from odoo.http import request

_logger = logging.getLogger(__name__)


class Http(models.AbstractModel):
    _inherit = 'ir.http'

    @classmethod
    def _add_dispatch_parameters(cls, func):
        # only called for is_frontend request
        super(Http, cls)._add_dispatch_parameters(func)
        if request.routing_iteration == 1:
            context = dict(request.context)
            path = request.httprequest.path.split('/')
            langs = [lg.code for lg in cls._get_languages()]
            is_a_bot = cls.is_a_bot()
            cook_lang = request.httprequest.cookies.get('frontend_lang')
            nearest_lang = not func and cls.get_nearest_lang(path[1])
            preferred_lang = ((cook_lang if cook_lang in langs else False)
                              or cls._get_default_lang().code
                              or (not is_a_bot and cls.get_nearest_lang(request.lang)))
            request.lang = context['lang'] = nearest_lang or preferred_lang
            # bind modified context
            request.context = context

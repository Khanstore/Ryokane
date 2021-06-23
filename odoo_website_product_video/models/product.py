# -*- coding: utf-8 -*-
# Part of BrowseInfo. See LICENSE file for full copyright and licensing details.

from odoo import models, fields, api


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    youtube_url = fields.Char(string='Youtube URL', help='Enter a Valid Youtube URL here')


        
# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:

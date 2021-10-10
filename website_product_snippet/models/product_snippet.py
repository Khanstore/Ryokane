# -*- coding: utf-8 -*-

from odoo import fields, models


class ProductSlider(models.Model):
    _name = 'product.slider'
    _description = "Product Slider"

    name = fields.Char(string='Product Type', required=True)
    product_ids = fields.Many2many('product.template', string='Products', domain=[('website_published', '=', True)],)

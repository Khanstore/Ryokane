# -*- coding: utf-8 -*-

from odoo import fields, models


class ResPartnerReview(models.Model):
    _name = 'res.partner.review'
    _description = "Partner Review"
    _rec_name = "review_token"

    partner_id = fields.Many2one('res.partner', string='Customer', copy=False)
    review_rating = fields.Selection([
        ('0', '0'), ('1', '1'), ('2', '2'),
        ('3', '3'), ('4', '4'), ('5', '5')],
        string='Review Rating', copy=False)
    review_message = fields.Text(string="Review Message", copy=False)
    review_token = fields.Char(string="Review Token", copy=False)
    review_image = fields.Binary(string="Review Image", copy=False)
    review_website_publish = fields.Boolean(
        string="Review Website Publish", copy=False)
    review_website_id = fields.Many2one(
        'website', string="Review Website", copy=False)

    def toggle_review_website_publish(self):
        for partner in self:
            partner.review_website_publish = not partner.review_website_publish

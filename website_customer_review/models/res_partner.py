# -*- coding: utf-8 -*-

from random import choice
from string import digits
from odoo import fields, models


class ResPartner(models.Model):
    _inherit = 'res.partner'

    review_count = fields.Integer(
        compute='_compute_review_count', string="Review Count")

    def _compute_review_count(self):
        review_data = self.env['res.partner.review'].read_group([
            ('partner_id', 'in', self.ids)], ['partner_id'], ['partner_id'])
        result = dict(
            (data['partner_id'][0], data['partner_id_count'])
            for data in review_data)
        for partner in self:
            partner.review_count = result.get(partner.id, 0)

    def _get_review_token(self):
        website = self.env['website'].get_current_website()
        partner_review = self.env['res.partner.review']
        for partner in self:
            review = partner_review.search([
                ('partner_id', '=', partner.id),
                ('review_website_id', 'in', website.ids)], limit=1)
            if review:
                return review.review_token
            else:
                review_token = "".join(choice(digits) for i in range(8))
                partner_review.create({
                    'review_token': review_token,
                    'partner_id': partner.id,
                    'review_website_id': website.id
                })
                return review_token

    def send_mail_to_customer(self):
        ctx = {}
        ctx['email_from'] = self.env.user.email
        ctx['email_to'] = self.email
        ctx['lang'] = self.env.user.lang
        ctx['user_name'] = self.env.user.name
        ctx['partner_name'] = self.name
        ctx['company_name'] = self.env.user.company_id.name
        ctx['review_token'] = self._get_review_token()
        template = self.env.ref(
            'website_customer_review.website_customer_review_email_template')
        template.with_context(ctx).sudo().send_mail(
            self.id, force_send=True, raise_exception=False)

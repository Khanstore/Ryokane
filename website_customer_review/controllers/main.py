# -*- coding: utf-8 -*-

import base64
from odoo import http
from odoo.http import request


class WebsiteCustomerReview(http.Controller):

    @http.route(
        '/review/<review_token>', type='http', auth="public", website=True)
    def customer_review(self, review_token, **kw):
        review = request.env['res.partner.review'].sudo().search(
            [('review_token', '=', review_token)], limit=1)
        if review:
            return request.render(
                'website_customer_review.ask_customer_review',
                {'review': review})
        else:
            return request.render(
                'website_customer_review.review_page_not_found')

    @http.route('/submit_customer_review',
                type='http', auth='public', methods=['POST'], website=True)
    def submit_customer_review(self, **post):
        partner_id = post.get('partner_id', False)
        review_token = post.get('review_token', False)
        if partner_id and review_token:
            review = request.env['res.partner.review'].sudo().search([
                ('partner_id', '=', int(partner_id)),
                ('review_token', '=', review_token)])
            if review:
                values = {
                    'review_website_id': request.website.id,
                    'review_rating': post.get('review_rating'),
                    'review_message': post.get('review_message'),
                }
                if post.get('review_image_file'):
                    image = post.get('review_image_file').read()
                    values['review_image'] = base64.b64encode(image)
                review.write(values)
                return request.redirect('/review_thank_you')
            return request.render(
                'website_customer_review.review_page_not_found')
        return request.render(
                'website_customer_review.review_page_not_found')

    @http.route('/review_thank_you', type='http', auth='public', website=True)
    def review_thank_you(self, **kw):
        return request.render('website_customer_review.thank_you_page')

    @http.route(
        '/get_customer_review', type='json', auth='public', website=True)
    def get_customer_review(self, **kw):
        review_ids = request.env['res.partner.review'].sudo().search_read([
                            ('review_website_publish', '=', True),
                            ('review_rating', '!=', False),
                            ('review_message', '!=', False),
                            ('review_website_id', '=', request.website.id)
                        ], ['partner_id', 'review_message', 'review_rating'])
        return {'review_ids': review_ids}

# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import request


class ProductSnippet(http.Controller):

    @http.route(['/product_snippet/render'], type='json', auth='public', website=True)
    def render_latest_posts(self, template, domain, limit=None, order='id desc'):
        products_slider = request.env['product.slider'].sudo().search(domain, limit=1)
        p_domain = [('website_published', '=', True)]
        if products_slider:
            p_domain += [('id', 'in', products_slider.product_ids.ids)]
        products = request.env['product.template'].sudo().search(p_domain, limit=limit, order=order)
        return request.env.ref(template).render({'products': products})

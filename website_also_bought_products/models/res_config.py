# -*- coding: utf-8 -*-
#################################################################################
#
# Copyright (c) 2018-Present Webkul Software Pvt. Ltd. (<https://webkul.com/>:wink:
# See LICENSE file for full copyright and licensing details.
#################################################################################


from odoo import api, models, fields

import logging
_logger = logging.getLogger(__name__)


class AlsoBoughtProductsConf(models.TransientModel):
	_name = 'also.bought.products.conf'
	_inherit = 'webkul.website.addons'

	use_automatic = fields.Boolean(
		string="Add Products Automatically",
		help="Add the products automatically to the also bought on the purchase"
	)
	
	header = fields.Char(
		string="Header Message",
		required=True,
	)


	@api.multi
	def set_values(self):
		super(AlsoBoughtProductsConf, self).set_values()
		IrDefault = self.env['ir.default'].sudo()
		IrDefault.set('also.bought.products.conf','use_automatic', self.use_automatic)
		IrDefault.set('also.bought.products.conf','header', self.header) or 'CUSTOMERS WHO BOUGHT THIS ITEM ALSO BOUGHT'
		
	@api.multi
	def get_values(self):
		res = super(AlsoBoughtProductsConf, self).get_values()
		IrDefault = self.env['ir.default'].sudo()
		res.update({
			'use_automatic':IrDefault.get('also.bought.products.conf','use_automatic'),
			'header':IrDefault.get('also.bought.products.conf','header') or 'CUSTOMERS WHO BOUGHT THIS ITEM ALSO BOUGHT',
		})
		return res

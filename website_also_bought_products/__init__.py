# -*- coding: utf-8 -*-
#################################################################################
#
# Copyright (c) 2018-Present Webkul Software Pvt. Ltd. (<https://webkul.com/>:wink:
# See LICENSE file for full copyright and licensing details.
#################################################################################
from . import models
from . import controllers

def pre_init_check(cr):
	from openerp.service import common
	from openerp.exceptions import Warning
	version_info = common.exp_version()
	server_serie =version_info.get('server_serie')
	if server_serie!='12.0':raise Warning('Module support Odoo series 12.0 found {}.'.format(server_serie))
	return True

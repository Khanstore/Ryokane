# -*- coding: utf-8 -*-

from odoo import fields, models


class ResPartner(models.Model):
    _inherit = "res.partner"

    f_name = fields.Char('First Name')
    l_name = fields.Char('Last Name')
    # birthday = fields.Date('Date of Birth')

    @api.onchange('f_name','l_name')
    def assign_l_f_name(self):
        if self.f_name and self.l_name:
            self.name = self.f_name + " " + self.l_name
        elif self.f_name and not self.l_name:
            self.self.name = self.f_name
        elif self.l_name and not self.f_name:
            self.name = " "

            
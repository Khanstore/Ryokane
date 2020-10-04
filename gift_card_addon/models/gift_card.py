# -*- coding: utf-8 -*-

from odoo import models, api, fields, _


class GiftCard(models.Model):

    _inherit = 'aspl.gift.card'

    check_expiry_access = fields.Boolean(string='Has Access Expiry Change?', compute="_compute_check_expiry_access")

    def _compute_check_expiry_access(self):
        for card in self:
            card.check_expiry_access = self.env.user.has_group('gift_card_addon.group_access_expiry')

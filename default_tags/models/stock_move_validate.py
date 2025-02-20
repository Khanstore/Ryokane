# -*- coding: utf-8 -*-

from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
import logging
_logger = logging.getLogger(__name__)

class StockStockScrap(models.Model):
    _inherit = 'stock.scrap'

    analytic_tag_ids = fields.Many2many('account.analytic.tag',
                                        string='Analytic Tags')

    def _prepare_move_values(self):
        self.ensure_one()
        return {
            'name': self.name,
            'origin': self.origin or self.picking_id.name or self.name,
            'product_id': self.product_id.id,
            'product_uom': self.product_uom_id.id,
            'product_uom_qty': self.scrap_qty,
            'location_id': self.location_id.id,
            'scrapped': True,
            'analytic_tag_ids':  [(6, 0, self.analytic_tag_ids.ids)],
            'location_dest_id': self.scrap_location_id.id,
            'move_line_ids': [(0, 0, {'product_id': self.product_id.id,
                                        'product_uom_id': self.product_uom_id.id, 
                                        'qty_done': self.scrap_qty,
                                        'location_id': self.location_id.id, 
                                        'location_dest_id': self.scrap_location_id.id,
                                        'package_id': self.package_id.id, 
                                        'owner_id': self.owner_id.id,
                                        'lot_id': self.lot_id.id, })],
#             'restrict_partner_id': self.owner_id.id,
            'picking_id': self.picking_id.id
        }

class StockJournalEntry(models.Model):
    _inherit = 'stock.move'

    analytic_tag_ids = fields.Many2many('account.analytic.tag',
                                        string='Analytic Tags')

    def _create_account_move_line(self, credit_account_id, debit_account_id, journal_id):
        self.ensure_one()
        account_move = self.env['account.move']
        quantity = self.env.context.get('forced_quantity', self.product_qty)
        quantity = quantity if self._is_in() else -1 * quantity
        # Make an informative `ref` on the created account move to differentiate between classic
        # movements, vacuum and edition of past moves.
        ref = self.picking_id.name
        if self.env.context.get('force_valuation_amount'):
            if self.env.context.get('forced_quantity') == 0:
                ref = 'Revaluation of %s (negative inventory)' % ref
            elif self.env.context.get('forced_quantity') is not None:
                ref = 'Correction of %s (modification of past move)' % ref

        move_lines = self.with_context(forced_ref=ref)._prepare_account_move_line(quantity, abs(self.value),
                                                                                  credit_account_id, debit_account_id)
        if move_lines:
            date = self._context.get('force_period_date',
                                     fields.Date.context_today(self))
            new_account_move = account_move.sudo().create({
                'journal_id': journal_id,
                'line_ids': move_lines,
                'date': date,
                'ref': ref,
                'stock_move_id': self.id,
            })
            tags = []
            for move_lines in new_account_move.line_ids:
                dimension_tags_allowed = []

                if self.inventory_id:
                    tags = self.inventory_id.analytic_tag_ids.ids
                elif self.picking_id:
                    tags = self.analytic_tag_ids.ids
                elif self.scrapped:
                    mrp = self.env['mrp.production'].search([('move_raw_ids', '=', self.id)])
                    _logger.info('self.scrapped yes=====')
                    if mrp:
                        tags = mrp.mrp_analytic_tags.ids
                    else:
                        _logger.info('self id %s =====',self)
                        scrap = self.scrap_ids
                        _logger.info('scrap id %s =====',scrap)
                        tags = self.analytic_tag_ids.ids
                else:
                    tags = self.analytic_tag_ids.ids
                _logger.info('tags %s =====',tags)
                for account in move_lines.account_id.analytic_dimension_ids:
                    dimension_tags = account.analytic_dimension_id.analytic_tag_ids.ids
                    dimension_tags_allowed += dimension_tags
                    occurance = False
                    for x in set(dimension_tags):
                        if tags:
                            if tags.count(x) > 0:
                                occurance = True
                    if occurance is False:
                        if account.default_value:
                            tags.append(account.default_value.id)
                        else:
                            _logger.info('Account %s ===========================', move_lines.account_id)
                            raise ValidationError(
                                _("Please choose a valid Tag/Dimension! "))
                allowed_tag_val = []
                for tag in tags:
                    if tag in dimension_tags_allowed:
                        allowed_tag_val.append(tag)
                move_lines.update({
                    'analytic_tag_ids': [(6, 0, allowed_tag_val)]
                })
            new_account_move.post()


class StockAnalyticTag(models.Model):
    _inherit = 'stock.inventory'

    analytic_tag_ids = fields.Many2many('account.analytic.tag',
                                        string='Analytic Tags')


class PurchaseTagLine(models.Model):
    _inherit = 'purchase.order'

    def action_view_invoice(self):
        res = super(PurchaseTagLine, self).action_view_invoice()
        res['context']['default_analytic_tag_id'] = [(6, 0, self.analytic_tag_ids.ids)]
        res['context']['default_account_analytic_id'] = self.analytic_account_id.id
        return res


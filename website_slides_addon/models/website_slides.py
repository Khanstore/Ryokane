# -*- coding: utf-8 -*-

from odoo import models, api, fields, _


class Slide(models.Model):

    _inherit = 'slide.slide'

    allow_channel_partner_ids = fields.One2many(
        'allow.channel.partner', 'slide_id', string="Allow Channel Partner Ids", copy=True)
    embed_code_src = fields.Text('Embed Code (SRC)', readonly=True, compute='_get_embed_code')
    external_link = fields.Text(string='External Link')

    @api.multi
    @api.returns('self', lambda value: value.id)
    def copy(self, default=None):
        default = dict(default or {}, name=_("%s (Copy)") % self.name)
        return super(Slide, self).copy(default=default)

    def _get_embed_code(self):
        base_url = self.env['ir.config_parameter'].sudo(
        ).get_param('web.base.url')
        for record in self:
            if record.is_local_url:
                record.embed_code = False
                record.embed_code_src = False
                if record.local_url:
                    if record.local_url.local_url:
                        record.embed_code = '<iframe src="%s" class="o_wslides_iframe_viewer" allowFullScreen="true" height="%s" width="%s" frameborder="0"></iframe>' % (
                            record.local_url.sudo().local_url, 315, 420)
                        record.embed_code_src = record.local_url.sudo().local_url
            else:
                if record.datas and (not record.document_id or record.slide_type in ['document', 'presentation']):
                    record.embed_code = '<iframe src="%s/slides/embed/%s?page=1" class="o_wslides_iframe_viewer" allowFullScreen="true" height="%s" width="%s" frameborder="0"></iframe>' % (
                        base_url, record.id, 315, 420)
                    record.embed_code_src = base_url
                elif record.slide_type == 'video' and record.document_id:
                    if not record.mime_type:
                        # embed youtube video
                        record.embed_code = '<iframe src="//www.youtube.com/embed/%s?theme=light" allowFullScreen="true" frameborder="0"></iframe>' % (
                            record.document_id)
                        record.embed_code_src = "//www.youtube.com/embed/%s?theme=light" % (
                            record.document_id)
                    else:
                        # embed google doc video
                        record.embed_code = '<iframe src="//drive.google.com/file/d/%s/preview" allowFullScreen="true" frameborder="0"></iframe>' % (
                            record.document_id)
                        record.embed_code_src = "//drive.google.com/file/d/%s/preview" % (
                            record.document_id)
                else:
                    record.embed_code = False
                    record.embed_code_src = False

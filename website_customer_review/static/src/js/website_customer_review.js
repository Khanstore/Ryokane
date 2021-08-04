odoo.define('website_customer_review.customer_review', function (require) {
'use strict';

var core = require('web.core');
var sAnimation = require('website.content.snippets.animation');

var qweb = core.qweb;
var _t = core._t;

sAnimation.registry.s_customer_review = sAnimation.Class.extend({
    selector : '.js_s_customer_review',
    xmlDependencies: ['/website_customer_review/static/src/xml/website_customer_review.xml'],

    start: function () {
        var self = this;
        var defs = [this._super.apply(this, arguments)];
        defs.push(self._rpc({
            route: '/get_customer_review',
        }).then(function (data) {
            var template = self.$target.data('template')
            var html = $(qweb.render(template, data));
            self.$target.html(html);
            self._computeHeights();
        }));
        return $.when.apply($, defs);
    },
    _computeHeights: function () {
        var maxHeight = 0;
        var $items = this.$('.carousel-item');
        _.each($items, function (el) {
            var $item = $(el);
            var height = $item.outerHeight();
            if (height > maxHeight) {
                maxHeight = height;
            }
        });
        _.each($items, function (el) {
            $(el).css('min-height', maxHeight);
        });
    },
});
});

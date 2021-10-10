odoo.define('website_product_snippet.s_product_snippet_editor', function(require) {
    'use strict';

    var core = require('web.core');
    var sOptions = require('web_editor.snippets.options');
    var wUtils = require('website.utils');

    var _t = core._t;

    sOptions.registry.js_get_products_limit = sOptions.Class.extend({

        products_limit: function(previewMode, value, $opt) {
            value = parseInt(value);
            this.$target.attr('data-products_limit', value).data('products_limit', value);
            this.trigger_up('animation_start_demand', {
                editableMode: true,
                $target: this.$target,
            });
        },

        _setActive: function() {
            var self = this;
            this._super.apply(this, arguments);
            this.$('[data-products_limit]').addBack('[data-products_limit]')
                .removeClass('active')
                .filter(function() {
                    return (self.$target.data('products_limit') || 3) == $(this).data('products_limit');
                })
                .addClass('active');
        },
    });

    sOptions.registry.js_get_products_selectSlider = sOptions.Class.extend({

        start: function() {
            var self = this;

            var def = this._rpc({
                model: 'product.slider',
                method: 'search_read',
                args: [
                    [],
                    ['name', 'id']
                ],
            }).then(function(sliders) {
                var $menu = self.$el.find('[data-filter_by_slider_id="0"]').parent();
                _.each(sliders, function(slider) {
                    $menu.append($('<a/>', {
                        class: 'dropdown-item',
                        'data-filter_by_slider_id': slider.id,
                        'data-no-preview': 'true',
                        text: slider.name,
                    }));
                });
            });

            return $.when(this._super.apply(this, arguments), def);
        },

        filter_by_slider_id: function(previewMode, value, $opt) {
            value = parseInt(value);
            this.$target.attr('data-filter_by_slider_id', value).data('filter_by_slider_id', value);
            this.trigger_up('animation_start_demand', {
                editableMode: true,
                $target: this.$target,
            });
        },
        _setActive: function() {
            var self = this;
            this._super.apply(this, arguments);
            this.$('[data-filter_by_slider_id]').addBack('[data-filter_by_slider_id]')
                .removeClass('active')
                .filter(function() {
                    return (self.$target.data('filter_by_slider_id') || 0) == $(this).data('filter_by_slider_id');
                })
                .addClass('active');
        },
    });

    sOptions.registry.js_get_product_items_display = sOptions.Class.extend({

        product_items: function(previewMode, value, $opt) {
            value = parseInt(value);
            this.$target.attr('data-product_items', value).data('product_items', value);
            this.trigger_up('animation_start_demand', {
                editableMode: true,
                $target: this.$target,
            });
        },

        _setActive: function() {
            var self = this;
            this._super.apply(this, arguments);
            this.$('[data-product_items]').addBack('[data-product_items]')
                .removeClass('active')
                .filter(function() {
                    return (self.$target.data('product_items') || 3) == $(this).data('product_items');
                })
                .addClass('active');
        },
    });

});
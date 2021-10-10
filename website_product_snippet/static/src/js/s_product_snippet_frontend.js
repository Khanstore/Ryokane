odoo.define('website_product_snippet.s_product_snippet_frontend', function(require) {
    'use strict';

    var core = require('web.core');
    var sAnimation = require('website.content.snippets.animation');

    var _t = core._t;

    sAnimation.registry.js_get_products = sAnimation.Class.extend({
        selector: '.js_get_products',

        /**
         * @override
         */
        start: function() {
            var self = this;

            var limit = self.$target.data('products_limit') || 4;
            var slider_id = self.$target.data("filter_by_slider_id");
            var items = self.$target.data("product_items") || 4;
            var template = self.$target.data('template') || 'website_product_snippet.media_list_template';
            var loading = self.$target.data('loading');

            this.$target.empty(); // Compatibility with db that saved content inside by mistake
            this.$target.attr('contenteditable', 'False'); // Prevent user edition



            var domain = [];
            if (slider_id) { domain.push(['id', '=', parseInt(slider_id)]); }

            // call products
            var def = $.Deferred();
            this._rpc({
                route: '/product_snippet/render',
                params: {
                    template: template,
                    domain: domain,
                    limit: limit,
                },
            }).then(function(products) {
                var $products = $(products).filter('.s_latest_products_product');
                if (!$products.length) {
                    self.$target.append($('<div/>', { class: 'col-md-6 offset-md-3' })
                        .append($('<div/>', {
                            class: 'alert alert-warning alert-dismissible text-center',
                            text: _t("No products was found. Make sure your products are published."),
                        })));
                    return;
                }

                if (loading && loading === true) {
                    // Perform an intro animation
                    self._showLoading($products);
                } else {
                    self.$target.html($products);
                }
                self.initialize_owl($(".js_get_products"), items);
            }, function(e) {
                if (self.editableMode) {
                    self.$target.append($('<p/>', {
                        class: 'text-danger',
                        text: _t("An error occured with this latest posts block. If the problem persists, please consider deleting it and adding a new one"),
                    }));
                }
            }).always(def.resolve.bind(def));
            return $.when(this._super.apply(this, arguments), def);
        },
         initialize_owl: function($el, items) {
            $el.find('.owl-carousel').owlCarousel({
                items: items,
                margin: 20,
                nav: true,
                dots: true,
                lazyLoad: true,
                autoplay: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    600: {
                        items: 3,
                        nav: true
                    },
                    1024: {
                        items: items,
                        nav: true
                    }
                }

            });
        },

        /**
         * @override
         */
        destroy: function() {
            this.$target.empty();
            this._super.apply(this, arguments);
        },

        //--------------------------------------------------------------------------
        // Private
        //--------------------------------------------------------------------------

        /**
         * @private
         */
        _showLoading: function($posts) {
            var self = this;

            _.each($posts, function(post) {
                var $post = $(post);
                var $loadingContainer = $post.find('.loading_container');
                var $thumb = $post.find('.loading_container .oe_product_image');
                var $progress = $('<div/>', {
                    class: 'progress js-loading',
                }).append($('<div/>', {
                    class: 'progress-bar',
                    role: 'progressbar',
                    'aria-valuenow': '0',
                    'aria-valuemin': '0',
                    'aria-valuemax': '100',
                    css: {
                        width: 0,
                    },
                }));

                // If can't find loading container or thumb inside the post, then they are the post itself
                if (!$loadingContainer.length) {
                    $loadingContainer = $post;
                }
                if (!$thumb.length) {
                    $thumb = $post;
                }

                $post.addClass('js-loading');
                $progress.appendTo($loadingContainer);
                $post.appendTo(self.$target);

                var m = $thumb.css('background-image').match(/url\(["']?(.+?)["']?\)/);
                var bg = m ? m[1] : 'none';
                var loaded = false;

                var $bar = $progress.find('.progress-bar');
                $bar.css('width', '50%').attr('aria-valuenow', '50');

                var $dummyImg = $('<img/>');

                // Show the post after 5sec in any case
                var timer = setTimeout(function() {
                    $dummyImg.remove();
                    $post.removeClass('js-loading');
                    $progress.hide();
                }, 5000);

                $dummyImg.load(function() {
                    $bar.css('width', '100%').attr('aria-valuenow', '100');
                    setTimeout(function() {
                        $post.removeClass('js-loading');
                        $progress.fadeOut(500);
                    }, 500);
                    $dummyImg.remove();
                    clearTimeout(timer);
                });

                $dummyImg.attr('src', bg);
            });
        },
    });

});
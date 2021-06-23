odoo.define('website_customer_review.ask_customer_review', function (require) {
    'use strict';

    var sAnimations = require('website.content.snippets.animation');

    sAnimations.registry.WebsiteCustomerReview = sAnimations.Class.extend({
        selector: '.js_ask_customer_review',
        read_events: {
            'click .stars': '_onClickStars',
            "mousemove .stars i" : "_onMoveStar",
            "mouseleave .stars i" : "_onMoveOutStar",
        },
        start: function () {
            var self = this;
            return this._super.apply(this, arguments).then(function(){
                self.user_click = false;
                self.$input = self.$('input[name="review_rating"]');
                self.$star_list = self.$('.stars').find('i');

                self.on("change:star_value", self, self._onChangeStarValue);
                self.set("star_value", self.$input.val());
            });
        },
        _onChangeStarValue: function(){
            var val = this.get("star_value");
            var index = Math.floor(val);
            var decimal = val - index;
            this.$star_list.removeClass('fa-star fa-star-half-o').addClass('fa-star-o');

            this.$('.stars').find("i:lt("+index+")").removeClass('fa-star-o fa-star-half-o').addClass('fa-star');
            if(decimal){
                this.$('.stars').find("i:eq("+(index)+")").removeClass('fa-star-o fa-star fa-star-half-o').addClass('fa-star-half-o');
            }
        },
        _onClickStars: function (ev) {
            this.user_click = true;
            this.$input.val(this.get("star_value"));
        },
        _onMoveStar: function(e){
            var index = this.$('.stars i').index(e.currentTarget);
            this.set("star_value", index+1);
        },
        _onMoveOutStar: function(){
            if(!this.user_click){
                this.set("star_value", parseInt(this.$input.val()));
            }
            this.user_click = false;
        },
    });
});
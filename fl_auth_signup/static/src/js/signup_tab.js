odoo.define('fl_auth_signup.signup_signin_tab', function (require) {

    "use strict";
    
    $(document).ready(function(){
        $('#name').prop('readonly', true);
        $("#f_name").on("input", function(){
            $("#name").val($("#f_name").val() + " " +$("#l_name").val());
        });
        
        $("#l_name").on("input", function(){
            $("#name").val($("#f_name").val() + " " +$("#l_name").val());
        });

        $('.div_name').prop('readonly', true);
        $(".div_f_name").on("input", function(){
            $(".div_name").val($(".div_f_name").val() + " " +$(".div_l_name").val());
        });
        
        $(".div_l_name").on("input", function(){
            $(".div_name").val($(".div_f_name").val() + " " +$(".div_f_name").val());
        });
        
    
    });

    var fixmeTop = $('#o_shop_collapse_category').offset().top;
        $(window).scroll(function() {
            var currentScroll = $(window).scrollTop();
            if (currentScroll >= fixmeTop) {
                $('#o_shop_collapse_category').css({
                    position: 'fixed',
                    top: '0',
                    left: '0'
                });
            } else {
                $('#o_shop_collapse_category').css({
                    position: 'static'
                });
            }
});


});
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

        $('#div_name').prop('readonly', true);
        $("#div_f_name").on("input", function(){
            console.log($("#div_f_name").val())
            $("#div_name").val($("#div_f_name").val() + " " +$("#div_l_name").val());
        });
        
        $("#div_l_name").on("input", function(){
            $("#div_name").val($("#div_f_name").val() + " " +$("#div_l_name").val());
        });
        
    
    });

    $(window).scroll(function() {
        console.log("inited=====");
        var hT = $('.o_footer').offset().top,
            hH = $('.o_footer').outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();
        if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)){
           $('#o_shop_collapse_category').hide();
           console.log("hhhhhh");
        } else {
           $('#o_shop_collapse_category').show();
           console.log("sssssss");
        }
     });

});
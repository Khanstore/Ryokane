odoo.define('fl_auth_signup.signup_signin_tab', function (require) {

    "use strict";
    
    $(document).ready(function(){
        $('#sbmt').prop('disabled', true);
        $('#name').prop('readonly', true);
        $("#accept").click(function() {
            $("#sbmt").attr("disabled", !this.checked);
          });
          
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
        if (window.navigator.userAgent.indexOf("Mobile") > -1) { 
            $('.custom_category').hide();
            console.log("mobl");
            $('#o_shop_collapse_category').hide();

        }  
        else{
            console.log("desk");
        }
    
    });

    $(window).scroll(function() {
        console.log("inite88888");
        var hT = $('#footer').offset().top,
            hH = $('o_footer').outerHeight(),

            hT1 = $('.s_text_block').offset().top,
            hH1 = $('.s_text_block').outerHeight(),
            
            hT2 = $('.s_features').offset().top,
            hH2 = $('.s_features').outerHeight(),
             
            wH = $(window).height(),
            wS = $(this).scrollTop();
        if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)){
           $('#o_shop_collapse_category').hide();
           console.log("hhhhhh");
        }
        else if (wS > (hT1+hH1-wH) && (hT1 > wS) && (wS+wH > hT1+hH1)){
            $('#o_shop_collapse_category').hide();
            console.log("hhhhhh111");
         }
         else if (wS > (hT2+hH2-wH) && (hT2 > wS) && (wS+wH > hT2+hH2)){
            $('#o_shop_collapse_category').hide();
            console.log("hhhhhh111");
         }
        else {
           $('#o_shop_collapse_category').show();
           console.log("sssssss");
        }
        
     });



});
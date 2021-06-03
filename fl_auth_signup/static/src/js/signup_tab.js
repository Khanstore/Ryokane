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
    
    });


});
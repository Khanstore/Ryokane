$(document).ready(function() {
 /* Copyright (c) 2018-Present Webkul Software Pvt. Ltd. (<https://webkul.com/>) */
/* See LICENSE file for full copyright and licensing details. */
// var sync1 = $("#sync1");
// var sync2 = $(".owl-carousel");
$(window).on('load',function() {
      console.log("************uuuuuuuuuu***************");
      $(".owl-carousel").owlCarousel({
        // items : 5,
        loop:true,
        margin: 10,
        // dots: true,
        // lazyLoad: true,
        // autoplay: true,
        responsiveClass: true,
        responsiveBaseElement: 'body',
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 5,
                nav:true,
                loop:false
            }
        }
      });
      
    });
//       function syncPosition(el){
//         var current = this.currentItem;
//         $("#also-bought-products")
//           .find(".owl-item")
//           .removeClass("synced")
//           .eq(current)
//           .addClass("synced")
//         if($("#also-bought-products").data("owlCarousel") !== undefined){
//           center(current)
//         }

//       }

//       function center(number){
//         var sync2visible = sync2.data("owlCarousel").owl.visibleItems;

//         var num = number;
//         var found = false;
//         for(var i in sync2visible){
//           if(num === sync2visible[i]){
//             var found = true;
//           }
//         }

//         if(found===false){
//           if(num>sync2visible[sync2visible.length-1]){
//             sync2.trigger("owl.goTo", num - sync2visible.length+2)
//           }else{
//             if(num - 1 === -1){
//               num = 0;
//             }
//             sync2.trigger("owl.goTo", num);
//           }
//         } else if(num === sync2visible[sync2visible.length-1]){
//           sync2.trigger("owl.goTo", sync2visible[1])
//         } else if(num === sync2visible[0]){
//           sync2.trigger("owl.goTo", num-1)
//         }
//       }


});
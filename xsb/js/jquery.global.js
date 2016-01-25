

// 返回顶部
$(function(){
$(window).scroll(function(){ 
var scrollt = document.body.scrollTop+document.documentElement.scrollTop;  
if( scrollt >100 ){   
$(".returnTop").fadeIn(300);      
}else{      
$(".returnTop").stop().fadeOut(300);    
}
});

$(".returnTop").click(function(){
$("html,body").animate({scrollTop:"0px"},300);
});
  });
function setTab(name,cursel,n){ 
for(i=1;i<=n;i++){ 
var menu=document.getElementById(name+i); 
var con=document.getElementById("con_"+name+"_"+i); 
menu.className=i==cursel?"hover":""; 
con.style.display=i==cursel?"block":"none"; 
} 
}

$(function () {
    $('.photo-news').hover(function () {
        $('a.prev', $('.photo-news')).show();
        $('a.next', $('.photo-news')).show();
    }, function () {
        $('a.prev', $('.photo-news')).hide();
        $('a.next', $('.photo-news')).hide();
    }).slides({
        preload: true,
        preloadImage: 'images13/loading_24X24.gif',
        play: 5000,
        pause: 2500,
        hoverPause: true
    });
    if (p5w.ie6) {
        p5w.runJs('http://www.p5w.net/scripts/DD_belatedPNG_0.0.8a-min.js', function () {
            DD_belatedPNG.fix('a.prev img,a.next img');
        });
    }
    //easyloader.theme = "metro";
    //using(['messager'], function () { });
});

$(document).ready(function() {	
	$(".xgzt-content").jCarouselLite({
		auto: 3500,
		speed: 800,
		visible: 7,
		scroll: 3,
		onMouse: true,
		btnNext: "#xgzt-arrow-next",
        btnPrev: "#xgzt-arrow-prev"
	});
});

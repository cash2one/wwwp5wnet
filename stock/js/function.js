function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}

$(document).ready(function() {
    $('.photo-news1').hover(function () {
        $('a.prev', $('.photo-news1')).show();
        $('a.next', $('.photo-news1')).show();
    }, function () {
        $('a.prev', $('.photo-news1')).hide();
        $('a.next', $('.photo-news1')).hide();
    }).slides({
        preload: true,
        preloadImage: '/images13/loading_24X24.gif',
        play: 0,
        pause: 0,
        hoverPause: true
    });
	
	$(".mag-content").jCarouselLite({
		auto: 3500,
		speed: 800,
		visible: 7,
		scroll: 3,
		btnNext: "#mag-arrow-next",
        btnPrev: "#mag-arrow-prev",
		onMouse: true
	});

	$(".top_brand_zone_content").jCarouselLite({
		auto: 3500,
		speed: 800,
		visible: 5,
		scroll: 3,
		onMouse: true
	});
	
	if (Base.is_ie6) {
		var st;
		$(window).scroll(function (){
			st = $(document).scrollTop();
			var offsetTop = 170 + st;
			$(".weixinpic,.weixinpic2").css("top", offsetTop);
		}).resize(function (){
			st = $(document).scrollTop();
			var offsetTop = 170 + st;
			$(".weixinpic,.weixinpic2").css("top", offsetTop);
		});
	};
	
	$('.clstxt a').bind("click",function(){
		$(this).parent().parent().hide();
	});

	$('.adcls img').bind("click",function(){
		$(this).parent().parent().hide();
	});
});
$(document).ready(function () {
    $("#content_xggz").jCarouselLite({
        auto: null,//7000,
        speed: 800,
        visible: 2,
        scroll: 1,
        vertical: true,
        onMouse: true,
        direction: true,
        btnNext: "#xggz_next",
        btnPrev: "#xggz_prev"
    });
    $('#con_the_2').show();
    $("#content_xggz_2").jCarouselLite({
        auto: 7000,
        speed: 800,
        visible: 2,
        scroll: 1,
        vertical: true,
        onMouse: true,
        direction: true,
        btnNext: "#xggz_next_2",
        btnPrev: "#xggz_prev_2"
    });
    $('#con_the_2').hide();
    $('#con_the_1').show();
});
/*
$(document).ready(function () {
    $("#content_xggz").jCarouselLite({
        auto: 7000,
        speed: 800,
        visible: 2,
        scroll: 2,
        vertical: true,
        onMouse: true,
        direction: true,
        btnNext: "#xggz_next",
        btnPrev: "#xggz_prev"
    });
});*/
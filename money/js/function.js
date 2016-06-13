function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}

$(document).ready(function(){
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
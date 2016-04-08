$(function(){
	$("#frame_yes").attr("src", "http://www.p5w.net/stock/cwqz/y/").load(function(){
		var height = $(this).contents().find(".left").height() + 10;
		$(this).height(height < 600 ? 600 : height);
	});
	$("#frame_no").attr("src", "http://www.p5w.net/stock/cwqz/n/").load(function(){       
		var height = $(this).contents().find(".left").height() + 10;
		$(this).height(height < 600 ? 600 : height);
	});
});

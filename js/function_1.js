function setTab(name,cursel,n){ 
for(i=1;i<=n;i++){ 
var menu=document.getElementById(name+i); 
var con=document.getElementById("con_"+name+"_"+i); 
menu.className=i==cursel?"hover":""; 
con.style.display=i==cursel?"block":"none"; 
}
}

$(document).ready(function() {
	var rel,rel2,idx;
	$('.qa-sw img').bind("click",function(){
		$('.qa-sw img').each(function(i, e) {
			rel  = $(e).attr('rel');
			rel2 = $(e).attr('rel2');
			$(e).attr('src',''+rel+'');
			$('#con_newreply_' + (++i)).hide();
		});
		rel2 = $(this).attr('rel2');
		$(this).attr('src',''+rel2+'');
		idx = $('.qa-sw img').index($(this));
		$('#con_newreply_' + (++idx)).show();
	});
});

/**/
$(document).ready(function() {	
	$(".newshare-content").jCarouselLite({
		auto: 3500,
		speed: 800,
		visible: 4,
		scroll: 2,
		onMouse: true,
		btnNext: "#newshare-arrow-next",
        btnPrev: "#newshare-arrow-prev"
	});
});

$(document).ready(function() {	
	$(".mag-content").jCarouselLite({
		auto: 3500,
		speed: 800,
		visible: 7,
		scroll: 3,
		onMouse: true,
		btnNext: "#mag-arrow-next",
        btnPrev: "#mag-arrow-prev"
	});
});
/*
$(document).ready(function() {	
	$(".hotspot-content").jCarouselLite({
		auto: 3500,
		speed: 800,
		visible: 4,
		scroll: 1,
		onMouse: true,
		btnNext: "#hot-spot-next",
        btnPrev: "#hot-spot-prev"
	});
});
*/
function displayimg(){
	$("#xfAdLayerBG").slideUp("slow");
}

function xfclosediv(id){
	var layerID = 'xfAdLayer' + id;
	$("#"+layerID).slideUp("slow");
}

$(document).ready(function(e) {
    $("#xfAdLayerBG").slideDown("slow");
	setTimeout("displayimg()",10000);
});

$(document).ready(function(){
	 if (p5w.ie6) {
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
	
	var l1 = $("#xfAdLayerL1").height() + 20;
	$(window).scroll(function (){
		var offsetTop = $(document).scrollTop() + $(window).height() - l1 +"px";
		$("#xfAdLayerL1").animate({top : offsetTop }, 20);
	}).resize(function (){
		var offsetTop = $(document).scrollTop() + $(window).height() - l1 +"px";
		$("#xfAdLayerL1").animate({top : offsetTop }, 20);
	});
	
	var r1 = $("#xfAdLayerR1").height() + 20;
	$(window).scroll(function (){
		var offsetTop = $(document).scrollTop() + $(window).height() - r1 +"px";
		$("#xfAdLayerR1").animate({top : offsetTop }, 20);
	}).resize(function (){
		var offsetTop = $(document).scrollTop() + $(window).height() - r1 +"px";
		$("#xfAdLayerR1").animate({top : offsetTop }, 20);
	});
	
	var l2 = $("#xfAdLayerL2").height() + 135;
	$(window).scroll(function (){
		var offsetTop = $(document).scrollTop() + $(window).height() - l2 +"px";
		$("#xfAdLayerL2").animate({top : offsetTop }, 20);
	}).resize(function (){
		var offsetTop = $(document).scrollTop() + $(window).height() - l2 +"px";
		$("#xfAdLayerL2").animate({top : offsetTop }, 20);
	});
	
	var r2 = $("#xfAdLayerR2").height() + 135;
	$(window).scroll(function (){
		var offsetTop = $(document).scrollTop() + $(window).height() - r2 +"px";
		$("#xfAdLayerR2").animate({top : offsetTop }, 20);
	}).resize(function (){
		var offsetTop = $(document).scrollTop() + $(window).height() - r2 +"px";
		$("#xfAdLayerR2").animate({top : offsetTop }, 20);
	});
	
	$('.clstxt a').bind("click",function(){
		$(this).parent().parent().hide();
	});

	$('.adcls img').bind("click",function(){
		$(this).parent().parent().hide();
	});

});

(function($){

	$.fn.kxbdMarquee = function(options){
		var opts = $.extend({},$.fn.kxbdMarquee.defaults, options);
		
		return this.each(function(){
			var $marquee = $(this);//����Ԫ������
			var _scrollObj = $marquee.get(0);//����Ԫ������DOM
			var scrollW = $marquee.width();//����Ԫ�������Ŀ��
			var scrollH = $marquee.height();//����Ԫ�������ĸ߶�
			var $element = $marquee.children(); //����Ԫ��
			var $kids = $element.children();//������Ԫ��
			var scrollSize=0;//����Ԫ�سߴ�
			var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1:0;//�������ͣ�1���ң�0����

			//��ֹ������Ԫ�رȹ���Ԫ�ؿ��ȡ����ʵ�ʹ�����Ԫ�ؿ��
			$element.css(_type?'width':'height',10000);
			//��ȡ����Ԫ�صĳߴ�
			if (opts.isEqual) {
				scrollSize = $kids[_type?'outerWidth':'outerHeight']() * $kids.length;
			}else{
				$kids.each(function(){
					scrollSize += $(this)[_type?'outerWidth':'outerHeight']();
				});
			}
			//����Ԫ���ܳߴ�С�������ߴ磬������
			if (scrollSize<(_type?scrollW:scrollH)) return; 
			//��¡������Ԫ�ؽ�����뵽����Ԫ�غ󣬲��趨����Ԫ�ؿ��
			$element.append($kids.clone()).css(_type?'width':'height',scrollSize*2);
			
			var numMoved = 0;
			function scrollFunc(){
				var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
				if (opts.loop > 0) {
					numMoved+=opts.scrollAmount;
					if(numMoved>scrollSize*opts.loop){
						_scrollObj[_dir] = 0;
						return clearInterval(moveId);
					} 
				}
				if(opts.direction == 'left' || opts.direction == 'up'){
					var newPos = _scrollObj[_dir] + opts.scrollAmount;
					if(newPos>=scrollSize){
						newPos -= scrollSize;
					}
					_scrollObj[_dir] = newPos;
				}else{
					var newPos = _scrollObj[_dir] - opts.scrollAmount;
					if(newPos<=0){
						newPos += scrollSize;
					}
					_scrollObj[_dir] = newPos;
				}
			};
			//������ʼ
			var moveId = setInterval(scrollFunc, opts.scrollDelay);
			//��껮��ֹͣ����
			$marquee.hover(
				function(){
					clearInterval(moveId);
				},
				function(){
					clearInterval(moveId);
					moveId = setInterval(scrollFunc, opts.scrollDelay);
				}
			);
			
			//���Ƽ����˶�
			if(opts.controlBtn){
				$.each(opts.controlBtn, function(i,val){
					$(val).bind(opts.eventA,function(){
						opts.direction = i;
						opts.oldAmount = opts.scrollAmount;
						opts.scrollAmount = opts.newAmount;
					}).bind(opts.eventB,function(){
						opts.scrollAmount = opts.oldAmount;
					});
				});
			}
		});
	};
	$.fn.kxbdMarquee.defaults = {
		isEqual:true,//���й�����Ԫ�س����Ƿ����,true,false
		loop: 0,//ѭ������������0ʱ����
		direction: 'left',//��������'left','right','up','down'
		scrollAmount:1,//����
		scrollDelay:10,//ʱ��
		newAmount:3,//���ٹ����Ĳ���
		eventA:'mousedown',//����¼�������
		eventB:'mouseup'//����¼���ԭ��
	};
	
	$.fn.kxbdMarquee.setDefaults = function(settings) {
		$.extend( $.fn.kxbdMarquee.defaults, settings );
	};
	
})(jQuery);

$(document).ready(function(){
	$('.hotspot-content').kxbdMarquee({
		isEqual:false,
		direction:'left',
		scrollAmount:1,//����
		scrollDelay:30,//ʱ��
		newAmount:0,
		eventA:'mouseenter',
		eventB:'mouseleave'
	});
	$('#hot-spot-prev').click(function(e) {
        $('.hotspot-content').kxbdMarquee({
			isEqual:false,
			direction:'right',
			scrollAmount:1,//����
			scrollDelay:30,//ʱ��
			newAmount:0,
			eventA:'mouseenter',
			eventB:'mouseleave'
		});
    });
	$('#hot-spot-next').click(function(e) {
        $('.hotspot-content').kxbdMarquee({
			isEqual:false,
			direction:'left',
			scrollAmount:1,//����
			scrollDelay:30,//ʱ��
			newAmount:0,
			eventA:'mouseenter',
			eventB:'mouseleave'
		});
    });
});

function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}

function topso() {
    var sq = $('#sq').val();
    if (sq == "") {
        alert("�����������ؼ��ʣ�");
        return false;
    }
    window.open("/so.html?sq=" + encodeURIComponent(sq));
    return false;
}

$(document).ready(function() {
	$('.photo-news-zt').hover(function () {
	    $('a.prev', $('.photo-news-zt')).show();
	    $('a.next', $('.photo-news-zt')).show();
    }, function () {
        $('a.prev', $('.photo-news-zt')).hide();
        $('a.next', $('.photo-news-zt')).hide();
    }).slides({
        preload: true,
        preloadImage: 'images13/loading_24X24.gif',
        play: 0,
        pause: 0,
        hoverPause: true
    });
    if (Base.is_ie6) {
        Base.runJs('http://www.p5w.net/scripts/DD_belatedPNG_0.0.8a-min.js', function () {
            DD_belatedPNG.fix('a.prev img,a.next img');
        });
    }
	
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

$(document).ready(function () {
    $('#con_the_2').show();
    $("#content_xggz_2").jCarouselLite({
        auto: 7000,//null,
        speed: 800,
        visible: 5,
        scroll: 1,
        vertical: true,
        onMouse: true,
        direction: true,
        btnNext: "#xggz_next_2",
        btnPrev: "#xggz_prev_2"
    });
    $('#con_the_2').hide();

    var liCount = $("#content_xggz ul").find("li").size();
    try {
        if (window.console && window.console.log) {
            console.log("liCount: " + liCount);
        }
    } catch (e) {
    }
    if (liCount > 5) {
        $("#content_xggz").jCarouselLite({
            auto: 7000,
            speed: 800,
            visible: 5,
            scroll: 1,
            vertical: true,
            onMouse: true,
            direction: true,
            btnNext: "#xggz_next",
            btnPrev: "#xggz_prev"
        });
    } else {
        $("#content_xggz").jCarouselLite({
            auto: null,
            speed: 800,
            visible: 5,
            scroll: 1,
            vertical: true,
            onMouse: true,
            direction: true,
            btnNext: "#xggz_next",
            btnPrev: "#xggz_prev"
        });
    }
    $('#con_the_1').show();
});
/**/
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
	if (Base.is_ie6) {
		var st;
		$(window).scroll(function (){
			st = $(document).scrollTop();
			var offsetTop = 170 + st;
			$(".duilianl,.duilianr").css("top", offsetTop);
		}).resize(function (){
			st = $(document).scrollTop();
			var offsetTop = 170 + st;
			$(".duilianl,.duilianr").css("top", offsetTop);
		});
	};
	if (Base.is_ie6) {
	    var st;
	    $(window).scroll(function () {
	        st = $(document).scrollTop();
	        var offsetTop = 170 + st;
	        $(".weixinpic,.weixinpic2").css("top", offsetTop);
	    }).resize(function () {
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

(function ($) {
    $.fn.FloatLayer = function (option) {
        option = $.extend({}, $.fn.FloatLayer.option, option);
        var a = $(option.min, this);
        var b = $(option.close, this);
        var c = $(option.content, this);
        var timer = null;
        var u = this;
        var e = function (t) {
            var w = t;
            var y = $(window).height() - u.height();
            if (Base.is_ie6) {
                y += $(window).scrollTop();
            }
            w.css({ right: 0, top: y });
            return w;
        };
        var h = $(window).height() - u.height();
        if (Base.is_ie6) {
            u.css({ position: 'absolute', zIndex: option.zIndex, right: 0, top: h });
        } else {
            u.css({ position: 'fixed', zIndex: option.zIndex, right: 0, top: h });
        }
        e(u);
        $(window).bind("resize", function () { e(u) });
        $(window).bind("scroll", function () { e(u) });
        b.click(function () {
            //window.open("http://www.p5w.net/tradingday/xcfyt/");
            if (typeof option.onclose == "function") {
                option.onclose();
            }
            u.remove()
        }
		);

        u.show();
        return this;
    };
    $.fn.FloatLayer.option = {
        min: '.min',
        close: '.close',
        content: '.contentInner',
        isMax: true,
        zIndex: 9999,
        onclose: null
    };
})(jQuery);

$(document).ready(function () {
    $('#miaov_float_layer').FloatLayer();
});

$(document).ready(function () {
    var url = 'http://www.p5w.net/jsdata/lyhd.json';
    var lyhtml = '';
    $.getJSON(url, function (data) {
        if (data.status != '200') {
            return;
        }
        $.each(data.items, function (i, item) {
            if (i < 9) {
                var title, link, beginTime, endTime;
                title = item.title
                link = item.url;
                beginTime = item.begin_time.substr(5);
                endTime = item.end_time.substr(11, 5);

                lyhtml += '<li>��<a href="' + link + '" target="_blank" title="' + title + '">[' + beginTime + '-' + endTime + ']' + title.subCHString(0, 30) + '</a></li>';
            }
        });
        $('#lyhd').html(lyhtml);
    });
});

String.prototype.strLen = function () {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0) len += 2; else len++;
    }
    return len;
}
//���ַ�������ַ������浽������
String.prototype.strToChars = function () {
    var chars = new Array();
    for (var i = 0; i < this.length; i++) {
        chars[i] = [this.substr(i, 1), this.isCHS(i)];
    }
    String.prototype.charsArray = chars;
    return chars;
}

//�ж�ĳ���ַ��Ƿ��Ǻ���
String.prototype.isCHS = function (i) {
    if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0)
        return true;
    else
        return false;
}
//��ȡ�ַ�������start�ֽڵ�end�ֽڣ�
String.prototype.subCHString = function (start, end) {
    var len = 0;
    var str = "";
    this.strToChars();
    for (var i = 0; i < this.length; i++) {
        if (this.charsArray[i][1])
            len += 2;
        else
            len++;
        if (end < len)
            return str;
        else if (start < len)
            str += this.charsArray[i][0];
    }
    return str;
}
//��ȡ�ַ�������start�ֽڽ�ȡlength���ֽڣ�
String.prototype.subCHStr = function (start, length) {
    return this.subCHString(start, start + length);
}
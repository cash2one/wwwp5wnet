
Date.prototype.format=function(fmt){
	var o={
		"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3), "S":this.getMilliseconds()
	};
	if(/(y+)/.test(fmt))fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
	for(var k in o)if(new RegExp("("+k+")").test(fmt))fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+o[k]).substr((""+o[k]).length)));
	return fmt
};
String.prototype.replaceAll=function(s1,s2){
	return this.replace(new RegExp(s1,"gm"),s2)
};
String.prototype.len=function(){
	return this.replace(/[^\x00-\xff]/g,"aa").length
};
String.prototype.sub=function(n,o){
	var r=/[^\x00-\xff]/g;
	if(this.replace(r,"mm").length<=n)return this;
	var p=o?o:"";
	var m=Math.floor(n/2);
	for(var i=m;i<this.length;i++){
		if(this.substr(0,i).replace(r,"mm").length>=n){
			var rs=this.substr(0,i)+p;
			return rs
		}
	}
	return this
};
function setCookie(name,value,expires,path,domain){
	var str=name+"="+escape(value);
	if(expires){
		if(expires=='never'){
			expires=100*365*24*60
		}
		var exp=new Date();
		exp.setTime(exp.getTime()+expires*60*1000);
		str+="; expires="+exp.toGMTString()
	}
	if(path){
		str+="; path="+path
	}
	if(domain){
		str+="; domain="+domain
	}
	document.cookie=str
}
function getCookie(name){
	var tmp,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)","gi");
	tmp=reg.exec(unescape(document.cookie));
	if(tmp){
		return(tmp[2])
	}
	return null
}
function chgFontSize(obj,size){
	setCookie("NewsContent_FontSize",size,9999);
	$(obj).css({
		'font-size':size+'px'
	});
	$(obj+' p').css({
		'font-size':size+'px'
	})
}
$(function(){
	$('div.source div').remove();
	$('div.zwright div.news').eq(0).addClass('first');
	$('div.footer-left').html('<br />经营许可证号 粤B2-20050249号  信息传播视听节目许可证号：1903034<br />全景网络有限公司版权所有  未经全景网书面授权，请勿转载内容或建立镜像，违者依法必究！<br />Copyright&copy;2000-2013 Panorama Network Co., Ltd, All Rights Reserved<br />');
	var trs_editor=$('DIV.TRS_Editor');
	trs_editor.removeClass('TRS_Editor');
	$('style',trs_editor).eq(0).remove();
	$('.text br').each(function(){
		$(this).after($('<p></p>')).remove()
	});
	var nbpage=$('.number');
	var curs=$('.current',nbpage);
	if(curs.length<=0){
		nbpage.remove()
	}
	
	
	
	
	var goToTop=function(){
		var html='<div class="gototop-wrap"><div id="gototop_btn" class="gototop"><a style="display:none;" title="返回顶部" href="javascript:void(0);" onfocus="this.blur();" class="toplink">TOP</a></div></div>';
		var win=$(window);
		var side=$(html).appendTo($('body'));
		var topBtn=$('#gototop_btn a');
		var resizeClz='gototop-wrap-resize';
		topBtn.click(function(){
			if(!p5w.ie6){
				$('html,body').animate({
					scrollTop:0
				}
				,120)
			}
			else{
				document.documentElement.scrollTop=0
			}
		});
		var sideFun=function(){
			var st=$(document).scrollTop(),winh=win.height();
			(st>0)?topBtn.fadeIn():topBtn.fadeOut()
		};
		if(p5w.ie6){
			sideFun=function(){
				var st=$(document).scrollTop(),winh=win.height();
				(st>0)?topBtn.fadeIn():topBtn.fadeOut();
				side.css("top",st+winh-225)
			}
		};
		var resize=function(){
			var winw=win.width();
			if(winw<1074){
				side.addClass(resizeClz)
			}
			else{
				side.removeClass(resizeClz)
			}
		};
		win.bind('resize',resize).bind('scroll',sideFun);
		resize();
		sideFun()
	};
	goToTop()
});

$(function (){
	var trs_editor=$('DIV.TRS_Editor');
    trs_editor.removeClass('TRS_Editor');
    $('style', trs_editor).eq(0).remove();
	$('#_Custom_V6_Style_').remove();
	//替换正文中的<BR>为<p>
	$('.wz br').each(function() {
	    $(this).after($('<p></p>')).remove();
    });
	//document.writeln("<a class=\"bshareDiv\" href=\"http://www.bshare.cn/share\">分享按钮</a><script type=\"text/javascript\" charset=\"utf-8\" src=\"http://static.bshare.cn/b/buttonLite.js#uuid=79da6bbc-9b75-4234-b305-7a29bcdde247&amp;style=3&amp;fs=4&amp;textcolor=#fff&amp;bgcolor=#F60&amp;text=分享到\"></scr"+"ipt>");
});
function parseCode(code) {
    var p = code.substr(0, 2);
    if (p == '00' || p == '30' || p == '90') {
        return 'sz' + code;
    }
    if (p == '60') {
        return 'sh' + code;
    }
}

function related(stockcode) {
	var webUrl = '/';
	var jsonUrl = webUrl+'stocknews/json/'+stockcode+'.json';
	
	var stockname;
	loadJs('http://www.p5w.net/jsjdpn/'+stockcode+'.js',
		function(){
			try {
				var qgqp=eval('hq'+stockcode);
				var qgqptext = qgqp.hqlist[0].jdpn;
				var qgqpdate = qgqp.hqlist[0].hqdate;
				stockname = qgqp.hqlist[0].zqjc;
				qgqpdate = qgqpdate.sub(10,'').replace('.','-').replace('.','-');
				
				$('<li><a href="http://data.p5w.net/stock/qgqp.php?code=' + parseCode(stockcode) + '" target="_blank">' + qgqptext + '</a>\u66f4\u65b0\u65e5\u671f\uff1a' + qgqpdate + '</li>').appendTo($('#qgqp ul'));
			} catch(e){}
		},
		'gb2312'
	);

	$.getJSON(jsonUrl, function (data) {
		var name = data.name || stockname;
		$('.cname').html(name);
		$(data.lsgg).each(function(i, e) {
		    var pid = e.s1.replace(/.*(\/|\\)/, "").replace(/(\.\w+)$/, "");
            //var ggUrl='http://www.cninfo.com.cn/'+e.link;
			var ggUrl='http://www.p5w.net/stock/zqgg/contents.htm?id=' + pid + '&f=' + stockcode;
			var pubdate = e.s4 || '';
			pubdate = pubdate.replaceAll('-','/');
			var title = e.s3 || '';
			title = title.sub(71,"...");
			$('<li><a href="'+ggUrl+'" target="_blank">' + title + '</a>'+pubdate.replaceAll('-','/')+'</li>').appendTo($('#con_one_2 ul'));
        });
		$('<span class="ggmore"><a href="http://data.p5w.net/stock/lsgg.php?code=' + parseCode(stockcode) + '" target="_blank">\u66f4\u591a\u516c\u544a\u2026</a></span>').appendTo($('#con_one_2'));

		var pjbd = new Array();
		pjbd['H'] = '\u8c03\u9ad8\u4e3a';
		pjbd['K'] = '\u7ef4\u6301';
		pjbd['L'] = '\u8c03\u4f4e\u4e3a';
		pjbd['U'] = '\u672a\u77e5';

		var tzpjhtml = '<table width="100%" border="0" align="center" cellpadding="0" cellspacing="1">';
		tzpjhtml += '  <tr>';
		tzpjhtml += '    <th width="16%">\u8bc4\u7ea7\u65e5\u671f</th>';
		tzpjhtml += '    <th width="16%">\u8bc1\u5238\u4ee3\u7801</th>';
		tzpjhtml += '    <th width="16%">\u516c\u53f8\u7b80\u79f0</th>';
		tzpjhtml += '    <th width="27%">\u7814\u7a76\u673a\u6784\u540d\u79f0</th>';
		tzpjhtml += '    <th>\u6295\u8d44\u8bc4\u7ea7</th>';
		tzpjhtml += '  </tr>';
		
		$(data.fxpj).each(function(i, e) {
			if (i>=5) {
				return false;
			}
			var date = e.date || '';
			var code = data.code || '';
			var orgname = e.orgname || '';               
			var pj1 = e.F003V || '';
			var pj2 = e.F004V || '';
			var bd = e.F007C || '';
			if (pj1.length>0) {
				tzpjhtml += '  <tr>';
				tzpjhtml += '    <td>'+date+'</td>';
				tzpjhtml += '    <td><a href="http://data.p5w.net/stock/fxpj.php?code=' + parseCode(code) + '" target="_blank">' + code + '</a></td>';
				tzpjhtml += '    <td><a href="http://data.p5w.net/stock/fxpj.php?code=' + parseCode(code) + '" target="_blank">' + name + '</a></td>';
				tzpjhtml += '    <td>'+orgname+'</td>';
				if (bd=='K') {
				    tzpjhtml += '    <td><a href="http://data.p5w.net/stock/fxpj.php?code=' + parseCode(code) + '" target="_blank">' + pjbd[bd] + ' "' + pj2 + '"</a></td>';
				}
				else {
				    tzpjhtml += '    <td><a href="http://data.p5w.net/stock/fxpj.php?code=' + parseCode(code) + '" target="_blank">"' + pj2 + '" ' + pjbd[bd] + ' "' + pj1 + '"</a></td>';
				}
				tzpjhtml += '  </tr>';
			} 
			
        });
		tzpjhtml += '</table>';
		$('#tzpj').html(tzpjhtml);


	});
}

$(function(){
	var code = $('.rq-tab-1 input').attr('value');
	related(code);
});
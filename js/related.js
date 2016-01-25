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
    var jsonUrl = 'http://data.p5w.net/stock/p5wstock.php?callback=?&m=all&count=10&code=' + parseCode(stockcode);
    var stockname;

    $.getJSON(jsonUrl, function (data) {
        stockname = data.qgqp[0].s2 || stockname;
        $(data.lsgg).each(function (i, e) {
            var pid = e.s1;
            var ggUrl = 'http://www.p5w.net/stock/zqgg/contents.htm?id=' + pid + '&f=' + stockcode;
            var pubdate = e.s4 || '';
            var title = e.s3 || '';
            title = title.sub(71, "...");
            $('<li><a href="' + ggUrl + '" target="_blank">' + title + '</a>' + pubdate.replaceAll('-', '/') + '</li>').appendTo($('#con_one_2 ul'));
        });
        $('<span class="ggmore"><a href="http://data.p5w.net/stock/lsgg.php?code=' + parseCode(stockcode) + '" target="_blank">\u66f4\u591a\u516c\u544a\u2026</a></span>').appendTo($('#con_one_2'));

        var qgqpLinkMore = 'http://data.p5w.net/stock/qgqps.php';
        var qgqptext = data.qgqp[0].s3;
        var qgqpdate = data.qgqp[0].s4;
        $('<li><a href="http://data.p5w.net/stock/qgqp.php?code=' + parseCode(stockcode) + '" target="_blank">' + qgqptext + '</a>\u66f4\u65b0\u65e5\u671f\uff1a' + qgqpdate + '</li>').appendTo($('#qgqp ul'));

        var pjbd = new Array();//'H-调高;K-维持;L-调低;U-未知
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

        var tzpjLink = 'http://data.p5w.net/stock/fxpj.php?code=' + parseCode(stockcode);
        $('.cname').html(stockname);
        $('.cname').siblings('.more').eq(0).find('a').attr('href', qgqpLinkMore);
        $('.cname').siblings('a').attr('href', tzpjLink);
        $(data.tzpj).each(function (i, e) {
            if (i >= 5) {
                return false;
            }
            var date = e.s1 || '';
            var orgname = e.s2 || '';
            var pj1 = e.s4 || '';
            var pj2 = e.s5 || '';
            var first = e.s6 || '';
            var bd = e.s7 || '';

            tzpjhtml += '  <tr>';
            tzpjhtml += '    <td>' + date + '</td>';
            tzpjhtml += '    <td><a href="' + tzpjLink + '" target="_blank">' + stockcode + '</a></td>';
            tzpjhtml += '    <td><a href="' + tzpjLink + '" target="_blank">' + stockname + '</a></td>';
            tzpjhtml += '    <td>' + orgname + '</td>';
            if (first == '1') {
                var pjFirst = '\u9996\u6b21\u8bc4\u7ea7';//'0-不是首次评级，1-是首次评级，2-未公布
                tzpjhtml += '    <td><a href="' + tzpjLink + '" target="_blank">' + pjFirst + ' "' + pj1 + '"</a></td>';
            } else {
                if (bd == 'K') {
                    tzpjhtml += '    <td><a href="' + tzpjLink + '" target="_blank">' + pjbd[bd] + ' "' + pj1 + '"</a></td>';
                }
                if (bd == 'H' || bd == 'L') {
                    if (pj2 != null) {
                        tzpjhtml += '    <td><a href="' + tzpjLink + '" target="_blank">"' + pj2 + '" ' + pjbd[bd] + ' "' + pj1 + '"</a></td>';
                    } else {
                        tzpjhtml += '    <td><a href="' + tzpjLink + '" target="_blank">' + pj1 + '</a></td>';
                    }
                }
                if (bd == 'U') {
                    tzpjhtml += '    <td><a href="' + tzpjLink + '" target="_blank">' + pj1 + '</a></td>';
                }
            }
            tzpjhtml += '  </tr>';

        });
        tzpjhtml += '</table>';
        $('#tzpj').html(tzpjhtml);
    });
}

function hotwords() {
    $("a[name='AnchorAddByWCM']").each(
        function () {
            //alert($(this).html());
            $(this).addClass('hotword');
            var quote = '<span id="q_' + $(this).html() + '"></span>';
            $(this).after($(quote));
        }
    );
}

$(function () {
    var code = $('.rq-tab-1 input').attr('value');
    related(code);
    hotwords();
});
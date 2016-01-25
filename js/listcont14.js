document.domain = "p5w.net";

var urls = { "psp": "http://passport.p5w.net", "data": "http://data.p5w.net", "buy": "http://buy.p5w.net" };
var hqServer = "http://hq.p5w.net";
var jsonSrv = "http://www.p5w.net/jsdata/";
var hqUrl = "http://data.p5w.net/stock/index.php?code=";
var irmSrv = "http://irm.p5w.net/";
var ircsSrv = "http://ircs.p5w.net/";

function parseCode(code) {
    var p = code.substr(0, 2);
    if (p == '00' || p == '30' || p == '39') {
        return 'sz' + code;
    }
    if (p == '60') {
        return 'sh' + code;
    }
}

String.prototype.strLen = function () {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0) len += 2; else len++;
    }
    return len;
}
//将字符串拆成字符，并存到数组中
String.prototype.strToChars = function () {
    var chars = new Array();
    for (var i = 0; i < this.length; i++) {
        chars[i] = [this.substr(i, 1), this.isCHS(i)];
    }
    String.prototype.charsArray = chars;
    return chars;
}
//判断某个字符是否是汉字
String.prototype.isCHS = function (i) {
    if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0)
        return true;
    else
        return false;
}
//截取字符串（从start字节到end字节）
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
//截取字符串（从start字节截取length个字节）
String.prototype.subCHStr = function (start, length) {
    return this.subCHString(start, start + length);
}

$(function () {
    qgqpFive();

    $(window.parent.document).find("#inRight").load(function () {
        var main = $(window.parent.document).find("#inRight");
        var mainheight = $('#cInner').height() + 10;
        main.height(mainheight);
        console.log('mainheight:' + mainheight);
    });
    var ch = $("#cInner").height();
    console.log('cInner:' + ch);
});

function qgqpFive() {
    $.getJSON(jsonSrv + "fxpjlistjs.json", function (data) {
        if (data.status == "Y") {
            var html = new Array();
            html.push('<ul>');
            var g = data.zqdmdplist || [];
            $(g).each(function (i) {
                if (i < 5) {
                    var dianping = this.s3.strLen() == 0 ? '---' : this.s3;
                    var yellow = i % 2 == 0 ? ' yellow' : '';
                    html.push('<li class="qp3' + yellow + '"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="qp4' + yellow + '">' + dianping + '</li>');
                }
            });
            html.push('</ul>');
            html.push('<div class="clearfloat"></div>');
            $('#con_qgqp').html(html.join(''));
        }
    });
}

$(function () {
    var xsbADhtml = '<img src="/images14/jdxsb.jpg" width="300" height="250" alt="全景网" /><div class="clearfloat"></div>';

    var parentURL = window.parent.location.href;
    console.log(parentURL);
    if (parentURL.indexOf('/stock/news/xsb/') > 0) {
        $('.ad300x250').first().html(xsbADhtml);
    }
});
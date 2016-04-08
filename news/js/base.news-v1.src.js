$(function () {
    $('.photo-news').hover(function () {
        $('a.prev', $('.photo-news')).show();
        $('a.next', $('.photo-news')).show();
    }, function () {
        $('a.prev', $('.photo-news')).hide();
        $('a.next', $('.photo-news')).hide();
    }).slides({
        preload: true,
        preloadImage: 'images13/loading_24X24.gif',
        play: 5000,
        pause: 2500,
        hoverPause: true
    });
    if (Base.is_ie6) {
        p5w.runJs('http://www.p5w.net/scripts/DD_belatedPNG_0.0.8a-min.js', function () {
            DD_belatedPNG.fix('a.prev img,a.next img');
        });
    }   
    if (typeof bbsdata != "undefined") {
        var ul = $('<ul/>').appendTo($('#bbs-list'));
        $(bbsdata).each(function (i) {
            if (i > 17) return false;
            $('<li><a target="_blank" href="http://bbs.p5w.net/forum.php?mod=viewthread&tid=' + this.tid + '">' + this.subject + '</a></li>').appendTo(ul);
        });
    }
    if (typeof tradingdayData != "undefined") {
        var data = tradingdayData.cjdsylist || [];
        var html = new Array();
        var name = '';
        for (var i = 0; i < data.length && i < 4; i++) {
            var a = data[i];
            html.push('<dt><a href="' + a.url + '" target="_blank" title="' + a.title + '"><img src="' + a.img + '" alt="' + a.title + '" width="105" height="90" /></a></dt>');
            html.push('<dd><h2 class="title"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></h2></dd>');
            html.push('<ul class="title">');
            i++;
            a = data[i];
            name = a.title;
            name = name.strLen() > 45 ? name.subCHStr(0, 45) : name;
            html.push('    <li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + name + '</a></li>');
            i++;
            a = data[i];
            name = a.title;
            name = name.strLen() > 45 ? name.subCHStr(0, 45) : name;
            html.push('    <li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + name + '</a></li>');
            i++;
            a = data[i];
            name = a.title;
            name = name.strLen() > 45 ? name.subCHStr(0, 45) : name;
            html.push('    <li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + name + '</a></li>');
            i++;
            a = data[i];
            name = a.title;
            name = name.strLen() > 45 ? name.subCHStr(0, 45) : name;
            html.push('    <li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + name + '</a></li>');
            html.push('</ul>');
        }
        $('#cjdsySP').html(html.join(''));

        data = tradingdayData.xcfytlist || [];
        html = new Array();
        for (var i = 0; i < data.length && i < 4; i++) {
            var a = data[i];
            html.push('<div class="imgbg"><a href="' + a.url + '" target="_blank" title="' + a.title + '"><img src="' + a.img + '" alt="' + a.title + '" width="260" height="189" /></a></div>');
            html.push('<ul class="title">');
            i++;
            a = data[i];
            name = a.title;
            name = name.strLen() > 45 ? name.subCHStr(0, 45) : name;
            html.push('    <li><a href="' + a.url + '" target="_blank" title="' + a.title + '"><strong>' + name + '</strong></a></li>');
            i++;
            a = data[i];
            name = a.title;
            name = name.strLen() > 45 ? name.subCHStr(0, 45) : name;
            html.push('    <li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + name + '</a></li>');
            i++;
            name = a.title;
            name = name.strLen() > 45 ? name.subCHStr(0, 45) : name;
            a = data[i];
            html.push('    <li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + name + '</a></li>');
            i++;
            name = a.title;
            name = name.strLen() > 45 ? name.subCHStr(0, 45) : name;
            a = data[i];
            html.push('    <li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + name + '</a></li>');
            html.push('</ul>');
        }
        $('#xcfytSP').html(html.join(''));
    }

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

    $('.clstxt a').bind("click", function () {
        $(this).parent().parent().hide();
    });

    $('.adcls img').bind("click", function () {
        $(this).parent().parent().hide();
    });
});

function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
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
$(function () {
    var hqUrl = "http://hangqing.p5w.net/stock/realstock.php?code=";
    easyloader.theme = "metro";
    using(['messager'], function () { });
    if (typeof tradingdayData != "undefined") {
        //新股视频
        var data = tradingdayData.ipogclist || [];
        var html = new Array();
        for (var i = 0; i < data.length && i < 6; i++) {
            var a = data[i];
            html.push('<div class="mod-tw"><div class="mod-img"><a href="' + a.url + '" target="_blank" title="' + a.title + '"><img src="' + a.img + '" alt="' + a.title + '" width="90" height="60" /></a></div>');
            html.push('<div class="mod-text"><p class="mod-lt"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></p>');
            //i++;
            //a = data[i];
            //html.push('<p class="mod-lc"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></p>');
            //i++;
            //a = data[i];
            //html.push('<p class="mod-lc"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></p>');
            html.push('</div></div>');
            html.push('<ul>');
            i++;
            a = data[i];
            html.push('<li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></li>');
            i++;
            a = data[i];
            html.push('<li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></li>');
            i++;
            a = data[i];
            html.push('<li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></li>');
            i++;
            a = data[i];
            html.push('<li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></li>');
            i++;
            a = data[i];
            html.push('<li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></li>');
        }
        $('#lyztSP').html(html.join(''));
    };
    $.getJSON(jsonSrv + "fxpjlistjs.json", function (data) {
        if (data.status == "Y") {          
            //新股数据
            var g = data.xingulist || [];
            var ul = $('#newstockdata');
            var t = $('.tline_title', ul)
            ul.empty().append(t);
            $(g).each(function (i) {
                if (i > 4) return false;
                var b = i % 2 == 0 ? "1" : "2";
                $('<div class="tline_' + b + '"><li class="twa1"><a href="' + hqUrl + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="twa2">' + (this.s3.length == 0 ? '--' : this.s3) + '</li><li class="twa3">' + (this.s4.length == 0 ? '--' : this.s4) + '</li><li class="twa4">' + (this.s5.length == 0 ? '--' : this.s5) + '</li></div>').appendTo(ul);
            });
            //新股行情
            var g = data.xinguhqlist || [];
            var ul = $('#newstockhq');
            var t = $('.tline_title', ul)
            ul.empty().append(t);
            $(g).each(function (i) {
                if (i > 4) return false;
                var b = i % 2 == 0 ? "1" : "2";
                $('<div class="tline_' + b + '"><li class="twa1"><a href="' + hqUrl + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="twa2">' + this.s3 + '</li><li class="twa3">' + this.s4 + '</li><li class="twa4">' + this.s5 + '</li></div>').appendTo(ul);
            });
        }
    });
});



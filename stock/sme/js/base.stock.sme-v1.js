function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}

function parseCode(code) {
    var p = code.substr(0, 2);
    if (p == '00' || p == '30' || p == '39') {
        return 'sz' + code;
    }
    if (p == '60') {
        return 'sh' + code;
    }
}
$(function () {
    var ipoUrl = "http://data.p5w.net/ipo/viewstock.php?q=";
    var hqUrl = "http://data.p5w.net/stock/index.php?code=";
    //指定需要加载行情指数的代码
    stockArr = [{ code: 'sz399005', name: '中小板指' },{ code: 'sz399001', name: '深成指数' }, { code: 'sh000001', name: '上证指数' }, { code: 'sz399006', name: '创业板指' },{ code: 'sh000300', name: '沪深300' }];
    $('.index_main').hqLoader({ stocks: stockArr, chartWidth: 340, chartHeight: 200 });

    $.getJSON(jsonSrv + "stockhqlist.json", function (data) {
        if (data.status == "Y") {           
            //中小板涨幅前10
            var g = data.hqlistA2 || [];
            var ul = $('#con_tyb_1').find('.tline');
            var t = $('.tline_title', ul)
            ul.empty().append(t);
            $(g).each(function (i) {
                if (i > 7) return false;
                var b = i % 2 == 0 ? "1" : "2";
                $('<div class="tline_' + b + '"><li class="twa1">' + this.s1 + '</li><li class="twa2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twa3 red">' + this.s3 + '</li><li class="twa4 red">' + this.s4 + '%</li></div>').appendTo(ul);
            });
            //中小板跌幅前10
            var g = data.hqlistB2 || [];
            var ul = $('#con_tyb_2').find('.tline');
            var t = $('.tline_title', ul)
            ul.empty().append(t);
            $(g).each(function (i) {
                if (i > 7) return false;
                var b = i % 2 == 0 ? "1" : "2";
                $('<div class="tline_' + b + '"><li class="twa1">' + this.s1 + '</li><li class="twa2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twa3 green">' + this.s3 + '</li><li class="twa4 green">' + this.s4 + '%</li></div>').appendTo(ul);
            });
           
        }
    });
    $.getJSON(jsonSrv + "newstocklistjs.json", function (data) {      
        if (data.status == "Y") {
            //中小板新股发行申购提示
            var g = data.newstocksme || [];
            var tb = $('.mt-table');
            var t = $('.mt-head', tb)
            tb.empty().append(t);
            $(g).each(function (i) {
                if (i > 7) return false;
                $('<tr class="mt-line1"><td>' + this.s1 + '</td><td><a href="' + ipoUrl + this.s1 + '" target="_blank">' + this.s2 + '</a></td><td>' + this.s3 + '</td><td>' + this.s4 + '</td><td>' + this.s5 + '</td><td>' + this.s6 + '</td><td>' + this.s7 + '</td><td>' + this.s8 + '</td><td>' + this.s9 + '</td><td><a href="' + this.s10 + '" target="_blank">路演</a></td></tr>').appendTo(tb);
            });
        }
    });
    var loadData = [["http://data.p5w.net/ggs.php?dd=2&flag=2&count=8&callback=?", "smemblatest"]];
    function LoadLatest(i) {
        if (i < loadData.length) {
            $.getJSON(loadData[i][0], function (data) {
                var ul = $('#' + loadData[i][1] + ' ul').empty();
                $(data).each(function (j) {
                    var title = this.s2;
                    title = title.sub(42, "...");
                    var link = 'http://data.p5w.net/t' + this.s1 + '.html';
                    $('<li><a href="' + link + '" target="_blank">' + title + '</a></li>').appendTo(ul)
                });
                if (i < loadData.length) {
                    return LoadLatest(++i);
                } else {
                    return false;
                }
            });
        } else {
            return false;
        }
    }
    LoadLatest(0);
});

$(document).ready(function () {
    $(".mag-content").jCarouselLite({
        auto: 3500,
        speed: 800,
        visible: 7,
        scroll: 3,
        btnNext: "#mag-arrow-next",
        btnPrev: "#mag-arrow-prev"
    });
});

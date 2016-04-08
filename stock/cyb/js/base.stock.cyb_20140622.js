$(function () {
    var ipoUrl = "http://data.p5w.net/ipo/viewstock.php?q=";
    var hqUrl = "http://data.p5w.net/stock/index.php?code=";
    //指定需要加载行情指数的代码
    stockArr = [{ code: 'sz399006', name: '创业板指' },{ code: 'sz399001', name: '深成指数' }, { code: 'sh000001', name: '上证指数' }, { code: 'sz399005', name: '中小板指' }, { code: 'sh000300', name: '沪深300' }];
    $('.index_main').hqLoader({ stocks: stockArr, chartWidth: 340, chartHeight: 200 });
    easyloader.theme = "metro";
    using(['messager'], function () { });
    $.getJSON(jsonSrv + "newstocklistjs.json", function (data) {
        if (data.status == "Y") {
            //中小板新股发行申购提示
            var g = data.newstockcyb || [];
            var tb = $('.mt-table');
            var t = $('.mt-head', tb)
            tb.empty().append(t);
            $(g).each(function (i) {
                if (i > 7) return false;
                $('<tr class="mt-line1"><td>' + this.s1 + '</td><td><a href="' + ipoUrl + this.s1 + '" target="_blank">' + this.s2 + '</a></td><td>' + this.s3 + '</td><td>' + this.s4 + '</td><td>' + this.s5 + '</td><td>' + this.s6 + '</td><td>' + this.s7 + '</td><td>' + this.s8 + '</td><td>' + this.s9 + '</td><td><a href="' + this.s10 + '" target="_blank">路演</a></td></tr>').appendTo(tb);
            });
        }
    });
    var loadData = [["disclosure/sz/cn/szcnlatest.js", "cybmblatest"]];
    function LoadLatest(i) {
        var latestUrl = "http://www.cninfo.com.cn/";
        if (i < loadData.length) {
            //加载公告disclosure/ra/szse.js
            $.getScript(latestUrl + loadData[i][0], function (a) {
                if (typeof szzbAffiches != "undefined") {
                    var ul = $('#' + loadData[i][1] + ' ul').empty();
                    $(szzbAffiches).each(function (i) {
                        //显示8条数据
                        if (i > 7) return false;
                        var title = this[2];
                        title = title.sub(50, "...");
                        $('<li><a href="' + latestUrl + this[1] + '" target="_blank">' + title + '</a></li>').appendTo(ul);
                    });
                    szzbAffiches = null;
                    if (i < loadData.length) {
                        //开始递归调用,因为变量名szzbAffiches相同，必要在加载完一个后再加载另一个板块的数据
                        return LoadLatest(++i);
                    } else {
                        return false;
                    }
                }
            });
        } else { return false; }
    }
    LoadLatest(0);
});



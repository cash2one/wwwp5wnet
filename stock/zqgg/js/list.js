﻿function getQueryString(queryname) {
    var qKeys = {};
    var re = /[?&]([^=]+)(?:=([^&]*))?/g;
    var matchInfo;
    while (matchInfo = re.exec(location.search)) {
        qKeys[matchInfo[1]] = matchInfo[2];
    }
    return typeof (qKeys[queryname]) == 'undefined' ? '' : qKeys[queryname];
}
var jsData = {
    "jgjg": { "js": "disclosure/qtgg/plate/szjysgg_3m.js ", "title": "监管机构公告" },
    "sz": { "js": "disclosure/fulltext/plate/szselatest_24h.js", "title": "深市上市公司公告" },
    "sh": { "js": "disclosure/fulltext/plate/shmblatest_24h.js", "title": "沪市上市公司公告" },
    "sme": { "js": "disclosure/fulltext/plate/cnsmelatest_24h.js", "title": "中小板上市公司公告" },
    "chinext": { "js": "disclosure/fulltext/plate/cyblatest_24h.js", "title": "创业板上市公司公告" }
};
var latestUrl = "http://www.cninfo.com.cn/";
function LoadLatest() {
    this.keyid = '';
    this.key = null;
    this.elm = $('#mblatest');
    this.title = $('#mbtitle');
    this.rows = new Array();
    this.page = getQueryString("page") || 1;
    this.pageSize = 30;
    this.pagtags = 5;
    this.init = function () {
        if (!LoadL.elm) return;
        LoadL.keyid = getQueryString("s");
        LoadL.key = jsData[LoadL.keyid];
        if (LoadL.key == null) {
            LoadL.elm.parent().html('<div class="errorBox"><h2>没有传入数据，不能显示公告列表!</h2><h6>正在为您转到公告首页,<span id="lefttime">5</span>...</h6></div>');
            var lefttime = parseInt($('#lefttime').html());
            var setval= setInterval(function () {
                --lefttime;
                $('#lefttime').html(lefttime);
                if (lefttime <= 0) {
                    document.location.href = "/stock/zqgg/index.htm";
                    clearInterval(setval);
                }
            }, 1000);
            return;
        }
        
        LoadL.title.html(LoadL.key.title);
        var nav = $('div.dd a:last');
        nav.attr('href',nav.attr('href')+'?s='+LoadL.keyid);
        LoadL.page = getQueryString("page") || 1;
        LoadL.elm.html('<div class="loading">正在努力加载...</div>');
        //加载公告disclosure/ra/szse.js
        $.getScript(latestUrl + LoadL.key.js, function (a) {
            if (typeof szzbAffiches != "undefined") {
                LoadL.rows = szzbAffiches;
                LoadL.loadData(LoadL.page);                         
            }
        });
    };
    this.loadData = function (p) {
        LoadL.elm.empty();
        var ul = $('<ul></ul>').appendTo(LoadL.elm);
        if (LoadL.rows.length < 1) return;
        p = parseInt(p) || 1;
        if (p < 1) p = 1;
        if (p > Math.ceil(LoadL.rows.length / LoadL.pageSize)) p = Math.ceil(LoadL.rows.length / LoadL.pageSize);
        var arr = new Array();
        for (var i = 0 + LoadL.pageSize * (p - 1) ; i < LoadL.pageSize * p && i < LoadL.rows.length; i++) {
            var item = LoadL.rows[i];
            var title = item[2];

            var img = '';
            if (item[3] == "PDF") {
                img = '<img src="/images13/Pdf.gif" width="16" height="16" alt="PDF"/>(' + item[4] + 'k)';
            }
            var code = '<span class="code">' + item[0] + '</span>';
            var tc = 'name';
            if (LoadL.keyid == "jgjg") {
                //监管机构公告没有公司代码，需要另处理
                code = '';
                tc = 'name name2';
                title = title.sub(60, "...");
            } else {
                title = title.sub(54, "...");
            }
            var file = item[1];
            var filename = file.replace(/.*(\/|\\)/, "").replace(/(\.\w+)$/, "");
            var f = 0;
            var contentFileName;
            if (LoadL.keyid == 'jgjg') {
                f = 4;
                contentFileName = 'content.htm';
            } else if (LoadL.keyid == 'sz') {
                f = 0;
                f = item[0];
                contentFileName = 'contents.htm';
            } else if (LoadL.keyid == 'sme') {
                f = 2;
                f = item[0];
                contentFileName = 'contents.htm';
            } else if (LoadL.keyid == 'chinext') {
                f = 3;
                f = item[0];
                contentFileName = 'contents.htm';
            } else if (LoadL.keyid == 'sh') {
                f = 1;
                f = item[0];
                contentFileName = 'contents.htm';
            }
            $('<li>' + code + '<span class="' + tc + '"><a href="../'+ contentFileName +'?id='+encodeURIComponent(filename)+'&f='+f+'" target="_blank" title="' + item[2] + '">' + title + '</a>' + img + '</span><span class="time">' + item[6] + '</span></li>').appendTo(ul);
                //$('<li>' + code + '<span class="' + tc + '"><a href="' + latestUrl + item[1] + '" target="_blank" title="' + item[2] + '">' + title + '</a>' + img + '</span><span class="time">' + item[6] + '</span></li>').appendTo(ul);          
            }
        LoadL.createPageBtn(p);
        //$(document).scrollTop(0);
    };
    this.changePage = function (page) {
        LoadL.page = page;
        LoadL.loadData(page);
    };
    this.createPageLink = function (e, g, h, d) {
        var _this = this;
        var b;
        if (g || d) {
            b = $("<a/>").addClass(h).attr("href", "?s=" + LoadL.keyid + "&page=" + g).click(function () { LoadL.changePage(g) }).text(e);
        } else {
            b = $("<span/>").addClass(h).text(e);
        }
        return b;
    };
    this.createPageBtn = function (b) {
        var h, d, g, e, c;
        var l, k, f;
        var n = $('<div/>').addClass('number').appendTo(LoadL.elm);
        c = $('<div/>').addClass('viciao').appendTo(n);
        if (!b) { b = 1; }
        b = parseInt(b);
        d = Math.ceil(LoadL.rows.length / LoadL.pageSize);
        l = b - Math.floor(LoadL.pagtags / 2);
        k = b + Math.floor(LoadL.pagtags / 2);
        f = "disabled";
        if (l < 1) { l = 1; }
        if (k > d) { k = d; }
        c.empty();
        c.append(LoadL.createPageLink("上一页", b > 1 ? (b - 1) : "", f));
        for (g = l; g <= k; g++) {
            if (g == l && l != 1) {
                c.append(LoadL.createPageLink("1", 1, ""));
                if (g - 1 > 1) {
                    c.append($("<span>...</span>"));
                }
            }
            c.append(LoadL.createPageLink(g, g == b ? null : g, g == b ? "current" : ""));
            if (g == k && k != d) {
                if (g + 1 < d) {
                    c.append($("<span>...</span>"));
                }
                c.append(LoadL.createPageLink(d, d, ""));
            }
        }
        c.append(LoadL.createPageLink("下一页", b < d ? b + 1 : "", f));
    };
}

$(function () {   
    LoadL = new LoadLatest();
    LoadL.init();
    //股票代码联想
    bindStockSuggest('query_stock_code', 'query_stock_name', 0);
    $('#btnSearch').click(function () {
        var code = $('#query_stock_code').val().toLowerCase();
        var reg = new RegExp(/^[szsh0-9]{8}$/);
        if (!reg.test(code)) {
            alert("请输入正确的公司代码。");
            return;
        }
        open('http://data.p5w.net/stock/lsgg.php?code=' + code);
    });
});

var hqServer = 'http://hq.p5w.net';
function bindStockSuggest(code, name, showIndex) {
    var query_stock_code = $('#' + code);
    if (query_stock_code.length) {
        var def_label = "拼音/代码/名称";
        var autoNoResult = "\u6ca1\u6709\u6570\u636e";
        var config = {
            limit: 10, //显示数据的条数
            source: hqServer,
            showIndex: showIndex,
            select: function (e, f) {
                if (f.item.result === autoNoResult) {
                    query_stock_code.val("");
                    $(this).val("");
                    e.preventDefault()
                } else {
                    query_stock_code.val(f.item.id);
                }
            },
            focus: function (e, f) {
                if (f.item.result === autoNoResult) {
                    query_stock_code.val("");
                    e.preventDefault()
                }
            },
            change: function (e, f) {
                if (!f.item) {
                    $(this).val(def_label).addClass("nt");
                    query_stock_code.val("");
                }
            }
        };
        $('#' + name).click(function (h) {
            $(this).stocksuggest({
                disabled: true
            })
        }).bind("keydown keyup input", function () {
            $(this).stocksuggest({
                disabled: false
            })
        }).inputValueFb({
            value: def_label
        }).stocksuggest(config);

    }
}
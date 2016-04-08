$(function () {
    var reg = /(\w+)\.(pdf|html)/g;
    var loadData = [
        ["disclosure/fulltext/plate/szselatest_24h.js", "szmblatest"],
        ["disclosure/fulltext/plate/shmblatest_24h.js", "shmblatest"],
        ["disclosure/fulltext/plate/cnsmelatest_24h.js", "smemblatest"],
        ["disclosure/fulltext/plate/cyblatest_24h.js", "cybmblatest"],
        ["disclosure/qtgg/plate/szjysgg_3m.js", "jgjgmblatest"]];
    function LoadLatest(i) {
        var f = i;
        var latestUrl = "http://www.cninfo.com.cn/";
        //加载公告disclosure/ra/szse.js
        if (i < loadData.length) {
            $.getScript(latestUrl + loadData[i][0], function (a) {
                if (typeof szzbAffiches != "undefined") {
                    var ul = $('#' + loadData[i][1] + ' ul').empty();
                    $(szzbAffiches).each(function (j) {
                        //显示12条数据
                        if (j > 11) return false;
                        var title = this[2];
                        title = title.sub(60, "...");
                        var img = '';
                        var file = this[1];
                        var filename = file.replace(/.*(\/|\\)/, "").replace(/(\.\w+)$/, "");                    
                        if (this[3] == "PDF") {
                            img = '<img src="/images13/Pdf.gif" width="16" height="16" alt="PDF"/>(' + this[4] + 'k)';
                        }
                        if (loadData[i][1] == "jgjgmblatest") {
                            $('<li><span class="name name2"><a href="content.htm?id=' + encodeURIComponent(filename) + '&f=' + f + '" target="_blank">' + title + '</a>' + img + '</span><span calss="time">' + this[6] + '</span></li>').appendTo(ul);
                        } else {
                            var code = this[0];
                            $('<li><span class="name name2"><a href="contents.htm?id=' + encodeURIComponent(filename) + '&f=' + code + '" target="_blank">' + title + '</a>' + img + '</span><span calss="time">' + this[6] + '</span></li>').appendTo(ul);
                        }
                        //$('<li><span class="name name2"><a href="' + latestUrl + this[1] + '" target="_blank">' + title + '</a>' + img + '</span><span calss="time">' + this[6] + '</span></li>').appendTo(ul);
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
        } else {
            return false;
        }
    }
    LoadLatest(0);

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
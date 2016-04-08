$(function () {
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
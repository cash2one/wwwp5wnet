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
    var loadData = [["disclosure/sh/mb/shmblatest.js", "shmblatest"], ["disclosure/sz/mb/szmblatest.js", "szmblatest"]];
    function LoadLatest(i) {
        var latestUrl = "http://www.cninfo.com.cn/";
        if (i < loadData.length) {
            $.getScript(latestUrl + loadData[i][0], 
            function(a) {
                if (typeof szzbAffiches != "undefined") {
                    var ul = $('#' + loadData[i][1] + ' ul').empty();
                    $(szzbAffiches).each(function(i) {
                        if (i > 7) return false;
                        var title = this[2];
                        title = title.sub(42, "...");
                        $('<li><a href="' + latestUrl + this[1] + '" target="_blank">' + title + '</a></li>').appendTo(ul)
                    });
                    szzbAffiches = null;
                    if (i < loadData.length) {
                        return LoadLatest(++i)
                    } else {
                        return false
                    }
                }
            })
        } else {
            return false
        }
    }
    LoadLatest(0);
    var hqUrl = "http://data.p5w.net/stock/index.php?code=";
    stockArr = [{
        code: 'sz399001',
        name: '深成指数'
    },
    {
        code: 'sh000001',
        name: '上证指数'
    },
    {
        code: 'sz399005',
        name: '中小板指'
    },
    {
        code: 'sh000300',
        name: '沪深300'
    }];
    $('.index_main').hqLoader({
        stocks: stockArr,
        chartWidth: 270,
        chartHeight: 191
    });
    $.getJSON(jsonSrv + "stockhqlist.json", 
    function(data) {
        if (data.status == "Y") {
            var g = data.hqlistA4 || [];
            var ul = $('#con_tyb_1').find('.tline');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function(i) {
                if (i > 5) return false;
                var b = i % 2 == 0 ? "1": "2";
                $('<div class="tline_' + b + '"><li class="twa1">' + this.s1 + '</li><li class="twa2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twa3 red">' + this.s3 + '</li><li class="twa4 red">' + this.s4 + '%</li></div>').appendTo(ul)
            });
            var g = data.hqlistB4 || [];
            var ul = $('#con_tyb_2').find('.tline');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function(i) {
                if (i > 5) return false;
                var b = i % 2 == 0 ? "1": "2";
                $('<div class="tline_' + b + '"><li class="twa1">' + this.s1 + '</li><li class="twa2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twa3 green">' + this.s3 + '</li><li class="twa4 green">' + this.s4 + '%</li></div>').appendTo(ul)
            });
            var g = data.hqlistA1 || [];
            var ul = $('#con_tyc_1').find('.tline');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function(i) {
                if (i > 7) return false;
                var b = i % 2 == 0 ? "1": "2";
                $('<div class="tline_' + b + '"><li class="twa1">' + this.s1 + '</li><li class="twa2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twa3 red">' + this.s3 + '</li><li class="twa4 red">' + this.s4 + '%</li></div>').appendTo(ul)
            });
            var g = data.hqlistB1 || [];
            var ul = $('#con_tyc_2').find('.tline');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function(i) {
                if (i > 7) return false;
                var b = i % 2 == 0 ? "1": "2";
                $('<div class="tline_' + b + '"><li class="twa1">' + this.s1 + '</li><li class="twa2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twa3 green">' + this.s3 + '</li><li class="twa4 green">' + this.s4 + '%</li></div>').appendTo(ul)
            });
            var g = data.hqlistA2 || [];
            var ul = $('#con_tye_1').find('.tline');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function(i) {
                if (i > 9) return false;
                var b = i % 2 == 0 ? "1": "2";
                $('<div class="tline_' + b + '"><li class="twa1">' + this.s1 + '</li><li class="twa2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twa3 red">' + this.s3 + '</li><li class="twa4 red">' + this.s4 + '%</li></div>').appendTo(ul)
            });
            var g = data.hqlistB2 || [];
            var ul = $('#con_tye_2').find('.tline');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function(i) {
                if (i > 9) return false;
                var b = i % 2 == 0 ? "1": "2";
                $('<div class="tline_' + b + '"><li class="twa1">' + this.s1 + '</li><li class="twa2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twa3 green">' + this.s3 + '</li><li class="twa4 green">' + this.s4 + '%</li></div>').appendTo(ul)
            });
            var g = data.hqlistA3 || [];
            var ul = $('#con_tyf_1').find('.tline');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function(i) {
                if (i > 9) return false;
                var b = i % 2 == 0 ? "1": "2";
                $('<div class="tline_' + b + '"><li class="twa1">' + this.s1 + '</li><li class="twa2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twa3 red">' + this.s3 + '</li><li class="twa4 red">' + this.s4 + '%</li></div>').appendTo(ul)
            });
            var g = data.hqlistB3 || [];
            var ul = $('#con_tyf_2').find('.tline');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function(i) {
                if (i > 9) return false;
                var b = i % 2 == 0 ? "1": "2";
                $('<div class="tline_' + b + '"><li class="twa1">' + this.s1 + '</li><li class="twa2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twa3 green">' + this.s3 + '</li><li class="twa4 green">' + this.s4 + '%</li></div>').appendTo(ul)
            })
        }
    });
    $.getJSON("http://data.p5w.net/yb/p5wstock.php?m=xcfpj&count=5&callback=?", function (data) {
        if (data.xcfpj != null) {
            var g = data.xcfpj || [];
            var ul = $('#con_mostcompany');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function (i) {
                if (i > 4) return false;
                var b = i % 2 == 0 ? "1" : "2";
                $('<div class="tline_' + b + '"><li class="twb1">' + this.s1 + '</li><li class="twb2"><a href="' + hqUrl + this.s3 + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="twb3">' + this.s4 + '</li> <li class="twb4">' + this.s5.substr(0, 6) + '</li><li class="twb5">' + this.s7 + '</li></div>').appendTo(ul)
            });
        }
    });
    $.getJSON("http://data.p5w.net/yb/p5wstock.php?m=ggql&count=5&callback=?", function (data) {
        if (data.ggql != null) {
            var g = data.ggql || [];
            var ul = $('#con_tyd_1').find('.tline');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function (i) {
                if (i > 4) return false;
                var b = i % 2 == 0 ? "1" : "2";
                $('<div class="tline_' + b + '"><li class="twd1">' + this.s1 + '</li><li class="twd2"><a href="' + hqUrl + this.s3 + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="twd3">' + this.s8 + '</li><li class="twd4">' + this.s9 + '%</li></div>').appendTo(ul)
            });
        }
    });
    //$.getJSON("http://data.p5w.net/yb/p5wstock.php?m=tzpjup&count=5&callback=?", function (data) {
    //    if (data.tjpjup != null) {
    //        var g = data.tjpjup || [];
    //        var ul = $('#con_fundhold');
    //        var t = $('.tline_title', ul);
    //        ul.empty().append(t);
    //        $(g).each(function (i) {
    //            if (i > 4) return false;
    //            var b = i % 2 == 0 ? "1" : "2";
    //            $('<div class="tline_' + b + '"><li class="twd1">' + this.s1 + '</li><li class="twd2"><a href="' + hqUrl + this.s8 + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="twd3">' + this.s3 + '</li><li class="twd4">' + this.s4 + '</li></div>').appendTo(ul)
    //        });
    //    }
    //});






    $.getJSON(jsonSrv + "fxpjlistjs.json", function(data) {
        if (data.status == "Y") {
            //var g = data.fxpjcount || [];
            //var ul = $('#con_mostcompany');
            //var t = $('.tline_title', ul);
            //ul.empty().append(t);
            //$(g).each(function (i) {
            //    if (i > 4) return false;
            //    var b = i % 2 == 0 ? "1" : "2";
            //    $('<div class="tline_' + b + '"><li class="twb1">' + this.s1 + '</li><li class="twb2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twb3">' + this.s3 + '</li> <li class="twb4">' + this.s4 + '</li><li class="twb5">' + this.s5 + '</li></div>').appendTo(ul)
            //});
            //var g = data.fxpj || [];
            //var ul = $('#con_tyd_1').find('.tline');
            //var t = $('.tline_title', ul);
            //ul.empty().append(t);
            //$(g).each(function (i) {
            //    if (i > 4) return false;
            //    var b = i % 2 == 0 ? "1" : "2";
            //    $('<div class="tline_' + b + '"><li class="twd1">' + this.s1 + '</li><li class="twd2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twd3">' + this.s3 + '</li><li class="twd4">' + this.s4 + '</li></div>').appendTo(ul)
            //});
            var g = data.xingulist || [];
            var ul = $('#newstockdata');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function (i) {
                if (i > 4) return false;
                var b = i % 2 == 0 ? "1" : "2";
                $('<div class="tline_' + b + '"><li class="twb1">' + this.s1 + '</li><li class="twb2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twb3">' + (this.s3.length == 0 ? '--' : this.s3) + '</li><li class="twb4">' + (this.s4.length == 0 ? '--' : this.s4) + '</li><li class="twb5">' + (this.s5.length == 0 ? '--' : this.s5) + '</li></div>').appendTo(ul)
            });
            var g = data.xinguhqlist || [];
            var ul = $('#newstockhq');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function (i) {
                if (i > 4) return false;
                var b = i % 2 == 0 ? "1" : "2";
                $('<div class="tline_' + b + '"><li class="twb1">' + this.s1 + '</li><li class="twb2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twb3">' + this.s3 + '</li><li class="twb4">' + this.s4 + '</li><li class="twb5">' + this.s5 + '</li></div>').appendTo(ul)
            });
            var g = data.zqdmdplist || [];
            var ul = $('#con_qgqp');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function (i) {
                if (i > 4) return false;
                var b = i % 2 == 0 ? "1" : "2";
                $('<div class="tline_' + b + '"><li class="twc1">' + this.s1 + '</li><li class="twc2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twc3">' + this.s3 + '</li></div>').appendTo(ul)
            });
            var g = data.fundholdlist || [];
            var ul = $('#con_fundhold');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function (i) {
                if (i > 4) return false;
                var b = i % 2 == 0 ? "1" : "2";
                $('<div class="tline_' + b + '"><li class="twc1">' + this.s2 + '</li><li class="twc2"><a href="' + hqUrl + parseCode(this.s2) + '" target="_blank">' + this.s3 + '</a></li><li class="twc3">' + this.s4 + '</li></div>').appendTo(ul)
            });
        }
    });

    if (typeof tradingdayData != "undefined") {
        var data = tradingdayData.gsydtlist || [];
        var html = new Array();
        for (var i = 0; i < data.length && i < 2; i++) {
            var a = data[i];
            html.push('<div class="mod-tw"><div class="mod-img"><a href="' + a.url + '" target="_blank" title="' + a.title + '"><img src="' + a.img + '" alt="' + a.title + '" width="90" height="60" /></a></div>');
            html.push('<div class="mod-text4"><p class="mod-lt"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></p>');
            html.push('</div></div>')
        }
        $('#companysplist').html(html.join(''));
        var data = tradingdayData.jyrlist || [];
        var html = new Array();
        for (var i = 0; i < data.length && i < 2; i++) {
            var a = data[i];
            html.push('<div class="mod-tw"><div class="mod-img"><a href="' + a.url + '" target="_blank" title="' + a.title + '"><img src="' + a.img + '" alt="' + a.title + '" width="90" height="60" /></a></div>');
            html.push('<div class="mod-text4"><p class="mod-lt"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></p>');
            html.push('</div></div>')
        }
        $('#tradingdaySP').html(html.join(''));
        var data = tradingdayData.tzldlist || [];
        var html = new Array();
        for (var i = 0; i < data.length && i < 5; i++) {
            var a = data[i];
            html.push('<div class="mod-tw"><div class="mod-img"><a href="' + a.url + '" target="_blank" title="' + a.title + '"><img src="' + a.img + '" alt="' + a.title + '" width="90" height="60" /></a></div>');
            html.push('<div class="mod-text4"><p class="mod-lt"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></p>');
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
            html.push('<li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></li>')
        }
        $('#xcfbgSP').html(html.join(''));
        var data = tradingdayData.lyztlist || [];
        var html = new Array();
        for (var i = 0; i < data.length && i < 5; i++) {
            var a = data[i];
            html.push('<div class="mod-tw"><div class="mod-img"><a href="' + a.url + '" target="_blank" title="' + a.title + '"><img src="' + a.img + '" alt="' + a.title + '" width="90" height="60" /></a></div>');
            html.push('<div class="mod-text4"><p class="mod-lt"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></p>');
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
            html.push('<li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></li>')
        }
        $('#lyztSP').html(html.join(''))
    }
    var irmSrv = "http://irm.p5w.net/";
    var ircsSrv = "http://ircs.p5w.net/";
    Base.loadJs([irmSrv + "gszz/p5w_mostcompany.js"],
    function() {
        var a = new Date(mostCompanyStartTime.replaceAll('-', '/'));
        var b = new Date(mostCompanyEndTime.replaceAll('-', '/'));
        $('#MostTime').html(a.format("M月d日") + '-' + b.format("M月d日"));
        if (typeof questionedMostCompany != "undefined") {
            var ul = $('#qMostCompany').find('ul');
            var t = ul.find('li.title');
            ul.empty().append(t);
            $(questionedMostCompany.items).each(function(i) {
                if (i > 6) return false;
                var no = this.questionedNo ? this.questionedNo: '0';
                $('<li><a href="' + irmSrv + 'ssgs/S' + this.stockcode + '/" target="_blank">' + this.stockname + '</a></li><li>' + no + '</li>').appendTo(ul)
            })
        }
        var ul = $('#rMostCompany').find('ul');
        var t = ul.find('li.title');
        ul.empty().append(t);
        if (typeof replyMostCompany != "undefined") {
            $(replyMostCompany.items).each(function(i) {
                if (i > 6) return false;
                var no = this.replyNo ? this.replyNo: '0';
                $('<li><a href="' + irmSrv + 'ssgs/S' + this.stockcode + '/" target="_blank">' + this.stockname + '</a></li><li>' + no + '</li>').appendTo(ul)
            })
        }
        if (typeof latestRepliedQuestions != "undefined") {
            var lqDom = $('#ct-list-irm');
            lqDom.empty();
            $(latestRepliedQuestions.items).each(function(i) {
                if (i > 1) return false;
                var d = 80;
                var content = this.content.replaceAll('\n', '').sub(d);
                var replyContent = this.replyContent.replaceAll('\n', '').sub(d);
                var replyer = this.replyer.sub(8);
                $('<div class="taba-1">' + this.stockname + '<br />' + this.stockcode + '</div><div class="taba-2"><a href="' + ircsSrv + 'ircs/interaction/viewQuestion.do?questionId=' + this.questionid + '">' + content + '</a></div><div class="tabq-1">' + replyer + '<br /></div><div class="tabq-2"><a href="' + ircsSrv + 'ircs/interaction/viewQuestion.do?questionId=' + this.questionid + '">' + replyContent + '</a></div>').appendTo(lqDom)
            })
        }
    },
    "utf-8");

    //$('#stockcode,#stockcode2,#irmstockcode').suggest();
    //var cp = "http://data.p5w.net/stock/";
    //var goUrl = ['http://irm.p5w.net/ssgs/S', cp + 'ggzx.php?code=', hqUrl, 'http://bbs.p5w.net/searchzqdm.php?fid=4&zqdm=', cp + 'gsgk.php?code=', cp + 'ggry.php?code=', cp + 'cwzb.php?code=', cp + 'fhpg.php?code=', cp + 'fxss.php?code=', cp + 'gbzk.php?code=', cp + 'sdgd.php?code=', cp + 'ltgd.php?code=', cp + 'lsgg.php?code=', cp + 'dqbg.php?code=', cp + 'gszc.php?code='];
    //$('#btnSearch,#btnSearch2,#btnSearch3').click(function() {
    //    var reg = new RegExp(/^[036]\d{5}$/);
    //    var code = $('#stockcode').val();
    //    if (this.id == "btnSearch2") {
    //        code = $('#stockcode2').val()
    //    } else if (this.id == "btnSearch3") {
    //        code = $('#irmstockcode').val()
    //    }
    //    if (!reg.test(code)) {
    //        p5w.alert("请输入股票代码。", 'error');
    //        return false
    //    }
    //    var t = $('#searchtype').val();
    //    if (this.id == "btnSearch2") {
    //        t = 12
    //    } else if (this.id == "btnSearch3") {
    //        t = 0
    //    }
    //    code = parseCode(code);
    //    open(goUrl[t] + code)
    //})

    //股票代码联想
    bindStockSuggest('query_stock_code', 'query_stock_name', 0);
    bindStockSuggest('query_stock_code_2', 'query_stock_name_2', 0);
    bindStockSuggest('query_stock_code_3', 'query_stock_name_3', 0);
    $('#btnSearch2').click(function () {
        var code = $('#query_stock_code_2').val().toLowerCase();
        var reg = new RegExp(/^[szsh0-9]{8}$/);
        if (!reg.test(code)) {
            alert("请输入正确的公司代码。");
            return;
        }
        open('http://data.p5w.net/stock/lsgg.php?code=' + code);
    });
    $('#btnSearch3').click(function () {
        var code = $('#query_stock_code_3').val().toLowerCase();
        var reg = new RegExp(/^[szsh0-9]{8}$/);
        if (!reg.test(code)) {
            alert("请输入正确的公司代码。");
            return;
        }
        open(irmSrv + 'ssgs/S' + code.substr(2, 6) + '/');
    });
    var cp = "http://data.p5w.net/stock/";
    var goUrl = ['http://irm.p5w.net/ssgs/S', cp + 'ggzx.php?code=', hqUrl, 'http://bbs.p5w.net/searchzqdm.php?fid=4&zqdm=', cp + 'gsgk.php?code=', cp + 'ggry.php?code=', cp + 'cwzb.php?code=', cp + 'fhpg.php?code=', cp + 'fxss.php?code=', cp + 'gbzk.php?code=', cp + 'sdgd.php?code=', cp + 'ltgd.php?code=', cp + 'lsgg.php?code=', cp + 'dqbg.php?code=', cp + 'gszc.php?code=', cp + 'qgqp.php?code=', cp + 'bulkholdfund.php?code=', cp + 'fxyc.php?code='];
    $('#btnSearch').click(function () {
        var code = $('#query_stock_code').val().toLowerCase();
        var reg = new RegExp(/^[szsh0-9]{8}$/);
        if (!reg.test(code)) {
            alert("请输入正确的公司代码。");
            return;
        }
        var t = $('#searchtype').val();
        if (t == 0) {
            code = code.substr(2, 6);
        }
        open(goUrl[t] + code);
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
function parseCode(code) {
    var p = code.substr(0, 2);
    if (p == '00' || p == '30') {
        return 'sz' + code;
    }
    if (p == '60') {
        return 'sh' + code;
    }
}
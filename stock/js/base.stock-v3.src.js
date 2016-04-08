function parseCode(code) {
    var p = code.substr(0, 2);
    if (p == '00' || p == '30' || p == '39') {
        return 'sz' + code;
    }
    if (p == '60') {
        return 'sh' + code;
    }
}

function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}

var isIndex = true;
if (typeof isIndex == "undefined") {
    var isIndex = false;
}
$(function () {
    function isLogin(user) {
        var loginSrv = 'http://passport.p5w.net';
        var loginpanl = $('#user-menu')
        if (user.uid > 0) {
            var uname = decodeURIComponent(user.username);
            var url_forward = encodeURIComponent(document.location.href);
            var arr = ['<ul>',
                '<li>欢迎您，</li>',
                '<li><a href="' + loginSrv + '/index.php" target="_blank"><span>' + uname + '</span></a></li>',
                '<li><a href="' + loginSrv + '/logout.php?referer=' + url_forward + '"><span>退出</span></a></li>',
                '</ul>'
            ];
            var html = new Array();
            if (isIndex) {
                html.push(arr[0]);
                html.push(arr[1]);
                html.push(arr[2]);
                html.push(arr[3]);
                html.push(arr[4]);
            } else {

            }
            $(loginpanl).empty().html(html.join(''));
        } else {
            //未登录
        }

    }
    passport.getUser(isLogin);

});
$(function () {
    var loadData = [
        ["http://data.p5w.net/ggs.php?dd=4&flag=2&count=8&callback=?", "shmblatest"],
        ["http://data.p5w.net/ggs.php?dd=1&flag=2&count=8&callback=?", "szmblatest"]
    ];
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
    var hqUrl = "http://data.p5w.net/stock/index.php?code=";
    stockArr = [{ code: 'sz399001', name: '深证成指' }, { code: 'sh000001', name: '上证指数' }, { code: 'sz399005', name: '中小板指' }, { code: 'sz399429', name: '新丝路' }];
    $('.index_main').hqLoader({
        stocks: stockArr,
        chartWidth: 270,
        chartHeight: 191
    });
    
    $.getJSON(jsonSrv + "fxpjlistjs.json", function (data) {
        if (data.status == "Y") {
            // 千股千评
            var g = data.zqdmdplist || [];
            var ul = $('#con_qgqp');
            var t = new Array();
            ul.empty();
            $(g).each(function (i) {
                if (i > 4) return false;
                var b = i % 2 == 0 ? "1" : "2";
                t.push('<ul><li class="qp1 blue"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="qp2">' + this.s3 + '</li></ul>');
            });
            ul.html(t.join(''));
            // 五日涨幅
            var html = new Array();
            //html.push('<ul>');
            var g = data.zf5 || [];
            $(g).each(function (i) {
                if (i < 5) {
                    //html.push('<li class="lh1 blue"><a href="' + hqUrl + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="lh2">' + this.s3 + '</li><li class="lh3">' + this.s4 + '</li>');
                    var b = i % 2 == 0 ? "1" : "2";
                    html.push('<div class="tline_' + b + '"><li class="twa7"><a href="' + hqUrl + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="twa7">' + this.s3 + '</li><li class="twa7">' + this.s4 + '</li></div>');
                }
            });
            //html.push('</ul>');
            //$('#wrzf').html(html.join(''));
            $(html.join('')).appendTo('#wrzf');
            // 新股数据
            var g = data.xingulist || [];
            var ul = $('#newstockdata');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function (i) {
                if (i > 6) return false;
                var b = i % 2 == 0 ? "1" : "2";
                $('<div class="tline_' + b + '"><li class="twb1">' + this.s1 + '</li><li class="twb2 blue"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twb3">' + (this.s3.length == 0 ? '--' : this.s3) + '</li><li class="twb4">' + (this.s4.length == 0 ? '--' : this.s4) + '</li><li class="twb3">' + (this.s5.length == 0 ? '--' : this.s5) + '</li></div>').appendTo(ul);
            });
            // 新股行情
            var g = data.xinguhqlist || [];
            var ul = $('#newstockhq');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function (i) {
                if (i > 4) return false;
                var b = i % 2 == 0 ? "1" : "2";
                $('<div class="tline_' + b + '"><li class="twb1">' + this.s1 + '</li><li class="twb2 blue"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twb4">' + this.s3 + '</li><li class="twb3">' + this.s4 + '</li><li class="twb3">' + this.s5 + '</li></div>').appendTo(ul);
            });
            
        }
    });

    $.getJSON(jsonSrv + "stockhqlist.json", function(data) {
        if (data.status == "Y") {
            var count = 4;
            // 领涨行业
            var g = data.hqlistA4 || [];
            var ul = $('#con_lzhy_1').find('.tline');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function(i) {
                if (i > count) return false;
                var b = i % 2 == 0 ? "1" : "2";
                var c = this.s4 > 0 ? 'red' : 'green';
                $('<div class="tline_' + b + '"><li class="twa1">' + this.s1 + '</li><li class="twa2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twa3 ' + c + '">' + this.s3 + '</li><li class="twa4 ' + c + '">' + this.s4 + '%</li></div>').appendTo(ul);
            });
            // 领跌行业
            var g = data.hqlistB4 || [];
            var ul = $('#con_lzhy_2').find('.tline');
            var t = $('.tline_title', ul);
            ul.empty().append(t);
            $(g).each(function(i) {
                if (i > count) return false;
                var b = i % 2 == 0 ? "1" : "2";
                var c = this.s4 > 0 ? 'red' : 'green';
                $('<div class="tline_' + b + '"><li class="twa1">' + this.s1 + '</li><li class="twa2"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="twa3 ' + c + '">' + this.s3 + '</li><li class="twa4 ' + c + '">' + this.s4 + '%</li></div>').appendTo(ul);
            });
        }
    });

    $.getJSON('http://data.p5w.net/json/stockjson.php?callback=?', function (data) {
        if (data == null) {
            return;
        }
        var count = 6;
        var g = null;
        var l = new Array();
        
        //if (data.boards != null) {
        //    g = data.boards || [];
        //    var size = g.length;
        //    l = new Array();
        //    count = 5;
        //    $(g).each(function (i) {
        //        if (i >= count) return;
        //        var b = i % 2 == 0 ? "1" : "2";
        //        var c = this.rate > 0 ? 'red' : 'green';
        //        l.push('<div class="tline_' + b + '"><li class="twa1">' + this.s1 + '</li><li class="twa2"><a href="' + hqUrl + this.id + '" target="_blank">' + this.s2 + '</a></li><li class="twa3 ' + c + '">' + this.s3 + '</li><li class="twa4 ' + c + '">' + this.s4 + '</li></div>');
        //    });
        //    $('#zhenfu').html(l.join(''));

        //    for (var j = size; j >= size - count; j--) {
        //    }
        //}

        if (data.summaryab.szsh.A.zhenfu != null) {
            g = data.summaryab.szsh.A.zhenfu || [];
            l = new Array();
            count = 5;
            $(g).each(function (i) {
                if (i >= count) return;
                var b = i % 2 == 0 ? "1" : "2";
                //l.push('<ul><li class="lh1 blue"><a href="' + hqUrl + this[0] + '" target="_blank">' + this[1] + '</a></li><li class="lh2">' + this[4] + '</li><li class="lh3">' + this[3] + '</li></ul>');
                l.push('<div class="tline_' + b + '"><li class="twa7"><a href="' + hqUrl + this[0] + '" target="_blank">' + this[1] + '</a></li><li class="twa7">' + this[4] + '</li><li class="twa7">' + this[3] + '</li></div>');
            });
            //$('#zhenfu').html(l.join(''));
            $(l.join('')).appendTo('#zhenfu');
        }
        if (data.summaryab.szsh.A.turnover != null) {
            g = data.summaryab.szsh.A.turnover || [];
            l = new Array();
            count = 5;
            $(g).each(function (i) {
                if (i >= count) return;
                var b = i % 2 == 0 ? "1" : "2";
                //l.push('<ul><li class="lh1 blue"><a href="' + hqUrl + this[0] + '" target="_blank">' + this[1] + '</a></li><li class="lh2">' + this[4] + '</li><li class="lh3">' + this[3] + '</li></ul>');
                l.push('<div class="tline_' + b + '"><li class="twa7"><a href="' + hqUrl + this[0] + '" target="_blank">' + this[1] + '</a></li><li class="twa7">' + this[4] + '</li><li class="twa7">' + this[3] + '</li></div>');
            });
            //$('#turnover').html(l.join(''));
            $(l.join('')).appendTo('#turnover');
        }
        if (data.history != null) {
            g = data.history || [];
            l = new Array();
            count = 5;
            $(g).each(function (i) {
                if (i >= count) return;
                var b = i % 2 == 0 ? "1" : "2";
                var c = this.rate > 0 ? 'red' : 'green';
                var p = this.price == null ? '--' : this.price;
                var r = this.rate == '--' ? this.rate : this.rate + '%';
                l.push('<div class="tline_' + b + '"><li class="twa1"><a href="' + hqUrl + this.code + '" target="_blank">' + this.code.substr(2) + '</a></li><li class="twa2"><a href="' + hqUrl + this.code + '" target="_blank">' + this.name + '</a></li><li class="twa3 ' + c + '">' + p + '</li><li class="twa4 ' + c + '">' + r + '</li></div>');
            });
            $(l.join('')).appendTo('#history');
        }
        if (data.topstock != null) {
            g = data.topstock || [];
            l = new Array();
            count = 5;
            $(g).each(function (i) {
                if (i >= count) return;
                var b = i % 2 == 0 ? "1" : "2";
                var c = this.rate > 0 ? 'red' : 'green';
                l.push('<div class="tline_' + b + '"><li class="twa1"><a href="' + hqUrl + this.code + '" target="_blank">' + this.code.substr(2) + '</a></li><li class="twa2"><a href="' + hqUrl + this.code + '" target="_blank">' + this.name + '</a></li><li class="twa3 ' + c + '">' + this.price + '</li><li class="twa4 ' + c + '">' + this.rate + '%</li></div>');
            });
            $(l.join('')).appendTo('#topstock');
        }

        if (data.dzjy != null) {
            g = data.dzjy || [];
            l = new Array();
            count = 5;
            $(g).each(function (i) {
                if (i >= count) return;
                var b = i % 2 == 0 ? "1" : "2";
                l.push('<div class="tline_' + b + '"><li class="dzjy1 blue"><a href="http://data.p5w.net/stock/index.php?code=' + this.s8 + this.code + '" target="_blank">' + this.name + '</a></li><li class="dzjy2">' + this.s5 + '</li><li class="dzjy3">' + this.s7 + '</li><li class="dzjy4 blue"><a href="http://data.p5w.net/executive/dzjydetail.php?code=' + this.code + '" target="_blank">查看</a></li></div>');
            });
            $(l.join('')).appendTo('#dzjy');
        }
        if (data.rzmr != null) {
            g = data.rzmr || [];
            l = new Array();
            count = 5;
            $(g).each(function (i) {
                if (i >= count) return;
                var b = i % 2 == 0 ? "1" : "2";
                var c = this.s4 > 0 ? 'red' : 'green';
                l.push('<div class="tline_' + b + '"><li class="rzrq1"><a href="' + hqUrl + this.s11 + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="rzrq2">' + this.s5 + '</li><li class="rzrq3 ' + c + '">' + this.s4 + '%</li><li class="rzrq4 blue"><a href="http://data.p5w.net/rzrq/detail.php?q=' + this.code + '" target="_blank">查看</a></li></div>');
            });
            $(l.join('')).appendTo('#rzmr');
        }
        if (data.rqmc != null) {
            g = data.rqmc || [];
            l = new Array();
            count = 5;
            $(g).each(function (i) {
                if (i >= count) return;
                var b = i % 2 == 0 ? "1" : "2";
                var c = this.s8 > 0 ? 'red' : 'green';
                l.push('<div class="tline_' + b + '"><li class="rzrq1"><a href="' + hqUrl + this.s11 + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="rzrq2">' + this.s9 + '</li><li class="rzrq3 ' + c + '">' + this.s8 + '%</li><li class="rzrq4 blue"><a href="http://data.p5w.net/rzrq/detail.php?q=' + this.code + '" target="_blank">查看</a></li></div>');
            });
            $(l.join('')).appendTo('#rqmc');
        }
        if (data.executive != null) {
            g = data.executive || [];
            l = new Array();
            count = 5;
            $(g).each(function (i) {
                if (i >= count) return;
                var b = i % 2 == 0 ? "1" : "2";
                l.push('<div class="tline_' + b + '"><li class="twa1"><a href="http://data.p5w.net/stock/index.php?code=' + this.s13 + this.code + '" target="_blank">' + this.name + '</a></li><li class="twa2">' + this.s5 + '</li><li class="twa5">' + this.s8 + '</li><li class="twa6">' + this.s10 + '</li></div>');
            });
            $(l.join('')).appendTo('#executive');
        }
        if (data.ggql != null) {
            g = data.ggql || [];
            l = new Array();
            count = 6;
            $(g).each(function (i) {
                if (i >= count) return;
                var b = i % 2 == 0 ? "1" : "2";
                var c = this.rate > 0 ? 'red' : 'green';
                var p = this.price == null ? '--' : this.price;
                var r = this.rate == '--' ? this.rate : this.rate + '%';
                l.push('<div class="tline_' + b + '"><li class="yb1">' + this.s1 + '</li><li class="yb2"><a href="' + hqUrl + this.s3 + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="yb3">' + this.s9 + '%</li><li class="yb4">' + this.s8 + '</li><li class="yb5">' + this.s5 + '</li><li class="yb6">' + this.s7 + '%</li><li class="yb7">' + this.s10 + '</li><li class="yb8 ' + c + '">' + p + '</li><li class="yb9 ' + c + '">' + r + '</li></div>');
            });
            $(l.join('')).appendTo('#ggql');
        }
        if (data.hotstock != null) {
            g = data.hotstock || [];
            l = new Array();
            count = 6;
            $(g).each(function (i) {
                if (i >= count) return;
                var b = i % 2 == 0 ? "1" : "2";
                var c = this.rate > 0 ? 'red' : 'green';
                var p = this.price == null ? '--' : this.price;
                var r = this.rate == '--' ? this.rate : this.rate + '%';
                l.push('<div class="tline_' + b + '"><li class="yb1">' + this.s1 + '</li><li class="yb2"><a href="' + hqUrl + this.s3 + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="yb3">' + this.s11 + '%</li><li class="yb4">' + this.s5 + '</li><li class="yb5">' + this.s6 + '</li><li class="yb6">' + this.s8 + '</li><li class="yb7">' + this.s10 + '</li><li class="yb8 ' + c + '">' + p + '</li><li class="yb9 ' + c + '">' + r + '</li></div>');
            });
            $(l.join('')).appendTo('#hotstock');
        }
        if (data.firsttjpj != null) {
            g = data.firsttjpj || [];
            l = new Array();
            count = 6;
            $(g).each(function (i) {
                if (i >= count) return;
                var b = i % 2 == 0 ? "1" : "2";
                var c = this.rate > 0 ? 'red' : 'green';
                var t = this.s6;
                t = t.strLen() > 24 ? t.subCHStr(0, 24) : t;
                var p = this.price == null ? '--' : this.price;
                var r = this.rate == '--' ? this.rate : this.rate + '%';
                l.push('<div class="tline_' + b + '"><li class="yb8">' + this.s1 + '</li><li class="yb8"><a href="' + hqUrl + this.s8 + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="yb8">' + this.s3 + '</li><li class="yb8">' + this.s4 + '</li><li class="yb1">' + this.s5 + '</li><li class="yb11">' + t + '</li><li class="yb7">' + this.s7 + '</li><li class="yb8 ' + c + '">' + p + '</li><li class="yb8 ' + c + '">' + r+ '</li></div>');
            });
            $(l.join('')).appendTo('#firsttjpj');
        }
        if (data.tzpjup != null) {
            g = data.tzpjup || [];
            l = new Array();
            count = 6;
            $(g).each(function (i) {
                if (i >= count) return;
                var b = i % 2 == 0 ? "1" : "2";
                var c = this.rate > 0 ? 'red' : 'green';
                var t = this.s6;
                t = t.strLen() > 24 ? t.subCHStr(0, 24) : t;
                var p = this.price == null ? '--' : this.price;
                var r = this.rate == '--' ? this.rate : this.rate + '%';
                l.push('<div class="tline_' + b + '"><li class="yb8">' + this.s1 + '</li><li class="yb8"><a href="' + hqUrl + this.s8 + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="yb8">' + this.s3 + '</li><li class="yb8">' + this.s4 + '</li><li class="yb1">' + this.s5 + '</li><li class="yb11">' + t + '</li><li class="yb7">' + this.s7 + '</li><li class="yb8 ' + c + '">' + p + '</li><li class="yb8 ' + c + '">' + r + '</li></div>');
            });
            $(l.join('')).appendTo('#tzpjup');
        }
        if (data.tzpjdown != null) {
            g = data.tzpjdown || [];
            l = new Array();
            count = 6;
            $(g).each(function (i) {
                if (i >= count) return;
                var b = i % 2 == 0 ? "1" : "2";
                var c = this.rate > 0 ? 'red' : 'green';
                var t = this.s6;
                t = t.strLen() > 24 ? t.subCHStr(0, 24) : t;
                var p = this.price == null ? '--' : this.price;
                var r = this.rate == '--' ? this.rate : this.rate + '%';
                l.push('<div class="tline_' + b + '"><li class="yb8">' + this.s1 + '</li><li class="yb8"><a href="' + hqUrl + this.s8 + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="yb8">' + this.s3 + '</li><li class="yb8">' + this.s4 + '</li><li class="yb1">' + this.s5 + '</li><li class="yb11">' + t + '</li><li class="yb7">' + this.s7 + '</li><li class="yb8 ' + c + '">' + p + '</li><li class="yb8 ' + c + '">' + r + '</li></div>');
            });
            $(l.join('')).appendTo('#tzpjdown');
        }
        if (data.xcfpj != null) {
            g = data.xcfpj || [];
            l = new Array();
            count = 6;
            $(g).each(function (i) {
                if (i >= count) return;
                var b = i % 2 == 0 ? "1" : "2";
                var c = this.rate > 0 ? 'red' : 'green';
                var t = this.s5;
                t = t.strLen() > 24 ? t.subCHStr(0, 24) : t;
                var j = this.s4;
                j = j.strLen() > 10 ? j.subCHStr(0, 10) : j;
                var p = this.price == null ? '--' : this.price;
                var r = this.rate == '--' ? this.rate : this.rate + '%';
                l.push('<div class="tline_' + b + '"><li class="yb8">' + this.s1 + '</li><li class="yb8"><a href="' + hqUrl + this.s3 + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="yb8">' + j + '</li><li class="yb11">' + t + '</li><li class="yb10">' + this.s7 + '</li><li class="yb8 ' + c + '">' + p + '</li><li class="yb8 ' + c + '">' + r + '</li><li class="yb8">' + this.s8 + '</li><li class="yb3">' + this.s10 + '</li></div>');
            });
            $(l.join('')).appendTo('#xcfpj');
        }
    });

    if (typeof tradingdayData != "undefined") {
        var data = tradingdayData.ipogclist || [];
        var html = new Array();
        for (var i = 0; i < data.length && i < 5; i++) {
            var a = data[i];
            if (i == 0) {
                html.push('<dt><img src="' + a.img + '" alt="' + a.title + ' "width="105" height="75" /></dt>');
                html.push('<dd><h2 class="title"><a href="' + a.url + '" target="_blank">' + a.title + '</a></h2></dd>');
                //html.push('<dd><p class="hui"></p></dd>');
                html.push('<ul class="title">');
            } else {
                html.push('<li><a href="' + a.url + '" target="_blank">' + a.title.subCHStr(0, 48) + '</a></li>');
            }
        }
        html.push('</ul>');
        $(html.join('')).appendTo('#ipogc');
    }
    
    $.getJSON("http://data.p5w.net/ipo/ipojson.php?m=xggg&num=7&callback=?&upcache=1&rnd=" + new Date().getTime(), function (data) {
        try {
            if (typeof data == "string") {
                data = $.parseJSON(data);
            }
        } catch (e) {
            data = null;
        }
        if (data.list.length > 0) {
            var html = new Array();
            html.push('<ul>');
            $(data.list).each(function (i, row) {
                var u = 'http://www.cninfo.com.cn/' + row.s4;
                var t = row.s3;
                t = t.strLen() > 45 ? t.subCHStr(0, 47) : t;
                html.push('<li><a href="' + u + '" target="_blank">' + t + '</a></li>');
            });
            html.push('</ul>');
            $('#xggg').html(html.join(''));
        }
    });

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

$(document).ready(function () {
    ipoList();

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

function ipoList() {
    var liCount = $('#ipoList li').size();
    if (liCount > 0) {
        $('#ipobox').show();

        if (liCount <= 6) {
            $('.ipo-left').hide();
            $('.ipo-right').hide();
        }
        if (liCount == 5) {
            $('#ipoList').addClass('ipo-list-li-5');
        }
        if (liCount == 6) {
            $('#ipoList').addClass('ipo-list-li-6');
        }
        if (liCount > 6) {
            $("#ipoList_fk").jCarouselLite({
                auto: null,
                speed: 800,
                visible: 6,
                scroll: 1,
                onMouse: true,
                btnNext: "#ipo-arrow-next",
                btnPrev: "#ipo-arrow-prev"
            });
        }
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
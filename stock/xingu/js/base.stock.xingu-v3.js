var ipojson = "http://data.p5w.net/ipo/ipojson.php";

(function ($) {
    var userAgent = navigator.userAgent.toLowerCase();
    // Figure out what browser is being used 
    $.browser = {
        version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
        safari: /webkit/.test(userAgent),
        opera: /opera/.test(userAgent),
        msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
        mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
    };
})(jQuery);

var stockEventData = null;
var curPage = 1;
var pageCount = 8;
var total = 0;
var totalPage = 0;
function bindStockEvent() {
    if (stockEventData == null) return;
    total = stockEventData.count;
    var pages = Math.ceil(total / pageCount);
    totalPage = pages;
    curPage = 1;
    $('#stock_event_date').html(stockEventData.curDate);
    $('#stock_event_page').empty();
    $('<li><img src="images3/q1.gif" width="12" height="13" onclick="goPage(-1);" style="cursor:pointer;"/></li>').appendTo($('#stock_event_page'));
    for (var i = 0; i < pages; i++) {
        $('<li class="dot"><a href="javascript:;" onclick="toPage(' + (i + 1) + ');"></a>').appendTo($('#stock_event_page'));
    }
    $('<li><img src="images3/q2.gif" width="12" height="13" onclick="goPage(1);"  style="cursor:pointer;"/></li>').appendTo($('#stock_event_page'));
    toPage(curPage);

}
function goPage(f) {
    if (f == -1) {
        var k = curPage;
        if (k <= 1) { k = 1 } else { k-- };
        toPage(k);
    } else {
        var k = curPage;
        if (k >= totalPage) {
            k = totalPage;
        } else {
            k++;
        }
        toPage(k);
    }
}
function toPage(page) {
    for (var i = 1; i <= 8; i++) {
        var curList = $('#stock_event_list' + i);
        var curListUl = $('<ul/>').hide();
        //curList.find('ul').animate({opacity: "hide"}, "fast");
        curList.empty();
        var curData = stockEventData['List' + i];
        if (curData && curData.length > 0) {
            for (var j = (page - 1) * pageCount; j < page * pageCount && j < curData.length; j++) {
                var item = curData[j];
                $('<li><a href="http://data.p5w.net/ipo/viewstock.php?q=' + item.code + '" target="_blank">' + item.name + '</a></li>').appendTo(curListUl);
            }
            curListUl.appendTo(curList).animate({ opacity: "show" }, "fast");

        }
    }
    $('#stock_event_page li.dot').removeClass().addClass('dot').eq(page - 1).addClass('rslides_here');
    curPage = page;
}
//当日事件跳转
function goToDate(dataStr) {
    var urlinfo = ipojson + "?m=events&dataStr=" + dataStr + "&callback=?&rnd=" + new Date().getTime();
    $.getJSON(urlinfo, function (data) {
        try {
            if (typeof data == "string") {
                stockEventData = $.parseJSON(data);
            } else {
                stockEventData = data;
            }

            bindStockEvent();
        } catch (e) {
            stockEventData = null;
        }
    });

}
$(function () {
    if (typeof dateinfo != "undefined") {
        var today = dateinfo.curDate;
        $('#lbl_curDate').html(today);
        var specialDateArr = dateinfo.specialDates;
        try {
            document.domain = 'p5w.net';
        } catch (E) {
        }

        WdatePicker({ crossFrame: false, startDate: today, dateFmt: 'yyyy-MM-dd', eCont: 'stock_calendar', dateFmt: 'yyyy-MM-dd', skin: 'twoer', specialDates: specialDateArr, onpicking: function (dp) { goToDate(dp.cal.getNewDateStr()) } });
        goToDate(today);
    }
    $.getJSON(ipojson + "?m=stocksummary&callback=?&upcache=1&rnd=" + new Date().getTime(), function (data) {
        var d = null;
        try {
            if (typeof data == "string") {
                d = $.parseJSON(data);
            } else {
                d = data;
            }
        } catch (e) {
            d = null;
        }
        if (d) {
            //新股总貌
            var s = "getContext" in document.createElement("canvas");
            if (s) {
                FusionCharts.setCurrentRenderer('javascript');
            } else {
                FusionCharts.setCurrentRenderer('flash')
            }
            var myChart = new FusionCharts("http://www.p5w.net/images/Charts/Pie3D.swf", "myChart_Count", "255", "140", "0", "1");
            myChart.setXMLData("<chart caption='' captionPadding='0' chartBottomMargin='0' chartTopMargin='0' chartLeftMargin='0' chartRightMargin='0' xAxisNamePadding='0' xAxisName='' yAxisName='' showLegend='0' animation='1' showValues='1' showLabels='0' formatNumberScale='0' showPercentInToolTip='0' BaseFont='Microsoft YaHei' baseFontSize='12' numberPrefix='' decimals='0' ><set label='中小板' value='" + d["Count"]["smes"] + "' color='e8b077' /><set label='创业板' value='" + d["Count"]["chinext"] + "' color='d59067'/><set label='沪市' value='" + d["Count"]["sh"] + "' color='ba5038'/></chart>");
            myChart.render("chart_Count");

            var divs = ['ipl', 'fpl', 'il', 'wl'];
            var listIds = ['InquiryingPriceList', 'FixPriceList', 'IssueList', 'WaitingList'];

            for (var i = 0; i < divs.length; i++) {
                var smes_count = d['Count'][listIds[i]]['smes'];
                $('#' + divs[i] + '_smes').data('count', smes_count).html(smes_count).css({ width: d['Count'][listIds[i]]['smesPercent'] });
                if (smes_count > 0) {
                    var smes_pop = $('<div/>').addClass('pop-box').hide();
                    $(d[listIds[i]]['smes']).each(function () {
                        $('<a href="http://data.p5w.net/ipo/viewstock.php?q=' + this['s1'] + '" target="_blank">' + this['s2'] + '</a>').appendTo(smes_pop);
                    });
                    smes_pop.appendTo($('#' + divs[i] + '_smes'));
                } else {
                    if (d['Count'][listIds[i]]['smesPercent'] == "0") {
                        $('#' + divs[i] + '_smes').hide();
                    }
                }
                var chinext_count = d['Count'][listIds[i]]['chinext'];
                $('#' + divs[i] + '_chinext').data('count', chinext_count).html(chinext_count).css({ width: d['Count'][listIds[i]]['chinextPercent'] });
                if (chinext_count > 0) {
                    var chinext_pop = $('<div/>').addClass('pop-box').hide();
                    $(d[listIds[i]]['chinext']).each(function () {
                        $('<a href="http://data.p5w.net/ipo/viewstock.php?q=' + this['s1'] + '" target="_blank">' + this['s2'] + '</a>').appendTo(chinext_pop);
                    });
                    chinext_pop.appendTo($('#' + divs[i] + '_chinext'));
                } else {
                    if (d['Count'][listIds[i]]['chinextPercent'] == "0") {
                        $('#' + divs[i] + '_chinext').hide();
                    }
                }
                var sh_count = d['Count'][listIds[i]]['sh'];
                $('#' + divs[i] + '_sh').data('count', sh_count).html(sh_count).css({ width: d['Count'][listIds[i]]['shPercent'] });
                if (sh_count > 0) {
                    var sh_pop = $('<div/>').addClass('pop-box').hide();
                    $(d[listIds[i]]['sh']).each(function () {
                        $('<a href="http://data.p5w.net/ipo/viewstock.php?q=' + this['s1'] + '" target="_blank">' + this['s2'] + '</a>').appendTo(sh_pop);
                    });
                    sh_pop.appendTo($('#' + divs[i] + '_sh'));
                } else {
                    if (d['Count'][listIds[i]]['shPercent'] == "0") {
                        $('#' + divs[i] + '_sh').hide();
                    }
                }
            }

            //绑定提示弹出框
            $('.tooltips').each(function () {
                var count = $(this).data('count');
                if (count > 0) {
                    var x = 0 - ($(this).width() / 2);
                    $(this).poshytip({
                        className: 'tip-normal',
                        alignTo: 'target',
                        alignX: 'inner-left',
                        offsetX: 0,
                        offsetY: 5,
                        bgImageFrameSize: 9,
                        content: function (updateCallback) {
                            return '<div class="tip-box">' + $(this).find('.pop-box').html() + "</div>";
                        }
                    });
                }
            });

        }
    });
    $.getJSON(ipojson + "?m=sgxx&num=10&callback=?&upcache=1&rnd=" + new Date().getTime(), function (data) {
        try {
            if (typeof data == "string") {
                data = $.parseJSON(data);
            }
        } catch (e) {
            data = null;
        }
        //申购指南
        var tbody = $('#sgxx-table tbody').empty();
        $(data).each(function (i) {
            var b = i % 2 == 0 ? "1" : "2";
            var arr = [];

            arr.push('<tr class="mt-line' + b + '">');
            arr.push('<td>' + this.s1 + '</td>');//代码
            arr.push('<td>' + this.s2 + '</td>');//证券简称
            arr.push('<td>' + this.s3 + '</td>');//申购代码
            arr.push('<td>' + this.s4 + '</td>');//申购日期
            arr.push('<td>' + this.s5 + '</td>');//发行价
            arr.push('<td>' + this.s6 + '</td>');//发行市盈率
            arr.push('<td>' + this.s7 + '</td>');//发行总数
            arr.push('<td>' + this.s8 + '</td>');//网上发行
            arr.push('<td>' + this.s9 + '</td>');//申购上限
            arr.push('<td>' + this.s10 + '</td>');//中签率
            var s11 = "--";
            if (this.s11) {
                s11 = this.s11;
            }
            arr.push('<td>' + s11 + '</td>');//中签率公告日   
            var s13 = "--";
            if (this.s13) {
                s13 = this.s13;
            }
            arr.push('<td>' + s13 + '</td>');//资金解冻日 
            var s14 = "--";
            if (this.s14) {
                s14 = this.s14;
            } 
            arr.push('<td>' + s14 + '</td>');//上市日期
            if (this.s12) {
                arr.push('<td><a href="' + this.s12 + '" target="_blank">点击查看</a></td>');//
            }
            else {
                arr.push('<td>--</td>');//
            }
            if (this.s15) {
                arr.push('<td><a href="' + this.s15 + '" target="_blank">点击查看</a></td>');//
            } else {
                arr.push('<td>--</td>');//
            }

            arr.push('<td><a href="http://irm.p5w.net/newstock/S' + this.s1 + '" target="_blank">专题</a></td>');//
            arr.push('<td><a href="http://irm.p5w.net/rsc/' + this.s17 + '/' + this.s1 + '/01/index.htm" target="_blank">点击进入</a></td>');//
            arr.push('<td><a href="http://data.p5w.net/stock/ggzx.php?code=' + parseCode(this.s1) + '" target="_blank">公司资讯</a></td>');//
            arr.push('<td><a href="http://irm.p5w.net/ssgs/S' + this.s1 + '" target="_blank">互动</a></td>');//
            arr.push('</tr>');
            $(arr.join('')).appendTo(tbody);
        });
    });
    //$.getJSON(ipojson + "?m=zqxx&callback=?&upcache=1&rnd=" + new Date().getTime(), function (data) {
    //    //中签信息  
    //    try {
    //        if (typeof data == "string") {
    //            data = $.parseJSON(data);
    //        }
    //    } catch (e) {
    //        data = null;
    //    }
    //    var tbody = $('#zqxx-table tbody').empty();
    //    $(data).each(function (i) {
    //        var b = i % 2 == 0 ? "1" : "2";
    //        $('<tr class="mt-line' + b + '"><td>' + this.s1 + '</td><td>' + this.s2 + '</td><td>' + this.s3 + '</td><td>' + this.s4 + '</td><td>' + this.s5 + '</td><td>' + this.s6 + '</td><td>' + this.s7 + '</td><td>' + this.s8 + '</td><td>' + this.s9 + '</td><td>' + this.s10 + '</td><td>' + this.s11 + '</td><td>' + this.s12 + '</td><td>' + this.s13 + '</td><td>' + this.s14 + '</td><td>' + this.s15 + '</td><td><a href="http://chinairm.p5w.net/newstock/newstock.jsp?zqdm=' + this.s1 + '" target="_blank">专题</a></td><td><a href="http://company.p5w.net/ggzx.asp?zqdm=' + this.s1 + '" target="_blank">公司资讯</a></td><td><a href="http://irm.p5w.net/ssgs/S' + this.s1 + '" target="_blank">互动</a></td></tr>').appendTo(tbody);

    //    });
    //});
    $.getJSON(ipojson + "?m=ghxx&callback=?&upcache=1&rnd=" + new Date().getTime(), function (data) {
        //过会信息 
        try {
            if (typeof data == "string") {
                data = $.parseJSON(data);
            }
        } catch (e) {
            data = null;
        }
        var tbody = $('#ghxx-table tbody').empty();
        $(data).each(function (i, row) {
            var _css = "";
            if (i % 2 == 0) {
                _css = "mt-line1";
            } else {
                _css = "mt-line2";
            }
            var arr = [];
            var s6 = row['s6'] == null ? '--' : row['s6'];
            var s8 = row['s8'] == null ? '--' : row['s8'];
            var s9 = row['s9'] == null ? '--' : row['s9'];
            arr.push('<tr class="' + _css + '">');
            arr.push('<td>' + row['s1'] + '</td>');
            //arr.push('<td><a href="' + row['s1'] + '" target="_blank">' + row['s2'] + '</a></td>');
            arr.push('<td>' + row['s2'] + '</td>');
            arr.push('<td>' + row['s3'] + '</td>');
            arr.push('<td>' + row['s4'] + '</td>');
            arr.push('<td>' + row['s5'] + '</td>');
            arr.push('<td>' + s6 + '</td>');
            arr.push('<td>' + row['s7'] + '</td>');
            arr.push('<td>' + s8 + '</td>');
            arr.push('<td>' + s9 + '</td>');
            arr.push('</tr>');
            $(arr.join('')).appendTo(tbody);
        });
    });
});

$(function () {
    $("#content_xggz").jCarouselLite({
        auto: null,//7000,
        speed: 800,
        visible: 6,
        scroll: 1,
        vertical: true,
        onMouse: true,
        direction: true,
        btnNext: "#xggz_next",
        btnPrev: "#xggz_prev"
    });

    $("#xgzt-content").jCarouselLite({
        auto: 3500,
        speed: 800,
        visible: 9,
        scroll: 3,
        onMouse: true,
        btnNext: "#xgzt-arrow-next",
        btnPrev: "#xgzt-arrow-prev"
    });
});


$(function () {
    if (typeof tradingdayData != "undefined") {
        //新股视频
        var data = tradingdayData.ipogclist || [];
        var html = new Array();
        html.push('<ul>');
        for (var i = 0; i < data.length && i < 8; i++) {
            var a = data[i];
            var u = data[i].url;
            var t = data[i].title
            t = t.strLen() > 45 ? t.subCHStr(0, 43) + '...' : t;
            html.push('<li><a href="' + u + '" target="_blank" title="' + t + '">' + t + '</a></li>');
        }
        html.push('</ul>');
        $('#ipogc').html(html.join(''));
    };

    //$.getJSON('http://www.p5w.net/jsdata/gglist.json?rnd=' + new Date().getTime(), function (data) {
    //    try {
    //        if (typeof data == "string") {
    //            data = $.parseJSON(data);
    //        }
    //    } catch (e) {
    //        data = null;
    //    }
    //    if (data.status == 'Y') {
    //        var html = new Array();
    //        html.push('<ul>');
    //        for (var i = 0; i < 8; i++) {
    //            var u = 'http://www.cninfo.com.cn/' + data.gglist[i].link;
    //            var t = data.gglist[i].title;
    //            t = t.strLen() > 45 ? t.subCHStr(0, 43) + '...' : t;
    //            html.push('<li><a href="' + u + '" target="_blank">' + t + '</a></li>');
    //        }
    //        html.push('</ul>');
    //        $('#xggg').html(html.join(''));
    //    }
    //});

    $.getJSON(ipojson + "?m=xggg&num=8&callback=?&upcache=1&rnd=" + new Date().getTime(), function (data) {
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
                t = t.strLen() > 45 ? t.subCHStr(0, 43) + '...' : t;
                html.push('<li><a href="' + u + '" target="_blank">' + t + '</a></li>');
            });
            html.push('</ul>');
            $('#xggg').html(html.join(''));
        }
    });

});

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

function parseCode(code) {
    var p = code.substr(0, 2);
    if (p == '00' || p == '30') {
        return 'sz' + code;
    }
    if (p == '60') {
        return 'sh' + code;
    }
}
jQuery.extend({ evalJSON: function (strJson) { return eval("(" + strJson + ")") } }); jQuery.extend({ toJSONString: function (object) { var type = typeof object; if ('object' == type) { if (Array == object.constructor) type = 'array'; else if (RegExp == object.constructor) type = 'regexp'; else type = 'object' } switch (type) { case 'undefined': case 'unknown': return; break; case 'function': case 'boolean': case 'regexp': return object.toString(); break; case 'number': return isFinite(object) ? object.toString() : 'null'; break; case 'string': return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function () { var a = arguments[0]; return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : "" }) + '"'; break; case 'object': if (object === null) return 'null'; var results = []; for (var property in object) { var value = jQuery.toJSONString(object[property]); if (value !== undefined) results.push(jQuery.toJSONString(property) + ':' + value) } return '{' + results.join(',') + '}'; break; case 'array': var results = []; for (var i = 0; i < object.length; i++) { var value = jQuery.toJSONString(object[i]); if (value !== undefined) results.push(value) } return '[' + results.join(',') + ']'; break } } }); AJAJ_CALLBACKS = {}; function AJAJ_ON_READYSTATE_CHANGE(a, d) { if (AJAJ_CALLBACKS[a]) try { AJAJ_CALLBACKS[a](d) } catch (b) { } } function Ajaj(a, d) { this.id = Number(new Date).toString() + parseInt(10 * Math.random()) + parseInt(10 * Math.random()) + parseInt(10 * Math.random()); this.url = a || ""; this.params = d.parameters || {}; this.onComplete = d.onComplete || this.defaultOnCompleteFunc; this.onLoading = d.onLoading || this.defaultOnLoadingFunc; this.onError = d.onError || this.defaultOnErrorFunc; this._start() } Ajaj.prototype = { _start: function () { this.sender = document.createElement("SCRIPT"); this.sender.id = this.sender.name = "SCRIPT_REQUESTER_" + this.id; this.sender.type = "text/javascript"; document.getElementsByTagName("head")[0].appendChild(this.sender); this.loadData() }, parseParams: function () { var a = ""; if (this.params) for (var d in this.params) if (d != "toJSONString") a += d + "=" + this.params[d] + "&"; a += "crossdomain=" + this.id + "&from=" + window.location.host; return a }, loadData: function () { if (this.sender) { this.onLoading(); try { AJAJ_CALLBACKS[this.id] = null; AJAJ_CALLBACKS[this.id] = function (c) { this.onComplete(c); window.setTimeout(this.destroy.bind(this), 100) }.bind(this); this.sender.onreadystatechange = this.sender.onload = function () { }; var a = this.parseParams(this.params), d = ""; d = this.url.indexOf("?") != -1 ? this.url + "&" + a : this.url + "?" + a; this.sender.src = d } catch (b) { this.onError(e) } } }, defaultOnCompleteFunc: function () { }, defaultOnLoadingFunc: function () { }, defaultOnErrorFunc: function () { }, destroy: function () { this.onComplete = function () { }; delete AJAJ_CALLBACKS[this.id]; this.sender && document.getElementsByTagName("head")[0].removeChild(this.sender); this.sender = null } }; Function.prototype.bind = function (object) { var __method = this; return function () { return __method.apply(object, arguments) } }; Function.prototype.bind2 = function (object) { var __method = this; var argu = Array.prototype.slice.call(arguments, 1); return function () { return __method.apply(object, argu, arguments) } }
function gotohq() {
    open('http://hq.p5w.net/')
}
; (function ($) {
    $.hqLoader = function (el, options) {
        $.hqLoader.defaultOptions = {
            stocks: [],
            class_render: 'render',
            updateInterval: 15000,
            jsonSrv: 'http://www.p5w.net/jsdata/',
            hqUrl: 'http://data.p5w.net/stock/market.php?code=@code@',
            timeInfoStr: '570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,599,600,601,602,603,604,605,606,607,608,609,610,611,612,613,614,615,616,617,618,619,620,621,622,623,624,625,626,627,628,629,630,631,632,633,634,635,636,637,638,639,640,641,642,643,644,645,646,647,648,649,650,651,652,653,654,655,656,657,658,659,660,661,662,663,664,665,666,667,668,669,670,671,672,673,674,675,676,677,678,679,680,681,682,683,684,685,686,687,688,689,781,782,783,784,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,804,805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830,831,832,833,834,835,836,837,838,839,840,841,842,843,844,845,846,847,848,849,850,851,852,853,854,855,856,857,858,859,860,861,862,863,864,865,866,867,868,869,870,871,872,873,874,875,876,877,878,879,880,881,882,883,884,885,886,887,888,889,890,891,892,893,894,895,896,897,898,899,900',
            chartWidth: 270,
            chartHeight: 135
        };
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("hqLoader", base);
        base.init = function () {
            base.options = $.extend({},
            $.hqLoader.defaultOptions, options);
            base.updateHandle = new Array();
            base.chartSeries = new Array();
            base.charts = new Array();
            if (base.options.stocks.length <= 0) return;
            var tmphtml = new Array();
            tmphtml.push('<div class="tabs">');
            tmphtml.push('<div class="tabsHead">');
            tmphtml.push('<div class="innerTabsHead">');
            tmphtml.push('<ul>');
            for (var i = 0; i < base.options.stocks.length; i++) {
                var n = base.options.stocks[i];
                var m = typeof n.tab == "undefined" ? n.name : n.tab;
                tmphtml.push('<li>' + m + '</li>')
            }
            tmphtml.push('</ul>');
            tmphtml.push('</div>');
            tmphtml.push('</div>');
            tmphtml.push('<div class="indexs_container">');
            for (var i = 0; i < base.options.stocks.length; i++) {
                var n = base.options.stocks[i];
                tmphtml.push('<div class="tabBox" style="display:none;">');
                tmphtml.push('<dl>');
                tmphtml.push('<dt><span class="n1"><a href="' + base.options.hqUrl.replace('@code@', n.code) + '" target="_blank">' + n.name + '</a></span><span class="n2">--</span><span class="n3">--</span><span class="n4">--</span></dt>');
                tmphtml.push('<dd>');
                tmphtml.push('<div class="chart" style="width:' + base.options.chartWidth + 'px; height:' + base.options.chartHeight + 'px;">');
                tmphtml.push('<img src="http://www.p5w.net/images/loading.gif" alt="" />');
                tmphtml.push('</div>');
                tmphtml.push('</dd>');
                tmphtml.push('</dl>');
                tmphtml.push('</div>')
            }
            tmphtml.push('</div>');
            tmphtml.push('</div>');
            base.$el.html(tmphtml.join(''));
            base.$el.find('.tabsHead li').eq(0).addClass('hover');
            base.$el.find('.tabBox').eq(0).show();
            base.tabs = base.$el.find('.tabs');
            base.charts = base.$el.find('.chart');
            base.tabs.Tabs({
                fadeSpeed: 0,
                TabEvent: 'click',
                onHover: function (idx, tabsDiv) {
                    if (!$($(tabsDiv).get(idx)).find('dd').hasClass(base.options.class_render)) {
                        base.loadData(idx)
                    }else{
                        base.updateChart(idx);
                    }
                }
            });
            base.tabs.find("li:first-child").trigger("click")
        };
        base.loadData = function (index) {
            var stockCode = base.options.stocks[index].code;
            if (!stockCode) return;
            var market = stockCode.substr(0, 2);
            var code = stockCode.substr(2, 6);
            var args = {
                method: 'get', onComplete: function (rep) {
                    var data = base.parseData(rep);
                    if (!data || data.indexHq.length==0 || data.points.length==0) return;
                    base.drawMinLine(data.indexHq, data.points, index, stockCode, null);
                    base.charts.eq(index).parent().addClass(base.options.class_render);
                }.bind(this)
            };

            infoURL = 'http://hq.p5w.net/info/data.py/quick?cmd=' + stockCode + '|00000000|000000|0|' + Math.random().toString();
            var myAjaj = new Ajaj(infoURL, args);
        };
        base.updateChart = function (index) {
            var loadhq = function (flash) {               
                var series = base.chartSeries[index];
                if (!series) return;
                var s = new Date();
                var hour = s.getHours();
                var min = s.getMinutes();
                var _sTime = hour * 60 + min;
                var _day = s.getDay();
                if ((_sTime >= 565 && _sTime <= 691) || (_sTime >= 780 && _sTime <= 905)) {
                    var args = {
                        method: 'get', onComplete: function (rep) {
                            var data = base.parseData(rep);
                             if (!data || data.indexHq.length==0 || data.points.length==0) return;
                            var tmptickPositions = base.getTickPositions(data.points);
                            series.yAxis.setOptions($.extend({},
                            series.yAxis.options, {
                                tickPositions: tmptickPositions,
                                opposite: true
                            }));
                            series.setData(data.indexHq, true);
                            base.setRealtimeData(data.points, index, flash);
                        }.bind(this)
                    };
                    var code = base.options.stocks[index].code;
                    infoURL = 'http://hq.p5w.net/info/data.py/quick?cmd=' + code + '|00000000|000000|0|' + Math.random().toString();
                    var myAjaj = new Ajaj(infoURL, args);                   
                }
                if (base.updateHandle[index]) {
                    clearTimeout(base.updateHandle[index]);
                }
                base.updateHandle[index] = setTimeout(function () {
                    loadhq(true);
                },
                base.options.updateInterval);
            };
            loadhq(false);
        };
        base.parseData = function (dataStr) {
            try {
                var retObj = $.parseJSON(dataStr);
            }
            catch (e) {
                return { "indexHq": [], "points": [] };
            }
            if (!retObj.ret || retObj.ret != "OK") {
                return { "indexHq": [], "points": [] };
            }
            var instant = retObj.info.instant;
            //last open high low now dif diffpercent
            //0 1 5 6 2
            var last = parseFloat(instant[0]);
            var open = parseFloat(instant[1]);
            var high = parseFloat(instant[5]);
            var low = parseFloat(instant[6]);
            var now = parseFloat(instant[2]);
            var dif = 0.00;
            var diffpercent = 0.00;
            dif = now - last;
            if (last != 0) {
                diffpercent = dif / last;
            }
            var points = [last, open, high, low, now, dif, diffpercent];
            var timeInfo = base.options.timeInfoStr.split(',');
            var history = retObj.info.history;
            var indexHq = [];
            for (var i = 0; i < timeInfo.length; i++) {
                var time = timeInfo[i] * 60000;
                var value = null;
                if (history[i]) {
                    value = history[i][0];
                }
                indexHq.push([time, value]);
            }
            return { "indexHq": indexHq, "points": points };
        };
        base.drawMinLine = function (data, points, index, url, param) {
            Highcharts.setOptions({
                global: {
                    useUTC: true
                },
                lang: {
                    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                }
            });
            var plotLines = base.getPlotLines(points);
            var tickPositions = base.getTickPositions(points);
            base.setRealtimeData(points, index, false);
            new Highcharts.StockChart({
                chart: {
                    renderTo: base.charts.eq(index)[0],
                    borderWidth: 0,
                    borderRadius: 0,
                    borderColor: '#dddddd',
                    width: base.options.chartWidth,
                    height: base.options.chartHeight,
                    events: {
                        load: function () {
                            var series = this.series[0];
                            base.chartSeries[index] = series;
                            base.updateChart(index);
                        }
                    }
                },
                loading: {
                    style: {
                        backgroundColor: 'silver'
                    },
                    labelStyle: {
                        color: 'white'
                    }
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: true,
                    text: 'p5w.net',
                    href: 'javascript:gotohq()',
                    position: {
                        align: 'right',
                        x: -50,
                        verticalAlign: 'bottom',
                        y: -35
                    },
                    style: {
                        cursor: 'pointer',
                        color: '#999999',
                        fontSize: '10px',
                        fontFamily: "Arial"
                    }
                },
                rangeSelector: {
                    enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                tooltip: {
                    backgroundColor: {
                        linearGradient: [0, 0, 0, 200],
                        stops: [[0, 'rgba(96, 96, 96, .8)'], [1, 'rgba(16, 16, 16, .8)']]
                    },
                    borderWidth: 0,
                    style: {
                        color: '#FFF'
                    },
                    formatter: function () {
                        var s = '<b>' + Highcharts.dateFormat('%H:%M', this.x) + '</b>';
                        $.each(this.points,
                        function (i, point) {
                            s += '<br/>' + new Number(point.y).toFixed(2)
                        });
                        return s
                    }
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        second: '%H:%M',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%H:%M',
                        week: '%H:%M',
                        month: '%H:%M',
                        year: '%H:%M'
                    },
                    gridLineDashStyle: "dash",
                    gridLineWidth: 0.5,
                    tickPositions: [570 * 60 * 1000, 630 * 60 * 1000, 690 * 60 * 1000, 840 * 60 * 1000, 900 * 60 * 1000],
                    labels: {
                        style: {
                            position: 'absolute',
                            color: '#0086d2',
                            fontFamily: 'Consolas',
                            fontSize: '11px'
                        },
                        formatter: function () {
                            var time = this.value / (1000 * 60);
                            var min = time % 60;
                            var str = (time - min) / 60 + ":";
                            str = min < 10 ? str + "0" + min : str + min;
                            if (time == 690) str += "/" + "13:00";
                            if (time == 630 || time == 840) return "";
                            return str
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    showLastLabel: true,
                    opposite: true,
                    labels: {
                        formatter: function () {
                            return new Number(this.value).toFixed(0)
                        },
                        align: 'left',
                        x: 3,
                        y: 3,
                        style: {
                            color: '#272727',
                            fontFamily: 'Consolas',
                            fontSize: '11px'
                        }
                    },
                    gridLineWidth: 0.5,
                    plotLines: null,
                    tickPositions: tickPositions
                },
                navigator: {
                    enabled: false
                },
                series: [{
                    color: '#f00000',
                    data: data,
                    threshold: null,
                    type: 'area',
                    tooltip: {
                        valueDecimals: 2
                    },
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [[0, '#fffab0'], [1, 'rgba(255 ,250 ,176,0)']]
                    }
                }]
            })
        };
        base.setRealtimeData = function (points, index, flash) {           
            try {
                var open = parseFloat(points[0]);
                var height = parseFloat(points[2]);
                var low = parseFloat(points[3]);
                var now = parseFloat(points[4]);
                var dif = parseFloat(points[5]);
                var diffpercent = parseFloat(points[6])
            } catch (e) { }
            var dt = base.charts.eq(index).parent().parent().find('dt');
            dt.removeClass('red').removeClass('green');
            if (dif > 0) {
                dt.addClass('red')
            } else if (dif < 0) {
                dt.addClass('green')
            }
            var n1 = $('.n1', dt);
            var n2 = $('.n2', dt);
            var n3 = $('.n3', dt);
            var n4 = $('.n4', dt);
            if (flash) {
                var bgcolor = "#e1fce1";
                var oldbgcolor = "#ffffff";
                if (dif > 0) {
                    bgcolor = "#f9e0e1"
                } else if (dif < 0) {
                    bgcolor = "#e1fce1"
                }
                n2.css({
                    background: bgcolor
                }).html(now.toFixed(2));
                n3.css({
                    background: bgcolor
                }).html(dif.toFixed(2));
                n4.css({
                    background: bgcolor
                }).html((diffpercent * 100).toFixed(2) + '%');
                setTimeout(function () {
                    n2.css({
                        background: oldbgcolor
                    });
                    n3.css({
                        background: oldbgcolor
                    });
                    n4.css({
                        background: oldbgcolor
                    })
                },
                1000)
            } else {
                n2.html(now.toFixed(2));
                n3.html(dif.toFixed(2));
                n4.html((diffpercent * 100).toFixed(2) + '%')
            }
        };
        base.getPlotLines = function (points) {
            var plotLines = null;
            var open = 0.00;
            try {
                if (points && points.length > 3) {
                    open = parseFloat(points[0])
                }
            } catch (e) { }
            plotLines = [{
                value: open,
                color: '#999999',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: ''
                }
            }];
            return plotLines
        };
        base.getTickPositions = function (points) {
            var open = 0.00;
            var low = 0.00;
            var hei = 0.00;
            var now = 0.00;
            var dif = 0.00;
            var tickPositions = null;
            try {
                open = parseFloat(points[0]);
                hei = parseFloat(points[2]);
                low = parseFloat(points[3]);
                now = parseFloat(points[4]);
                dif = parseFloat(points[5])
            } catch (e) { }
            var maxl = 0.00;
            var maxh = 0.00;
            var sp = 0.00;
            if (hei <= 0) {
                hei = open
            }
            if (low <= 0) {
                low = open
            }
            if (Math.abs(open - low) > Math.abs(open - hei)) {
                maxl = low;
                sp = Math.abs(low - open);
                maxh = open + sp
            } else {
                sp = Math.abs(hei - open);
                maxl = open - sp;
                maxh = hei
            }
            tickPositions = [parseFloat(maxl).toFixed(2), parseFloat(open - sp / 2).toFixed(2), parseFloat(open).toFixed(2), parseFloat(open + sp / 2).toFixed(2), parseFloat(maxh).toFixed(2)];
            return tickPositions
        };
        base.init()
    };
    $.fn.hqLoader = function (options) {
        return this.each(function () {
            (new $.hqLoader(this, options))
        })
    }
})(jQuery);
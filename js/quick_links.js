/**
 * 右侧快速操作
*/
jQuery(function ($) {
    //创建DOM
    var quickHTML = '<div class="quick_links_panel"><div id="quick_links" class="quick_links"><a href="#top" class="return_top"><i class="top"></i><span>返回顶部</span></a><a href="#" class="stock_query"><i class="qa"></i><span>查行情</span></a><a href="#" class="stock_views"><i class="view"></i><span>最近访问</span></a></div><div class="quick_toggle"><a href="javascript:;" class="toggle" title="展开/收起">×</a></div></div><div id="quick_links_pop" class="quick_links_pop hide"></div>',
	quickShell = $(document.createElement('div')).html(quickHTML).addClass('quick_links_wrap'),
	quickLinks = quickShell.find('.quick_links');
    quickPanel = quickLinks.parent();
    quickShell.appendTo('body');

    //具体数据操作 
    var quickPopXHR,
    popTmpl = '<div class="title"><h3><%=title%></h3></div><div class="pop_panel"><%=content%></div><div class="arrow"><i></i></div><div class="fix_bg"></div>',
	stock_queryTmpl = '<div class="input-group"><input type="hidden" name="quick_stockcode" id="quick_stockcode" /><input class="input1" type="text" name="quick_stockname" value="拼音/代码/名称" id="quick_stockname" /><div class="input-group-addon input2"><select name="quick_viewtype" id="quick_viewtype"><option value="index">实时行情</option><option value="qgqp">千股千评</option><option value="lsgg">临时公告</option><option value="ggzx">个股资讯</option><option value="bulkholdfund">重仓基金</option><option value="cwzb">财务指标</option><option value="ylyc">盈利预测</option></select><button type="button" id="quick_viewstock">查行情</button></div></div>',
    loadingTmpl = '<div class="loading" style="padding:30px 80px"><i></i><span>Loading...</span></div>',
	quickPop = quickShell.find('#quick_links_pop'),
	quickDataFns = {
	    //最近浏览
	    stock_views: {
	        title: '最近访问',
	        content: loadingTmpl,
	        lastVisit: [],
	        init: function (ops) {
	            ops.lastVisit = [];
	            if (ops.lastVisit.length == 0) {
	                //获取最近访问
	                $.getJSON("http://data.p5w.net/stock/stockjson.php?m=history&callback=?", function (data) {
	                    if (data && data.length > 0) {
	                        for (var i = 0; i < data.length; i++) {
	                            var items = data[i];
	                            if (items) {
	                                var stockType = items.substr(0, 2).toUpperCase();
	                                var stockCode = items.substr(2, 6);
	                                var tmp = [];
	                                tmp.push(stockCode, stockType);
	                                ops.lastVisit.push(tmp);
	                            }
	                        }

	                    } else {
	                        ops.lastVisit = [["000001", "SZ"], ["000002", "SZ"], ["000004", "SZ"], ["000001", "SH"], ["399001", "SZ"]];
	                    }
	                    ops.start();

	                });
	            } else {
	                ops.start();
	            }
	        },
	        start: function () {
	            if (this.lastVisit.length >= 1) {
	                var args = {
	                    method: 'get', onComplete: function (rep) {
	                        var ret = rep;
	                        var retObj = $.parseJSON(ret);
	                        for (var i = 0; i < this.lastVisit.length; i++) {
	                            var tmpStock
	                            if (retObj[this.lastVisit[i][1].toLowerCase() + this.lastVisit[i][0]])
	                                this.lastVisit[i].push(decodeURIComponent(retObj[this.lastVisit[i][1].toLowerCase() + this.lastVisit[i][0]]));
	                        }
	                        this._update();

	                    }.bind(this)
	                };
	                var infoURL = '';
	                for (var i = 0; i < this.lastVisit.length; i++) {
	                    infoURL += this.lastVisit[i][1].toLowerCase() + this.lastVisit[i][0] + ',';
	                }
	                infoURL = 'http://hq.p5w.net/info/sCode.py/get.znzDo?cmd=' + infoURL + '|' + Math.random().toString();

	                var myAjaj = new Ajaj(infoURL, args);
	            }
	        },
	        _update: function () {
	            if (this.lastVisit.length >= 1) {
	                var args = {
	                    method: 'get',
	                    onComplete: function (rep) {
	                        var ret = rep;
	                        this._set(ret);
	                    }.bind(this)
	                };

	                var infoURL = '';
	                for (var i = 0; i < this.lastVisit.length; i++) {
	                    infoURL += this.lastVisit[i][1].toLowerCase() + this.lastVisit[i][0] + ',';
	                }
	                infoURL = 'http://hq.p5w.net/info/data.py/prices.znzDo?cmd=' + infoURL + '|' + Math.random().toString();
	                var myAjaj = new Ajaj(infoURL, args);
	            }
	        },
	        _set: function (retStr) {
	            var retObj = $.parseJSON(retStr);
	            for (var i = 0; i < this.lastVisit.length; i++) {
	                if (retObj[this.lastVisit[i][1].toLowerCase() + this.lastVisit[i][0]]) {
	                    if (this.lastVisit[i].length == 3) {
	                        this.lastVisit[i].push(retObj[this.lastVisit[i][1].toLowerCase() + this.lastVisit[i][0]]);
	                    }
	                    else if (this.lastVisit[i].length == 4) {
	                        this.lastVisit[i][3] = retObj[this.lastVisit[i][1].toLowerCase() + this.lastVisit[i][0]];
	                    }
	                    else {
	                    }
	                }
	            }
	            var div = '<table class="table_list">';
	            var tmpList = new Array();
	            for (var i = 0; i < this.lastVisit.length; i++) {
	                tmpList.push(this.lastVisit[i]);
	            }
	            tmpList.reverse();
	            for (var i = 0; i < tmpList.length; i++) {
	                var color = '';
	                var nfix = 2;
	                var curValue;
	                var curRate;
	                var _css = "row1";
	                if (i % 2 == 0) {
	                    _css = "row2";
	                }
	                div += '<tr class="' + _css + '">';
	                if (tmpList[i][3]) {
	                    if (tmpList[i][3][0] == 1)
	                        nfix = 3;
	                    if (tmpList[i][3][2] > tmpList[i][3][1])
	                        color = 'up';
	                    if (tmpList[i][3][2] < tmpList[i][3][1])
	                        color = 'down';
	                    if (tmpList[i][3][2] == 0) {
	                        curValue = '--';
	                        curRate = '--%';
	                        color = '';
	                    }
	                    else {
	                        curValue = tmpList[i][3][2].toFixed(nfix);
	                        var tmpVal = (tmpList[i][3][2] - tmpList[i][3][1]) / tmpList[i][3][1] * 100;
	                        if (tmpVal > 10.00)
	                            curRate = tmpVal.toFixed(2) + '%';
	                        else
	                            curRate = tmpVal.toFixed(2) + '%';
	                    }
	                }
	                else {
	                    curValue = '--';
	                    curRate = '--%';
	                    color = '';
	                }
	                div += '<td><a href="http://data.p5w.net/stock/index.php?code=' + tmpList[i][1].toLowerCase() + tmpList[i][0] + '" target="_blank" >' + decodeURIComponent(tmpList[i][2]) + '</a></td>';
	                div += '<td><span class="' + color + '" style="margin-left: 15px;">' + curValue + '</span></td>';
	                div += '<td><span class="' + color + '" style="margin-left: 15px;">' + curRate + '</span></td>';
	                div += '</tr>';
	            }
	            div += '</table>';
	            quickPop.html(p5w.tmpl(popTmpl, {
	                title: this.title,
	                content: '<div class="quick_stock_views_list"><div class="inner">' + div + '</div></div>'
	            }));
	        }
	    },
	    //个股查询
	    stock_query: {
	        title: '个股查询',
	        content: loadingTmpl,
	        init: function (ops) {
	            quickPop.html(p5w.tmpl(popTmpl, {
	                title: ops.title,
	                content: stock_queryTmpl
	            }));

	            var query_stock_code = $('#quick_stockcode');
	            if (query_stock_code.length) {
	                var autoNoResult = "\u6ca1\u6709\u6570\u636e";
	                var config = {
	                    limit: 6, //显示数据的条数
	                    source: 'http://hq.p5w.net',
	                    label: '拼音/代码/名称',
	                    showIndex: 0,
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
	                            $(this).val('').addClass("nt");
	                            query_stock_code.val("");
	                        }
	                    }
	                };
	                $('#quick_stockname').click(function (h) {
	                    $(this).stocksuggest({
	                        disabled: true
	                    })
	                }).bind("keydown keyup input", function () {
	                    $(this).stocksuggest({
	                        disabled: false
	                    })
	                }).inputValueFb({
	                    value: '拼音/代码/名称'
	                }).stocksuggest(config);
	                $('#quick_viewstock').click(function () {
	                    var reg = new RegExp(/^[szsh0-9]/);
	                    if (!reg.test(query_stock_code.val().toLowerCase()) || query_stock_code.val().length != 8) {
	                        p5w.dialog("请输入正确的公司代码。");
	                        //$('#query_stock_name').attr('placeholder','请输入正确的公司代码!');
	                        return;
	                    }
	                    open('http://data.p5w.net/stock/index.php?code=' + query_stock_code.val().toLowerCase());
	                });
	            }
	        }
	    }
	};

    //showQuickPop
    var prevPopType, prevTrigger, doc = $(document), popDisplayed = false,
	hideQuickPop = function () {
	    if (prevTrigger) {
	        prevTrigger.removeClass('current');
	    }
	    popDisplayed = false;
	    prevPopType = '';
	    quickPop.hide();
	},
	showQuickPop = function (type) {
	    if (quickPopXHR && quickPopXHR.abort) {
	        quickPopXHR.abort();
	    }
	    if (type !== prevPopType) {
	        var fn = quickDataFns[type];
	        quickPop.html(p5w.tmpl(popTmpl, fn));
	        fn.init.call(this, fn);
	    }
	    //doc.unbind('click.quick_links').one('click.quick_links', hideQuickPop);

	    quickPop[0].className = 'quick_links_pop quick_' + type;
	    popDisplayed = true;
	    prevPopType = type;
	    quickPop.show();
	};
    quickShell.bind('click.quick_links', function (e) {
        e.stopPropagation();
    });

    //通用事件处理
    var view = $(window),
	quickLinkCollapsed = !!p5w.getCookie('ql_collapse'),
	getHandlerType = function (className) {
	    return className.replace(/current/g, '').replace(/\s+/, '');
	},
	showPopFn = function () {
	    var type = getHandlerType(this.className);
	    if (popDisplayed && type === prevPopType) {
	        return hideQuickPop();
	    }
	    showQuickPop(this.className);
	    if (prevTrigger) {
	        prevTrigger.removeClass('current');
	    }
	    prevTrigger = $(this).addClass('current');
	},
	quickHandlers = {
	    //个股查询
	    stock_views: showPopFn,
	    stock_query: showPopFn,
	    //返回顶部
	    return_top: function () {
	        p5w.scrollTo(0, 0);
	        hideReturnTop();
	    },
	    toggle: function () {
	        quickLinkCollapsed = !quickLinkCollapsed;
	        if (quickLinkCollapsed) {
	            hideQuickPop();
	        }
	        quickShell[quickLinkCollapsed ? 'addClass' : 'removeClass']('quick_links_min');
	        p5w.setCookie('ql_collapse', quickLinkCollapsed ? '1' : '', 30);
	    }
	};
    quickShell.delegate('a', 'click', function (e) {
        var type = getHandlerType(this.className);
        if (type && quickHandlers[type]) {
            quickHandlers[type].call(this);
            e.preventDefault();
        }
    });

    //Return top
    var scrollTimer, resizeTimer, minWidth = 1350;

    function resizeHandler() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(checkScroll, 160);
    }
    function checkResize() {
        quickShell[view.width() > 1340 ? 'removeClass' : 'addClass']('quick_links_dockright');
    }
    function scrollHandler() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkResize, 160);
    }
    function checkScroll() {
        view.scrollTop() > 100 ? showReturnTop() : hideReturnTop();
    }
    function showReturnTop() {
        quickPanel.addClass('quick_links_allow_gotop');
    }
    function hideReturnTop() {
        quickPanel.removeClass('quick_links_allow_gotop');
    }

    view.bind('scroll.go_top', resizeHandler).bind('resize.quick_links', scrollHandler);
    quickLinkCollapsed && quickShell.addClass('quick_links_min');
    resizeHandler();
    scrollHandler();
});
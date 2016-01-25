var urls = { "psp": "http://passport.p5w.net", "data": "http://data.p5w.net", "buy": "http://buy.p5w.net" };
var hqServer = "http://hq.p5w.net";
var jsonSrv = "http://www.p5w.net/jsdata/";
var hqUrl = "http://data.p5w.net/stock/index.php?code=";
var irmSrv = "http://irm.p5w.net/";
var ircsSrv = "http://ircs.p5w.net/";

(function ($, undefined) {
    $.fn.inputValueFb = function (a) {
        var b = a && a.value !== "undefined" ? a.value : $(this).val();
        $(this).focus(function () {
            if ($(this).val() == b) {
                $(this).val("").removeClass("nt").select()
            }
        }).blur(function () {
            if ($(this).val() == "") {
                $(this).val(b).addClass("nt")
            }
        });
        return $(this)
    };
    $.widget("ui.autocomplete", $.ui.autocomplete, {
        options: {
            limit: 10,
            letter_show: false,
            noResult: {
                id: null,
                result: null
            }
        },
        _initSource: function () {
            var array, url,
                that = this;
            if ($.isArray(this.options.source)) {
                array = this.options.source;
                this.source = function (request, response) {
                    response($.ui.autocomplete.filter(array, request.term, that.options));
                };
            } else if (typeof this.options.source === "string") {
                url = this.options.source;
                this.source = function (request, response) {
                    if (that.xhr) {
                        that.xhr.abort();
                    }
                    that.xhr = $.ajax({
                        url: url,
                        data: request,
                        dataType: "json",
                        success: function (data) {
                            response(data);
                        },
                        error: function () {
                            response([]);
                        }
                    });
                };
            } else {
                this.source = this.options.source;
            }
        },
        _renderItem: function (ul, item, cl) {
            return $("<li class='" + cl + "'></li>").append($("<a>" + item.result + "</a>")).appendTo(ul)
        },
        _normalize: function (items) {
            if (items.length && items[0].label && items[0].value) {
                return items.slice(0, this.options.limit)
            }
            return $.map(items,
                function (item) {
                    if (typeof item === "string") {
                        return {
                            label: item,
                            value: item,
                            result: item
                        }
                    }
                    return $.extend({
                        label: item.label || item.value,
                        value: item.value || item.label,
                        result: item.result || item.result
                    },
                        item)
                }).slice(0, this.options.limit)
        }
    });
    $.extend($.ui.autocomplete, {
        filter: function (array, term, options) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
            var data = $.grep(array,
                function (value) {
                    return matcher.test(value.label || value.value || value)
                });
            function __highlight(s, t) {
                var mt = new RegExp("(" + $.ui.autocomplete.escapeRegex(t) + ")", "i");
                return s.replace(mt, "<span class='r'>$1</span>")
            }
            function sortCB(a, b) {
                return a.pos - b.pos
            };
            function sortData(term) {
                var isEn = false;
                var pattern = /^[\u4E00-\u9FA5]+$/;
                if (!pattern.test(term)) {
                    isEn = true
                }
                if (typeof data[0] === 'undefined') {
                    if (options.noResult.id != null) {
                        return [{
                            id: options.noResult.id,
                            result: options.noResult.result
                        }]
                    } else {
                        return [{
                            result: '没有找到相关信息'
                        }]
                    }
                }
                if (typeof data[0] !== 'string') {
                    $.each(data,
                        function (ii, d) {
                            var sub = term;
                            var s = data[ii].label;
                            if (isEn) {
                                data[ii].pos = s.toLowerCase().replace(/[\u4E00-\u9FA5]/g, '').indexOf(sub)
                            } else {
                                data[ii].pos = s.toLowerCase().indexOf(sub)
                            }
                            if (s.indexOf("|") > 0) {
                                var ar = s.split("|");
                                if (matcher.test(ar[0])) {
                                    data[ii].result = data[ii].value
                                } else if (matcher.test(ar[1])) {
                                    data[ii].result = options.letter_show ? data[ii].value + "(" + ar[1] + ")" : data[ii].value
                                } else if (matcher.test(ar[2])) {
                                    data[ii].result = options.letter_show ? data[ii].value + "(" + ar[2] + ")" : data[ii].value
                                }
                            } else {
                                data[ii].result = data[ii].label
                            }
                            data[ii].result = __highlight(data[ii].result, term);
                        });
                    return data.sort(sortCB)
                } else {
                    return data.sort(function (a, b) {
                        return a.toLowerCase().indexOf(term) - b.toLowerCase().indexOf(term)
                    })
                }
            };
            return sortData(term)
        }
    });
})(jQuery);
var Base = function () { };
Base.is_ie = /msie/i.test(navigator.userAgent);
Base.is_ie6 = (Base.is_ie && /msie 6\.0/i.test(navigator.userAgent));
Base.is_opera = /opera/i.test(navigator.userAgent);
Base.setCookie = function (name, value, expires, path, domain) {
    var str = name + "=" + escape(value);
    if (expires) {
        if (expires == 'never') {
            expires = 100 * 365 * 24 * 60;
        }
        var exp = new Date();
        exp.setTime(exp.getTime() + expires * 60 * 1000);
        str += "; expires=" + exp.toGMTString();
    }
    if (path) {
        str += "; path=" + path;
    }
    if (domain) {
        str += "; domain=" + domain;
    }
    document.cookie = str;
};
Base.getCookie = function (c) {
    var d = document.cookie.indexOf(c + "=");
    var a = d + c.length + 1;
    if ((!d) && (c != document.cookie.substring(0, c.length))) {
        return null
    }
    if (d == -1) {
        return null
    }
    var b = document.cookie.indexOf(";", a);
    if (b == -1) {
        b = document.cookie.length
    }
    return decodeURI(document.cookie.substring(a, b))
};
Base.delCookie = function (b, c, a) {
    if (Base.getCookie(b)) {
        document.cookie = b + "=" + ((c) ? ";path=" + c : "") + ((a) ? ";domain=" + a : ";domain=.bankrate.com.cn") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT"
    }
};
Base.$ = function (b) {
    var a = null;
    if (typeof (b) == "object") {
        a = b
    } else {
        a = document.getElementById(b)
    }
    if (!a) {
        return null
    }
    return a
};
Base.$F = function (a) {
    return document.getElementById(a).value
};
Base.createElement = function (d, a, b) {
    var c = null;
    if (document.createElementNS) {
        c = document.createElementNS("http://www.w3.org/1999/xhtml", d)
    } else {
        c = document.createElement(d)
    }
    if (typeof a != "undefined") {
        a.appendChild(c)
    }
    if (typeof b != "undefined") {
        if (b.indexOf(":") > 0) {
            c.style.cssText = b
        } else {
            c.className = b
        }
    }
    return c
};
Base.createForm = function (c) {
    var b = Base.$(c);
    if (b) {
        b.parentNode.removeChild(b)
    }
    var a = "height:0px;width:0px;display:none;";
    b = Base.createElement("form", document.getElementsByTagName("body")[0], a);
    b.id = b.name = c;
    b.addData = function (e, d, g) {
        if (g == null) {
            g = "text"
        }
        var f = this.getElementsByTagName("input")[e];
        f = document.createElement("input");
        this.appendChild(f);
        f.id = e;
        f.name = e;
        f.value = d;
        f.type = g
    };
    return b
};
Base.createFrame = function (c, a) {
    var b = Base.$(c);
    if (b) {
        b.parentNode.removeChild(b)
    }
    if (a) {
        b = Base.createElement("iframe", a)
    } else {
        b = Base.createElement("iframe")
    }
    b.style.cssText = "height:0px;width:0px;display:none;";
    b.setAttribute("frameborder", "0");
    b.id = b.name = c;
    b.src = "javascript:;";
    if (a) {
        a.appendChild(b)
    } else {
        document.getElementsByTagName("body")[0].appendChild(b)
    }
    window.frames[c].name = c;
    return b;

};
Base.dialog = function (e, g, i, b) {
    g = g ? g : function () { };
    var buttons = {
        '确定': function () {
            if (typeof g == 'function') {
                g.call(this);
            }
            $(this).dialog("close");
        }
    };
    if (typeof b != "undefined") {
        buttons = $.extend({}, b, buttons);
    }
    var f = '<div><div class="tips_login">' + e + '<div class="cntDown">' + g + '秒后关闭</div><div class="close" title="关闭">x</div></div><div class="orders_shadow">' + (Base.is_ie6 ? '<iframe src="javascript:;" style="border:none;width:100%;height:100%;opacity:0;filter:alpha(opacity = 0)"></iframe>' : "") + "</div></div>";
    var d = $('#dialog-message');
    if (d.length <= 0) {
        d = $('<div id="dialog-message" title="提示信息"></div>').appendTo($('body'));
    }
    d.html('<p>' + e + '</p>').dialog({
        modal: true,
        dialogClass: 'p5w-dialog',
        closeText: '关闭',
        resizable: false,
        buttons: buttons
    });
    d.dialog('open');
    if (i) {
        if (window["dialog-timer"]) {
            clearTimeout(window["dialog-timer"]);
        }
        window["dialog-timer"] = setTimeout(function () {
            d.dialog('close');
        }, i);
    }
};

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

function topso() {
    var sq = $('#sq').val();
    if (sq == "") {
        alert("请输入搜索关键词！");
        return false;
    }
    window.open("/so.html?sq=" + encodeURIComponent(sq));
    return false;
}

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

$(function () {
    ipoList();
    if (Base.is_ie6) {
        var st;
        $(window).scroll(function () {
            st = $(document).scrollTop();
            var offsetTop = 170 + st;
            $(".duilianl,.duilianr").css("top", offsetTop);
        }).resize(function () {
            st = $(document).scrollTop();
            var offsetTop = 170 + st;
            $(".duilianl,.duilianr").css("top", offsetTop);
        });
    };
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

    var l1 = $("#xfAdLayerL1").height() + 20;
    $(window).scroll(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - l1 + "px";
        $("#xfAdLayerL1").animate({ top: offsetTop }, 20);
    }).resize(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - l1 + "px";
        $("#xfAdLayerL1").animate({ top: offsetTop }, 20);
    });

    var r1 = $("#xfAdLayerR1").height() + 20;
    $(window).scroll(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - r1 + "px";
        $("#xfAdLayerR1").animate({ top: offsetTop }, 20);
    }).resize(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - r1 + "px";
        $("#xfAdLayerR1").animate({ top: offsetTop }, 20);
    });

    var l2 = $("#xfAdLayerL2").height() + 135;
    $(window).scroll(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - l2 + "px";
        $("#xfAdLayerL2").animate({ top: offsetTop }, 20);
    }).resize(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - l2 + "px";
        $("#xfAdLayerL2").animate({ top: offsetTop }, 20);
    });

    var r2 = $("#xfAdLayerR2").height() + 135;
    $(window).scroll(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - r2 + "px";
        $("#xfAdLayerR2").animate({ top: offsetTop }, 20);
    }).resize(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - r2 + "px";
        $("#xfAdLayerR2").animate({ top: offsetTop }, 20);
    });

    $('.adcls img').bind("click", function () {
        $(this).parent().parent().hide();
    });

    $("#xfAdLayerBG").slideDown("slow");
    setTimeout('hideAdBG()', 10000);
    $('.clstxt a').bind("click", function () {
        $("#xfAdLayerBG").slideUp("slow");
    });
});

(function (A) {
    A.fn.th_video_focus = function (E) {
        var G = {
            actClass: "cur",
            navContainerClass: ".focus_pic_preview",
            focusContainerClass: ".focus_pic",
            animTime: 600,
            delayTime: 5000
        };
        if (E) {
            A.extend(G, E)
        }
        var C = G.actClass, D = G.navContainerClass, B = G.focusContainerClass, F = G.animTime, H = G.delayTime, I = null;
        return this.each(function () {
            var O = A(this), M = A(D + " li", O), P = A(B + " li", O), L = M.length, K = O.height();
            function N(R) {
                var V = K * R * -1;
                var U = A(B + " li", O), W = null, T = null;
                for (var S = 0; S <= R; S++) {
                    W = U.eq(S);
                    T = W.find('script[type="text/templ"]');
                    if (T.length > 0) {
                        W.html(T.html())
                    }
                }
                A(B, O).stop().animate({ top: V }, F, function () {
                    var Y = O.find("h3"), X = Y.height();
                    Y.height(0).html(A(B + " li").eq(R).find("img").attr("alt")).animate({ height: X }, 600)
                });
                A(D + " li").eq(R).addClass(C).siblings().removeClass(C)
            }
            function Q() {
                if (I) {
                    clearInterval(I)
                }
                I = setInterval(function () {
                    var R = A(D + " li." + C).index();
                    N((R + 1) % L)
                }, H)
            }
            O.hover(function () {
                if (I) {
                    clearInterval(I)
                }
            }, function () {
                Q()
            });
            var J = null;
            M.hover(function () {
                var R = A(this).index();
                if (I) {
                    clearInterval(I)
                }
                J = setTimeout(function () {
                    N(R)
                }, 300)
            }, function () {
                if (J) {
                    clearTimeout(J)
                }
                Q()
            }).click(function (T) {
                var R = A(this).index(), S = P.eq(R).find("a");
                if (document.uniqueID || window.opera) {
                    S[0].click();
                    T.stopPropagation();
                    T.preventDefault()
                }
            });
            Q()
        })
    }
})(jQuery);

function qgqpFive() {
    $.getJSON(jsonSrv + "fxpjlistjs.json", function (data) {
        if (data.status == "Y") {
            var html = new Array();
            html.push('<ul>');
            var g = data.zqdmdplist || [];
            $(g).each(function (i) {
                if (i < 5) {
                    var dianping = this.s3.strLen() == 0 ? '---' : this.s3;
                    html.push('<li class="qp1 blue"><a href="' + hqUrl + parseCode(this.s1) + '" target="_blank">' + this.s2 + '</a></li><li class="qp2">' + dianping + '</li>');
                }
            });
            html.push('</ul>');
            $('#con_qgqp').html(html.join(''));
        }
    });
}

function hqSummary() {
    $.getJSON('http://data.p5w.net/yb/p5wstock.php?m=summaryab&callback=?', function (data) {
        var html, g;
        if (data.szsh.A != null) {
            // 单日振幅
            html = new Array();
            html.push('<ul>');
            g = data.szsh.A.zhenfu || [];
            $(g).each(function (i) {
                if (i < 5) {
                    html.push('<li class="lh1 blue"><a href="' + hqUrl + this[0] + '" target="_blank">' + this[1] + '</a></li><li class="lh2">' + this[4] + '</li><li class="lh3">' + this[3] + '</li>');
                }
            });
            html.push('</ul>');
            $('#con_drzf').html(html.join(''));

            // 换手率
            html = new Array();
            html.push('<ul>');
            g = data.szsh.A.turnover || [];
            $(g).each(function (i) {
                if (i < 5) {
                    html.push('<li class="lh1 blue"><a href="' + hqUrl + this[0] + '" target="_blank">' + this[1] + '</a></li><li class="lh2">' + this[4] + '</li><li class="lh3">' + this[3] + '</li>');
                }
            });
            html.push('</ul>');
            $('#con_drhsl').html(html.join(''));

            // 涨幅前5取千股千评
            g = data.szsh.A.ratio_inc || [];
            $('#con_qgqp').html('<ul></ul>');
            $(g).each(function (i) {
                if (i < 5) {
                    getQgqp(this[0]);
                }
            });
        }

    });
}

function getQgqp(code) {
    var url = 'http://data.p5w.net/stock/p5wstock.php?m=qgqp&callback=?&code=' + code;
    var html = new Array();
    $.getJSON(url, function (data) {
        var a = data.qgqp[0];
        if (a != null) {
            var dianping = a.s3.strLen() == 0 ? '---' : a.s3;
            html.push('<li class="qp1 blue"><a href="' + hqUrl + parseCode(a.s1) + '" target="_blank">' + a.s2 + '</a></li><li class="qp2">' + dianping + '</li>');
            $('#con_qgqp ul').append(html.join(''));
        }
    });
}

function zhangfuFive() {
    $.getJSON(jsonSrv + "fxpjlistjs.json", function (data) {
        if (data.status == "Y") {
            var html = new Array();
            html.push('<ul>');
            var g = data.zf5 || [];
            $(g).each(function (i) {
                if (i < 5) {
                    html.push('<li class="lh1 blue"><a href="' + hqUrl + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="lh2">' + this.s3 + '</li><li class="lh3">' + this.s4 + '</li>');
                }
            });
            html.push('</ul>');
            $('#con_wrzf').html(html.join(''));
        }
    });
}

function jigouguanzhu() {
    $.getJSON("http://data.p5w.net/yb/p5wstock.php?m=hotstock&count=5&callback=?", function (data) {
        if (data.hotstocks != null) {
            var html = new Array();
            html.push('<ul>');
            var g = data.hotstocks || [];
            $(g).each(function (i) {
                if (i < 5) {
                    var fkS12 = this.s12 == null ? '--' : this.s12;
                    html.push('<li class="lh4 blue"><a href="' + hqUrl + this.s3 + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="lh5">' + this.s11 + '</li><li class="lh6">' + this.s10 + '</li><li class="lh7">' + fkS12 + '</li>');
                }
            });
            html.push('</ul>');
            $('#con_jigouguanzhu').html(html.join(''));
        }
    });
}

function tzpjup() {
    $.getJSON("http://data.p5w.net/yb/p5wstock.php?m=tzpjup&count=5&callback=?", function (data) {
        if (data.tjpjup != null) {
            var html = new Array();
            html.push('<ul>');
            var g = data.tjpjup || [];
            $(g).each(function (i) {
                if (i < 5) {
                    html.push('<li class="lh8 blue"><a href="' + hqUrl + this.s8 + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="lh8">' + this.s3 + '</li><li class="lh8">' + this.s4 + '</li>');
                }
            });
            html.push('</ul>');
            $('#con_tzpjup').html(html.join(''));
        }
    });
}

function xcfpj() {
    $.getJSON("http://data.p5w.net/yb/p5wstock.php?m=xcfpj&count=5&callback=?", function (data) {
        if (data.xcfpj != null) {
            var html = new Array();
            html.push('<ul>');
            var g = data.xcfpj || [];
            $(g).each(function (i) {
                if (i < 5) {
                    var pingji = this.s7 == null ? '--' : this.s7;
                    html.push('<li class="lh4 blue"><a href="' + hqUrl + this.s3 + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="lh4">' + this.s4.substr(0, 4) + '</li><li class="lh6">' + this.s5.substr(0, 6) + '</li><li class="lh5">' + pingji.substr(0, 4) + '</li>');
                }
            });
            html.push('</ul>');
            $('#con_xcfpj').html(html.join(''));
        }
    });
}

function tbdbpa() {
    var url = 'http://data.p5w.net/json/fundjson.php?m=tbdbp&count=3&desc=1&callback=?&rnd=' + new Date().getTime();
    $.getJSON(url, function (data) {
        var html = new Array();
        if (data.tbdbp == null) return false;
        $.each(data.tbdbp, function (i, item) {
            if (i < 3) {
                var name = item.s2;
                name = name.strLen() > 12 ? name.subCHStr(0, 12) : name;
                var code = item.s3;
                var link = 'http://data.p5w.net/fund/fund.php?q=' + code;
                var price = item.s11;
                var weekrate = item.s10;
                html.push('<li class="lh8 blue"><a href="' + link + '" target="_blank">' + name + '</a></li><li class="lh9">' + price + '</li><li class="lh10 red">' + weekrate + '</li>');

            }
        });
        $('#tbdbpa').html(html.join(''));
    });
}

function tbdbpb() {
    var url = 'http://data.p5w.net/json/fundjson.php?m=tbdbp&count=3&desc=0&callback=?&rnd=' + new Date().getTime();
    $.getJSON(url, function (data) {
        var html = new Array();
        if (data.tbdbp == null) return false;
        $.each(data.tbdbp, function (i, item) {
            if (i < 3) {
                var name = item.s2;
                name = name.strLen() > 12 ? name.subCHStr(0, 12) : name;
                var code = item.s3;
                var link = 'http://data.p5w.net/fund/fund.php?q=' + code;
                var price = item.s11;
                var weekrate = item.s10;
                html.push('<li class="lh8 blue"><a href="' + link + '" target="_blank">' + name + '</a></li><li class="lh9">' + price + '</li><li class="lh10 red">' + weekrate + '</li>');

            }
        });
        $('#tbdbpb').html(html.join(''));
    });
}


function netvalueDataHBX(data) {
    var html = new Array();
    if (data.netvalue['004004'].length <= 0) return false;
    $.each(data.netvalue['004004'], function (i, item) {
        if (i < 3) {
            var name = item.s2;
            name = name.strLen() > 12 ? name.subCHStr(0, 12) : name;
            var code = item.s1;
            var link = 'http://data.p5w.net/fund/fund.php?q=' + item.s1;
            var date = item.s3;
            var price = item.s4;
            var weekrate = item.s5;
            html.push('<li class="lh8 blue"><a href="' + link + '" target="_blank">' + name + '</a></li><li class="lh9">' + price + '</li><li class="lh10 red">' + weekrate + '</li>');
        }
    });
    $('#netvalueHBXa').html(html.join(''));

    html = new Array();
    if (data.netvalue['004004_1'].length <= 0) return false;
    $.each(data.netvalue['004004_1'], function (i, item) {
        if (i < 3) {
            var name = item.s2;
            name = name.strLen() > 12 ? name.subCHStr(0, 12) : name;
            var code = item.s1;
            var link = 'http://data.p5w.net/fund/fund.php?q=' + item.s1;
            var date = item.s3;
            var price = item.s4;
            var weekrate = item.s5;
            html.push('<li class="lh8 blue"><a href="' + link + '" target="_blank">' + name + '</a></li><li class="lh9">' + price + '</li><li class="lh10 green">' + weekrate + '</li>');
        }
    });
    $('#netvalueHBXb').html(html.join(''));
}

function dtData(data, year) {
    var html = new Array();
    if (data.dt.length <= 0) return false;
    $.each(data.dt, function (y, yItem) {
        if (y == year) {
            html.push('<ul>');
            $.each(yItem, function (i, item) {
                if (i < 5) {
                    var name = item.s2;
                    var link = 'http://data.p5w.net/fund/fund.php?q=' + item.s1;
                    var change = item.s3;
                    html.push('<li class="lh11 blue"><img src="images14/t' + (i + 1) + '.jpg" width="15" height="15" alt="全景网" /></li><li class="lh12"><a href="' + link + '" target="_blank">' + name + '</a></li><li class="lh13">' + change + '%</li>');
                }
            });
            html.push('</ul>');
        }
    });
    $('#dingtouData').html(html.join(''));
}

function getFundData() {
    var url = 'http://data.p5w.net/json/fundjson.php?callback=?&upcache=1&rnd=' + new Date().getTime();
    $.getJSON(url, function (data) {
        dtData(data, $('#dingtouYear').val());
        $('#dingtouYear').change(function () {
            dtData(data, $(this).val());
        });
        netvalueDataHBX(data);
    });
}

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

function fundsearch2() {
    this.def_label = "\u62fc\u97f3\u002f\u4ee3\u7801\u002f\u540d\u79f0";
    this.autoNoResult = "\u6ca1\u6709\u627e\u5230\u76f8\u5173\u4fe1\u606f";
    this.autoFundNoResult = "\u4ee3\u7801\u002f\u7b80\u62fc\u002f\u4e2d\u6587";
    this.searchSelFunds = [];
    this.init = function () {
        //get fundcompany list       
        $.getJSON("http://data.p5w.net/fund/fundjson.php?m=fund&callback=?", function (d) {
            FS.FundList = d;
            FS.setFundlist();
        });
        $('#btn_view_fund').click(function () {
            var d = $("#fs_fund_id");
            if (d.val() == "") {
                FS.tips("\u8bf7\u9009\u62e9\u60a8\u8981\u67e5\u770b\u7684\u57fa\u91d1\u002e");
                return;
            }
            open("http://data.p5w.net/fund/fund.php?q=" + d.val());
        });
        $('#fs_ftype_id').change(function () {
            FS.getFundList();
        });
    };
    this.setFundlist = function () {
        var d = $("#fs_fund_id");
        var autoCom = {
            limit: 10, //显示数据的条数
            letter_show: true, //是否显示拼音
            source: FS.FundList.fund.autolist,
            select: function (e, f) {
                if (f.item.result === FS.autoFundNoResult) {
                    d.val("");
                    $(this).val("");
                    e.preventDefault()
                } else {
                    d.val(f.item.id);
                }
            },
            focus: function (e, f) {
                if (f.item.result === FS.autoFundNoResult) {
                    d.val("");
                    e.preventDefault()
                }
            },
            change: function (e, f) {
                if (!f.item) {
                    $(this).val(FS.def_label).addClass("nt");
                    d.val("");
                }
            }
        };
        $('#fs_fund_name').click(function (h) {
            $(this).autocomplete({
                disabled: true
            })
        }).bind("keydown keyup input", function () {
            $(this).autocomplete({
                disabled: false
            })
        }).inputValueFb({
            value: FS.def_label
        }).autocomplete(autoCom);

    };
    this.getFundList = function () {
        var url = "http://data.p5w.net/fund/fundjson.php?m=fund";
        var f = $("#fs_ftype_id");
        if (f.val() != "") {
            url += "&ftype=" + f.val();
        }
        url += "&callback=?";
        $.getJSON(url, function (d) {
            FS.FundList = d;
            FS.setFundlist();
        });
    };
    this.tips = function (e, g, i) {
        g = g ? g : function () {
        };

        var f = '<div><div class="tips_login">' + e + '<div class="cntDown">' + g + '秒后关闭</div><div class="close" title="关闭">x</div></div><div class="orders_shadow">' + (Base.is_ie6 ? '<iframe src="javascript:;" style="border:none;width:100%;height:100%;opacity:0;filter:alpha(opacity = 0)"></iframe>' : "") + "</div></div>";
        var d = $('#dialog-message');
        if (d.length <= 0) {
            d = $('<div id="dialog-message" title="提示信息"></div>').appendTo($('body'));
        }
        d.html('<p>' + e + '</p>').dialog({
            modal: true,
            dialogClass: 'p5w-dialog',
            buttons: {
                '确定': function () {
                    if (typeof g == 'function') {
                        g.call(this);
                    }
                    $(this).dialog("close");
                }
            }
        });
        d.dialog('open');
    };
}

FS = new fundsearch2();

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
    //股票代码联想
    bindStockSuggest('query_stock_code', 'query_stock_name', 0);
    bindStockSuggest('query_stock_code1', 'query_stock_name1', 0);
    $('#btnAsk').click(function () {
        var code = $('#query_stock_code1').val().toLowerCase();
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
    //基金搜索
    //FS.init();
});

$(function () {
    //ipoList();
    hqSummary();
    //qgqpFive();
    //zhenfuOne();
    //turnover();
    zhangfuFive();
    jigouguanzhu();
    tzpjup();
    xcfpj();
    tbdbpa();
    tbdbpb();
    getFundData();

    //var p5wIdx = new p5wIdxSummary(40 * 1000, null);
    //p5wIdx.addEventListener(function (d) { headerIdxSummary(d, 'header_idx_summary') });
    //p5wIdx.start();

    //var params = { 'preFetchedData': null };
    //var s8161 = new Request(60 * 1000, function () { return hqServer + "/info/sort2.py/sortCover?cmd=" + Math.random().toString(); }, params);
    //s8161.addEventListener(headerSort);
    //s8161.start();
    //scrollUpDown('header_navi', 'li');
    //var p5wLV = new p5wLastVisit({ divID: 'LastVisit_Div', 'interval': 20 * 1000, numShow: 5 });

    var tagArr = {
        "a": { "n": "证券", "p": "zhengquan", "l": "http://www.p5w.net/stock/" },
        "b": { "n": "公司", "p": "gongsi", "l": "http://www.p5w.net/stock/news/gsxw/" },
        "c": { "n": "大盘", "p": "dapan", "l": "http://www.p5w.net/stock/market/dpfx/" },
        "d": { "n": "个股", "p": "gegu", "l": "http://www.p5w.net/stock/market/ggjj/" },
        "e": { "n": "新股", "p": "xingu", "l": "http://www.p5w.net/stock/xingu/" },
        "f": { "n": "公告", "p": "gonggao", "l": "http://data.p5w.net/gsgg.html" },
        "g": { "n": "港股", "p": "ganggu", "l": "http://www.p5w.net/stock/hkstock/" },
        "h": { "n": "研报", "p": "yanbao", "l": "http://www.p5w.net/stock/gpyb/" },
        "i": { "n": "财经", "p": "caijing", "l": "http://www.p5w.net/news/" },
        "j": { "n": "国内", "p": "guonei", "l": "http://www.p5w.net/news/gncj/" },
        "k": { "n": "国际", "p": "guoji", "l": "http://www.p5w.net/news/gjcj/" },
        "l": { "n": "产经", "p": "chanjing", "l": "http://www.p5w.net/news/cjxw/" },
        "m": { "n": "观察", "p": "guancha", "l": "" },
        "n": { "n": "快讯", "p": "kuaixun", "l": "http://www.p5w.net/kuaixun/" },
        "o": { "n": "基金", "p": "jijin", "l": "http://www.p5w.net/fund/" },
        "p": { "n": "银行", "p": "yinhang", "l": "http://www.p5w.net/money/yhzx/" },
        "q": { "n": "理财", "p": "licai", "l": "http://www.p5w.net/money/" },
        "r": { "n": "地产", "p": "dichan", "l": "http://www.p5w.net/news/cjxw/fdcy/" },
        "s": { "n": "汽车", "p": "qiche", "l": "http://www.p5w.net/news/cjxw/zzyjxsbyb/" },
        "t": { "n": "观点", "p": "guandian", "l": "http://www.p5w.net/news/xwpl/" },
        "u": { "n": "互动", "p": "hudong", "l": "http://irm.p5w.net/gszz/" },
        "v": { "n": "路演", "p": "luyan", "l": "http://rsc.p5w.net/" },
        "w": { "n": "视频", "p": "shipin", "l": "http://www.p5w.net/tradingday/" },
        "x": { "n": "舆情", "p": "yuqing", "l": "http://www.p5w.net/yuqing/" },
        "y": { "n": "专题", "p": "zhuanti", "l": "http://www.p5w.net/zt/" },
        "z": { "n": "调研", "p": "diaoyan", "l": "http://www.p5w.net/special/201405/jgdybd/" },
        "A": { "n": "信披", "p": "xinpi", "l": "http://data.p5w.net/ggs-6-1.html" },
        "B": { "n": "持仓", "p": "chicang", "l": "http://www.p5w.net/fund/zjcc/" },
        "C": { "n": "数据", "p": "shuju", "l": "http://www.p5w.net/fund/jjyj/" },
        "D": { "n": "私募", "p": "simu", "l": "http://www.p5w.net/fund/smjj/" },
        "E": { "n": "风投", "p": "fengtou", "l": "http://www.p5w.net/fund/gqjj/" },
        "F": { "n": "保险", "p": "baoxian", "l": "http://www.p5w.net/money/bxzx/" },
        "G": { "n": "信托", "p": "xintuo", "l": "http://www.p5w.net/money/xtzx/" },
        "H": { "n": "债券", "p": "zhaiquan", "l": "http://www.p5w.net/money/zqzx/" },
        "I": { "n": "财富", "p": "caifu", "l": "http://www.p5w.net/news/cfrs/" },
        "J": { "n": "消费", "p": "xiaofei", "l": "http://www.p5w.net/money/xfsh/" },
        "K": { "n": "外汇", "p": "waihui", "l": "http://www.p5w.net/forex/" },
        "L": { "n": "期货", "p": "qihuo", "l": "http://www.p5w.net/futures/zhzx/" }
    };

    $('#yaowen dt').each(function () {
        var rel = $(this).attr('rel');
        if (tagArr[rel] != null) {
            if (tagArr[rel].l != '') {
                var html = '<a href="' + tagArr[rel].l + '" target="_blank"><img src="images14/b-' + tagArr[rel].p + '.jpg" width="28" height="16" /></a>';
            } else {
                var html = '<img src="images14/b-' + tagArr[rel].p + '.jpg" width="28" height="16" />';
            }
            $(this).html(html);
        }
    });

    $(".pic_focus").th_video_focus({
        navContainerClass: ".pic_focus_nav",
        focusContainerClass: ".pic_focus_imgs",
        delayTime: 4000
    });

    $('#xiaosanriji .bcj .xsrj-nr:first').show();
    $('#xiaosanriji .bcj').mouseover(function () {
        $('#xiaosanriji .bcj .xsrj-nr').each(function (i, e) {
            $(e).hide();
        });
        $(this).find('.xsrj-nr').show();
    });

    $("#fk_roll_magzines").jCarouselLite({
        auto: 3500,
        speed: 800,
        visible: 3,
        scroll: 1,
        onMouse: true,
        btnNext: "#mag-arrow-next",
        btnPrev: "#mag-arrow-prev"
    });

    if (Base.is_ie6) {
        Base.runJs('http://www.p5w.net/scripts/DD_belatedPNG_0.0.8a-min.js', function () {
            DD_belatedPNG.fix('a.fk_ie6png img');
            DD_belatedPNG.fix('.fk_ie6png');
        });
    }
});

//function displayimg() {
//    $("#xfAdLayerBG").slideUp("slow");
//}

//function xfclosediv(id) {
//    var layerID = 'xfAdLayer' + id;
//    $("#" + layerID).slideUp("slow");
//}
function hideAdBG() {
    $("#xfAdLayerBG").slideUp("slow");
}
$(document).ready(function () {
    if (Base.is_ie6) {
        var st;
        $(window).scroll(function () {
            st = $(document).scrollTop();
            var offsetTop = 170 + st;
            $(".duilianl,.duilianr").css("top", offsetTop);
        }).resize(function () {
            st = $(document).scrollTop();
            var offsetTop = 170 + st;
            $(".duilianl,.duilianr").css("top", offsetTop);
        });
    };
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

    var l1 = $("#xfAdLayerL1").height() + 20;
    $(window).scroll(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - l1 + "px";
        $("#xfAdLayerL1").animate({ top: offsetTop }, 20);
    }).resize(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - l1 + "px";
        $("#xfAdLayerL1").animate({ top: offsetTop }, 20);
    });

    var r1 = $("#xfAdLayerR1").height() + 20;
    $(window).scroll(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - r1 + "px";
        $("#xfAdLayerR1").animate({ top: offsetTop }, 20);
    }).resize(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - r1 + "px";
        $("#xfAdLayerR1").animate({ top: offsetTop }, 20);
    });

    var l2 = $("#xfAdLayerL2").height() + 135;
    $(window).scroll(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - l2 + "px";
        $("#xfAdLayerL2").animate({ top: offsetTop }, 20);
    }).resize(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - l2 + "px";
        $("#xfAdLayerL2").animate({ top: offsetTop }, 20);
    });

    var r2 = $("#xfAdLayerR2").height() + 135;
    $(window).scroll(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - r2 + "px";
        $("#xfAdLayerR2").animate({ top: offsetTop }, 20);
    }).resize(function () {
        var offsetTop = $(document).scrollTop() + $(window).height() - r2 + "px";
        $("#xfAdLayerR2").animate({ top: offsetTop }, 20);
    });

    $('.adcls img').bind("click", function () {
        $(this).parent().parent().hide();
    });

    $("#xfAdLayerBG").slideDown("slow");
    setTimeout('hideAdBG()', 10000);
    $('.clstxt a').bind("click", function () {
        $("#xfAdLayerBG").slideUp("slow");
    });

});
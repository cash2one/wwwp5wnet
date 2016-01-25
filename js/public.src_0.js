﻿(function($) {
    $.fn.slides = function(option) {
        option = $.extend({},
        $.fn.slides.option, option);
        return this.each(function() {
            $('.' + option.container, $(this)).children().wrapAll('<div class="slides_control"/>');
            var elem = $(this),
            control = $('.slides_control', elem),
            total = control.children().size(),
            width = control.children().outerWidth(),
            height = control.children().outerHeight(),
            start = option.start - 1,
            effect = option.effect.indexOf(',') < 0 ? option.effect: option.effect.replace(' ', '').split(',')[0],
            paginationEffect = option.effect.indexOf(',') < 0 ? effect: option.effect.replace(' ', '').split(',')[1],
            next = 0,
            prev = 0,
            number = 0,
            current = 0,
            loaded,
            active,
            clicked,
            position,
            direction,
            imageParent,
            pauseTimeout,
            playInterval;
            if (total < 2) {
                $('.' + option.container, $(this)).fadeIn(option.fadeSpeed, option.fadeEasing, 
                function() {
                    loaded = true;
                    option.slidesLoaded()
                });
                $('.' + option.next + ', .' + option.prev).fadeOut(0);
                return false
            }
            function animate(direction, effect, clicked) {
                if (!active && loaded) {
                    active = true;
                    option.animationStart(current + 1);
                    switch (direction) {
                    case 'next':
                        prev = current;
                        next = current + 1;
                        next = total === next ? 0: next;
                        position = width * 2;
                        direction = -width * 2;
                        current = next;
                        break;
                    case 'prev':
                        prev = current;
                        next = current - 1;
                        next = next === -1 ? total - 1: next;
                        position = 0;
                        direction = 0;
                        current = next;
                        break;
                    case 'pagination':
                        next = parseInt(clicked, 10);
                        prev = $('.' + option.paginationClass + ' li.' + option.currentClass + ' a', elem).attr('href').match('[^#/]+$');
                        if (next > prev) {
                            position = width * 2;
                            direction = -width * 2
                        } else {
                            position = 0;
                            direction = 0
                        }
                        current = next;
                        break
                    }
                    if (effect === 'fade') {
                        if (option.crossfade) {
                            control.children(':eq(' + next + ')', elem).css({
                                zIndex: 10
                            }).fadeIn(option.fadeSpeed, option.fadeEasing, 
                            function() {
                                if (option.autoHeight) {
                                    control.animate({
                                        height: control.children(':eq(' + next + ')', elem).outerHeight()
                                    },
                                    option.autoHeightSpeed, 
                                    function() {
                                        control.children(':eq(' + prev + ')', elem).css({
                                            display: 'none',
                                            zIndex: 0
                                        });
                                        control.children(':eq(' + next + ')', elem).css({
                                            zIndex: 0
                                        });
                                        option.animationComplete(next + 1);
                                        active = false
                                    })
                                } else {
                                    control.children(':eq(' + prev + ')', elem).css({
                                        display: 'none',
                                        zIndex: 0
                                    });
                                    control.children(':eq(' + next + ')', elem).css({
                                        zIndex: 0
                                    });
                                    option.animationComplete(next + 1);
                                    active = false
                                }
                            })
                        } else {
                            control.children(':eq(' + prev + ')', elem).fadeOut(option.fadeSpeed, option.fadeEasing, 
                            function() {
                                if (option.autoHeight) {
                                    control.animate({
                                        height: control.children(':eq(' + next + ')', elem).outerHeight()
                                    },
                                    option.autoHeightSpeed, 
                                    function() {
                                        control.children(':eq(' + next + ')', elem).fadeIn(option.fadeSpeed, option.fadeEasing)
                                    })
                                } else {
                                    control.children(':eq(' + next + ')', elem).fadeIn(option.fadeSpeed, option.fadeEasing, 
                                    function() {
                                        if ($.browser.msie) {
                                            $(this).get(0).style.removeAttribute('filter')
                                        }
                                    })
                                }
                                option.animationComplete(next + 1);
                                active = false
                            })
                        }
                    } else {
                        control.children(':eq(' + next + ')').css({
                            left: position,
                            display: 'block'
                        });
                        if (option.autoHeight) {
                            control.animate({
                                left: direction,
                                height: control.children(':eq(' + next + ')').outerHeight()
                            },
                            option.slideSpeed, option.slideEasing, 
                            function() {
                                control.css({
                                    left: -width
                                });
                                control.children(':eq(' + next + ')').css({
                                    left: width,
                                    zIndex: 5
                                });
                                control.children(':eq(' + prev + ')').css({
                                    left: width,
                                    display: 'none',
                                    zIndex: 0
                                });
                                option.animationComplete(next + 1);
                                active = false
                            })
                        } else {
                            control.animate({
                                left: direction
                            },
                            option.slideSpeed, option.slideEasing, 
                            function() {
                                control.css({
                                    left: -width
                                });
                                control.children(':eq(' + next + ')').css({
                                    left: width,
                                    zIndex: 5
                                });
                                control.children(':eq(' + prev + ')').css({
                                    left: width,
                                    display: 'none',
                                    zIndex: 0
                                });
                                option.animationComplete(next + 1);
                                active = false
                            })
                        }
                    }
                    if (option.pagination) {
                        $('.' + option.paginationClass + ' li.' + option.currentClass, elem).removeClass(option.currentClass);
                        $('.' + option.paginationClass + ' li:eq(' + next + ')', elem).addClass(option.currentClass)
                    }
                }
            }
            function stop() {
                clearInterval(elem.data('interval'))
            }
            function pause() {
                if (option.pause) {
                    clearTimeout(elem.data('pause'));
                    clearInterval(elem.data('interval'));
                    pauseTimeout = setTimeout(function() {
                        clearTimeout(elem.data('pause'));
                        playInterval = setInterval(function() {
                            animate("next", effect)
                        },
                        option.play);
                        elem.data('interval', playInterval)
                    },
                    option.pause);
                    elem.data('pause', pauseTimeout)
                } else {
                    stop()
                }
            }
            if (total < 2) {
                return
            }
            if (start < 0) {
                start = 0
            }
            if (start > total) {
                start = total - 1
            }
            if (option.start) {
                current = start
            }
            if (option.randomize) {
                control.randomize()
            }
            $('.' + option.container, elem).css({
                overflow: 'hidden',
                position: 'relative'
            });
            control.children().css({
                position: 'absolute',
                top: 0,
                left: control.children().outerWidth(),
                zIndex: 0,
                display: 'none'
            });
            control.css({
                position: 'relative',
                width: (width * 3),
                height: height,
                left: -width
            });
            $('.' + option.container, elem).css({
                display: 'block'
            });
            if (option.autoHeight) {
                control.children().css({
                    height: 'auto'
                });
                control.animate({
                    height: control.children(':eq(' + start + ')').outerHeight()
                },
                option.autoHeightSpeed)
            }
            if (option.preload && control.find('img:eq(' + start + ')').length) {
                $('.' + option.container, elem).css({
                    background: 'url(' + option.preloadImage + ') no-repeat 50% 50%'
                });
                var img = control.find('img:eq(' + start + ')').attr('src') + '?' + (new Date()).getTime();
                if ($('img', elem).parent().attr('class') != 'slides_control') {
                    imageParent = control.children(':eq(0)')[0].tagName.toLowerCase()
                } else {
                    imageParent = control.find('img:eq(' + start + ')')
                }
                control.find('img:eq(' + start + ')').attr('src', img).load(function() {
                    control.find(imageParent + ':eq(' + start + ')').fadeIn(option.fadeSpeed, option.fadeEasing, 
                    function() {
                        $(this).css({
                            zIndex: 5
                        });
                        $('.' + option.container, elem).css({
                            background: ''
                        });
                        loaded = true;
                        option.slidesLoaded()
                    })
                })
            } else {
                control.children(':eq(' + start + ')').fadeIn(option.fadeSpeed, option.fadeEasing, 
                function() {
                    loaded = true;
                    option.slidesLoaded()
                })
            }
            if (option.bigTarget) {
                control.children().css({
                    cursor: 'pointer'
                });
                control.children().click(function() {
                    animate('next', effect);
                    return false
                })
            }
            if (option.hoverPause && option.play) {
                control.bind('mouseover', 
                function() {
                    stop()
                });
                control.bind('mouseleave', 
                function() {
                    pause()
                })
            }
            if (option.generateNextPrev) {
                $('.' + option.container, elem).after('<a href="#" class="' + option.prev + '">Prev</a>');
                $('.' + option.prev, elem).after('<a href="#" class="' + option.next + '">Next</a>')
            }
            $('.' + option.next, elem).click(function(e) {
                e.preventDefault();
                if (option.play) {
                    pause()
                }
                animate('next', effect)
            });
            $('.' + option.prev, elem).click(function(e) {
                e.preventDefault();
                if (option.play) {
                    pause()
                }
                animate('prev', effect)
            });
            if (option.generatePagination) {
                if (option.prependPagination) {
                    elem.prepend('<ul class=' + option.paginationClass + '></ul>')
                } else {
                    elem.append('<ul class=' + option.paginationClass + '></ul>')
                }
                control.children().each(function() {
                    $('.' + option.paginationClass, elem).append('<li><a onfocus="this.blur()" href="#' + number + '">' + (number + 1) + '</a></li>');
                    number++
                })
            } else {
                $('.' + option.paginationClass + ' li a', elem).each(function() {
                    $(this).attr('href', '#' + number);
                    number++
                })
            }
            $('.' + option.paginationClass + ' li:eq(' + start + ')', elem).addClass(option.currentClass);
            $('.' + option.paginationClass + ' li a', elem).click(function() {
                if (option.play) {
                    pause()
                }
                clicked = $(this).attr('href').match('[^#/]+$');
                if (current != clicked) {
                    animate('pagination', paginationEffect, clicked)
                }
                return false
            });
            $('a.link', elem).click(function() {
                if (option.play) {
                    pause()
                }
                clicked = $(this).attr('href').match('[^#/]+$') - 1;
                if (current != clicked) {
                    animate('pagination', paginationEffect, clicked)
                }
                return false
            });
            if (option.play) {
                playInterval = setInterval(function() {
                    animate('next', effect)
                },
                option.play);
                elem.data('interval', playInterval)
            }
        })
    };
    $.fn.slides.option = {
        preload: false,
        preloadImage: '/img/loading.gif',
        container: 'slides_container',
        generateNextPrev: false,
        next: 'next',
        prev: 'prev',
        pagination: true,
        generatePagination: true,
        prependPagination: false,
        paginationClass: 'pagination',
        currentClass: 'current',
        fadeSpeed: 350,
        fadeEasing: '',
        slideSpeed: 350,
        slideEasing: '',
        start: 1,
        effect: 'slide',
        crossfade: false,
        randomize: false,
        play: 0,
        pause: 0,
        hoverPause: false,
        autoHeight: false,
        autoHeightSpeed: 350,
        bigTarget: false,
        animationStart: function() {},
        animationComplete: function() {},
        slidesLoaded: function() {}
    };
    $.fn.randomize = function(callback) {
        function randomizeOrder() {
            return (Math.round(Math.random()) - 0.5)
        }
        return ($(this).each(function() {
            var $this = $(this);
            var $children = $this.children();
            var childCount = $children.length;
            if (childCount > 1) {
                $children.hide();
                var indices = [];
                for (i = 0; i < childCount; i++) {
                    indices[indices.length] = i
                }
                indices = indices.sort(randomizeOrder);
                $.each(indices, 
                function(j, k) {
                    var $child = $children.eq(k);
                    var $clone = $child.clone(true);
                    $clone.show().appendTo($this);
                    if (callback !== undefined) {
                        callback($child, $clone)
                    }
                    $child.remove()
                })
            }
        }))
    }
})(jQuery);
if (typeof p5w == "undefined") {
    var p5w = {}
}
p5w.ie6 = $.browser.msie && $.browser.version == 6;
var $zhcn = {
    string: {
        ok: '确定',
        title: '系统提示信息',
        cancel: '取消',
        closeTip: '关闭'
    }
};
p5w.Alert = function(s, r, c) {
    if (p5w.ie6) {
        return alert(s)
    }
    if (typeof r == "object") {
        var i = r.icon || '';
        var ok = r.ok
    } else {
        var i = r || '';
        var ok = c
    }
    $.messager.defaults.ok = $zhcn.string.ok;
    $.messager.defaults.cancel = $zhcn.string.cancel;
    return $.messager.alert($zhcn.string.title, s, i, ok)
};
p5w.alert = p5w.Alert;
p5w.confirm = function(s, r) {
    if (p5w.ie6) {
        return confirm(s)
    }
    return $.messager.confirm($zhcn.string.title, s, r)
};
function loadJs(url, callback, charset) {
	if (!charset) {
		charset='uft-8';
	}
    var done = false;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.language = 'javascript';
    script.charset = charset;
	script.src = url;
    script.onload = script.onreadystatechange = function() {
        if (!done && (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')) {
            done = true;
            script.onload = script.onreadystatechange = null;
            if (callback) {
                callback.call(script)
            }
        }
    };
    document.getElementsByTagName("head")[0].appendChild(script)
}
function runJs(url, callback) {
    loadJs(url, 
    function() {
        document.getElementsByTagName("head")[0].removeChild(this);
        if (callback) {
            callback()
        }
    })
}
p5w.loadJs = loadJs;
p5w.runJs = runJs;
Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt
};
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2)
};
String.prototype.len = function() {
    return this.replace(/[^\x00-\xff]/g, "aa").length
};
String.prototype.sub = function(n, o) {
    var r = /[^\x00-\xff]/g;
    if (this.replace(r, "mm").length <= n) return this;
    var p = o ? o: "";
    var m = Math.floor(n / 2);
    for (var i = m; i < this.length; i++) {
        if (this.substr(0, i).replace(r, "mm").length >= n) {
            var rs = this.substr(0, i) + p;
            return rs
        }
    }
    return this
}; (function($) {
    $.fn.Tabs = function(option) {
        option = $.extend({},
        $.fn.Tabs.option, option);
        if (option.TabEvent != "click" && option.TabEvent != "mouseover") {
            option.TabEvent = "click"
        }
        return this.each(function() {
            var currentIndex = 0;
            var tabs = $('.' + option.TabsHead, this);
            var tabsDiv = $('.' + option.TabsDivCss, this);
            $(this).each(function() {
                $(option.TabTag + ':eq(' + currentIndex + ')', tabs).addClass(option.TabsLiCurrent);
                $(tabsDiv).hide();
                if (option.fadeSpeed > 0) {
                    $(tabsDiv.get(currentIndex)).fadeIn(option.fadeSpeed).show()
                } else {
                    $(tabsDiv.get(currentIndex)).show()
                }
            });
            $('ul li', tabs).bind(option.TabEvent, 
            function() {
                $('li', tabs).removeClass(option.TabsLiCurrent);
                tabsDiv.hide();
                $(this).addClass(option.TabsLiCurrent);
                var $clickedIndex = $('li', tabs).index(this);
                var a = tabsDiv.get(currentIndex),
                b = tabsDiv.get($clickedIndex);
                if (option.fadeSpeed > 0) {
                    $(a).fadeOut(option.fadeSpeed, 
                    function() {
                        $(b).fadeIn(option.fadeSpeed).show()
                    });
                    $(a).hide()
                } else {
                    $(a).hide();
                    $(b).show()
                }
                currentIndex = $clickedIndex;
                if (typeof option.onClick == "function") {
                    option.onClick.call(this, currentIndex, tabsDiv)
                }
                if (typeof option.onHover == "function") {
                    option.onHover.call(this, currentIndex, tabsDiv)
                }
            })
        })
    };
    $.fn.Tabs.option = {
        fadeSpeed: 0,
        TabsLiCurrent: 'hover',
        TabsHead: 'tabsHead',
        TabsDivCss: 'tabBox',
        TabEvent: 'mouseover',
        TabTag: 'ul li',
        onClick: null,
        onHover: null
    }
})(jQuery);
var jsonSrv = "http://www.p5w.net/jsdata/";
$.ajaxSetup({
    cache: false
});
$(function() {
    var keyword = $('.top-search-select-3');
    if (keyword[0]) {
        var defval = "\u8bf7\u8f93\u5165\u8bc1\u5238\u4ee3\u7801\u3001\u7b80\u79f0\u3001\u9996\u5b57\u6bcd\u641c\u7d22\u8bc1\u5238\u8d44\u8baf";
        keyword.bind("focus", 
        function() {
            if (this.value == defval) {
                this.value = ""
            }
        }).bind("blur", 
        function() {
            if (this.value == "") {
                this.value = defval
            }
        });
        $('.top-search-btn a').attr('href', 'javascript:;').click(function() {
            if (keyword.val() == defval) {
                alert(defval);
                return false
            }
            window.open('http://search.p5w.net/newsIndexSearch.action?keyword=' + encodeURI(keyword.val().substring(0, 80).replace(/[#$%'^&*()]/g, '').replace(/\r\n/ig, '')))
        })
    }
});
$(function() {
    var frm = $(".zwright .mod-list5 iframe");
    var height = frm.contents().find(".mod-list5").height() + 2;
    frm.height(height < 245 ? 245: height)
});
function foot13() {
    var _bdhmProtocol = (("https:" == document.location.protocol) ? "https://": "http://");
    var arr = ['<div class="foot13">', '<div class="foot13-inner">', '<div class="f-l">', '<p>\u5408\u4f5c\u7535\u8bdd\uff1a<span class="fontArial">0755-83990201\u300183256219&nbsp;&nbsp;Email\uff1a<a href="mailto:service@p5w.net" target="_blank">service@p5w.net</a></span></p>', '<p>\u5168\u666f\u7f51\u7edc\uff1a\u83b7\u51c6\u4ece\u4e8b\u767b\u8f7d\u8d22\u7ecf\u7c7b\u65b0\u95fb\u4e1a\u52a1\u0020\u83b7\u51c6\u7ecf\u8425\u56e0\u7279\u7f51\u4fe1\u606f\u670d\u52a1\u4e1a\u52a1</p>', '<p class="fontArial">Copyright &copy; 2000-2013 Panorama Network Co., Ltd, All Rights Reserved</p>', '<p>\u5168\u666f\u7f51\u7edc\u6709\u9650\u516c\u53f8\u7248\u6743\u6240\u6709</p>', '<p>\u672a\u7ecf\u5168\u666f\u7f51\u4e66\u9762\u6388\u6743\uff0c\u8bf7\u52ff\u8f6c\u8f7d\u5185\u5bb9\u6216\u5efa\u7acb\u955c\u50cf\uff0c\u8fdd\u8005\u4f9d\u6cd5\u5fc5\u7a76\uff01</p>', '  </div>', '  <div class="f-r">', '    <div style="float:left"><a href="http://www.sznet110.gov.cn/webrecord/innernet/Welcome.jsp?bano=4403101901278" target="_blank"><img src="http://www.p5w.net/images/sznet110anwang.gif" width="70" height="81"></a></div>', '    <div style="float:left"><a href="http://www.sznet110.gov.cn/" target="_blank"><img src="http://www.p5w.net/images/sznet110gangting.gif" width="60" height="80"></a></div>', '    <div style="float:left;margin-top:8px;margin-left:5px;"><a href="http://www.miibeian.gov.cn/" target="_blank">\u7ecf\u8425\u8bb8\u53ef\u8bc1\u53f7\u0020\u7ca4<span class="fontArial">B2-20050249</span>\u53f7</a><br />\u4fe1\u606f\u7f51\u7edc\u4f20\u64ad\u89c6\u542c\u8282\u76ee\u8bb8\u53ef\u8bc1<br />\u8bb8\u53ef\u8bc1\u53f7\uff1a<span class="fontArial">1903034</span></div>', '  </div>', '  <div style="clear:both;text-align:center;display:none;">', '    <script type="text/javascript" src="' + _bdhmProtocol + 'hm.baidu.com/h.js?ed9dac8a2b525df95dc69c97bbcda470" type="text/javascript"></script><script src="http://s21.cnzz.com/stat.php?id=3475086&web_id=3475086&show=pic" type="text/javascript"></script>', '</div>', '</div></div>'];
    document.write(arr.join(''))
}
function mininav() {
    document.writeln("  <div class=\"mininav-left\">");
    document.writeln("    <a href=\"http://www.p5w.net\" target=\"_blank\">\u9996\u9875</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/kuaixun/\" target=\"_blank\">\u5feb\u8baf</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/stock/\" target=\"_blank\">\u80a1\u7968</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/fund/\" target=\"_blank\">\u57fa\u91d1</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/news/\" target=\"_blank\">\u8d22\u7ecf</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/futures/\" target=\"_blank\">\u671f\u8d27</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/money/\" target=\"_blank\">\u7406\u8d22</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/forex/\" target=\"_blank\">\u5916\u6c47</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/zt/\" target=\"_blank\">\u4e13\u9898</a> | ");
    document.writeln("    <a href=\"http://bbs.p5w.net\" target=\"_blank\">\u793e\u533a</a> | ");
    document.writeln("    <a href=\"http://zlzq.p5w.net\" target=\"_blank\">\u4e13\u680f</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/tradingday/\" target=\"_blank\">\u89c6\u9891</a> | ");
    document.writeln("    <a href=\"http://rsc.p5w.net\" target=\"_blank\">\u8def\u6f14</a> | ");
    document.writeln("    <a href=\"http://irm.p5w.net\" target=\"_blank\">\u4e92\u52a8\u5e73\u53f0</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/yuqing/\" target=\"_blank\">\u8206\u60c5</a>");
    document.writeln("  </div>");
    document.writeln("  <div class=\"mininav-right\">");
    document.writeln("    <div id=\"user-menu\">");
    document.writeln("      <ul class=\"menu\">");
    document.writeln("        <li class=\"item\"><a class=\"link link-hover\" href=\"http://www.p5w.net/cftxclub/club/201008/t20100825_97025.htm\" target=\"_blank\"><em>\u5e2e\u52a9</em></a></li>");
    document.writeln("        <li class=\"item\"><a class=\"link link-hover\" href=\"http://company.p5w.net/passport/index.asp\" target=\"_blank\"><em>\u901a\u884c\u8bc1</em></a></li>");
    document.writeln("        <li class=\"item\"><a class=\"link link-hover\" href=\"http://company.p5w.net/passport/login.asp\" name=\"userlogin_box\"><em>\u767b\u5f55</em></a></li>");
    document.writeln("        <li class=\"item\"><a class=\"link link-hover\" href=\"http://company.p5w.net/passport/register.asp\" target=\"_blank\"><em>\u6ce8\u518c</em></a></li>");
    document.writeln("      </ul>");
    document.writeln("    </div>");
    document.writeln("  </div>")
}
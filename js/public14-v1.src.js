var urls = { "psp": "http://passport.p5w.net", "data": "http://data.p5w.net", "buy": "http://buy.p5w.net" };
var hqServer = "http://hq.p5w.net";
var jsonSrv = "http://www.p5w.net/jsdata/";
var hqUrl = "http://data.p5w.net/stock/index.php?code=";
var irmSrv = "http://irm.p5w.net/";
var ircsSrv = "http://ircs.p5w.net/";

(function ($, undefined) {
    $.fn.slides = function (option) {
        option = $.extend({},
        $.fn.slides.option, option);
        return this.each(function () {
            $('.' + option.container, $(this)).children().wrapAll('<div class="slides_control"/>');
            var elem = $(this),
            control = $('.slides_control', elem),
            total = control.children().size(),
            width = control.children().outerWidth(),
            height = control.children().outerHeight(),
            start = option.start - 1,
            effect = option.effect.indexOf(',') < 0 ? option.effect : option.effect.replace(' ', '').split(',')[0],
            paginationEffect = option.effect.indexOf(',') < 0 ? effect : option.effect.replace(' ', '').split(',')[1],
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
                function () {
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
                            next = total === next ? 0 : next;
                            position = width * 2;
                            direction = -width * 2;
                            current = next;
                            break;
                        case 'prev':
                            prev = current;
                            next = current - 1;
                            next = next === -1 ? total - 1 : next;
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
                            function () {
                                if (option.autoHeight) {
                                    control.animate({
                                        height: control.children(':eq(' + next + ')', elem).outerHeight()
                                    },
                                    option.autoHeightSpeed,
                                    function () {
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
                            function () {
                                if (option.autoHeight) {
                                    control.animate({
                                        height: control.children(':eq(' + next + ')', elem).outerHeight()
                                    },
                                    option.autoHeightSpeed,
                                    function () {
                                        control.children(':eq(' + next + ')', elem).fadeIn(option.fadeSpeed, option.fadeEasing)
                                    })
                                } else {
                                    control.children(':eq(' + next + ')', elem).fadeIn(option.fadeSpeed, option.fadeEasing,
                                    function () {
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
                            function () {
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
                            function () {
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
                    pauseTimeout = setTimeout(function () {
                        clearTimeout(elem.data('pause'));
                        playInterval = setInterval(function () {
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
                control.find('img:eq(' + start + ')').attr('src', img).load(function () {
                    control.find(imageParent + ':eq(' + start + ')').fadeIn(option.fadeSpeed, option.fadeEasing,
                    function () {
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
                function () {
                    loaded = true;
                    option.slidesLoaded()
                })
            }
            if (option.bigTarget) {
                control.children().css({
                    cursor: 'pointer'
                });
                control.children().click(function () {
                    animate('next', effect);
                    return false
                })
            }
            if (option.hoverPause && option.play) {
                control.bind('mouseover',
                function () {
                    stop()
                });
                control.bind('mouseleave',
                function () {
                    pause()
                })
            }
            if (option.generateNextPrev) {
                $('.' + option.container, elem).after('<a href="#" class="' + option.prev + '">Prev</a>');
                $('.' + option.prev, elem).after('<a href="#" class="' + option.next + '">Next</a>')
            }
            $('.' + option.next, elem).click(function (e) {
                e.preventDefault();
                if (option.play) {
                    pause()
                }
                animate('next', effect)
            });
            $('.' + option.prev, elem).click(function (e) {
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
                control.children().each(function () {
                    $('.' + option.paginationClass, elem).append('<li><a onfocus="this.blur()" href="#' + number + '">' + (number + 1) + '</a></li>');
                    number++
                })
            } else {
                $('.' + option.paginationClass + ' li a', elem).each(function () {
                    $(this).attr('href', '#' + number);
                    number++
                })
            }
            $('.' + option.paginationClass + ' li:eq(' + start + ')', elem).addClass(option.currentClass);
            $('.' + option.paginationClass + ' li a', elem).click(function () {
                if (option.play) {
                    pause()
                }
                clicked = $(this).attr('href').match('[^#/]+$');
                if (current != clicked) {
                    animate('pagination', paginationEffect, clicked)
                }
                return false
            });
            $('a.link', elem).click(function () {
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
                playInterval = setInterval(function () {
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
        animationStart: function () { },
        animationComplete: function () { },
        slidesLoaded: function () { }
    };
    $.fn.randomize = function (callback) {
        function randomizeOrder() {
            return (Math.round(Math.random()) - 0.5)
        }
        return ($(this).each(function () {
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
                function (j, k) {
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
    };      
    $.fn.Tabs = function (option) {
        option = $.extend({},
        $.fn.Tabs.option, option);
        if (option.TabEvent != "click" && option.TabEvent != "mouseover") {
            option.TabEvent = "click"
        }
        return this.each(function () {
            var currentIndex = 0;
            var tabs = $('.' + option.TabsHead, this);
            var tabsDiv = $('.' + option.TabsDivCss, this);
            $(this).each(function () {
                $(option.TabTag + ':eq(' + currentIndex + ')', tabs).addClass(option.TabsLiCurrent);
                $(tabsDiv).hide();
                if (option.fadeSpeed > 0) {
                    $(tabsDiv.get(currentIndex)).fadeIn(option.fadeSpeed).show()
                } else {
                    $(tabsDiv.get(currentIndex)).show()
                }
            });
            $('ul li', tabs).bind(option.TabEvent,
            function () {
                $('li', tabs).removeClass(option.TabsLiCurrent);
                tabsDiv.hide();
                $(this).addClass(option.TabsLiCurrent);
                var $clickedIndex = $('li', tabs).index(this);
                var a = tabsDiv.get(currentIndex),
                b = tabsDiv.get($clickedIndex);
                if (option.fadeSpeed > 0) {
                    $(a).fadeOut(option.fadeSpeed,
                    function () {
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
    };
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
                    response($.ui.autocomplete.filter(array, request.term,that.options));
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
String.prototype.trim = function () {
    return this.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "")
};
String.prototype.byteLength = function () {
    return this.replace(/[^\u0000-\u007f]/g, "\u0061\u0061").length
};
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

function loadJs(url, callback, charset) {
    if (!charset) {
        charset = 'uft-8'
    }
    var done = false;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.language = 'javascript';
    script.charset = charset;
    script.src = url;
    script.onload = script.onreadystatechange = function () {
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
    function () {
        document.getElementsByTagName("head")[0].removeChild(this);
        if (callback) {
            callback()
        }
    })
}
Base.loadJs = loadJs;
Base.runJs = runJs;
Date.prototype.format = function (fmt) {
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
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2)
};
String.prototype.len = function () {
    return this.replace(/[^\x00-\xff]/g, "aa").length
};
String.prototype.sub = function (n, o) {
    var r = /[^\x00-\xff]/g;
    if (this.replace(r, "mm").length <= n) return this;
    var p = o ? o : "";
    var m = Math.floor(n / 2);
    for (var i = m; i < this.length; i++) {
        if (this.substr(0, i).replace(r, "mm").length >= n) {
            var rs = this.substr(0, i) + p;
            return rs
        }
    }
    return this
};
$.ajaxSetup({
    cache: false
});
$(function () {
    var keyword = $('.top-search-select-3');
    if (keyword[0]) {
        var defval = "\u8bf7\u8f93\u5165\u8bc1\u5238\u4ee3\u7801\u3001\u7b80\u79f0\u3001\u9996\u5b57\u6bcd\u641c\u7d22\u8bc1\u5238\u8d44\u8baf";
        keyword.bind("focus",
        function () {
            if (this.value == defval) {
                this.value = ""
            }
        }).bind("blur",
        function () {
            if (this.value == "") {
                this.value = defval
            }
        });
        $('.top-search-btn a').attr('href', 'javascript:;').click(function () {
            if (keyword.val() == defval) {
                alert(defval);
                return false
            }
            window.open('http://search.p5w.net/newsIndexSearch.action?keyword=' + encodeURI(keyword.val().substring(0, 80).replace(/[#$%'^&*()]/g, '').replace(/\r\n/ig, '')))
        })
    }
    
    // 滚动行情
    //var p5wIdx = new p5wIdxSummary(40 * 1000, null);
    //p5wIdx.addEventListener(function (d) { headerIdxSummary(d, 'header_idx_summary') });    
    //p5wIdx.start();
    
    //var params = { 'preFetchedData': null };
    //var s8161 = new Request(60 * 1000, function () { return hqServer + "/info/sort2.py/sortCover?cmd=" + Math.random().toString(); }, params);
    //s8161.addEventListener(headerSort);
    //s8161.start();   
    //scrollUpDown('header_navi', 'li');
    //var p5wLV = new p5wLastVisit({ divID: 'LastVisit_Div', 'interval': 20 * 1000, numShow: 5 });

});
$(function () {
    //右侧嵌套页面高度
    //var innerFrame = 'http://www.p5w.net/sy/inner_right.htm';
    //var lu = window.location.toString();
    //if (lu.indexOf('/stock/') >= 0 || lu.indexOf('/kuaixun/') >= 0) {
    //    innerFrame = 'http://www.p5w.net/sy/inner_right_stock.htm';
    //}
    //$("#inRight").attr("src", innerFrame).load(function () {
    //    var cheight = $(this).contents().find("#cInner").height() + 10;
    //    $(this).height(cheight);
    //});
});

function mininav() {
    document.writeln("  <div class=\"nc\">");
    document.writeln("    <ul class=\"nav\">");
    document.writeln("      <li><a href=\"http://www.p5w.net\" target=\"_blank\">\u9996\u9875</a></li>");
    document.writeln("      <li><a href=\"http://www.p5w.net/kuaixun/\" target=\"_blank\">\u5feb\u8baf</a></li>");
    document.writeln("      <li><a href=\"http://www.p5w.net/stock/\" target=\"_blank\">\u80a1\u7968</a></li>");
    document.writeln("      <li><a href=\"http://www.p5w.net/fund/\" target=\"_blank\">\u57fa\u91d1</a></li>");
    document.writeln("      <li><a href=\"http://www.p5w.net/news/\" target=\"_blank\">\u8d22\u7ecf</a></li>");
    document.writeln("      <li><a href=\"http://www.p5w.net/futures/zhzx/\" target=\"_blank\">\u671f\u8d27</a></li>");
    document.writeln("      <li><a href=\"http://www.p5w.net/money/\" target=\"_blank\">\u4e92\u91d1</a></li>");
    document.writeln("      <li><a href=\"http://www.p5w.net/forex/news/\" target=\"_blank\">\u5916\u6c47</a></li>");
    document.writeln("      <li><a href=\"http://www.p5w.net/zt/\" target=\"_blank\">\u4e13\u9898</a></li>");
    document.writeln("      <li><a href=\"http://bbs.p5w.net\" target=\"_blank\">\u793e\u533a</a></li>");
    document.writeln("      <li><a href=\"http://zlzq.p5w.net\" target=\"_blank\">\u4e13\u680f</a></li>");
    document.writeln("      <li><a href=\"http://www.p5w.net/tradingday/\" target=\"_blank\">\u89c6\u9891</a></li>");
    document.writeln("      <li><a href=\"http://rsc.p5w.net\" target=\"_blank\">\u8def\u6f14</a></li>");
    document.writeln("      <li><a href=\"http://irm.p5w.net\" target=\"_blank\">\u4e92\u52a8\u5e73\u53f0</a></li>");
    document.writeln("      <li><a href=\"http://www.p5w.net/yuqing/\" target=\"_blank\">\u8206\u60c5</a></li>");
    document.writeln("      <li><a href=\"http://city.wangdaizhijia.com/qj\" target=\"_blank\">\u7406\u8d22</a></li>");
    document.writeln("    </ul>");
    document.writeln("    <div class=\"nav_login\">");
    document.writeln("      <div class=\"loginarea\" action-type=\"loginArea\">");
    document.writeln("        <a href=\"http://passport.p5w.net/login.php\" action-type=\"loginBtn\" target=\"_blank\">\u767b\u5f55</a> | <a href=\"http://passport.p5w.net/register.php\" target=\"_blank\">\u6ce8\u518c</a>");
    document.writeln("      </div>");
    document.writeln("    </div>")
    document.writeln("  </div>");
}

function foot14() {
    document.writeln('<div class="copyright">');
    document.writeln('    <div class="copyright-in">');
    document.writeln('        <div class="c-logo mt20"><img src="http://www.p5w.net/images14/logo-gray.jpg" width="143" height="54" alt="全景网" /></div>');
    document.writeln('        <div class="c-text">');
    document.writeln('            <p>合作电话：<span class="fontArial">0755-83256219、83990201&nbsp;&nbsp;Email：<a href="mailto:service@p5w.net" target="_blank">service@p5w.net</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a target="_blank" href="/about.htm">关于我们</a></span></p>');
    document.writeln('            <p>全景网络：获准从事登载财经类新闻业务 获准经营因特网信息服务业务</p>');
    document.writeln('            <p class="fontArial">Copyright &copy; 2000-2016 Panorama Network Co., Ltd, All Rights Reserved</p>');
    document.writeln('            <p class="mt10">全景网络有限公司版权所有</p>');
    document.writeln('            <p>未经全景网书面授权，请勿转载内容或建立镜像，违者依法必究！</p>');
    document.writeln('        </div>');
    document.writeln('        <div class="c-img"><img src="http://www.p5w.net/images14/c-img.jpg" width="347" height="103" alt="全景网" /></div>');
    document.writeln('        <div class="clearfloat"></div>');
    document.writeln('    </div>');
    document.writeln('    <div class="tj_www_ccc">');
    var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fed9dac8a2b525df95dc69c97bbcda470' type='text/javascript'%3E%3C/script%3E"));
    var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cspan id='cnzz_stat_icon_3475086'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s21.cnzz.com/stat.php%3Fid%3D3475086%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));
    document.writeln('    </div>');
    document.writeln('</div>');
    document.writeln('<script type="text/javascript" src="http://c.wrating.com/a1.js"></script>');
    document.writeln('<script type="text/javascript">');
    document.writeln('var vjAcc="860010-2913010100";');
    document.writeln('var wrUrl="http://c.wrating.com/";');
    document.writeln('vjTrack("");');
    document.writeln('</script>');
    document.writeln('<noscript><img src="http://c.wrating.com/a.gif?a=&c=860010-2913010100" width="1" height="1"/></noscript>');
}
Base.Tpl = function () {
    this._s = new Array();
};
Base.Tpl.prototype = {
    append: function (a) {
        this._s.push(a);
    },
    toString: function () {
        var a = this._s.join("");
        this._s.length = 0;
        return a
    }
};
Base.centerSize = function (d) {
    var e = document.body.scrollTop || document.documentElement.scrollTop;
    var b = document.body.scrollLeft || document.documentElement.scrollLeft;
    var f = document.documentElement.clientWidth;
    var c = document.documentElement.clientHeight;
    return {
        left: Math.abs(Math.round((f - d.width) / 2) + (Base.is_ie6 ? b : 0)) + "px",
        top: Math.abs(Math.round((c - d.height) / 3) + (Base.is_ie6 ? e : 0)) + "px"
    }
};
Base.center = function (c, d, e) {
    if (c) {
        var a = c.outerWidth();
        var b = c.outerHeight();
        c.css("position", Base.is_ie6 ? "absolute" : "fixed").css(Base.centerSize({
            width: c.outerWidth(),
            height: c.outerHeight()
        }));
        if (typeof d !== "undefined") {
            if (typeof e == "undefined") {
                e = 0;
            } else {
                e = parseInt(e);
            }
            d.css({
                width: (a + e) + "px",
                height: (b + e) + "px"
            })
        }
        return c
    }
};
Base.mask = {
    isOpen: false,
    zIndex: 1000,
    on: function () {
        if (Base.mask.isOpen) {
            return false
        }
        Base.mask.isOpen = true;
        var b = $("#bottom_mask");
        if (b.length == 0) {
            b = $('<div id="bottom_mask"></div>').css({
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                background: "#fff",
                opacity: 0.5,
                display: "none"
            });
            b.appendTo($(document.body))
        }
        b.css({
            width: Math.max(document.body.scrollWidth, document.documentElement.clientWidth),
            height: Math.max(document.body.scrollHeight, document.documentElement.clientHeight),
            zIndex: Base.mask.zIndex
        });
        Base.is_ie6 && $("select").css("visibility", "hidden");
        b.show()
    },
    off: function () {
        var b = $("#bottom_mask");
        if (b.length == 0) {
            return false
        }
        Base.mask.isOpen = false;
        Base.is_ie6 && $("select").css("visibility", "visible");
        b.hide()
    }
};
Base.pop = function (b) {
    b = b || {};
    var a = this;
    var d = function () {
        return true
    };
    a.options = $.extend({
        beforeOpen: d,
        beforeClose: d,
        afterClose: d,
        ok: d,
        cancel: d,
        pos: "center",
        mask: false,
        iframe: false
    }, b);
    b.trigger && (a.trigger = $(b.trigger));
    b.target && (a.target = $(b.target));
    a.init()
};
$.extend(Base.pop.prototype, {
    init: function () {
        var a = this;
        var e = a.options;
        var g, f, b;
        b = a.target;
        a.trigger && a.trigger.click(function (c) {
            a.open();
            c.preventDefault()
        });
        if (b) {
            f = e.iframe && a.target[0].tagName.toLowerCase() == "iframe";
            if (f) {
                return
            }
            (function () {
                b.find(".pop-close, .pop-cancel").click(function (c) {
                    e.cancel();
                    a.close();
                    c.preventDefault()
                }), b.find(".pop-ok").click(function (c) {
                    e.ok();
                    a.close();
                    c.preventDefault()
                })
            })();
        }
    },
    getConf: function () {
        var a = this;
        return a.options
    },
    open: function () {
        var a = this;
        var b = a.options;
        b.beforeOpen();
        a.update()
    },
    close: function (d) {
        var a = this;
        var b = a.options;
        if (b.beforeClose()) {
            b.mask ? Base.mask.off() : "";
            var e = a.target.get(0);
            if (e && e.tagName && e.tagName.toUpperCase() == "IFRAME") {
                a.target.remove();
                b.afterClose()
            } else {
                a.target.hide()
            }
            Base.pop.current = null
        }
    },
    update: function () {
        Base.pop.current = this;
        var a = Base.pop.current.options;
        a.mask ? Base.mask.on() : "";
        this.target.show();
        if (a.pos == "center") {
            Base.center(this.target)
        } else {
            a.pos.call()
        }
    }
});
Base.pop.resize = function (b) {
    if (Base.pop.current) {
        Base.pop.current.target.animate($.extend(b, Base.centerSize(b)), 100);
        Base.pop.current.loading.remove()
    }
};
Base.pop.close = function (a) {
    Base.pop.current && Base.pop.current.close(a)
};
Base.pop.tab = function (g, a) {
    var f = this;
    var c = $("#" + g);
    var e = $("#" + g + ' input[type="hidden"]');
    var b = $("#" + g + ' input[type="text"]');
    var d = {
        data: [],
        backType: "area",
        def_value: "",
        def_label: "简拼/全拼/中文",
        autoCom: {
            source: "",
            limit: 10, //显示数据的条数
            letter_show: true, //是否显示拼音
            select: function (h, k) {
                if (k.item.result === "没有找到相关信息") {
                    e.val("");
                    b.val("");
                    h.preventDefault()
                } else {
                    e.val(k.item.id)
                }
            },
            focus: function (h, k) {
                if (k.item.result === "没有找到相关信息") {
                    e.val("");
                    h.preventDefault()
                }
            },
            change: function (h, k) {
                if (!k.item) {
                    b.val(f.params.def_label).addClass("nt");
                    e.val("")
                }
            },
            messages: {
                noResults: "没有找到相关信息",
                results: function (amount) {
                    return "";
                }
            }
        },
        callback: function () {
        }
    };
    this.id = g;
    this.params = $.extend(true, {}, d, a);
    this.pop = null;
    this.position = false;
    this.setData = function (h) {
        f.params = $.extend(true, {}, d, h);
        if (f.params.backType || f.params.def_value) {
            f.backFill()
        }
        f.initPopup();
        f.autocomplete();
        return f
    };
    this.createPopup = function () {
        var h = new Base.Tpl();
        var a = ['<script type="text/x-jquery-tmpl">', '<div class="Pdialog" id="' + f.id + '_popup">', '<div class="Pdialog-main">', '<div class="Pdialog-title">${title}</div>', '<div class="Pdialog-close"><a class="pop-close" title="关闭" href="#">X</a></div>', '<div class="Pdialog-content">', '<div class="Pdialog-item-tab">', '<ul>{{each(k,v) data}}<li>', '<a href="#" class="gl" hidefocus="true">{{if k == "0" || k == "ZZ"}} ${v.n} {{else}} ${k} {{/if}}</a>', '</li>{{/each}}</ul>', '</div>', '<div class="Pdialog-item-panel">{{each(k,v) data}}', '{{if k == "0" || k == "ZZ"}}<div class="Pdialog-item Pdialog-hot">{{each(j,l) v.d }}<a class="gl{{if l.k == "' + f.params.def_value + '"}} selected{{/if}}" value="${l.k}" href="javascript:;">${l.v}</a>{{/each}}<div class="clear"/>', '{{else}}<div class="Pdialog-item"><ul>{{each(j,l) v}}<li><strong>${j}</strong>{{each(x,y) l }}<a class="gl{{if y.k == "' + f.params.def_value + '"}} selected{{/if}}" value="${y.k}" href="javascript:;">${y.v}</a>{{/each}}</li>{{/each}}</ul>{{/if}}', '</div>{{/each}}</div>', '</div><div class="clear"></div>', '</div>', '</div>', '<\/script>'];
        h.append(a.join(''));
        f.pop = $(h.toString()).tmpl(f.params.data);
        return f.pop
    };
    this.initPopup = function () {
        if (f.params.data.length > 0) {
            var h = $("#" + f.id + "_popup");
            if (h.length > 0) {
                h.replaceWith(f.createPopup());
                f.pop.hide()
            } else {
                f.createPopup().appendTo("body").hide()
            }
            f.evtPopup();
        }
    };
    this.evtPopup = function () {
        new Base.pop({
            trigger: $("#" + f.id),
            target: f.pop,
            pos: f.setPos
        });
        f.rand_id = Math.random().toString().slice(10);
        $("*", c).data("randid", f.rand_id);
        f.position = false;
        f.tabPopup();
        $(f.pop).delegate("div.Pdialog-main", "click", function (h) {
            return false
        });
        $(f.pop).delegate("div.Pdialog-item-panel a", "click", function () {
            $("div.Pdialog-item-panel a").removeClass("selected");
            b.val($(this).text()).removeClass("nt");
            e.val($(this).attr("value"));
            $(this).addClass("selected");
            f.pop.hide();
            f.params.def_value = $(this).attr("value");
            f.params.def_label = $(this).text();
            if (typeof f.params.callback == "function") {
                f.params.callback()
            }
            return false
        });
        return f
    };
    this.setPos = function () {
        if (!f.position) {
            var h = c.offset();
            f.pop.css({
                top: h.top + c.outerHeight(),
                left: h.left < 700 ? h.left : h.left + c.innerWidth() - f.pop.outerWidth()
            });
            f.position = true
        }
        return f
    };
    this.tabPopup = function () {
        var h = $("div.Pdialog-item-panel li.selected", f.pop).closest("div").index();
        var k = h >= 0 ? h : 0;
        var l = ($("div.Pdialog-item-tab li", f.pop).length);
        $("div.Pdialog-item-tab", f.pop).tabs("div.Pdialog-item-panel > div", {
            tabs: "li",
            current: "selected",
            initialIndex: k
        });
        if (l <= 1) {
            $("div.Pdialog-item-tab", f.pop).hide();
        }
        return f
    };
    this.backFill = function () {
        if (f.params.backType == "area") {
            if (!f.params.def_value) {
                var k = Base.getCookie("area");
                if (k) {
                    var h = k.split("-");
                    if ($.isArray(h) && typeof h[1] !== "undefined") {
                        f.params.def_value = h[1]
                    }
                }
            }
        }
        if (f.params.def_value != "") {
            if (f.params.autoCom != "") {
                $.each(f.params.autoCom.source, function (l, m) {
                    if (f.params.def_value == m.id) {
                        e.val(m.id);
                        b.val(m.value).removeClass("nt");
                        f.params.callback();
                        return false
                    }
                })
            }
        }
        return f
    };
    this.autocomplete = function () {
        if (f.params.autoCom.source !== "") {
            b.click(function (h) {
                $(this).autocomplete({
                    disabled: true
                })
            }).bind("keydown keyup input", function () {
                f.pop.hide();
                $(this).autocomplete({
                    disabled: false
                })
            }).inputValueFb({
                value: f.params.def_label
            }).autocomplete(f.params.autoCom)
        }
        return f
    };
    if (this.params.backType || this.params.def_value) {
        this.backFill()
    }
    this.initPopup();
    this.autocomplete();
    $(document).bind("click.documentPopupEvent", function (h) {
        if (f.pop !== null && ($(h.target).data("randid") != f.rand_id)) {
            f.pop.hide()
        }
    });
    return f
};
Base.pop.frame = function (f) {
    var e, id = f.id || new Date().getTime();
    var a = $(['<div class="Pdialog" id="' + id + '_popup">', '<div class="Pdialog-main Pdialog-iframe">', '<div class="Pdialog-title">' + f.title + '</div>', '<div class="Pdialog-close"><a class="pop-close" title="关闭" href="#">X</a></div>', '<div class="Pdialog-content">', '<iframe frameborder="0" scrolling="no"></iframe>', '</div><div class="clear"></div>', '</div>', '</div>'].join('')).appendTo("body").hide();
    var iframe = $('iframe', a).css({
        width: f.width || 350,
        height: f.height || 230
    }).attr("src", f.src);
    e = new Base.pop({
        trigger: $("#" + id),
        target: $(a),
        mask: true,
        iframe: true
    });
    e.open();
    //Base.pop.current.loading = h;
    return e
};
(function ($, undefined) {
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
}(jQuery));
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
$.fn.addOptions = function (b) {
    var a = {
        "default": "请选择",
        clear: true,
        def_value: ""
    };
    $.extend(a, b);
    $.each($(this), function (d, c) {
        if (a.clear) {
            c.length = 0
        }
        if (a["default"]) {
            c.options.add(new Option(a["default"], a.def_value))
        }
        if (a.options == null) {
            return
        }
        if ($.isArray(a.options)) {
            $.each(a.options, function (f, e) {
                Flag = true;
                for (n = 0; n < c.length; n++) {
                    if (c.options[n].value == e.id) {
                        Flag = false
                    }
                }
                if (Flag) {
                    c.options.add(new Option(e.value || e.name, e.id))
                }
            })
        } else {
            $.each(a.options, function (f, e) {
                c.options.add(new Option(e, f))
            })
        }
    });
    if (a.selected) {
        $(this).val(a.selected)
    }
    return this
};
function optfund(v, a) {
    switch (a) {
        case "view":
            open("http://data.p5w.net/fund/fund.php?q=" + v);
            break;
        case "fav":
            $.getJSON("http://passport.p5w.net/fund/action.php?callback=?", { ajax: "1", m: "fav", q: v, time: new Date().getTime() }, function (data) {
                if (data.status == "-100") {
                    //未登录
                    passport.formCallBack = function () {
                        optfund(v, "fav");
                    };
                    passport.draw.init('login');
                } else if (data.status == "0") {
                    if (a == "fav") {
                        var b = {
                            "管理自选基金": function () {
                                open('http://passport.p5w.net/myfund.php');
                                $(this).dialog('close');
                            }
                        };
                        Base.dialog(data.msg, null, null, b);
                    } else {
                        Base.dialog(data.msg, null, 2000);
                    }
                } else {
                    if (a == "fav") {
                        var b = {
                            "管理自选基金": function () {
                                open('http://passport.p5w.net/myfund.php');
                                $(this).dialog('close');
                            }
                        };
                        Base.dialog(data.msg, null, null, b);
                    } else {
                        Base.dialog(data.msg);
                    }
                }
            }
);
            break;
        default:
            break;
    }
}

(function ($) {
    $.fn.setDropdownData = function (conf) {
        var dropdown = $(this).data('dropdown');
        conf = $.extend(true, {}, dropdown.getConf(), conf);
        return this.each(function () {
            dropdown.setData(conf);
        });
    };
    function Drop(trigger, conf) {
        var self = this,
        $dt = $('dt', trigger),
        $dd = $('dd', trigger),
        uid = Math.random().toString().slice(10),
        aw = {},
        click_type = trigger.attr('click-type'),
        jq = conf.target || trigger.attr("data-for"),
        drop = jq ? $('#' + jq) : null || trigger,
        $cont = $('div', drop), len, $selected_value;
        $.extend(self, {
            fl_search: function (word) {
                var $sel = $('a.drop-selected', $cont);
                if (word == $sel.next().text().substring(0, 1).toUpperCase()) {
                    return $sel.next().index();
                } else {
                    return aw[word];
                }
            },
            load: function (e) {
                if ($dd.length == 0) { trigger.append('<dd/>'); }
                if (!trigger.attr('tabindex')) { trigger.attr('tabindex', 0); }
                $dd = $('dd', trigger);
                //$("dt", trigger).live('click', function (e) { self.click(e); });
                $(document).on('click', trigger, function (e) {
                    self.click(e);
                });
                trigger.bind("keydown", function (e) {
                    $cont = $('div', trigger);
                    $a = $('a', $cont);
                    len = $a.length;
                    var $sel, $word, selectIndex = $('a.drop-selected', $cont).index();
                    if (e.keyCode == 13 || e.keyCode == 27) {
                        $cont.hide(); return false;
                    } else if (e.keyCode == 38 || e.keyCode == 37) {
                        selectIndex == 0 ? selectIndex = len - 1 : selectIndex--;
                    } else if (e.keyCode == 40 || e.keyCode == 39) {
                        selectIndex == (len - 1) ? selectIndex = 0 : selectIndex++;
                    } else if (e.keyCode == 36) {
                        selectIndex = 0;
                    } else if (e.keyCode == 35) {
                        selectIndex = (len - 1);
                    } else if (e.keyCode >= 65 && e.keyCode <= 90) {
                        $word = String.fromCharCode(e.keyCode);
                        $.each($a, function (i, n) {
                            if ($word == $(n).text().substring(0, 1).toUpperCase()) {
                                aw[$word] = i;
                                return false;
                            }
                        });
                        selectIndex = self.fl_search($word);
                    } else {
                        return true;
                    }
                    $sel = $('a:eq(' + selectIndex + ')', $cont);
                    if ($sel.length > 0) {
                        self.select($sel);
                        $cont.is(':hidden') ? $cont.hide() : $cont.show();
                        var offset = $sel.offset().top - $cont.offset().top;
                        var scroll = $cont.scrollTop();
                        var height = $cont.height();
                        if (offset < 0) {
                            $cont.scrollTop(scroll + offset);
                        } else if (offset >= height) {
                            $cont.scrollTop(scroll + offset - height + $sel.height());
                        }
                    }
                    e.preventDefault();
                });
                trigger.delegate('a', 'click', function (e) {
                    self.select($(this));
                    $cont.length > 0 ? $cont.hide() : "";
                    e.preventDefault();
                });

                $(document).unbind('click.dropDocumentEvent').bind('click.dropDocumentEvent', self.close);
            },
            click: function (e) {
                $cont = $('div', trigger);
                if ($cont.is(':hidden')) {
                    $('dl.dropdown dd div').hide();
                    $cont.show().css({
                        width: trigger.outerWidth() - 2 + 'px'
                    });
                    if ($("a", trigger).length > 10) {
                        $cont.css({
                            height: '210px',//240px
                            overflowY: 'scroll'
                        }).scrollTop(($("a.drop-selected", trigger).index() - 4) * $("a.drop-selected", trigger).outerHeight());
                    }
                    var space = $cont.outerHeight(true) - 2;
                    var wspace = $(window).scrollTop() + document.documentElement.clientHeight - trigger.offset().top - trigger.outerHeight(true);
                    var wspace2 = trigger.offset().top - $(window).scrollTop() - space;
                    if (wspace < space && wspace2 > 0) {
                        $dd.css({ top: -space - trigger.outerHeight(true) });
                        $cont.css({ 'border-bottom': '1px solid #CCCCCC', 'border-top': '1px solid #CCCCCC' });
                    } else {
                        $dd.css({ top: 0 });
                        $cont.css({ 'border-bottom': '1px solid #CCCCCC', 'border-top': '1px solid #CCCCCCC' });
                    }
                } else {
                    $("dd div", trigger).hide();
                }
                e.stopPropagation();
            },
            select: function (a) {
                if (click_type == 'link') { return true; }
                var text = a.html();
                $('a', trigger).removeClass('drop-selected');
                a.addClass('drop-selected');
                if ($dt.children().attr('type') == 'text') {
                    $dt.children().val(text).select();
                } else {
                    $dt.html(text);
                }
                if (a.attr('data-value') != drop.val()) {
                    $selected_value = a.attr('data-value');
                    drop.val($selected_value);
                    trigger.change();
                }
            },
            setData: function (conf) {
                var t = [], flag = false;
                conf.first = typeof conf.first !== 'undefined' ? conf.first : true;
                t.push('<div>');
                if (conf.data) {
                    if (conf.def_label) {
                        t.push('<a href="#" onfocus="this.blur()" data-value="">' + conf.def_label + '</a>');
                    }
                    if ($.isArray(conf.data)) {
                        if ($.inArray(conf.def_value, conf.data)) {
                            flag = true;
                        }
                        $.each(conf.data, function (j, k) {
                            t.push('<a href="#" onfocus="this.blur()" data-value="' + k.id + '" title="' + k.name + '">' + k.name + '</a>');
                        });
                    } else {
                        for (var id in conf.data) {
                            if (id == conf.def_value) {
                                flag = true;
                            }
                            t.push('<a href="#" onfocus="this.blur()" data-value="' + id + '" title="' + conf.data[id] + '">' + conf.data[id] + '</a>');
                        }
                    }
                    t.push('</div>');
                    $dd.empty().append(t.join(""));
                    var $data_txt, $data_class, $data_value, $a_def;
                    if (conf.def_value && flag) {
                        $a_def = $('a[data-value="' + conf.def_value + '"]', trigger);
                        $data_value = conf.def_value;
                    } else {
                        $a_def = conf.first ? $('a:first', trigger) : "";
                        $data_value = conf.first ? $('a:first', trigger).attr('data-value') : "";
                    }
                    if ($('input', $dt).length == 0) { $dt.text($a_def.text()); }
                    $a_def ? $a_def.addClass('drop-selected') : "";
                    drop.val($data_value);
                } else {
                    $dd.empty();
                    $dt.text(conf.def_label);
                }
            },
            close: function (e) {
                if (!$(e.target).parent().data('dropdown') || $(e.target).parent().data('dropdown').getUid() != uid) {
                    $('dl.dropdown dd div').hide();
                }
            },
            reset: function () {
                $('a:first', trigger).click();
                drop.val('');
            },
            clean: function () {
                $dt.html($('a:first', trigger).text());
                $dd.empty();
                drop.val('');
            },
            getValue: function () {
                return $selected_value;
            },
            getConf: function () {
                return conf;
            },
            getUid: function () {
                return uid;
            }
        });
        self.load();
    };
    $.fn.dropdown = function (conf) {
        var opt = {
            data: null,
            def_value: null,
            def_label: null
        };
        var el = this.data("dropdown");
        if (el) { return this; }
        conf = $.extend(true, {}, opt, conf);
        return this.each(function () {
            el = new Drop($(this), conf);
            $(this).data("dropdown", el);
        });
    };
})(jQuery);
function fundsearch() {
    this.autoNoResult = "\u6ca1\u6709\u627e\u5230\u76f8\u5173\u4fe1\u606f";
    this.autoFundNoResult = "\u4ee3\u7801\u002f\u7b80\u62fc\u002f\u4e2d\u6587";
    this.searchSelFunds = [];
    this.init = function () {
        //get fundcompany list
        $.getJSON("http://data.p5w.net/fund/fundjson.php?m=company&callback=?", function (d) {
            FS.FundCompanyList = d;
            FS.setFundCompanylist(d);
        });
        $('#fs_ftype_name').dropdown({
            target: 'fs_ftype_id'
        }).change(function () {
            FS.getFundList();
        });
        $.getJSON("http://data.p5w.net/fund/fundjson.php?m=fund&callback=?", function (d) {
            FS.FundList = d;
            FS.setFundlist();
        });
        $('#btn_view_company').click(function () {
            var d = $("#fs_company_id");
            if (d.val() == "") {
                FS.tips("\u8bf7\u8f93\u5165\u6216\u9009\u62e9\u57fa\u91d1\u516c\u53f8\u002e.");
                return;
            }
            open("http://data.p5w.net/fund/jjgs.php?q=" + d.val());
        });
        $('#btn_view_fund').click(function () {
            var d = $("#fs_fund_id");
            if (d.val() == "") {
                FS.tips("\u8bf7\u9009\u62e9\u60a8\u8981\u67e5\u770b\u7684\u57fa\u91d1\u002e");
                return;
            }
            open("http://data.p5w.net/fund/fund.php?q=" + d.val());
        });


    };
    this.setFundCompanylist = function () {
        var d = $("#fs_company_id");
        FS.CompanyPop = new Base.pop.tab("pop_fs_companylist", {
            data: [FS.FundCompanyList.company],
            autoCom: {
                source: FS.FundCompanyList.company.autolist,
                select: function (e, f) {
                    if (f.item.result === FS.autoNoResult) {
                        d.val("");
                        $(this).val("");
                        e.preventDefault()
                    } else {
                        d.val(f.item.id);
                    }
                },
                focus: function (e, f) {
                    if (f.item.result === FS.autoNoResult) {
                        d.val("");
                        e.preventDefault()
                    }
                },
                change: function (e, f) {
                    if (!f.item) {
                        $(this).val("\u6ca1\u6709\u627e\u5230\u76f8\u5173\u4fe1\u606f").addClass("nt");
                        d.val("");
                    }
                }
            },
            callback: function () {
                FS.getFundList();
            }
        });
        var selc = $('#sel-company');
        var selc2 = $('#sel-company-c');
        selc.empty();
        selc2.empty();
        selc.addOptions({ "default": "--请选择基金公司--", options: FS.FundCompanyList.company.autolist });
        selc2.addOptions({ "default": "全部基金公司", options: FS.FundCompanyList.company.autolist });
        selc.bind("change", function () {
            FS.changeselect();
        });
        $('#sel-type').bind('change', function () {
            FS.changeselect();
        });
        var form = $('#advsearchForm');
        var sel_s = $('select[name="s"]', form);
        var sel_t = $('select[name="t"]', form);
        var sel_o = $('select[name="o"]', form);
        var s_data = [{ "name": "股票型", "id": "1" }, { "name": "混合型", "id": "2" }, { "name": "债券型", "id": "3" }, { "name": "货币型", "id": "4" }, { "name": "其他类型", "id": "5" }];
        var s_data_1 = [{ "name": "股票型", "id": "1" }, { "name": "混合型", "id": "2" }, { "name": "债券型", "id": "3" }];
        var n_str = ['seasonrank', 'semirank', 'yearrank', 'thisyearrank', 'foundrank'];
        $(sel_s).bind('change', function () {
            var _o = $(sel_t).val();
            if (this.value == '') {
                $(sel_t).addOptions({ "default": "所有类型", "def_value": "", "selected": "", options: s_data });
                $(sel_t).val(_o);
            } else {
                $(sel_t).addOptions({ "default": "所有类型", "def_value": "", "selected": "", options: s_data_1 });
                if (_o < 4) {
                    $(sel_t).val(_o);
                } else {
                    $(sel_t).val('');
                }
            }
            var f = form[0];
            for (var i = 0; i < 5; i++) {
                f[n_str[i]].value = "";
            }
            if (this.value != '') {
                f[n_str[this.value]].value = $(sel_o).val();
            }
        });
        $(sel_o).bind('change', function () {
            var _v = $(sel_s).val();
            var f = form[0];
            for (var i = 0; i < 5; i++) {
                f[n_str[i]].value = "";
            }
            if (_v != '') {
                f[n_str[_v]].value = this.value;
            }
        });
    };
    this.setFundlist = function () {
        var d = $("#fs_fund_id");
        if (!FS.FundPop) {
            FS.FundPop = new Base.pop.tab("pop_fs_fundlist");
        }
        FS.FundPop.setData({
            def_label: FS.autoFundNoResult,
            data: [FS.FundList.fund],
            autoCom: {
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
                        $(this).val("\u4ee3\u7801\u002f\u7b80\u62fc\u002f\u4e2d\u6587").addClass("nt");
                        d.val("");
                    }
                }
            },
            callback: function () {
                //TODO 回调函数
            }
        });

    };
    this.getFundList = function () {
        var url = "http://data.p5w.net/fund/fundjson.php?m=fund";
        var d = $("#fs_company_id");
        if (d.val() != "") {
            url += "&cid=" + d.val();
        }
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
FS = new fundsearch();
$(function () {
    FS.init();
});

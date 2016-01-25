(function ($) {
    var ie6 = Base.is_ie6;
    $.Suggest = function (elm, options) {
        this.stringUrl = "";
        this.elementScriptLoader = null;
        this.stringOriginalValue = "";
        this.stringLastValue = "";
        this.functionCallback = null;
        this.objectHtml = {};
        this.objectData = {};
        this.booleanHideDelay = false;
        this.$elmLineCurrent = null;
        this.$elm = $(elm);
        this.opts = $.extend({},
        $.fn.suggest.defaults, options);
        this.$elmContainer = $('<div/>').css({
            display: 'none',
            filter: 'alpha(opacity=95)',
            opacity: 0.95,
            position: 'absolute',
            width: this.opts.width,
            'z-index': 999
        }).appendTo(document.body).data('suggest', this);
        this.init()
    };
    $.Suggest.prototype = {
        init: function () {
            this.stringOriginalValue = (this.opts["default"] == null || this.opts["default"] == "") ? this.$elm.val() : this.opts["default"];
            this.changeType(this.opts.type);
            this.$elm.val(this.stringOriginalValue);
            this.$elm.attr("autocomplete", "off").bind("focus.suggest", $.proxy(this.eventFocus, this)).bind("blur.suggest", $.proxy(this.eventBlur, this)).bind("keyup.suggest", $.proxy(this.eventButtonUp, this)).bind("mouseup.suggest", $.proxy(this.eventButtonUp, this));
            this.functionCallback = this.opts.callback
        },
        eventFocus: function () {
            if (this.$elm.val() == this.stringOriginalValue) {
                this.$elm.val("")
            }
            this.stringLastValue = "";
            this.check()
        },
        eventBlur: function () {
            if (this.$elm.val() == "") {
                this.$elm.val(this.stringOriginalValue)
            }
            this.stringLastValue = "";
            this.hide()
        },
        eventButtonUp: function () {
            var a = arguments[0] || window.event;
            var b = 0;
            var trs = $('tbody>tr', this.$elmContainer);
            switch (a.keyCode) {
                case 38:
                    if (trs.size() > 0) {
                        var idx = (this.$elmLineCurrent == null || this.$elmLineCurrent[0].rowIndex < b) ? (trs.size() - 1) : this.$elmLineCurrent[0].rowIndex - 2;
                        this.setLine(trs.eq(idx))
                    }
                    break;
                case 40:
                    if (trs.size() > 0) {
                        var idx = (this.$elmLineCurrent == null || this.$elmLineCurrent[0].rowIndex > (trs.size() - 1)) ? b : this.$elmLineCurrent[0].rowIndex;
                        this.setLine(trs.eq(idx))
                    }
                    break;
                case 13:
                    if (this.$elmContainer != null) {
                        if (this.$elmLineCurrent != null) {
                            this.setLine(this.$elmLineCurrent)
                        }
                        if (this.functionCallback != null) {
                            this.functionCallback(this.$elm.val())
                        }
                    }
                    this.hide();
                    break;
                default:
                    this.check();
                    break
            }
        },
        changeType: function (b) {
            this.objectHtml = {};
            this.objectData = {};
            this.$elm.val(this.stringOriginalValue);
            if (typeof b != "undefined") {
                var a = "";
                switch (b.toLowerCase()) {
                    case "stock":
                        a = "stock";
                        break;
                    case "fund":
                        a = "fund";
                    default:
                        a = b;
                        break
                }
                this.stringUrl = this.opts.ServerUrl.replace("@TYPE@", a)
            } else {
                this.stringUrl = this.opts.ServerUrl.replace("type=@TYPE@&", "")
            }
            this.opts.type = b
        },
        show: function () {
            this.$elmContainer.show();
            this.opts.onshow()
        },
        hide: function () {
            if (this.booleanHideDelay == false) {
                this.hideNow()
            }
        },
        hideNow: function () {
            this.$elmContainer.hide();
            this.opts.onhide()
        },
        check: function () {
            var a = this.$elm.val();
            if (this.stringLastValue != a) {
                this.stringLastValue = a;
                if (a != "") {
                    if (("key_" + a) in this.objectData) {
                        this.fill()
                    } else {
                        this.load(a, $.proxy(this.fill, this), $.proxy(this.hide, this))
                    }
                } else {
                    if (this.$elmContainer != null) {
                        this.$elmLineCurrent = null;
                        this.$elmContainer.html('')
                    }
                    this.hide()
                }
            } else {
                this.show()
            }
        },
        setLine: function (e) {
            e = $(e);
            var a = e.attr('id').split(",");
            var f = this.opts.value;
            if (f != null && f != "") {
                var c = a[f]
            } else {
                var c = this.getFullCode(a)
            }
            var d = e.id;
            for (var b = 2; b < 6; b++) {
                this.objectData["key_" + a[b]] = d + ";"
            }
            this.stringLastValue = c;
            this.$elm.val(c);
            if (this.$elmLineCurrent != null) {
                this.$elmLineCurrent.data('booleanArrow', false);
                this.color(this.$elmLineCurrent)
            }
            e.data('booleanArrow', true);
            this.color(e);
            this.$elmLineCurrent = e
        },
        getFullCode: function (a) {
            return a[1]
        },
        hidepause: function () {
            this.booleanHideDelay = true
        },
        hideresume: function () {
            this.booleanHideDelay = false;
            this.hideNow()
        },
        color: function (b) {
            var a = "";
            if (b.data('booleanArrow') && b.data('booleanMouse')) {
                a = "#F8FBDF"
            } else {
                if (b.data('booleanArrow')) {
                    a = "#F1F5FC"
                } else {
                    if (b.data('booleanMouse')) {
                        a = "#FCFEDF"
                    }
                }
            }
            b.css({
                'background-color': a
            })
        },
        setLineMouse: function (a) {
            a = $(a);
            this.setLine(a);
            if (this.functionCallback != null) {
                this.functionCallback(this.$elm.val())
            }
        },
        position: function () {
            var pos = this.$elm.offset();
            this.$elmContainer.css({
                left: pos.left,
                top: pos.top + this.$elm.outerHeight()
            })
        },
        fill: function () {
            var c = this.$elm.val();
            if (("key_" + c) in this.objectData && this.objectData["key_" + c] != "") {
                this.position();
                var d = "<style type='text/css'>.suggest{border-collapse:collapse; line-height:18px; border:1px solid #eee; background-color:#fff; font-size:12px; text-align:center; color:#999;}.suggest .hover{background-color:#F8FBDF}</style>";
                d += '<table class="suggest" style="width:' + (this.opts.width - 2) + 'px;">';
                d += '<thead><tr style="background-color:#F3F3F3;">';
                $(this.opts.head).each(function (i, item) {
                    d += "<td>" + item + "</td>"
                });
                d += "</tr></thead><tbody>";
                var m = (this.objectData["key_" + c] || "").replace(/&amp;/g, "&").replace(/;$/, "").split(";");
                var l = m.length > this.opts.max ? this.opts.max : m.length;
                for (var g = 0; g < l; g++) {
                    var k = m[g].split(",");
                    k[-1] = k[0].replace(new RegExp(c.toLowerCase().replace(/\./g,
                    function (i) {
                        return "\\" + i
                    }), "gi"),
                    function (i) {
                        return '<span style="color:#F00;">' + i + "</span>"
                    });
                    k[-2] = "\u2014\u2014";
                    if (this.opts.link == null || this.opts.link == "") {
                        var b = ['<td style="padding:0px;"><span style="display:block; padding:1px;">', "</span></td>"]
                    } else {
                        var f = this.opts.link.replace(/@code@/g, this.getFullCode(k));
                        for (var e in k) {
                            f = f.replace((new RegExp("@" + e + "@", "g")), k[e])
                        }
                        var b = ['<td style="padding:0px;"><a href="' + f + '" hidefocus="true" style="color:#999; display:block; outline:none; padding:1px; text-decoration:none; width:100%;" target="' + this.opts.target + '">', "</a></td>"]
                    }
                    d += '<tr id="' + m[g] + '" style="cursor:pointer;" >';
                    for (var e in this.opts.body) {
                        d += b[0] + k[this.opts.body[e]] + b[1]
                    }
                    d += "</tr>"
                }
                d += "</tbody></table>";
                this.objectHtml["key_" + c] = d;
                this.$elmLineCurrent = null;
                this.$elmContainer.html(this.objectHtml["key_" + c]);
                var _this = this;
                $('tbody tr', this.$elmContainer).each(function () {
                    $(this).bind('mousedown.suggest', $.proxy(function () {
                        _this.setLineMouse(this)
                    },
                    this))
                });
                $("tbody tr td", this.$elmContainer).hover(function () {
                    $(this).parent("tr").addClass("hover")
                },
                function () {
                    $(this).parent("tr").removeClass("hover")
                }).bind('mousedown.suggest', $.proxy(function () {
                    _this.hidepause()
                },
                this)).bind('click.suggest', $.proxy(function () {
                    _this.hideresume()
                },
                this));
                this.show()
            } else {
                this.hide()
            }
        },
        loadback: function (a, d, e, b) {
            var f = window[a];
            if (typeof f != "undefined") {
                this.objectData["key_" + d] = f;
                if (e) {
                    e(f)
                }
            } else {
                if (b) {
                    b("")
                }
            }
        },
        load: function (d, e, b) {
            var a = "suggestdata_" + (new Date()).getTime();
            var _src = this.stringUrl.replace("@NAME@", a).replace("@KEY@", encodeURIComponent(d.toLowerCase()));
            var _this = this;
            $.getScript(_src, $.proxy(function () {
                _this.loadback(a, d, e, b)
            },
            this))
        }
    };
    $.fn.suggest = function (options) {
        var opts = $.extend({},
        $.fn.suggest.defaults, options);
        return this.each(function () {
            new $.Suggest(this, opts)
        })
    };
    $.fn.suggest.defaults = {
        ServerUrl: "http://company.p5w.net/service/suggest.asp?key=@KEY@&name=@NAME@",
        "default": "\u62fc\u97f3\u002f\u4ee3\u7801\u002f\u540d\u79f0",
        type: "",
        value: 1,
        max: 10,
        width: 220,
        link: null,
        target: "_blank",
        head: ["\u9009\u9879", "\u4ee3\u7801", "\u540d\u79f0"],
        body: [-1, 1, 2],
        loader: null,
        callback: null,
        onshow: function () { },
        onhide: function () { }
    }
})(jQuery);
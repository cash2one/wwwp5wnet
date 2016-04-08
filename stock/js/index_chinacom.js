$(function () {
    var hqUrl = "http://data.p5w.net/stock/index.php?code=";
    var code = getQueryString("code");
    switch (code) {
        case '399429':
            var stockArr = [{ code: 'sz399429', name: '新丝路' }];
            $(document).attr('title', '新丝路');
            break;
        case '399001':
            var stockArr = [{ code: 'sz399001', name: '深证成指' }];
            $(document).attr('title', '深证成指');
            break;
        case '000001':
            var stockArr = [{ code: 'sh000001', name: '上证指数' }];
            $(document).attr('title', '上证指数');
            break;
        case '399006':
            var stockArr = [{ code: 'sz399006', name: '创业板指' }];
            $(document).attr('title', '创业板指');
            break;
        default:
            $(document).attr('title', '介个木有哈');
            break;
    }
    $('.index_main').hqLoader({
        stocks: stockArr,
        chartWidth: 180,
        chartHeight: 151
    });
});

(function ($, undefined) {
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
})(jQuery);

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
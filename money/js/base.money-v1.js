$(function () {
    $('.photo-news').hover(function () {
        $('a.prev', $('.photo-news')).show();
        $('a.next', $('.photo-news')).show()
    },
    function () {
        $('a.prev', $('.photo-news')).hide();
        $('a.next', $('.photo-news')).hide()
    }).slides({
        preload: true,
        preloadImage: 'images13/loading_24X24.gif',
        play: 5000,
        pause: 2500,
        hoverPause: true
    });
    if (Base.is_ie6) {
        Base.runJs('http://www.p5w.net/scripts/DD_belatedPNG_0.0.8a-min.js',
        function () {
            DD_belatedPNG.fix('a.prev img,a.next img')
        })
    }
    if (typeof tradingdayData != "undefined") {
        var data = tradingdayData.czxlist || [];
        var html = new Array();
        for (var i = 0; i < data.length && i < 5; i++) {
            var a = data[i];
            html.push('<div class="mod-tw"><div class="mod-img"><a href="' + a.url + '" target="_blank" title="' + a.title + '"><img src="' + a.img + '" alt="' + a.title + '" width="90" height="60" /></a></div>');
            html.push('<div class="mod-text3"><p class="mod-lt"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></p>');
            html.push('</div></div>');
            i++;
            a = data[i];
            html.push('<div class="mod-tw"><div class="mod-img"><a href="' + a.url + '" target="_blank" title="' + a.title + '"><img src="' + a.img + '" alt="' + a.title + '" width="90" height="60" /></a></div>');
            html.push('<div class="mod-text3"><p class="mod-lt"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></p>');
            html.push('</div></div>');
            html.push('<ul>');
            i++;
            a = data[i];
            html.push('<li class="video"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></li>');
            i++;
            a = data[i];
            html.push('<li class="video"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></li>');
            i++;
            a = data[i];
            html.push('<li class="video"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></li>')
        }
        $('#lcSP').html(html.join(''))
    };
    
});

function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}

$(document).ready(function () {
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
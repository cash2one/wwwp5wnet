$(function () {
    $('.photo-news').hover(function () {
        $('a.prev', $('.photo-news')).show();
        $('a.next', $('.photo-news')).show();
    }, function () {
        $('a.prev', $('.photo-news')).hide();
        $('a.next', $('.photo-news')).hide();
    }).slides({
        preload: true,
        preloadImage: 'images13/loading_24X24.gif',
        play: 5000,
        pause: 2500,
        hoverPause: true
    });
    if (Base.is_ie6) {
        p5w.runJs('http://www.p5w.net/scripts/DD_belatedPNG_0.0.8a-min.js', function () {
            DD_belatedPNG.fix('a.prev img,a.next img');
        });
    }   
    if (typeof bbsdata != "undefined") {
        var ul = $('<ul/>').appendTo($('#bbs-list'));
        $(bbsdata).each(function (i) {
            if (i > 17) return false;
            $('<li><a target="_blank" href="http://bbs.p5w.net/forum.php?mod=viewthread&tid=' + this.tid + '">' + this.subject + '</a></li>').appendTo(ul);
        });
    }
    if (typeof tradingdayData != "undefined") {
        //新股视频
        var data = tradingdayData.cjdsylist || [];
        var html = new Array();
        for (var i = 0; i < data.length && i < 4; i++) {
            var a = data[i];
            html.push('<div class="mod-tw5"><div class="mod-img3"><a href="' + a.url + '" target="_blank" title="' + a.title + '"><img src="' + a.img + '" alt="' + a.title + '" width="100" height="72" /></a></div>');
            html.push('<div class="mod-text5"><p class="mod-lt"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></p>');
            html.push('</div></div>');
            html.push('<ul>');
            i++;
            a = data[i];
            html.push('<li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></li>');
            i++;
            a = data[i];
            html.push('<li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></li>');
            i++;
            a = data[i];
            html.push('<li><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></li>');
        }
        $('#cjdsySP').html(html.join(''));
    }
    $(".mag-content").jCarouselLite({
        auto: 3500,
        speed: 800,
        visible: 7,
        scroll: 3,
        btnNext: "#mag-arrow-next",
        btnPrev: "#mag-arrow-prev"
    });

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

function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}

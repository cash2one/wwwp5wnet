$(function () {   
    if (typeof tradingdayData != "undefined") {

        //新股视频
        var data = tradingdayData.ggztlist || [];
        var html = new Array();
        for (var i = 0; i < data.length && i < 5; i++) {
            var a = data[i];
            html.push('<div class="mod-tw"><div class="mod-img"><a href="' + a.url + '" target="_blank" title="' + a.title + '"><img src="' + a.img + '" alt="' + a.title + '" width="90" height="60" /></a></div>');
            html.push('<div class="mod-text"><p class="mod-lt"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></p>');
            //i++;
            //a = data[i];
            //html.push('<p class="mod-lc"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></p>');
            //i++;
            //a = data[i];
            //html.push('<p class="mod-lc"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></p>');
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
            html.push('<li class="video"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></li>');
            i++;
            a = data[i];
            html.push('<li class="video"><a href="' + a.url + '" target="_blank" title="' + a.title + '">' + a.title + '</a></li>');
        }
        $('#ggztSP').html(html.join(''));
    }
});

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
    //easyloader.theme = "metro";
    //using(['messager'], function () { });
});

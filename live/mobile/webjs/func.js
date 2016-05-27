$(function () {
    $('#refresh').bind('click', function () {
        window.location.reload();
    });
    
    var trs_editor = $('div.TRS_Editor');
    trs_editor.removeClass('TRS_Editor');
    $('style', trs_editor).eq(0).remove();
    $('.articlemiddle style').remove();

    $('.mypages').each(function (i) {
        $(this).attr('id', 'page' + i);
    });

    var nomorepagetext = '没有更多内容了哦:)';
    $('#page0').show('fast');
    if ($('.newsList').size() <= 10) {
        $('#pagemore').unbind();
        $('#pagemore').html(nomorepagetext);
    }

    var pagesize = $('.mypages').size();
    var page = 1;
    $('#pagemore').bind('click', function () {
        $('#page' + page).show(300);
        page++;
        if (page == pagesize) {
            $(this).unbind();
            $(this).html(nomorepagetext);
        }
    });

    $(".row03 img").each(function () {
        $(this).attr('width', '100%');
        $(this).removeAttr('height');
    });

    // $(".contentpics").each(function () {
    //     $(this).find('a').each(function () {
    //         $(this).attr('href', $(this).find("img").attr("src"));
    //     });
    // });

    liveSrc = $.trim(liveSrc);
    liveTitle = $.trim(liveTitle);
    if (!(liveSrc == '' || liveSrc == null || liveSrc == undefined)) {
        //var liveBoxHtml = '<div class="liveBox"><video src="' + liveSrc + '" width="100%" height="" controls="controls"></video></div>';
        var liveBoxHtml = new Array();
        liveBoxHtml.push('<div class="temp-wrap video">');
        liveBoxHtml.push('    <div class="mbody" style="background-color: #000;">');
        liveBoxHtml.push('        <video src="' + liveSrc + '" width="100%" height="auto" controls></video>');
        liveBoxHtml.push('    </div>');
        liveBoxHtml.push('    <h4 class="title f14 tc white-bg">' + liveTitle + '</h4>');
        liveBoxHtml.push('</div>');
        $('.live-intro').after(liveBoxHtml.join(''));
    }
});
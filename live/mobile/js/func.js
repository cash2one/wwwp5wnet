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

    $('#page0').show('fast');
    if ($('.btn').size() <= 10) {
        $('#pagemore').unbind();
        $('#pagemore').text('û�и���������Ŷ:)');
    }

    var pagesize = $('.mypages').size();
    var page = 1;
    $('#pagemore').bind('click', function () {
        $('#page' + page).show(300);
        page++;
        if (page == pagesize) {
            $(this).unbind();
            $(this).text('û�и���������Ŷ:)');
        }
    });

    $(".articlemiddle img").each(function () {
        $(this).attr('width', '100%');
        $(this).removeAttr('height');
    });

    // $(".contentpics").each(function () {
    //     $(this).find('a').each(function () {
    //         $(this).attr('href', $(this).find("img").attr("src"));
    //     });
    // });

    liveSrc = $.trim(liveSrc);
    if (!(liveSrc == '' || liveSrc == null || liveSrc == undefined)) {
        var liveBoxHtml = '<div class="liveBox"><video src="' + liveSrc + '" width="100%" height="" controls="controls"></video></div>';
        $('.articlesummary').after(liveBoxHtml);
    }
});
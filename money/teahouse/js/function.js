$(document).ready(function () {
    var trs_editor = $('DIV.TRS_Editor');
    trs_editor.removeClass('TRS_Editor');
    $('style', trs_editor).eq(0).remove();
    $('#_Custom_V6_Style_').remove();
    //替换正文中的<BR>为<p>
    $('.zhengwen br').each(function () {
        $(this).after($('<p></p>')).remove();
    });
});

$(document).ready(function () {
    $("#picsbox").jCarouselLite({
        auto: 3500,
        speed: 800,
        visible: 4,
        scroll: 1,
        btnNext: "#arrow-next",
        btnPrev: "#arrow-prev",
        mouseWheel: true,
        //easing: "bounceout",
        onMouse: true
    });
});
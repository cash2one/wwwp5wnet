document.domain = "p5w.net";
$(function () {
    $(window.parent.document).find("#inRight").load(function () {
        var main = $(window.parent.document).find("#inRight");
        var mainheight = $('#cInner').height() + 10;
        main.height(mainheight);
    });
});
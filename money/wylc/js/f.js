$(function () {
    $('.qj-content dl:first').attr("class", "selected");
    $('.qj-content dl').mouseover(function () {
        $('.qj-content dl').each(function (i, e) {
            $(e).attr("class", "un-selected");
        });
        $(this).attr("class", "selected");
    });
});
$(function () {
    $('#refresh').bind('click', function () {
        window.location.reload();
    });

    $('a.pic_zk').bind('click', function () {
        var imgsrc = $(this).find('img').attr('src');
        if (imgsrc.indexOf('zk.jpg') > 0) {
            $(this).parent().prev().show();
            $(this).parent().prev().prev().hide();
            $(this).find('img').attr('src', '../images/sq.jpg');
        }
        if (imgsrc.indexOf('sq.jpg') > 0) {
            $(this).parent().prev().hide();
            $(this).parent().prev().prev().show();
            $(this).find('img').attr('src', '../images/zk.jpg');
        }
    });

    $(".contentpics").each(function () {
        var itemImg = $(this).find("img");
        var itemImgSize = itemImg.size();
        //console.log("itemImgSize:" + itemImgSize);

        var fancySize = 1;
        if (itemImgSize == fancySize) {
            itemImg.attr('width', '600');
            $(this).find('a').each(function () {
                $(this).replaceWith(function () {
                    return $(this).find("img");
                })

            });
            
        }
        if (itemImgSize > fancySize) {
            $(this).find('a').each(function () {
                $(this).attr('href', $(this).find("img").attr("src"));
            });
            $(this).find('a').fancybox({
                padding: 0,

                openEffect: 'elastic',
                openSpeed: 150,

                closeEffect: 'elastic',
                closeSpeed: 150,

                closeClick: false,

                helpers: {
                    overlay: {
                        speedOut: 0
                    }
                }
            });
        }
    });

    /*
    $(".contentpics a").each(function () {
        $(this).attr('href', $(this).find("img").attr("src"));
    });
    $('.contentpics a').fancybox({
        padding: 0,

        openEffect: 'elastic',
        openSpeed: 150,

        closeEffect: 'elastic',
        closeSpeed: 150,

        closeClick: false,

        helpers: {
            overlay: {
                speedOut: 0
            }
        }
    });
    */
    goToTop();
});

var shareButton = function () {
    document.writeln('<a class="bshareDiv" href="http://www.bshare.cn/share">分享到</a>');
    document.writeln('<script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/buttonLite.js#uuid=79da6bbc-9b75-4234-b305-7a29bcdde247&amp;style=3&amp;fs=4&amp;textcolor=#fff&amp;bgcolor=#19D&amp;text=\u5206\u4eab\u5230"></script>');
}

var goToTop = function () {
    var html = '<div class="gototop-wrap"><div id="gototop_btn" class="gototop"><a style="display:none;" title="返回顶部" href="javascript:void(0);" onfocus="this.blur();" class="toplink">TOP</a></div></div>';
    var win = $(window);
    var side = $(html).appendTo($('body'));
    var topBtn = $('#gototop_btn a');
    //屏幕小于1024时添加类
    var resizeClz = 'gototop-wrap-resize';
    //返回顶部
    topBtn.click(function () {
        if (!Base.is_ie6) {
            $('html,body').animate({ scrollTop: 0 }, 120);
        } else {
            document.documentElement.scrollTop = 0;
        }
    });
    var sideFun = function () {
        var st = $(document).scrollTop(),
        winh = win.height();
        (st > 0) ? topBtn.fadeIn() : topBtn.fadeOut();
    };
    if (Base.is_ie6) {
        sideFun = function () {
            var st = $(document).scrollTop(),
            winh = win.height();
            (st > 0) ? topBtn.fadeIn() : topBtn.fadeOut();
            side.css("top", st + winh - 225);
        };
    };
    var resize = function () {
        var winw = win.width();
        if (winw < 1074) {
            side.addClass(resizeClz);
        } else {
            side.removeClass(resizeClz);
        }
    };
    win.bind('resize', resize).bind('scroll', sideFun);
    resize();
    sideFun();
};
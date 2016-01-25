if (typeof isIndex == "undefined") {
    var isIndex = false;
}
$(function () {
    function isLogin(user) {
        var loginSrv = 'http://passport.p5w.net';
        var loginpanl = $('#user-menu')
        if (user.uid > 0) {
            var uname = decodeURIComponent(user.username);
            var url_forward = encodeURIComponent(document.location.href);
            var arr = ['<ul class="menu">',
                '<li class="item"><a class="link link-hover" href="javascript:;" onclick="SetHome(this,\'http://www.p5w.net/\')"><em>设为首页</em></a></li>',
                '<li class="item"><a class="link link-hover" href="http://www.p5w.net/cftxclub/club/201008/t20100825_97025.htm" target="_blank"><em>帮助</em></a></li>',
                '<li class="item"><a class="link link-hover" href="' + loginSrv + '/logout.php?referer=' + url_forward + '"><em>退出</em></a></li>',
                '<li class="item welcome">欢迎您，</li>',
                '<li class="item"><a class="link link-hover" href="' + loginSrv + '/index.php" target="_blank"><em>' + uname + '</em></a></li>',
                '</ul>'
            ];
            var html = new Array();
            if (isIndex) {
                html.push(arr[0]);
                html.push(arr[4]);
                html.push(arr[5]);
                html.push(arr[3]);
                html.push(arr[2]);
                html.push(arr[1]);
            } else {

            }
            $(loginpanl).empty().html(html.join(''));
        } else {
            //未登录
        }

    }
    passport.getUser(isLogin);
    
});
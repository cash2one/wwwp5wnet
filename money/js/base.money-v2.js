$(function () {
    var keyword = $('#name');
    if (keyword[0]) {
        var defval = "\u8bf7\u8f93\u5165\u5173\u952e\u8bcd";
        keyword.bind("focus", function () {
            if (this.value == defval) {
                this.value = "";
            }
        }).bind("blur", function () {
            if (this.value == "") {
                this.value = defval;
            }
        });
        $('#magnifier').click(function () {
            if (keyword.val() == defval) {
                alert(defval);
                return false
            }
            window.open('http://search.p5w.net/newsIndexSearch.action?keyword=' + encodeURI(keyword.val().substring(0, 80).replace(/[#$%'^&*()]/g, '').replace(/\r\n/ig, '')));
        });
    }

    $('.photo-news').hover(function () {
        $('a.prev', $('.photo-news')).show();
        $('a.next', $('.photo-news')).show()
    },
    function () {
        $('a.prev', $('.photo-news')).hide();
        $('a.next', $('.photo-news')).hide()
    }).slides({
        preload: true,
        preloadImage: 'http://www.p5w.net/images13/loading_24X24.gif',
        play: 5000,
        pause: 2500,
        hoverPause: true
    });
    $("#fk_roll_magzines").jCarouselLite({
        auto: 3500,
        speed: 800,
        visible: 3,
        scroll: 1,
        onMouse: true,
        btnNext: "#mag-arrow-next",
        btnPrev: "#mag-arrow-prev"
    });

    if (Base.is_ie6) {
        Base.runJs('http://www.p5w.net/scripts/DD_belatedPNG_0.0.8a-min.js', function () {
            DD_belatedPNG.fix('a.fk_ie6png img');
            DD_belatedPNG.fix('.fk_ie6png');
        });
    }

    if (Base.is_ie6) {
        Base.runJs('http://www.p5w.net/scripts/DD_belatedPNG_0.0.8a-min.js', function () {
            DD_belatedPNG.fix('a.prev img,a.next img')
        })
    }

    tbdbpa();
    tbdbpb();   
});

function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}

function topso() {
    var sq = $('#sq').val();
    if (sq == "") {
        alert("请输入搜索关键词！");
        return false;
    }
    window.open("/so.html?sq=" + encodeURIComponent(sq));
    return false;
}

function tbdbpa() {
    var url = 'http://data.p5w.net/json/fundjson.php?m=tbdbp&count=3&desc=1&callback=?&rnd=' + new Date().getTime();
    $.getJSON(url, function (data) {
        var html = new Array();
        if (data.tbdbp == null) return false;
        $.each(data.tbdbp, function (i, item) {
            if (i < 3) {
                var name = item.s2;
                name = name.strLen() > 12 ? name.subCHStr(0, 12) : name;
                var code = item.s3;
                var link = 'http://data.p5w.net/fund/fund.php?q=' + code;
                var price = item.s11;
                var weekrate = item.s10;
                html.push('<li class="dh4 blue"><a href="' + link + '" target="_blank">' + name + '</a></li><li class="dh6 red">' + weekrate + '</li><li class="dh7">' + price + '</li>');
            }
        });
        $('#tbdbpa').html(html.join(''));
    });
}

function tbdbpb() {
    var url = 'http://data.p5w.net/json/fundjson.php?m=tbdbp&count=3&desc=0&callback=?&rnd=' + new Date().getTime();
    $.getJSON(url, function (data) {
        var html = new Array();
        if (data.tbdbp == null) return false;
        $.each(data.tbdbp, function (i, item) {
            if (i < 3) {
                var name = item.s2;
                name = name.strLen() > 12 ? name.subCHStr(0, 12) : name;
                var code = item.s3;
                var link = 'http://data.p5w.net/fund/fund.php?q=' + code;
                var price = item.s11;
                var weekrate = item.s10;
                html.push('<li class="dh4 blue"><a href="' + link + '" target="_blank">' + name + '</a></li><li class="dh6 red">' + weekrate + '</li><li class="dh7">' + price + '</li>');
            }
        });
        $('#tbdbpb').html(html.join(''));
    });
}

String.prototype.strLen = function () {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0) len += 2; else len++;
    }
    return len;
}
//将字符串拆成字符，并存到数组中
String.prototype.strToChars = function () {
    var chars = new Array();
    for (var i = 0; i < this.length; i++) {
        chars[i] = [this.substr(i, 1), this.isCHS(i)];
    }
    String.prototype.charsArray = chars;
    return chars;
}
//判断某个字符是否是汉字
String.prototype.isCHS = function (i) {
    if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0)
        return true;
    else
        return false;
}
//截取字符串（从start字节到end字节）
String.prototype.subCHString = function (start, end) {
    var len = 0;
    var str = "";
    this.strToChars();
    for (var i = 0; i < this.length; i++) {
        if (this.charsArray[i][1])
            len += 2;
        else
            len++;
        if (end < len)
            return str;
        else if (start < len)
            str += this.charsArray[i][0];
    }
    return str;
}
//截取字符串（从start字节截取length个字节）
String.prototype.subCHStr = function (start, length) {
    return this.subCHString(start, start + length);
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
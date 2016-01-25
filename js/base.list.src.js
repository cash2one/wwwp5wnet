function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none"
    }
}
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt
};
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2)
};
String.prototype.len = function () {
    return this.replace(/[^\x00-\xff]/g, "aa").length
};
String.prototype.sub = function (n, o) {
    var r = /[^\x00-\xff]/g;
    if (this.replace(r, "mm").length <= n) return this;
    var p = o ? o : "";
    var m = Math.floor(n / 2);
    for (var i = m; i < this.length; i++) {
        if (this.substr(0, i).replace(r, "mm").length >= n) {
            var rs = this.substr(0, i) + p;
            return rs
        }
    }
    return this
};
function setCookie(name, value, expires, path, domain) {
    var str = name + "=" + escape(value);
    if (expires) {
        if (expires == 'never') {
            expires = 100 * 365 * 24 * 60
        }
        var exp = new Date();
        exp.setTime(exp.getTime() + expires * 60 * 1000);
        str += "; expires=" + exp.toGMTString()
    }
    if (path) {
        str += "; path=" + path
    }
    if (domain) {
        str += "; domain=" + domain
    }
    document.cookie = str
}
function getCookie(name) {
    var tmp,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)", "gi");
    tmp = reg.exec(unescape(document.cookie));
    if (tmp) {
        return (tmp[2])
    }
    return null
}
function chgFontSize(obj, size) {
    setCookie("NewsContent_FontSize", size, 9999);
    $(obj).css({
        'font-size': size + 'px'
    })
}
$(function () {
    var irmSrv = "http://irm.p5w.net/";
    var ircsSrv = "http://ircs.p5w.net/";
    var jsonurl = irmSrv + "gszz/p5w_mostcompany.js";
    Base.loadJs([jsonurl], function () {
        var qdata = latestRepliedQuestions;
        if (typeof qdata != "undefined") {
            var panel = $('.qa-question-list');
            panel.empty();
            $(qdata.items).each(function (i) {
                if (i > 3) return false;
                var questioner = this.questioner;
                var content = this.content;
                content = content.replaceAll('\n', '');
                var replyContent = this.replyContent;
                replyContent = replyContent.replaceAll('\n', '').sub(250, "...");
                var replyDate = this.replyDate;
                var replydate = (new Date(replyDate.replaceAll('-', '/'))).format("yyyy-MM-dd");
                var stockname = this.stockname;
                var replyer = this.replyer;
                $('<div class="qa-question">网友<span class="red">问</span>' + stockname + '(' + this.stockcode + '):<a href="' + ircsSrv + 'ircs/interaction/viewQuestion.do?questionId=' + this.questionid + '" target="_blank">' + content + '</a></div>').appendTo(panel);
                $('<div class="qa-answer">' + replyer + '<span class="red">答</span>网友:<a href="' + ircsSrv + 'ircs/interaction/viewQuestion.do?questionId=' + this.questionid + '" target="_blank">' + replyContent + '</a><span class="replydate">' + replydate + '</span></div>').appendTo(panel)
            })
        }
    },
    "utf-8")
});
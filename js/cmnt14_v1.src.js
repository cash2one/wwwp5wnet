var tips = "\u4e3b\u529e\u65b9\u6b22\u8fce\u6295\u8d44\u8005\u7684\u5e7f\u6cdb\u610f\u89c1\uff0c\u4f46\u4e3a\u4e86\u5171\u540c\u8425\u9020\u548c\u8c10\u7684\u4ea4\u6d41\u6c14\u6c1b\uff0c\u9700\u63d0\u9192\u6295\u8d44\u8005\u7684\u662f\uff0c\u6295\u8d44\u8005\u63d0\u51fa\u7684\u95ee\u9898\u5185\u5bb9\u4e0d\u5f97\u542b\u6709\u4e2d\u4f24\u4ed6\u4eba\u7684\u3001\u8fb1\u9a82\u6027\u7684\u3001\u653b\u51fb\u6027\u7684\u3001\u7f3a\u4e4f\u4e8b\u5b9e\u4f9d\u636e\u7684\u548c\u8fdd\u53cd\u5f53\u524d\u6cd5\u5f8b\u7684\u8bed\u8a00\u4fe1\u606f\uff0c\u76f8\u5173\u91cd\u590d\u95ee\u9898\u4e0d\u518d\u63d0\u4ea4\u3002";
function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "hover" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}
/*function shareButton() {
    document.writeln("<div class=\"bshare-custom\">");
    document.writeln("  <div class=\"bsPromo bsPromo2\"></div>");
    document.writeln("  <a title=\"更多平台\" class=\"bshare-more bshare-more-icon more-style-addthis\"></a><span style=\"float: none;\" class=\"BSHARE_COUNT bshare-share-count\">22.4K</span>");
    document.writeln("</div>");
    document.writeln("<script type=\"text/javascript\" charset=\"utf-8\" src=\"http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=79da6bbc-9b75-4234-b305-7a29bcdde247&amp;pophcol=2&amp;lang=zh\"></script>");
    document.writeln("<script type=\"text/javascript\" charset=\"utf-8\" src=\"http://static.bshare.cn/b/bshareC0.js\"></script>");
}*/
function shareButton() {
    document.writeln('<div class="bshare-custom icon-medium">');
    document.writeln('    <div class="bsPromo bsPromo2"></div>');
    document.writeln('    <a title="分享到新浪微博" class="bshare-sinaminiblog"></a><a title="分享到腾讯微博" class="bshare-qqmb"></a><a title="分享到微信" class="bshare-weixin" href="javascript:void(0);"></a><a title="更多平台" class="bshare-more bshare-more-icon more-style-addthis"></a>');
    document.writeln('</div>');
    document.writeln('<script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=79da6bbc-9b75-4234-b305-7a29bcdde247&amp;pophcol=2&amp;lang=zh"></script>');
    document.writeln('<script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/bshareC0.js"></script>');
}
function pubChannelNav(path) {
    switch (path) {
        case "全景快讯":
            Base.loadJs('http://www.p5w.net/kuaixun/tj/lmlj/channelNav.js', function () {
                $('#channelNav').html(channelNavLinks14.join(''));
            }, 'gb2312');
            break;
        case "全景快讯0":
            Base.loadJs('http://www.p5w.net/stock/tj/lmlj14/channelNav.js', function () {
                $('#channelNav').html(channelNavLinks14.join(''));
            }, 'gb2312');
            break;
        case "股票频道":
            Base.loadJs('http://www.p5w.net/stock/tj/lmlj14/channelNav.js', function () {
                $('#channelNav').html(channelNavLinks14.join(''));
            }, 'gb2312');
            break;
        case "基金频道":
            Base.loadJs('http://www.p5w.net/fund/jjtj/lmlj14/channelNav.js', function () {
                $('#channelNav').html(channelNavLinks14.join(''));
            }, 'gb2312');
            break;
        case "新闻频道":
            Base.loadJs('http://www.p5w.net/news/xwtj/lmlj14/channelNav.js', function () {
                $('#channelNav').html(channelNavLinks14.join(''));
            }, 'gb2312');
            break;
        case "互联网金融":
            Base.loadJs('http://www.p5w.net/money/tj/lmlj14/channelNav.js', function () {
                $('#channelNav').html(channelNavLinks14.join(''));
            }, 'gb2312');
            break;
        case "外汇频道":
            Base.loadJs('http://www.p5w.net/forex/tj/lmlj14/channelNav.js', function () {
                $('#channelNav').html(channelNavLinks14.join(''));
            }, 'gb2312');
            break;
        case "期货频道":
            Base.loadJs('http://www.p5w.net/futures/tj/lmlj14/channelNav.js', function () {
                $('#channelNav').html(channelNavLinks14.join(''));
            }, 'gb2312');
            break;
        default:
            Base.loadJs('http://www.p5w.net/stock/tj/lmlj14/channelNav.js', function () {
                $('#channelNav').html(channelNavLinks14.join(''));
            }, 'gb2312');
    }
}

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};
String.prototype.len = function () {
    return this.replace(/[^\x00-\xff]/g, "aa").length;
};
String.prototype.sub = function (n, o) {
    var r = /[^\x00-\xff]/g;
    if (this.replace(r, "mm").length <= n) return this;
    // n = n - 3;  
    var p = o ? o : "";
    var m = Math.floor(n / 2);
    for (var i = m; i < this.length; i++) {
        if (this.substr(0, i).replace(r, "mm").length >= n) {
            var rs = this.substr(0, i) + p;
            return rs;
        }
    } return this;
};
function setCookie(name, value, expires, path, domain) {
    var str = name + "=" + escape(value);
    if (expires) {
        if (expires == 'never') {
            expires = 100 * 365 * 24 * 60;
        }
        var exp = new Date();
        exp.setTime(exp.getTime() + expires * 60 * 1000);
        str += "; expires=" + exp.toGMTString();
    }
    if (path) {
        str += "; path=" + path;
    }
    if (domain) {
        str += "; domain=" + domain;
    }
    document.cookie = str;
}
function getCookie(name) {
    var tmp, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)", "gi");
    tmp = reg.exec(unescape(document.cookie));
    if (tmp) { return (tmp[2]); }
    return null;
}
//改变正文文字大小
function chgFontSize(obj, size) {
    setCookie("NewsContent_FontSize", size, 9999);
    $(obj).css({ 'font-size': size + 'px' });
    $(obj+' p').css({ 'font-size': size + 'px' });
}

$(function () {
    //右侧嵌套页面高度
    var innerFrame = 'http://www.p5w.net/sy/inner_right.htm';
    var lu = window.location.toString();
    if (lu.indexOf('/stock/') >= 0 || lu.indexOf('/kuaixun/') >= 0) {
        innerFrame = 'http://www.p5w.net/sy/inner_right_stock.htm';
    }
    $("#inRight").attr("src", innerFrame).load(function () {
        var cheight = $(this).contents().find("#cInner").height() + 10;
        console.log(cheight);
        $(this).height(cheight);
    });
});

$(function () {
    $('div.source div').remove();
    //删除编辑器的样式
    var trs_editor = $('DIV.TRS_Editor');
    trs_editor.removeClass('TRS_Editor');
    $('style', trs_editor).eq(0).remove();
    $('.text style').remove();
    //替换正文中的<BR>为<p>
    $('.text br').each(function () {
        $(this).after($('<p></p>')).remove();
    });
    //没有翻页的删除翻页标签<div>
    var nbpage = $('.number');
    var curs = $('.on', nbpage);
    if (curs.length <= 0) {
        nbpage.remove();
    }
    //登录接口地址
	var args=function(user){
	    if (typeof user == "undefined") return;
        if (user.uid && user.uid>0) {
            //已登录
            var uid = user.uid;
            var uname = decodeURIComponent(user.username);
            var url_forward = encodeURIComponent(document.location.href);
            var panel = $('.rq-tab-4').empty();
            $('<span>欢迎您，' + uname + '</span>(<a href="http://passport.p5w.net/logout.php?referer=' + url_forward + '">退出</a>)&nbsp;&nbsp;<label>提问请遵守相关规定</label>').appendTo(panel);
            $('#question-questioner').val(uname);
        } else {

        }
	}; 
   
	var hascode = true;
    var irmSrv = "http://irm.p5w.net/";
    var ircsSrv = "http://ircs.p5w.net/";
    var jsonurl;
    var reg = new RegExp(/^[036]\d{5}$/);
    var code = $('#stockcode').val();
    if (reg.test(code)) {
        passport.getUser(args);
        code = code.split(";")[0];
        $('#stockcode').val(code);
        jsonurl = irmSrv + 'ssgs/S' + code + '/p5w_questions.js';
    } else {
        jsonurl = irmSrv + "gszz/p5w_mostcompany.js";
        hascode = false;
    }

    Base.loadJs([jsonurl], function () {
        var qdata = null;
        if (hascode) {
            qdata = lastreplies;
        } else {
            qdata = latestRepliedQuestions;
        }
        if (typeof qdata != "undefined") {
            var panel = $('.qa-question-list');
            panel.empty();

            $(qdata.items).each(function (i) {
                //取4条数据
                if (i > 3) return false;
                var questioner = this.questioner;
                var content = this.content;
                content = content.replaceAll('\n', '');

                var replyContent = this.replyContent;
                replyContent = replyContent.replaceAll('\n', '').sub(250, "...");

                var replyDate = "";
                if (hascode) {
                    replyDate = this.replydate;
                } else {
                    replyDate = this.replyDate;
                }
                var replydate = (new Date(replyDate.replaceAll('-', '/'))).format("yyyy-MM-dd");
                var stockname = "";
                if (hascode) {
                    stockname = this.shortName;
                } else {
                    stockname = this.stockname;
                }
                var replyer = "";
                if (hascode) {
                    replyer = stockname;
                } else {
                    replyer = this.replyer;
                }

                $('<div class="qa-question">网友<span class="red">问</span>' + stockname + '(' + this.stockcode + '):<a href="' + ircsSrv + 'ircs/interaction/viewQuestion.do?questionId=' + this.questionid + '" target="_blank">' + content + '</a></div>').appendTo(panel);
                $('<div class="qa-answer">' + replyer + '<span class="red">答</span>网友:<a href="' + ircsSrv + 'ircs/interaction/viewQuestion.do?questionId=' + this.questionid + '" target="_blank">' + replyContent + '</a><span class="replydate">' + replydate + '</span></div>').appendTo(panel);
            });
        }
    }, "utf-8");    
    $('#question-content').bind('focus', function () {       
        if (this.value == tips) {
            this.value = "";
        }
    }).bind('blur', function () {
        if (this.value == "") {
            this.value = tips;
        }
    });
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
    //添加右边返回顶部按扭
    goToTop();
});

//$(function () {
//    var params = { 'preFetchedData': null };
//    var s8161 = new Request(60 * 1000, function () { return hqServer + "/info/sort2.py/sortCover?cmd=" + Math.random().toString(); }, params);
//    s8161.addEventListener(headerSort);
//    s8161.start();
//    scrollUpDown('header_navi', 'li');
//    var p5wLV = new p5wLastVisit({ divID: 'LastVisit_Div', 'interval': 20 * 1000, numShow: 5 });
//});

$(function () {
    Base.loadJs('http://www.p5w.net/stock/news/jgdy/datalist.js', function () {
        if (typeof jgdy != "undefined") {
            var data = jgdy.jgdy || [];
            //alert(jgdy);
            var html = new Array();
            html.push('<div class="sto-jgdy-box"><a href="http://www.p5w.net/special/201405/jgdybd/" target="_blank"><img src="/images14/c1.jpg" width="648" height="57" alt="全景网" /></a>');
            html.push('  <div class="sto-jgdy-list">');
            html.push('    <ul>');
            for (var i = 0; i < 8; i++) {
                var a = data[i];
                var title = a.title;
                var t = a.title.strLen() > 42 ? title.subCHStr(0, 42) : title;
                html.push('<li class="qp3"><a href="' + a.url + '" target="_blank" title="' + title + '">' + t + '</a></li>');
            }
            html.push('    </ul>');
            html.push('  </div>');
            html.push('  <div class="clearfloat"></div>');
            html.push('</div>');
            $('.banner-in').prepend(html.join(''));
        }
    }, 'gb2312');
});

function checkCMNT(f) {
    var code = f.stockcode.value;
    if (code == "") {
        alert("请输入您要提问的公司代码。");
        return false;
    }
    var reg = new RegExp(/^[036]\d{5}$/);
    if (!reg.test(code)) {
        alert("请输入正确的股票代码。");
        return false;
    }
    var arr = new Array();
    $("input[type='checkbox'][name='questionAtr']:checked").each(function () {
        arr.push(this.value);
    });
    if (arr.length < 1) {
        alert("请选择您要提问的类型。");
        return false;
    }
    if ($('#question-questioner').val() == "") {
        alert("请输入您的用户名。");
        return false;
    }
    if ($('#question-content').val() == "" || $('#question-content').val() == tips) {
        alert("请输入您的提问内容。");
        return false;
    }
    if ($('#question-content').val().length > 200) {
        alert("您的提问内容过长，请重新输入。");
        return false;
    }
    if (document.getElementById("comment_post_span") == null) {
        $('<span/>').attr('id', 'comment_post_span').hide().insertBefore($('body'));

    };

    $('#comment_post_span').empty();
    $('<iframe name="comment_post_frame" style="display:none" width="0" height="0"></iframe><form name="cmnt_post_form" action="http://ircs.p5w.net/ircs/interaction/saveQuestion.do" method="post" target="comment_post_frame"><input type="hidden" name="question.questionPort" value="2" /><input type="hidden" name="stocktype" value="S" /><input type="hidden" name="userType" value="2" /><input type="hidden" name="password" value="" /><input type="hidden" name="stockcode" value="' + f.stockcode.value + '" /><input type="hidden" name="questionAtr" value="' + arr.join(',') + '" /><input type="hidden" name="question.content" value="' + f.content.value + '" /><input type="hidden" name="question.questioner" value="' + f.questioner.value + '" /></form>').appendTo($('#comment_post_span'));

    document.cmnt_post_form.submit();
    alert("问题提交成功并等待审核中，上市公司将准备好所需数据后回复您的问题，请继续关注！");
    f.reset();
    return false;
}
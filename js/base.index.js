var isIndex = true;
//设为首页
function SetHome(obj, url) {
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(url);
    } catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入\"about:config\"并回车然后将[signed.applets.codebase_principal_support]设置为\"true\"，双击即可。");
            }
        } else {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
        }
    }
}
//收藏本站
function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}

$(function () {
    $('.photo-news').hover(function () {
        $('a.prev', $('.photo-news')).show();
        $('a.next', $('.photo-news')).show();
    }, function () {
        $('a.prev', $('.photo-news')).hide();
        $('a.next', $('.photo-news')).hide();
    }).slides({
        preload: true,
        preloadImage: 'images13/loading_24X24.gif',
        play: 5000,
        pause: 2500,
        hoverPause: true
    });
    if (p5w.ie6) {
        p5w.runJs('http://www.p5w.net/scripts/DD_belatedPNG_0.0.8a-min.js', function () {
            DD_belatedPNG.fix('a.prev img,a.next img');
        });
    }
    //easyloader.theme = "metro";
    //using(['messager'], function () { });
    var hqUrl = "http://hangqing.p5w.net/stock/realstock.php?code=";
    $.getJSON(jsonSrv + "fxpjlistjs.json", function (data) {
        if (data.status == "Y") {
            var ul = $('#fxpj-list');
            var ultitle = $('.title', ul);
            ul.empty().append(ultitle);
            $(data.fxpj).each(function (i) {
                if (i > 7) return false;
                var title = this.s2;
                title = title.sub(8,"..."); 
                $('<li>' + this.s1 + '</li><li><a href="' + hqUrl + this.s1 + '" target="_blank">' + title + '</a></li><li class="red">' + this.s3 + '</li><li>' + this.s4 + '</li>').appendTo(ul);
            });
        }
    });
    $.getJSON(jsonSrv + "stockhqlist.json", function (data) {
        if (data.status == "Y") {
            var ul = $('#con_a_1').find('ul');
            var ultitle = $('li.title', ul);
            ul.empty().append(ultitle);
            $(data.hqlistA1).each(function (i) {
                if (i > 7) return false;
                $('<li><a href="' + hqUrl + this.s1 + '" target="_blank">' + this.s1 + '</a></li><li><a href="http://hangqing.p5w.net/stock/realstock.php?code=' + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="red">' + this.s3 + '</li><li class="red">' + this.s4 + '%</li>').appendTo(ul);
            });
            var ul = $('#con_a_2').find('ul');
            var ultitle = $('li.title', ul);
            ul.empty().append(ultitle);
            $(data.hqlistB1).each(function (i) {
                if (i > 7) return false;
                $('<li><a href="' + hqUrl + this.s1 + '" target="_blank">' + this.s1 + '</a></li><li><a href="http://hangqing.p5w.net/stock/realstock.php?code=' + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="green">' + this.s3 + '</li><li class="green">' + this.s4 + '%</li>').appendTo(ul);
            });
        }
    });
    var irmSrv = "http://irm.p5w.net/";
    var ircsSrv = "http://ircs.p5w.net/";
    using([irmSrv + "gszz/p5w_mostcompany.js"], function () {
        //互动之星
        //if (typeof mostCompanyStartTime != "undefined" && typeof mostCompanyEndTime != "undefined") {
        //    //日期转换
        //    mostCompanyStartTime = mostCompanyStartTime.replaceAll("-", "/");
        //    mostCompanyEndTime = mostCompanyEndTime.replaceAll("-", "/");
        //    $('#hd-star-date').html((new Date(mostCompanyStartTime)).format("M月dd日") + '-' + (new Date(mostCompanyEndTime)).format("M月dd日"));
        //}
        //if (typeof replyMostCompany != "undefined") {
        //    var item = replyMostCompany.items[0];
        //    var arr = ['<div class="hs-img"><img src="' + irmSrv + 'ssgs/' + item.logoUrl + '" /></div>',
        //                '<div class="hs-title"><a href="'+irmSrv+'ssgs/'+item.stockcode+'/" target="_blank">' + item.stockcode + ' ' + item.stockname + '</a></div>',
        //                '<div class="hs-ct">年终平安盈利再次成为投资者议论的焦点。（答复率投资者88条）</div>'
        //    ];
        //    $('#hs-mc').html(arr.join('') );
        //}
        //最新回复
        if (typeof latestRepliedQuestions != "undefined") {
            $('#con_newreply_1').empty();
            $(latestRepliedQuestions.items).each(function (i) {
                //取2条数据
                if (i > 1) return false;
                var questioner = this.questioner.sub(16);
                var a = questioner.len();
                if (a > 16) a = 16;
                var b = this.stockname + '(' + this.stockcode + '):';
                var c = b.len();
                //每行20个字，40个字符
                var d = 40 * 3 - (a + c + 3);
                var content = this.content.replaceAll('\n', '').sub(d, "...");
                var replyer = this.replyer.sub(8);
                var e = replyer.len();
                if (e > 8) e = 8;
                d = 40 * 2 - (a + e + 12 + 3);
                var replyContent = this.replyContent.replaceAll('\n', '').sub(d, "...");
                var ph = '&nbsp;';
                var f = replyContent.len() + e + a + 3;
                if (f < 40) ph = '<br/>';
                var replydate = (new Date(this.replyDate.replaceAll("-", "/"))).format("yyyy-MM-dd");
                $('<div class="qa-question">网友<span class="red">问</span>' + this.stockname + '(' + this.stockcode + '):<a href="' + ircsSrv + 'ircs/interaction/viewQuestion.do?questionId=' + this.questionid + '" target="_blank">' + content + '</a></div>').appendTo($('#con_newreply_1'));
                $('<div class="qa-answer">' + replyer + '<span class="red">答</span>网友:<a href="' + ircsSrv + 'ircs/interaction/viewQuestion.do?questionId=' + this.questionid + '" target="_blank">' + replyContent + '</a><span class="replydate">' + replydate + '</span></div>').appendTo($('#con_newreply_1'));
            });
        }
        //股票代码联想
        $('#stockcode,#stockcode1').suggest();
        //$('#stockcode').bind('focus', function () {
        //    if (this.value == '公司代码') {
        //        this.value = '';
        //    }
        //}).bind('blur', function () {
        //    if (this.value == '') {
        //        this.value = '公司代码';
        //    }
        //});
        $('#btnAsk').click(function () {
            var code = $('#stockcode').val();
            var reg = new RegExp(/^[036]\d{5}$/);
            if (!reg.test(code)) {
                alert("请输入正确的公司代码。");
                return;
            }
            open(irmSrv + 'ssgs/S' + code + '/');
        });
        var cp = "http://company.p5w.net/";
        var goUrl = ['http://irm.p5w.net/ssgs/S', cp + 'ggzx.asp?zqdm=', hqUrl, 'http://bbs.p5w.net/searchzqdm.php?fid=4&zqdm=', cp + 'gszl/gsgk.asp?zqdm=', cp + 'gszl/ggry.asp?zqdm=', cp + 'gszl/cwzb.asp?zqdm=', cp + 'gszl/fhpg.asp?zqdm=', cp + 'gszl/fxss.asp?zqdm=', cp + 'gszl/gbzk.asp?zqdm=', cp + 'gszl/sdgd.asp?zqdm=', cp + 'gszl/ltgd.asp?zqdm=', cp + 'gszl/lsgg.asp?zqdm=', cp + 'gszl/dqbg.asp?zqdm=', cp + 'gszl/gszc.asp?zqdm='];
        $('#btnSearch').click(function () {
            var reg = new RegExp(/^[036]\d{5}$/);
            var code = $('#stockcode1').val();
            if (!reg.test(code)) {
                using(["messager"], function () {
                    p5w.alert("请输入股票代码。", 'error');
                });
                return false;
            }
            var t = $('#searchtype').val();
            open(goUrl[t] + code)
        });
    }, "utf-8");

});
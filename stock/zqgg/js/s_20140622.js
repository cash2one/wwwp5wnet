$(function () {
    function getQueryString(l) {
        var qKeys = {};
        var re = /[?&]([^=]+)(?:=([^&]*))?/g;
        var matchInfo;
        while (matchInfo = re.exec(location.search)) {
            qKeys[matchInfo[1]] = matchInfo[2];
        }
        return typeof (qKeys[l]) == 'undefined' ? '' : qKeys[l];
    }
    var latestUrl = "http://www.cninfo.com.cn/";
    var loadData = [
        ["disclosure/sz/mb/szmblatest.js", "szmblatest"],
        ["disclosure/sh/mb/shmblatest.js", "shmblatest"],
        ["disclosure/sz/sme/szsmelatest.js", "smemblatest"],
        ["disclosure/sz/cn/szcnlatest.js", "cybmblatest"],
        ["disclosure/ra/szse.js", "jgjgmblatest"]];
    function LoadLatest() {
        $('#ggtitle').html('正在努力加载...');
        $('#ggsource').html('正在努力加载...');
        var id = getQueryString("id");
        var f = getQueryString("f");
        if (!id) {
            alert('错误的公告ID！');
            window.close();
            return;
        }
        if (!f) {
            alert('错误的参数！');
            window.close();
            return;
        }
        var iSfound = false;
        //加载公告disclosure/ra/szse.js
        //var jsonURL = "/stocknews/json/";
        //$.getJSON(jsonURL + f + ".json", function (a) {
        //    if (a.code == f) {
        //       $(a.lsgg).each(function () {
        //    var file = this.link;
        //    var filename = file.replace(/.*(\/|\\)/, "").replace(/(\.\w+)$/, "");
        //    if (filename == decodeURIComponent(id)) {
        //        var img = '';
        //        if (this.type == "PDF") {
        //            img = '<img src="/images13/bg_gg_pdf.gif" />';
        //        } else {
        //            img = '<img src="/images13/bg_gg.gif" />';
        //        }
        //        $('<span><a href="' + latestUrl + this.link + '" target="_blank">' + img + '</a></span>').appendTo($('#ggtext'));
        //        $('#ggtitle').html(this.title);
        //        //$('#ggsource').html('来源：' + loadData[f][2] + '　发布时间：' + this[6]);
        //        $('#ggsource').html('来源：　发布时间：' + this.date);
        //        document.title = this.title + '_证券公告_全景网';
        //        iSfound = true;
        //    }
        //    if (iSfound) return false;                    
        //});
        //       if (iSfound == false) {
        //加载公告disclosure/ra/szse.js
        $.getScript(latestUrl + "information/qsc/fulltext/" + f + ".js", function (a) {
            if (typeof szzbAffiches != "undefined") {
                $(szzbAffiches).each(function (i) {
                    //开始查找数据
                    var file = this[1];
                    var filename = file.replace(/.*(\/|\\)/, "").replace(/(\.\w+)$/, "");
                    if (filename == decodeURIComponent(id)) {
                        var img = '';
                        if (this[3] == "PDF") {
                            img = '<img src="/images13/bg_gg_pdf.gif" />';
                        } else {
                            img = '<img src="/images13/bg_gg.gif" />';
                        }
                        $('<span><a href="' + latestUrl + this[1] + '" target="_blank">' + img + '</a></span>').appendTo($('#ggtext'));
                        $('#ggtitle').html(this[2]);
                        $('#ggsource').html('来源：　发布时间：' + this[6]);
                        document.title = this[2] + '_证券公告_全景网';

                        iSfound = true;
                    }
                });
                if (!iSfound) {
                    $('#ggtext').html('错误的公告ID。');
                }
            }
        });
        //      }
        //  } else {
        //        $('#ggtitle').html('错误的参数');
        //        $('#ggsource').html('');
        //    }
        //});


    }
    LoadLatest();
});
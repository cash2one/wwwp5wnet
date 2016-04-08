$(function () {
    var loadData = [
        ["disclosure/sz/mb/szmblatest.js", "szmblatest"],
        ["disclosure/sh/mb/shmblatest.js", "shmblatest"],        
        ["disclosure/sz/sme/szsmelatest.js", "smemblatest"],
        ["disclosure/sz/cn/szcnlatest.js", "cybmblatest"],
        ["disclosure/ra/szse.js", "jgjgmblatest"]];
    function LoadLatest(i) {
        var latestUrl = "http://www.cninfo.com.cn/";
        //加载公告disclosure/ra/szse.js
        if (i < loadData.length) {
            $.getScript(latestUrl + loadData[i][0], function (a) {
                if (typeof szzbAffiches != "undefined") {
                    var ul = $('#' + loadData[i][1] + ' ul').empty();
                    $(szzbAffiches).each(function (i) {
                        //显示12条数据
                        if (i > 11) return false;
                        var title = this[2];
                        title = title.sub(60, "...");
                        var img = '';
                        if (this[3] == "PDF") {
                            img = '<img src="/images13/Pdf.gif" width="16" height="16" alt="PDF"/>(' + this[4] + 'k)';
                        }
                        $('<li><span class="name name2"><a href="' + latestUrl + this[1] + '" target="_blank">' + title + '</a>' + img +'</span><span calss="time">'+this[6]+ '</span></li>').appendTo(ul);
                    });
                    szzbAffiches = null;
                    if (i < loadData.length) {
                        //开始递归调用,因为变量名szzbAffiches相同，必要在加载完一个后再加载另一个板块的数据
                        return LoadLatest(++i);
                    } else {
                        return false;
                    }
                }
            });
        } else {
            return false;
        }
    }
    LoadLatest(0);
    easyloader.theme = "metro";
    using(["messager"], function () {
        $('#stockcode').suggest();
        $('#btnSearch').click(function () {
            var reg = new RegExp(/^[036]\d{5}$/);
            var code = $('#stockcode').val();
            if (!reg.test(code)) {
                p5w.alert("请输入股票代码。", 'error');
                return false;
            }
            open('http://company.p5w.net/gszl/lsgg.asp?zqdm=' + code);
        });
    });
});
// ���ض���
$(function () {
    $(window).scroll(function () {
        var scrollt = document.body.scrollTop + document.documentElement.scrollTop;
        if (scrollt > 100) {
            $(".returnTop").fadeIn(300);
        } else {
            $(".returnTop").stop().fadeOut(300);
        }
    });

    $(".returnTop").click(function () {
        $("html,body").animate({scrollTop: "0px"}, 300);
    });
});

$(function () {
    //ɾ���༭������ʽ
    var trs_editor = $('div.brief');
    trs_editor.removeClass('TRS_Editor');
    $('style', trs_editor).eq(0).remove();
    $('.brief style').remove();
    //�滻�����е�<BR>Ϊ<p>
    $('.brief br').each(function () {
        $(this).after($('<p></p>')).remove();
    });
});

/**
 * ��߹�����
 */
var sideToolBar = function () {
    document.writeln('<div class="sideToolBar">');
    document.writeln('    <a id="a-app" class="appDownload"><i>0755-83234585</i></a>');
    document.writeln('    <a id="a-cs_qq" class="qqService" href="mailto:service@p5w.net" target="_self"><i>service@p5w.net</i></a>');
    document.writeln('    <a href="javascript:void(0);" class="wechatQRCode"><i></i></a>');
    document.writeln('    <a href="javascript:void(0);" class="returnTop" style="display: none;"><i>���ض���</i></a>');
    document.writeln('</div>');
};

/**
 * ��Ȩ˵��
 */
var footer = function() {
    document.writeln('<div class="footer">');
    document.writeln('    <div class=" w1200 clearfix">');
    document.writeln('        <div class="title fl">ȫ��������</div>');
    document.writeln('        <i></i>');
    document.writeln('        <ul class="footer-column-1 fl">');
    document.writeln('            <li class="r1"><a href="#">��������</a></li>');
    document.writeln('            <li class="r2"><a href="#">��������</a></li>');
    document.writeln('            <li class="r3"><a href="#">��������</a></li>');
    document.writeln('        </ul>');
    document.writeln('        <i></i>');
    document.writeln('        <ul class="footer-column-2 fl">');
    document.writeln('            <li class="r1">�������ߣ�<span>0755-83234585</span></li>');
    document.writeln('            <li class="r2">�������䣺<span><a href="mailto:service@p5w.net">service@p5w.net</a></span></li>');
    document.writeln('        </ul>');
    document.writeln('        <i></i>');
    document.writeln('        <ul class="footer-column-3 fl">');
    document.writeln('            <div class="wx fl"><img src="/xsb/images/weixin_11.jpg"></div>');
    document.writeln('            <li class="r1">��ע���������</li>');
    document.writeln('            <li class="r2">΢�źţ�<span>jdxs</span>b888</li>');
    document.writeln('        </ul>');
    document.writeln('    </div>');
    document.writeln('    <div class="copyright">');
    document.writeln('        <ul>');
    document.writeln('            <li>Copyright &copy; 2000-2016 Panorama Network Co., Ltd, All Rights Reserved ȫ���������޹�˾��Ȩ����</li>');
    document.writeln('        </ul>');
    document.writeln('    </div>');
    document.writeln('</div>');
}
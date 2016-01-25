function dataist10() {
    document.writeln('<ul>');<TRS_DOCUMENTS num="10">
    document.writeln('    <li>第<i><TRS_Document Field="docpeople" autolink="false">首页标题</TRS_Document></i>期：<TRS_DOCUMENT field="doctitle" autolink="true" urlisabs="true" target="_blank">文档标题</TRS_DOCUMENT><span class="time"><trs_document field="DOCRELTIME" dateformat="yyyy.MM.dd">发布时间</trs_document></span></li>');</TRS_DOCUMENTS>
    document.writeln('</ul>');
}

function getChannelDesc() {
    document.writeln('　　<TRS_REPLACE value="描述"></TRS_REPLACE>');
}

function getNextIssue() {
    document.writeln('<ul>');
    document.writeln('    <li><TRS_REPLACE value="下期预告1"></TRS_REPLACE></li>');
    document.writeln('    <li class="noborder"><trs_appendix mode="pic" index="7" autolink="false" seperator="" upload="false" extra='width="250" height="250"'>附件</trs_appendix></li>');
    document.writeln('</ul>');
}

function getSignup() {
    document.writeln('<ul>');
    document.writeln('    <li><TRS_REPLACE value="报名入口1"></TRS_REPLACE></li>');
    //document.writeln('    <li><TRS_REPLACE value="报名入口2"></TRS_REPLACE></li>');
    //document.writeln('    <li></li>');
    document.writeln('    <li>聚上汇公众号、微信群线上报名</li>');
    document.writeln('    <li class="noborder"><img src="/gdaty/images/ma2.png" alt="全景网"></li>');
    document.writeln('</ul>');
}
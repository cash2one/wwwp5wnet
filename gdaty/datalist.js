function dataist10() {
    document.writeln('<ul>');<TRS_DOCUMENTS num="10">
    document.writeln('    <li>��<i><TRS_Document Field="docpeople" autolink="false">��ҳ����</TRS_Document></i>�ڣ�<TRS_DOCUMENT field="doctitle" autolink="true" urlisabs="true" target="_blank">�ĵ�����</TRS_DOCUMENT><span class="time"><trs_document field="DOCRELTIME" dateformat="yyyy.MM.dd">����ʱ��</trs_document></span></li>');</TRS_DOCUMENTS>
    document.writeln('</ul>');
}

function getChannelDesc() {
    document.writeln('����<TRS_REPLACE value="����"></TRS_REPLACE>');
}

function getNextIssue() {
    document.writeln('<ul>');
    document.writeln('    <li><TRS_REPLACE value="����Ԥ��1"></TRS_REPLACE></li>');
    document.writeln('    <li class="noborder"><trs_appendix mode="pic" index="7" autolink="false" seperator="" upload="false" extra='width="250" height="250"'>����</trs_appendix></li>');
    document.writeln('</ul>');
}

function getSignup() {
    document.writeln('<ul>');
    document.writeln('    <li><TRS_REPLACE value="�������1"></TRS_REPLACE></li>');
    //document.writeln('    <li><TRS_REPLACE value="�������2"></TRS_REPLACE></li>');
    //document.writeln('    <li></li>');
    document.writeln('    <li>���ϻ㹫�ںš�΢��Ⱥ���ϱ���</li>');
    document.writeln('    <li class="noborder"><img src="/gdaty/images/ma2.png" alt="ȫ����"></li>');
    document.writeln('</ul>');
}
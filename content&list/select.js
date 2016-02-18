document.writeln('<select onchange="javascript:if(this.options[this.selectedIndex].value){window.open(this.options[this.selectedIndex].value)}">');
document.writeln('  <option value=\"\">请点击查看往期列表</option>');<TRS_DOCUMENTS num="500">
document.writeln('  <option value="<TRS_Document field='_RECURL'/>"><TRS_Document Field="DocTitle" autolink="false">文档标题</TRS_Document> <TRS_DOCUMENT field="DOCRELTIME" dateformat="(yyyy-MM-dd)">日期</TRS_DOCUMENT></option>');</TRS_DOCUMENTS>
document.writeln('</select>');
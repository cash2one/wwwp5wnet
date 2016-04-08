function focuspics() {
  document.writeln('<div class="photo-news">');
  document.writeln('  <div class="slides_container">');<TRS_DOCUMENTS id="证券_活动_投顾大赛2013_焦点图" num="4">
  document.writeln('    <div class="slide">');
  document.writeln('      <a href="<TRS_Document field='_RECURL' UrlIsAbs='true'/>" target="_blank"><img src="<TRS_Appendix field='_RECURL' UrlIsAbs='true' MODE='PIC' INDEX='0' autolink='false' memo='FALSE'>图片</TRS_Appendix>" width="356" height="215" /></a>');
  document.writeln('    </div>');</TRS_DOCUMENTS>
  document.writeln('  </div>');
  document.writeln('  <a href="javascript:void(0)" onfocus="this.blur()" class="prev" style="display: none;"><img src="http://www.p5w.net/images13/arrow-prev.png" width="22" height="36" alt="全景网" /></a>');
  document.writeln('  <a href="javascript:void(0)" onfocus="this.blur()" class="next" style="display: none;"><img src="http://www.p5w.net/images13/arrow-next.png" width="22" height="36" alt="全景网" /></a>');
  document.writeln('</div>');
}

function topnews() {<TRS_DOCUMENTS id="证券_活动_投顾大赛2013_头条" num="3">
  document.writeln('<div class="new-t">');
  document.writeln('  <TRS_Document Field="DocTitle" UrlIsAbs="true" target="_blank" num="37" extra='class="zong"'>文档标题</TRS_Document>');
  document.writeln('  <p><TRS_Document Field="DocAbstract" UrlIsAbs="true" target="_blank" num="101">文档摘要</TRS_Document></p>');
  document.writeln('</div>');</TRS_DOCUMENTS>
}

function listnews() {<TRS_DOCUMENTS id="证券_活动_投顾大赛2013_新闻报道" num="4">
  document.writeln('<li>·<TRS_Document Field="DocTitle" UrlIsAbs="true" target="_blank" num="46">文档标题</TRS_Document></li>');</TRS_DOCUMENTS>
}
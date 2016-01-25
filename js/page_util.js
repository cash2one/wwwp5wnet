function createPageHTML(_nPageCount, _nCurrIndex, _sPageName, _sPageExt){ 
	if(_nPageCount == null || _nPageCount<=1)return;
	var nCurrIndex = _nCurrIndex || 0;
	var nPageCount = _nPageCount || 0;
	if(nCurrIndex==0)document.write("<span class=\"disabled\">上一页</span>");
	else{
		var prePageName = ((nCurrIndex-1) == 0 ? _sPageName : (_sPageName+"_" + (nCurrIndex-1))) + "."+_sPageExt;
		document.write("<a href='" + prePageName + "'>上一页</a>");
	}
	for(var i=0; i<_nPageCount; i++){
		var sPageName = (i == 0 ? _sPageName : (_sPageName+"_" + i)) + "."+_sPageExt;
		if(nCurrIndex == i)document.write("<span class=\"current\">"+(i+1)+"</span>");
		else document.write("<a href='" + sPageName + "'>"+(i+1)+"</a>");
	}
	if((nCurrIndex+1)==nPageCount)document.write("<span class=\"disabled\">下一页</span>");
	else{
		var nextPageName = _sPageName+"_" + (nCurrIndex+1) + "."+_sPageExt;
		document.write("<a href='" + nextPageName + "'>下一页</a>");
	}
}

//container 容器，count 总页数 pageindex 当前页数
function setPage(_count, _pageindex, _sPageName, _sPageExt) {
    var container = container;
    var count = _count || 0;
    var pageindex = _pageindex || 0;
    var a = [];
    var prevPageName = ((pageindex - 1) <= 0 ? _sPageName : (_sPageName + '_' + (pageindex - 1))) + '.' + _sPageExt;
    var nextPageName = ((pageindex + 1) == count ? (_sPageName + '_' + pageindex) : (_sPageName + '_' + (pageindex + 1))) + '.' + _sPageExt;
    var curtPageName = ((pageindex == 0) ? _sPageName : _sPageName + '_' + pageindex) + "." + _sPageExt;
    var fstPageName = _sPageName + "." + _sPageExt;
    var lstPageName = _sPageName + '_' + (count - 1) + "." + _sPageExt;
    var noLink = 'javascript:void(0);';
    // 总页数为1，不显示
    if (count == null || count <= 1) {
        return;
    }
    //总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
    if (pageindex == 0) {
        a[a.length] = '<a href="' + noLink + '" class="prev unclick">上一页</a>';
    } else {
        a[a.length] = '<a href="' + prevPageName + '" class="prev">上一页</a>';
    }
    function setPageList() {
        var listPageName = ((i - 1) < 0 ? _sPageName : (_sPageName + '_' + i)) + '.' + _sPageExt;
        if (pageindex == i) {
            a[a.length] = '<a href="' + noLink + '" class="on">' + (i + 1) + '</a>';
        } else {
            a[a.length] = '<a href="' + listPageName + '">' + (i + 1) + '</a>';
        }
    }
    //总页数小于10
    if (count <= 10) {
        for (var i = 0; i < count; i++) {
            setPageList();
        }
    }
        //总页数大于10页
    else {
        if (pageindex <= 3) {
            for (var i = 0; i <= 4; i++) {
                setPageList();
            }
            a[a.length] = '...<a href="' + lstPageName + '">' + count + '</a>';
        } else if (pageindex >= count - 4) {
            a[a.length] = '<a href="' + fstPageName + '">1</a>...';
            for (var i = count - 5; i < count; i++) {
                setPageList();
            }
        }
        else { //当前页在中间部分
            a[a.length] = '<a href="' + fstPageName + '">1</a>...';
            for (var i = pageindex - 2; i <= pageindex + 2; i++) {
                setPageList();
            }
            a[a.length] = '...<a href="' + lstPageName + '">' + count + '</a>';
        }
    }
    if (pageindex + 1 == count) {
        a[a.length] = '<a href="' + noLink + '" class="next unclick">下一页</a>';
    } else {
        a[a.length] = '<a href="' + nextPageName + '" class="next">下一页</a>';
    }
    document.write(a.join(""));
    //事件点击
    //var pageClick = function () {
    //    var oAlink = container.getElementsByTagName("a");
    //    var inx = pageindex; //初始的页码
    //    oAlink[0].onclick = function () { //点击上一页
    //        if (inx == 0) {
    //            return false;
    //        }
    //        inx--;
    //        setPage(container, count, inx, _sPageName, _sPageExt);
    //        return false;
    //    }
    //    for (var i = 1; i < oAlink.length - 1; i++) { //点击页码
    //        oAlink[i].onclick = function () {
    //            inx = parseInt(this.innerHTML) - 1;
    //            setPage(container, count, inx, _sPageName, _sPageExt);
    //            return false;
    //        }
    //    }
    //    oAlink[oAlink.length - 1].onclick = function () { //点击下一页
    //        if (inx == (count - 1)) {
    //            return false;
    //        }
    //        inx++;
    //        setPage(container, count, inx, _sPageName, _sPageExt);
    //        return false;
    //    }
    //}()
}

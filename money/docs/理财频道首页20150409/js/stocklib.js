/**
 * @file            jQuery.Json.js
 * @description     用于支持Json与其它类型互转的扩展方法
 * @author          knowmore
 * @date            2011-03-01
 * @license         share
 * @version         1.0.20110301
**/
/**
* 将json字符串转换为对象的方法。
*
* @public
* @param json字符串
* @return 返回object,array,string等对象
**/
jQuery.extend({
    /** * @see 将json字符串转换为对象 * @param json字符串 * @return 返回object,array,string等对象 */
    evalJSON: function (strJson) {
        return eval("(" + strJson + ")");
    }
});


/**
* 将javascript数据类型转换为json字符串的方法。
*
* @public
* @param  {object}  需转换为json字符串的对象, 一般为Json 【支持object,array,string,function,number,boolean,regexp *】
* @return 返回json字符串
**/
jQuery.extend({
    toJSONString: function (object) {
        var type = typeof object;
        if ('object' == type) {
            if (Array == object.constructor) type = 'array';
            else if (RegExp == object.constructor) type = 'regexp';
            else type = 'object';
        }
        switch (type) {
            case 'undefined':
            case 'unknown':
                return;
                break;
            case 'function':
            case 'boolean':
            case 'regexp':
                return object.toString();
                break;
            case 'number':
                return isFinite(object) ? object.toString() : 'null';
                break;
            case 'string':
                return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function () {
                    var a = arguments[0];
                    return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : ""
                }) + '"';
                break;
            case 'object':
                if (object === null) return 'null';
                var results = [];
                for (var property in object) {
                    var value = jQuery.toJSONString(object[property]);
                    if (value !== undefined) results.push(jQuery.toJSONString(property) + ':' + value);
                }
                return '{' + results.join(',') + '}';
                break;
            case 'array':
                var results = [];
                for (var i = 0; i < object.length; i++) {
                    var value = jQuery.toJSONString(object[i]);
                    if (value !== undefined) results.push(value);
                }
                return '[' + results.join(',') + ']';
                break;
        }
    }
});

AJAJ_CALLBACKS = {};
function AJAJ_ON_READYSTATE_CHANGE(a, d) {
    if (AJAJ_CALLBACKS[a]) try {
        AJAJ_CALLBACKS[a](d)
    } catch(b) {}
}
function Ajaj(a, d) {
    this.id = Number(new Date).toString() + parseInt(10 * Math.random()) + parseInt(10 * Math.random()) + parseInt(10 * Math.random());
    this.url = a || "";
    this.params = d.parameters || {};
    this.onComplete = d.onComplete || this.defaultOnCompleteFunc;
    this.onLoading = d.onLoading || this.defaultOnLoadingFunc;
    this.onError = d.onError || this.defaultOnErrorFunc;
    this._start()
}
Ajaj.prototype = {
    _start: function() {
        this.sender = document.createElement("SCRIPT");
        this.sender.id = this.sender.name = "SCRIPT_REQUESTER_" + this.id;
        this.sender.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(this.sender);
        this.loadData()
    },
    parseParams: function() {
        var a = "";
        if (this.params) for (var d in this.params) if (d != "toJSONString") a += d + "=" + this.params[d] + "&";
        a += "crossdomain=" + this.id + "&from=" + window.location.host;
        return a
    },
    loadData: function() {
        if (this.sender) {
            this.onLoading();
            try {
                AJAJ_CALLBACKS[this.id] = 
                null;
                AJAJ_CALLBACKS[this.id] = function(c) {
                    this.onComplete(c);
                    window.setTimeout(this.destroy.bind(this), 100)
                }.bind(this);
                this.sender.onreadystatechange = this.sender.onload = function() {};
                var a = this.parseParams(this.params),
                d = "";
                d = this.url.indexOf("?") != -1 ? this.url + "&" + a: this.url + "?" + a;
                this.sender.src = d
            } catch(b) {
                this.onError(e)
            }
        }
    },
    defaultOnCompleteFunc: function() {},
    defaultOnLoadingFunc: function() {},
    defaultOnErrorFunc: function() {},
    destroy: function() {
        this.onComplete = function() {};
        delete AJAJ_CALLBACKS[this.id];
        this.sender && document.getElementsByTagName("head")[0].removeChild(this.sender);
        this.sender = null
    }
};

/* bind.js */
Function.prototype.bind = function (object) {
    var __method = this;
    return function () {
        return __method.apply(object, arguments);
    }
}

Function.prototype.bind2 = function (object) {
    var __method = this;

    var argu = Array.prototype.slice.call(arguments, 1);
    return function () {
        return __method.apply(object, argu, arguments);
    }
}

var $$ = function (id) {
    return document.getElementById(id) || null;
};

Number.prototype.format = function (decimalPoints, thousandsSep, decimalSep) {
    var val = this + '', re = /^(-?)(\d+)/, x, y;
    if (decimalPoints != null) val = this.toFixed(decimalPoints);
    if (thousandsSep && (x = re.exec(val))) {
        for (var a = x[2].split(''), i = a.length - 3; i > 0; i -= 3) a.splice(i, 0, thousandsSep);
        val = val.replace(re, x[1] + a.join(''));
    }
    if (decimalSep) val = val.replace(/\./, decimalSep);
    return val;
}
if (typeof Number.prototype.toFixed != 'function' || (.9).toFixed() == '0' || (.007).toFixed(2) == '0.00') Number.prototype.toFixed = function (f) {
    if (isNaN(f *= 1) || f < 0 || f > 20) f = 0;
    var s = '', x = this.valueOf(), m = '';
    if (this < 0) { s = '-'; x *= -1; }
    if (x >= Math.pow(10, 21)) m = x.toString();
    else {
        m = Math.round(Math.pow(10, f) * x).toString();
        if (f != 0) {
            var k = m.length;
            if (k <= f) {
                var z = '00000000000000000000'.substring(0, f + 1 - k);
                m = z + m;
                k = f + 1;
            }
            var a = m.substring(0, k - f);
            var b = m.substring(k - f);
            m = a + '.' + b;
        }
    }
    if (m == '0') s = '';
    return s + m;
}

/*
* array.js
*/
Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx < 0 || dx > this.length) { return false; }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1
}

Array.prototype.indexOf = function (v, nostrict) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === v) {
            return i;
        }
        if (nostrict && (this[i] == v)) {
            return i;
        }
    }
    return -1;
}
Array.prototype.clone = function () {
    var newObj = (this instanceof Array) ? [] : {};
    for (i in this) {
        if (i == 'clone') continue;
        if (this[i] && typeof this[i] == "object") {
            newObj[i] = this[i].clone();
        } else newObj[i] = this[i]
    } return newObj;
};
function timeStrGen(timeStr) {
    var retStr = '';

    retStr += timeStr.substr(0, 2) + ':' + timeStr.substr(2, 2) + ':' + timeStr.substr(4, 2);

    return retStr;
}
function innerSet(obj, str, delta, css) {
    
    if (typeof obj == "string")
        obj = $('#'+obj);

   
    css = css || {};
    obj = $(obj);
    if(!obj.length) return;
    obj.empty();
    obj.html(str);
    if (typeof delta != "undefined" && delta != null && typeof delta != 'string') {
        //obj.removeClass();
        if (delta > 0)
            obj.removeClass().addClass(css['up'] || 'incolor');

        if (delta == 0)
            obj.removeClass().addClass(css['keep'] || 'nocolor');

        if (delta < 0)
            obj.removeClass().addClass(css['down'] || 'decolor');
    }
    else if (typeof delta == 'string') {
        obj.removeClass().addClass(delta);
    }
}
/*
*  cookie.js
*/
var iCookie = {};
iCookie.cookiename = "default";
iCookie.get=function(name){
    name = name || iCookie.cookiename;
    var start=document.cookie.indexOf(name+"=");
    if(start==-1)return null;
    
    var len=start+name.length+1;
    if((!start)&&(name!=document.cookie.substring(0,name.length))){
        return null;
    }
    
    var end=document.cookie.indexOf(";",len); 
    if(end==-1)end=document.cookie.length;
    ckstr = document.cookie.substring(len,end);
    return (ckstr);
};    

iCookie.set=function(name, value, d){
    name = name || iCookie.cookiename;
    var expires = "expires=Sun, 1 Jan 2036 00:00:00 UTC;";
    //alert(document.domain);
    d = d || document.domain;
    document.cookie=name+"="+(value)+";"+expires+"Path=/;Domain=" + d;   
    //document.cookie=name+"="+(value)+";"+expires+"Path=/;Domain=.znz888.com";
}; 
// check is hangqing time
if (typeof hqServer == "undefined") {
    hqServer = "http://hq.p5w.net";
}
var hqTimeFlag = true;
var hqTimeCallBacks = [];
function inHqTime() {
    return hqTimeFlag;
}

function hqTimeCheck() {    
    var infoURL = hqServer+ '/hq/time.php?callback=?&rdm=' + Math.random().toString();
    $.getJSON(infoURL , function (data) {
            var dateStr = data;
            var dt = dateStr.split(' ');
            if (dt[1] < '091000' || dt[1] > '152000')
                hqTimeFlag = false;
            else
                hqTimeFlag = true;
            var i = 0;
            var len = hqTimeCallBacks.length;
            for (i = 0; i < len; i++) {
                if (typeof hqTimeCallBacks[i] == 'function')
                    hqTimeCallBacks[i](dateStr);
            }
        }); 
    window.setTimeout(hqTimeCheck, 60 * 1000);
}
hqTimeCheck();

/*-------------request------------------------*/
function Request(interval, urlFmtFunc, params)
{
    this.mUrlFmtFunc = null;
    if(typeof urlFmtFunc != 'function')
        return;
    this.mTimer = null;
    this.mAjaj = null;
    this.mInterval = interval;
    this.mUrlFmtFunc = urlFmtFunc;
    this.mListeners = [];
    this.mRunning = false;
    this.mInited = false;
    this.mCnt = 0;
    this.mData = null;
    this.mParams = params || null;
    this.mInitData = null;
    if(typeof params != 'undefined' && params != null && typeof params['preFetchedData'] == 'string')
    {
        this.mInitData = params['preFetchedData'].substr(0, params['preFetchedData'].length -1);
    }
}

// 
Request.prototype.start = function()
{
    if(!this.mRunning)
    {
        this.mRunning = true;
        this._update();
        this.mInited = true;
    }
}

//
Request.prototype._update = function()
{
    if(this.mRunning)
    {
        if(this.mInitData)
        {
            try
            {
                this.mData = $.parseJSON(this.mInitData);
            }
            catch(e)
            {
                this.mData = null;
            }
            this.mInitData = null;
            this._fire();
            
        }
        else
        {
            if(!this.mInited || inHqTime())
            {
                this._refresh();
            }
        }
        if(this.mTimer)
            window.clearTimeout(this.mTimer);
        this.mTimer = window.setTimeout(this._update.bind(this), this.mInterval);
    }      
}

Request.prototype._refresh = function()
{
    var args = {
        method : "get",
        onComplete : function(re)
        {
            try
            {
                this.mData = $.parseJSON(re);
            }
            catch(e)
            {
                this.mData = null;
            }           
            this._fire();
            
        }.bind(this)
    }
    var infoUrl = this.mUrlFmtFunc(this.mParams);
    this.mAjaj = new Ajaj(infoUrl, args);
}

// checked one callback function has add or not
Request.prototype._haveAdded = function(cb)
{
    var i = 0;
    var len = this.mListeners.length;
    for(i = 0; i < len; i ++)
    {
        if(this.mListeners[i] === cb)
        {
            return true;
        }
    }
    return false;
}

Request.prototype._fire = function()
{
    if(this.mData == null)
        return;
    var i = 0;
    var len = this.mListeners.length;
    for(i = 0; i < len; i ++)
    {
        this.mListeners[i](this.mData);
    }
}

Request.prototype.addEventListener = function(cb)
{
    if(typeof cb != 'function')
        return;
    if(this._haveAdded(cb))
        return;
    this.mListeners.push(cb);
    this.mCnt ++;
    if(this.mData != null)
        cb(this.mData);
}

Request.prototype.stop = function()
{
    this.mRunning = false;
    if(this.mTimer)
    {
        window.clearTimeout(this.mTimer);
    }
    if(this.mAjaj)
    {
        this.mAjaj.destroy();
        this.mAjaj.onComplete = function(){};
    } 
}
/*------------p5wIdxSummary----------------*/
// for index summary
function p5wIdxSummary(interval, data)
{
    this.interval = interval;
    if(typeof data != 'undefined' && data)   
        this.data = data.substr(0, data.length -1);

    this.inited = false;
    this.mAjaj = null;
    this.mTimer = null;
    this.mListeners = [];
    this.mDataObj = null;
    this.mRunning = false;
    this.mStockList = ['sh000001', 'sz399001', 'sh000300', 'sh000016'];
}
p5wIdxSummary.prototype.addEventListener = function(callBack)
{
    if(typeof callBack != 'function')
        return;
    this.mListeners.push(callBack);
    if(this.mDataObj != null)
        callBack(this.mDataObj);
}
p5wIdxSummary.prototype._fire = function()
{
    if(this.mDataObj == null)
        return;
    var len = this.mListeners.length;
    var i = 0;
    for(i = 0; i < len; i ++)
    {
        this.mListeners[i](this.mDataObj);
    }
}
p5wIdxSummary.prototype.start = function()
{
    if(this.mRunning)
    {
        return;
    }
    this.mRunning = true;
    this._init();
}

p5wIdxSummary.prototype._init = function()
{
    this._update();  
    this.inited = true;
}

p5wIdxSummary.prototype._update = function()
{
    if(this.mTimer)
        window.clearTimeout(this.mTimer);
    
    if(this.data)
    {
        this._set(this.data);
        this.data = null;
        this._fire();
    }
    else
    {
        if(!this.inited || inHqTime())
            this._refresh();
    }    
    this.mTimer = window.setTimeout(this._update.bind(this), this.interval);
}

p5wIdxSummary.prototype._refresh = function()
{    
     var args = {
        method : 'get', onComplete : function(rep){
            this._set(rep);
            this._fire();
        }.bind(this)
    };
   
    infoURL = hqServer+ '/info/data.py/prices.znzDo?cmd=' + this.mStockList.join(',') + '|' + Math.random().toString(); 
    var myAjaj = new Ajaj(infoURL, args);
}

p5wIdxSummary.prototype._set = function(dataStr)
{
    try
    {
        var retObj = $.parseJSON(dataStr);             
    }
    catch(e)
    {
        return false;;
    }
    this.mDataObj = retObj;
    return true;
}

p5wIdxSummary.prototype.stop = function()
{
    if(this.mTimer != null)
        window.clearTimeout(this.mTimer);
    if(this.mAjaj)
    {
        this.mAjaj.destroy();
        this.mAjaj.onComplete = function(){};
    }
    this.mRunning = false;
}

function idxSummaryFmt(d, div, codeList)
{
    var tableStr = '';
    var i = 0;
    var len = codeList.length;
    for(i = 0; i < len; i ++)
    {
        var stockCode = codeList[i][0];
        var stockName = codeList[i][1];
        
        var color = '';
        var flag = "+";
        var currPrice = d[stockCode][2];
        var lastPrice = d[stockCode][1];
        var amount = d[stockCode][3];
        if (currPrice > lastPrice)
            color = 'red';
        if (currPrice < lastPrice)
        {
            color = 'green';      
            flag = "";
        }
        if( i != 0)
            tableStr += "&nbsp;|&nbsp;"
        tableStr += '<a href="index.php?code=' + stockCode +'">' + stockName + '</a>';
        tableStr += '<span style="margin-left:11px" class="'+ color + '">' + currPrice.toFixed(2) + '</span>';
        tableStr += '<span style="margin-left:11px" class="'+ color + '">' + flag + (currPrice - lastPrice).toFixed(2)+ '</span> ';
        tableStr += '<span class="num">' +  (amount / 10000).toFixed(2) + '</span>亿元';
    }    
    innerSet($('#'+div), tableStr);
}

/*---format-header idx summary--*/
function headerIdxSummary(d, c)
{    
    var codeList = [['sh000001', '上证指数'], ['sz399001', '深证成指'], 
                    ['sh000300', '沪深300'], ['sh000016', '上证50']];
    var tableStr = '';
    var i = 0;
    var len = codeList.length;
    for(i = 0; i < len; i ++)
    {
        tableStr += "<div>";
        var stockCode = codeList[i][0];
        var stockName = codeList[i][1];
        
        var color = '';
        var flag = "+";
        var currPrice = d[stockCode][2];
        var lastPrice = d[stockCode][1];
        var amount = d[stockCode][3];
        if (currPrice > lastPrice)
            color = 'up';
        if (currPrice < lastPrice)
        {
            color = 'down';      
            flag = "";
        }
        tableStr += '<a target="_blank" href="'+urls.data+'/stock/market.php?code=' + stockCode +'">' + stockName + '</a> ';
        tableStr += '<span class="'+ color + '">' + currPrice.toFixed(2) + '</span> ';
        tableStr += '<span class="'+ color + '">' + flag + (currPrice - lastPrice).toFixed(2) + '</span></div>';
    }    
    innerSet($('#'+c), tableStr);
}

/*---foramt header sort conver--*/
function headerSort(d)
{
    var market = ['sh', 'sz'];
    var dtype  = ['ratio_inc', 'ratio_dec'];
    var i = 0, j = 0, k = 0;
    for(; i < 2; i ++)
    {
        for(j = 0; j < 2; j ++)
        {
            var _m = market[i];
            var _t = dtype[j];
            var _d;
            
            if(typeof d[_m]['A'] != 'undefined')
            {
                var __d = $.parseJSON(d[_m]['A'])
                _d = __d[_t];
            }
            else
            {
                _d = d[_m][_t];
            }   
            var divStr = "";
            
            for(k = 0; k < _d.length && k < 5; k ++)
            {
                divStr += "<div>";
                var stockCode = _d[k][0];
                var stockName = _d[k][1];
                var sStockCode = stockCode.substr(0, 2).toLowerCase() + stockCode.substr(4);
                var color = '';
                var flag = "";
                
                var lastPrice = _d[k][2];
                var currPrice = _d[k][3];
                var ratio = _d[k][4];
                var l = _d[k][5] ? 3 : 2;
                if (currPrice > lastPrice)
                    color = 'up';
                if (currPrice < lastPrice)
                {
                    color = 'down';      
                    flag = "";
                }
                divStr += '<a target="_blank" href="'+urls.data+'/stock/index.php?code=' + sStockCode +'">' + decodeURIComponent(stockName) + '</a>';
                divStr += '<span style="margin-left:5px" class="'+ color + '">' + currPrice.toFixed(l) + '</span>';
                divStr += '<span  style="margin-left:5px"  class="'+ color + '">' + flag + ratio.toFixed(2) + '%</span></div>';
            }
              
            innerSet($('#header_' + _m + "_" + _t), divStr);
        }
    }
}
function scrollUpDown(navi, tag) {
    var targets = $('#'+navi+' '+ tag);
    var tlen = targets.length;   
    $(targets).each(function(i,item){
        $(item).bind('mouseover', function () {
            clearInterval(interval);
        }).bind('mouseout', function () {
            interval = window.setInterval(function () { startScroll(); }, 3000)
        });
    })
    var i = 0;
	//for(;i < tlen; i ++)
	//{
	//    targets[i].onmouseover = function() {};
    //	targets[i].onmouseout  = function() {};
	//}
	
	var index = 1;
	var interval = window.setInterval(function () { startScroll(); }, 3000);
	function startScroll() {
		if (index == tlen) {
			index = 0;
		}
		var curr = index;
		var last = index - 1;
		if(last < 0)
		    last = tlen - 1;
		var last_top = 0;
	    var cur_top = 26;
	    var cur_int = window.setInterval(function () {
	        cur_top -= 2;
	        if (cur_top < 0) {
	            window.clearInterval(cur_int);
	            return;
	        }
	        targets.eq(curr).css({ "top": cur_top })
	    }, 20);
		var last_int = window.setInterval(function(){
		            last_top += 2; 
		            if(last_top > 26)
		            {
		                window.clearInterval(last_int);
		                return;
		            }
		            targets.eq(last).css({"top":last_top});}, 20);
		index++;
	}
	
}


function p5wRealStockMod(swfID, swfWidth, swfHeight)
{
    this.swfID = swfID;
    this.swfHeight = swfHeight;
    this.swfWidth = swfWidth;
    this.running = false;
}

p5wRealStockMod.prototype._realURLGet = function()
{
      return hqServer.replace("http://", "");
}

p5wRealStockMod.prototype.resetmod = function(stockCode, stockName, stockType){
    this.stockCode = stockCode || '000001';
    this.stockName = stockName || '深发展A';
    this.stockType = stockType || 'SZHQ';
    this._start();
}

p5wRealStockMod.prototype._start = function()
{
    var realSwf = document.getElementById(this.swfID);
    if(!realSwf)
        realSwf = document[this.swfID];
 
    try{
        var infoURL = this._realURLGet();
       
        realSwf.start(infoURL, this.stockCode, this.stockType, this.stockName,["real"], [], this.swfWidth, this.swfHeight, 2,  [35, 15, 2, 4], [9, 9, 10, 10], null,
        false, urls.data + '/stock/' + 'index.php?code=' + this.stockType.substr(0, 2).toLowerCase() + this.stockCode, true);
        this.running = true;               
    }
    catch(E)
    {
        this.running = false;
        window.setTimeout(this._start.bind(this), 100);
    }           
}
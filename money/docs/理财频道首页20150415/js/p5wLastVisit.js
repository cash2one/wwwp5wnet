// default last visit list

var defaultLastList = [
    ["000001", "SZ"],
    ["000002", "SZ"],
    ["000004", "SZ"],
    ["000001", "SH"],
    ["399001", "SZ"]
];

// class p5wLastVisit
function p5wLastVisit(opts) {
    var defopts = { divID: null, interval: 10 * 1000, setCookie: true, stockCode: "000001", stockType: "SZ", mJumpURL: urls.data + '/stock/index.php', DefaultList: null, numShow: 6 };
    this.opts = $.extend({}, defopts, opts);
    if (!this.opts.divID)
        throw "Last Visit ID can't be a invalid  value";

    //interval, setCookie, stockCode, stockType, jumpURL, numShow, defaultList, setTableFunc
    this.divID = this.opts.divID;

    this.interval = this.opts.interval;
    this.setCookie = this.opts.setCookie;
    this.stockCode = this.opts.stockCode;
    this.stockType = this.opts.stockType;
    this.stockType = this.opts.stockType.toUpperCase();
    this.mJumpURL = this.opts.mJumpURL;
    this.numMax = 10;
    this.mDefaultList = (this.opts.DefaultList && this.opts.DefaultList == Array) ? this.opts.DefaultList : defaultLastList;
    if (this.opts.numShow && this.opts.numShow > this.numMax)
        this.opts.numShow = this.numMax;

    this.lastVisit = [];
    this.running = true;
    this.inited = false;
    this.mTimer = null;
    this._init();
}

p5wLastVisit.prototype.start = function () {
    // get stock name
    if (this.lastVisit.length >= 1) {
        var args = {
            method: 'get', onComplete: function (rep) {

                var ret = rep;
                var retObj = $.parseJSON(ret);
                for (var i = 0; i < this.lastVisit.length; i++) {
                    var tmpStock
                    if (retObj[this.lastVisit[i][1].toLowerCase() + this.lastVisit[i][0]])
                        this.lastVisit[i].push(decodeURIComponent(retObj[this.lastVisit[i][1].toLowerCase() + this.lastVisit[i][0]]));
                }

                this._update();
                this.inited = true;

            }.bind(this)
        };
        var infoURL = '';
        for (var i = 0; i < this.lastVisit.length; i++) {
            infoURL += this.lastVisit[i][1].toLowerCase() + this.lastVisit[i][0] + ',';
        }
        infoURL = hqServer + '/info/sCode.py/get.znzDo?cmd=' + infoURL + '|' + Math.random().toString();

        var myAjaj = new Ajaj(infoURL, args);
    }
}

p5wLastVisit.prototype._init = function () {
    var that = this;
    $.getJSON(urls.data + '/stock/stockjson.php?m=history&callback=?&time=' + new Date().getTime(), function (data) {

        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var items = data[i];
                if (items) {
                    var stockType = items.substr(0, 2).toUpperCase();
                    var stockCode = items.substr(2, 6);
                    var tmp = [];
                    tmp.push(stockCode, stockType);
                    that.lastVisit.push(tmp);
                }
            }

        } else {
            that.lastVisit = that.mDefaultList;
        }
        that.start();
    });
}

p5wLastVisit.prototype._update = function () {
    if (!this.running) return;
    if (!this.inited || inHqTime())
        this._refresh();
    this.mTimer = window.setTimeout(this._update.bind(this), this.interval);
}

p5wLastVisit.prototype._set = function (retStr) {
    var retObj = $.parseJSON(retStr);
    for (var i = 0; i < this.lastVisit.length; i++) {
        if (retObj[this.lastVisit[i][1].toLowerCase() + this.lastVisit[i][0]]) {
            if (this.lastVisit[i].length == 3) {
                this.lastVisit[i].push(retObj[this.lastVisit[i][1].toLowerCase() + this.lastVisit[i][0]]);
            }
            else if (this.lastVisit[i].length == 4) {
                this.lastVisit[i][3] = retObj[this.lastVisit[i][1].toLowerCase() + this.lastVisit[i][0]];
            }
            else {
            }
        }
    }
    if (this.running) $('#' + this.opts.divID).html(this._fmtTbl());
}

p5wLastVisit.prototype._fmtTbl = function () {
    var start = this.lastVisit.length - this.opts.numShow;
    if (start < 0)
        start = 0;

    var div = '';
    var tmpList = new Array();
    for (var i = start; i < this.lastVisit.length; i++) {
        tmpList.push(this.lastVisit[i]);
    }
    tmpList.reverse();
    for (var i = 0; i < tmpList.length; i++) {
        var color = '';
        var nfix = 2;
        var curValue;
        var curRate;
        div += '<div>';
        if (tmpList[i][3]) {
            if (tmpList[i][3][0] == 1)
                nfix = 3;

            if (tmpList[i][3][2] > tmpList[i][3][1])
                color = 'up';

            if (tmpList[i][3][2] < tmpList[i][3][1])
                color = 'down';

            if (tmpList[i][3][2] == 0) {
                curValue = '--';
                curRate = '--%';
                color = '';
            }
            else {
                curValue = tmpList[i][3][2].toFixed(nfix);
                var tmpVal = (tmpList[i][3][2] - tmpList[i][3][1]) / tmpList[i][3][1] * 100;
                if (tmpVal > 10.00)
                    curRate = tmpVal.toFixed(2) + '%';
                else
                    curRate = tmpVal.toFixed(2) + '%';
            }
        }
        else {
            curValue = '--';
            curRate = '--%';
            color = '';
        }

        div += '<a href="' + this.mJumpURL + '?code=' + tmpList[i][1].toLowerCase() + tmpList[i][0] + '" target="_blank" >' + decodeURIComponent(tmpList[i][2]) + '</a>';
        div += '<span class="' + color + '" style="margin-left: 5px;">' + curValue + '</span>';
        div += '<span class="' + color + '" style="margin-left: 5px;">' + curRate + '</span>';
        div += '</div>';
    }
    return div;
}
p5wLastVisit.prototype._refresh = function () {
    //get stock values from server
    if (this.lastVisit.length >= 1) {
        var args = {
            method: 'get',
            onComplete: function (rep) {
                var ret = rep;
                this._set(ret);
            }.bind(this)
        };

        var infoURL = '';
        for (var i = 0; i < this.lastVisit.length; i++) {
            infoURL += this.lastVisit[i][1].toLowerCase() + this.lastVisit[i][0] + ',';
        }
        infoURL = hqServer + '/info/data.py/prices.znzDo?cmd=' + infoURL + '|' + Math.random().toString();
        var myAjaj = new Ajaj(infoURL, args);
    }
}
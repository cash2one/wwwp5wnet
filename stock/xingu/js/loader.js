$(function () {
    var jsonSrv = "http://www.p5w.net/jsdata/";
     var hqUrl = "http://company.p5w.net/ggzx.asp?zqdm=";
     $.getJSON(jsonSrv + "fxpjlistjs.json", function (data) {
        if (data.status == "Y") { 
                  
            //新股行情
            var g = data.xinguhqlist || [];
            var ul = $('#newstockhq');
            var t = $('.tline_title', ul)
            ul.empty().append(t);
            $(g).each(function (i) {
                if (i > 4) return false;
                var b = i % 2 == 0 ? "1" : "2";
                $('<div class="tline_' + b + '"><li class="twa1"><a href="' + hqUrl + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="twa2">' + this.s3 + '</li><li class="twa3">' + this.s4 + '</li><li class="twa4">' + this.s5 + '</li></div>').appendTo(ul);
            });
        }
    });
    

     $.getJSON(jsonSrv + "newstocklistjs2.json", function (data) {
        if (data.status == "Y") {          
            //新股数据
           
            var g = data.newstocksg || [];
            var ul = $('#newstockdata');
            var t = $('.tline_title', ul)
            ul.empty().append(t);
            $(g).each(function (i) {
                if (i > 4) return false;
                var b = i % 2 == 0 ? "1" : "2";
                $('<div class="tline_' + b + '"><li class="twa2">' + this.s4 + '</li><li class="twa1"><a href="' + hqUrl + this.s1 + '" target="_blank">' + this.s2 + '</a></li><li class="twa3">' + this.s3 + '</li><li class="twa4">' + this.s5 + '</li></div>').appendTo(ul);
            });
            
           
            var g = data.newstocksg || [];
            var tbody = $('#datatable1 tbody');            
            tbody.empty();
            $(g).each(function (i) {                
                var b = i % 2 == 0 ? "1" : "2";
                $('<tr class="mt-line'+b+'"><td>'+this.s1+'</td><td>'+this.s2+'</td><td>'+this.s3+'</td><td>'+this.s4+'</td><td>'+this.s5+'</td><td>'+this.s6+'</td><td>'+this.s7+'</td><td>'+this.s8+'</td><td>'+this.s9+'</td><td>'+this.s10+'</td><td>'+this.s11+'</td><td>'+this.s12+'</td><td>'+this.s13+'</td><td>'+this.s14+'</td><td>'+this.s15+'</td><td>'+this.s16+'</td><td><a href="http://chinairm.p5w.net/newstock/newstock.jsp?zqdm='+this.s1+'" target="_blank">专题</a></td><td>路演</td><td><a href="http://company.p5w.net/ggzx.asp?zqdm='+this.s1+'" target="_blank">公司资讯</a></td><td><a href="http://irm.p5w.net/ssgs/S'+this.s1+'" target="_blank">互动</a></td></tr>').appendTo(tbody);
              });
           
           
           
           
            ////新股行情
            var g = data.newstockzq || [];
             var tbody = $('#datatable2 tbody');            
            tbody.empty();
            $(g).each(function (i) {                
                var b = i % 2 == 0 ? "1" : "2";
                $('<tr class="mt-line'+b+'"><td>'+this.s1+'</td><td>'+this.s2+'</td><td>'+this.s3+'</td><td>'+this.s4+'</td><td>'+this.s5+'</td><td>'+this.s6+'</td><td>'+this.s7+'</td><td>'+this.s8+'</td><td>'+this.s9+'</td><td>'+this.s10+'</td><td>'+this.s11+'</td><td>'+this.s12+'</td><td>'+this.s13+'</td><td>'+this.s14+'</td><td>'+this.s15+'</td><td><a href="http://chinairm.p5w.net/newstock/newstock.jsp?zqdm='+this.s1+'" target="_blank">专题</a></td><td><a href="http://company.p5w.net/ggzx.asp?zqdm='+this.s1+'" target="_blank">公司资讯</a></td><td><a href="http://irm.p5w.net/ssgs/S'+this.s1+'" target="_blank">互动</a></td></tr>').appendTo(tbody);
              });
        }
    });
     $.getJSON(jsonSrv + "newstocklistjs3.json", function (data) {
        if (data.status == "Y") {          
            //新股数据
           
            var g = data.newstocksg || [];
            var tbody = $('#datatable3 tbody');            
            tbody.empty();
            $(g).each(function (i) {                
                var b = i % 2 == 0 ? "1" : "2";
                $('<tr class="mt-line'+b+'"><td>'+this.s1+'</td><td>'+this.s2+'</td><td>'+this.s3+'</td><td>'+this.s4+'</td><td>'+this.s5+'</td><td>'+this.s6+'</td><td>'+this.s7+'</td><td>'+this.s8+'</td><td>'+this.s9+'</td><td>'+this.s10+'</td><td>'+this.s11+'</td><td>'+this.s12+'</td><td>'+this.s13+'</td><td>'+this.s14+'</td><td>'+this.s15+'</td><td>'+this.s16+'</td><td>'+this.s17+'</td><td><a href="http://company.p5w.net/ggzx.asp?zqdm='+this.s1+'" target="_blank">公司资讯</a></td><td><a href="http://irm.p5w.net/ssgs/S'+this.s1+'" target="_blank">互动</a></td></tr>').appendTo(tbody);
              });
            ////新股行情
            var g = data.newstockzq || [];
             var tbody = $('#datatable4 tbody');            
            tbody.empty();
            $(g).each(function (i) {   
                  if (i > 10) return false;
                var b = i % 2 == 0 ? "1" : "2";
                $('<tr class="mt-line'+b+'"><td>'+this.s1+'</td><td>'+this.s2+'</td><td>'+this.s3+'</td><td>'+this.s4+'</td><td>'+this.s5+'</td><td>'+this.s6+'</td><td>'+this.s7+'</td><td>'+this.s8+'</td><td>'+this.s9+'</td></tr>').appendTo(tbody);
              });
        }
    });
});

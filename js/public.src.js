/*
* Slides, A Slideshow Plugin for jQuery
* Intructions: http://slidesjs.com
* By: Nathan Searles, http://nathansearles.com
* Version: 1.1.9
* Updated: September 5th, 2011
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
(function ($) {
    $.fn.slides = function (option) {
        // override defaults with specified option
        option = $.extend({}, $.fn.slides.option, option);

        return this.each(function () {
            // wrap slides in control container, make sure slides are block level
            $('.' + option.container, $(this)).children().wrapAll('<div class="slides_control"/>');

            var elem = $(this),
				control = $('.slides_control', elem),
				total = control.children().size(),
				width = control.children().outerWidth(),
				height = control.children().outerHeight(),
				start = option.start - 1,
				effect = option.effect.indexOf(',') < 0 ? option.effect : option.effect.replace(' ', '').split(',')[0],
				paginationEffect = option.effect.indexOf(',') < 0 ? effect : option.effect.replace(' ', '').split(',')[1],
				next = 0, prev = 0, number = 0, current = 0, loaded, active, clicked, position, direction, imageParent, pauseTimeout, playInterval;

            // is there only one slide?
            if (total < 2) {
                // Fade in .slides_container
                $('.' + option.container, $(this)).fadeIn(option.fadeSpeed, option.fadeEasing, function () {
                    // let the script know everything is loaded
                    loaded = true;
                    // call the loaded funciton
                    option.slidesLoaded();
                });
                // Hide the next/previous buttons
                $('.' + option.next + ', .' + option.prev).fadeOut(0);
                return false;
            }

            // animate slides
            function animate(direction, effect, clicked) {
                if (!active && loaded) {
                    active = true;
                    // start of animation
                    option.animationStart(current + 1);
                    switch (direction) {
                        case 'next':
                            // change current slide to previous
                            prev = current;
                            // get next from current + 1
                            next = current + 1;
                            // if last slide, set next to first slide
                            next = total === next ? 0 : next;
                            // set position of next slide to right of previous
                            position = width * 2;
                            // distance to slide based on width of slides
                            direction = -width * 2;
                            // store new current slide
                            current = next;
                            break;
                        case 'prev':
                            // change current slide to previous
                            prev = current;
                            // get next from current - 1
                            next = current - 1;
                            // if first slide, set next to last slide
                            next = next === -1 ? total - 1 : next;
                            // set position of next slide to left of previous
                            position = 0;
                            // distance to slide based on width of slides
                            direction = 0;
                            // store new current slide
                            current = next;
                            break;
                        case 'pagination':
                            // get next from pagination item clicked, convert to number
                            next = parseInt(clicked, 10);
                            // get previous from pagination item with class of current
                            prev = $('.' + option.paginationClass + ' li.' + option.currentClass + ' a', elem).attr('href').match('[^#/]+$');
                            // if next is greater then previous set position of next slide to right of previous
                            if (next > prev) {
                                position = width * 2;
                                direction = -width * 2;
                            } else {
                                // if next is less then previous set position of next slide to left of previous
                                position = 0;
                                direction = 0;
                            }
                            // store new current slide
                            current = next;
                            break;
                    }

                    // fade animation
                    if (effect === 'fade') {
                        // fade animation with crossfade
                        if (option.crossfade) {
                            // put hidden next above current
                            control.children(':eq(' + next + ')', elem).css({
                                zIndex: 10
                                // fade in next
                            }).fadeIn(option.fadeSpeed, option.fadeEasing, function () {
                                if (option.autoHeight) {
                                    // animate container to height of next
                                    control.animate({
                                        height: control.children(':eq(' + next + ')', elem).outerHeight()
                                    }, option.autoHeightSpeed, function () {
                                        // hide previous
                                        control.children(':eq(' + prev + ')', elem).css({
                                            display: 'none',
                                            zIndex: 0
                                        });
                                        // reset z index
                                        control.children(':eq(' + next + ')', elem).css({
                                            zIndex: 0
                                        });
                                        // end of animation
                                        option.animationComplete(next + 1);
                                        active = false;
                                    });
                                } else {
                                    // hide previous
                                    control.children(':eq(' + prev + ')', elem).css({
                                        display: 'none',
                                        zIndex: 0
                                    });
                                    // reset zindex
                                    control.children(':eq(' + next + ')', elem).css({
                                        zIndex: 0
                                    });
                                    // end of animation
                                    option.animationComplete(next + 1);
                                    active = false;
                                }
                            });
                        } else {
                            // fade animation with no crossfade
                            control.children(':eq(' + prev + ')', elem).fadeOut(option.fadeSpeed, option.fadeEasing, function () {
                                // animate to new height
                                if (option.autoHeight) {
                                    control.animate({
                                        // animate container to height of next
                                        height: control.children(':eq(' + next + ')', elem).outerHeight()
                                    }, option.autoHeightSpeed,
									// fade in next slide
									function () {
									    control.children(':eq(' + next + ')', elem).fadeIn(option.fadeSpeed, option.fadeEasing);
									});
                                } else {
                                    // if fixed height
                                    control.children(':eq(' + next + ')', elem).fadeIn(option.fadeSpeed, option.fadeEasing, function () {
                                        // fix font rendering in ie, lame
                                        if ($.browser.msie) {
                                            $(this).get(0).style.removeAttribute('filter');
                                        }
                                    });
                                }
                                // end of animation
                                option.animationComplete(next + 1);
                                active = false;
                            });
                        }
                        // slide animation
                    } else {
                        // move next slide to right of previous
                        control.children(':eq(' + next + ')').css({
                            left: position,
                            display: 'block'
                        });
                        // animate to new height
                        if (option.autoHeight) {
                            control.animate({
                                left: direction,
                                height: control.children(':eq(' + next + ')').outerHeight()
                            }, option.slideSpeed, option.slideEasing, function () {
                                control.css({
                                    left: -width
                                });
                                control.children(':eq(' + next + ')').css({
                                    left: width,
                                    zIndex: 5
                                });
                                // reset previous slide
                                control.children(':eq(' + prev + ')').css({
                                    left: width,
                                    display: 'none',
                                    zIndex: 0
                                });
                                // end of animation
                                option.animationComplete(next + 1);
                                active = false;
                            });
                            // if fixed height
                        } else {
                            // animate control
                            control.animate({
                                left: direction
                            }, option.slideSpeed, option.slideEasing, function () {
                                // after animation reset control position
                                control.css({
                                    left: -width
                                });
                                // reset and show next
                                control.children(':eq(' + next + ')').css({
                                    left: width,
                                    zIndex: 5
                                });
                                // reset previous slide
                                control.children(':eq(' + prev + ')').css({
                                    left: width,
                                    display: 'none',
                                    zIndex: 0
                                });
                                // end of animation
                                option.animationComplete(next + 1);
                                active = false;
                            });
                        }
                    }
                    // set current state for pagination
                    if (option.pagination) {
                        // remove current class from all
                        $('.' + option.paginationClass + ' li.' + option.currentClass, elem).removeClass(option.currentClass);
                        // add current class to next
                        $('.' + option.paginationClass + ' li:eq(' + next + ')', elem).addClass(option.currentClass);
                    }
                }
            } // end animate function

            function stop() {
                // clear interval from stored id
                clearInterval(elem.data('interval'));
            }

            function pause() {
                if (option.pause) {
                    // clear timeout and interval
                    clearTimeout(elem.data('pause'));
                    clearInterval(elem.data('interval'));
                    // pause slide show for option.pause amount
                    pauseTimeout = setTimeout(function () {
                        // clear pause timeout
                        clearTimeout(elem.data('pause'));
                        // start play interval after pause
                        playInterval = setInterval(function () {
                            animate("next", effect);
                        }, option.play);
                        // store play interval
                        elem.data('interval', playInterval);
                    }, option.pause);
                    // store pause interval
                    elem.data('pause', pauseTimeout);
                } else {
                    // if no pause, just stop
                    stop();
                }
            }

            // 2 or more slides required
            if (total < 2) {
                return;
            }

            // error corection for start slide
            if (start < 0) {
                start = 0;
            }

            if (start > total) {
                start = total - 1;
            }

            // change current based on start option number
            if (option.start) {
                current = start;
            }

            // randomizes slide order
            if (option.randomize) {
                control.randomize();
            }

            // make sure overflow is hidden, width is set
            $('.' + option.container, elem).css({
                overflow: 'hidden',
                // fix for ie
                position: 'relative'
            });

            // set css for slides
            control.children().css({
                position: 'absolute',
                top: 0,
                left: control.children().outerWidth(),
                zIndex: 0,
                display: 'none'
            });

            // set css for control div
            control.css({
                position: 'relative',
                // size of control 3 x slide width
                width: (width * 3),
                // set height to slide height
                height: height,
                // center control to slide
                left: -width
            });

            // show slides
            $('.' + option.container, elem).css({
                display: 'block'
            });

            // if autoHeight true, get and set height of first slide
            if (option.autoHeight) {
                control.children().css({
                    height: 'auto'
                });
                control.animate({
                    height: control.children(':eq(' + start + ')').outerHeight()
                }, option.autoHeightSpeed);
            }

            // checks if image is loaded
            if (option.preload && control.find('img:eq(' + start + ')').length) {
                // adds preload image
                $('.' + option.container, elem).css({
                    background: 'url(' + option.preloadImage + ') no-repeat 50% 50%'
                });

                // gets image src, with cache buster
                var img = control.find('img:eq(' + start + ')').attr('src') + '?' + (new Date()).getTime();

                // check if the image has a parent
                if ($('img', elem).parent().attr('class') != 'slides_control') {
                    // If image has parent, get tag name
                    imageParent = control.children(':eq(0)')[0].tagName.toLowerCase();
                } else {
                    // Image doesn't have parent, use image tag name
                    imageParent = control.find('img:eq(' + start + ')');
                }

                // checks if image is loaded
                control.find('img:eq(' + start + ')').attr('src', img).load(function () {
                    // once image is fully loaded, fade in
                    control.find(imageParent + ':eq(' + start + ')').fadeIn(option.fadeSpeed, option.fadeEasing, function () {
                        $(this).css({
                            zIndex: 5
                        });
                        // removes preload image
                        $('.' + option.container, elem).css({
                            background: ''
                        });
                        // let the script know everything is loaded
                        loaded = true;
                        // call the loaded funciton
                        option.slidesLoaded();
                    });
                });
            } else {
                // if no preloader fade in start slide
                control.children(':eq(' + start + ')').fadeIn(option.fadeSpeed, option.fadeEasing, function () {
                    // let the script know everything is loaded
                    loaded = true;
                    // call the loaded funciton
                    option.slidesLoaded();
                });
            }

            // click slide for next
            if (option.bigTarget) {
                // set cursor to pointer
                control.children().css({
                    cursor: 'pointer'
                });
                // click handler
                control.children().click(function () {
                    // animate to next on slide click
                    animate('next', effect);
                    return false;
                });
            }

            // pause on mouseover
            if (option.hoverPause && option.play) {
                control.bind('mouseover', function () {
                    // on mouse over stop
                    stop();
                });
                control.bind('mouseleave', function () {
                    // on mouse leave start pause timeout
                    pause();
                });
            }

            // generate next/prev buttons
            if (option.generateNextPrev) {
                $('.' + option.container, elem).after('<a href="#" class="' + option.prev + '">Prev</a>');
                $('.' + option.prev, elem).after('<a href="#" class="' + option.next + '">Next</a>');
            }

            // next button
            $('.' + option.next, elem).click(function (e) {
                e.preventDefault();
                if (option.play) {
                    pause();
                }
                animate('next', effect);
            });

            // previous button
            $('.' + option.prev, elem).click(function (e) {
                e.preventDefault();
                if (option.play) {
                    pause();
                }
                animate('prev', effect);
            });

            // generate pagination
            if (option.generatePagination) {
                // create unordered list
                if (option.prependPagination) {
                    elem.prepend('<ul class=' + option.paginationClass + '></ul>');
                } else {
                    elem.append('<ul class=' + option.paginationClass + '></ul>');
                }
                // for each slide create a list item and link
                control.children().each(function () {
                    $('.' + option.paginationClass, elem).append('<li><a onfocus="this.blur()" href="#' + number + '">' + (number + 1) + '</a></li>');
                    number++;
                });
            } else {
                // if pagination exists, add href w/ value of item number to links
                $('.' + option.paginationClass + ' li a', elem).each(function () {
                    $(this).attr('href', '#' + number);
                    number++;
                });
            }

            // add current class to start slide pagination
            $('.' + option.paginationClass + ' li:eq(' + start + ')', elem).addClass(option.currentClass);

            // click handling 
            $('.' + option.paginationClass + ' li a', elem).click(function () {
                // pause slideshow
                if (option.play) {
                    pause();
                }
                // get clicked, pass to animate function					
                clicked = $(this).attr('href').match('[^#/]+$');
                // if current slide equals clicked, don't do anything
                if (current != clicked) {
                    animate('pagination', paginationEffect, clicked);
                }
                return false;
            });

            // click handling 
            $('a.link', elem).click(function () {
                // pause slideshow
                if (option.play) {
                    pause();
                }
                // get clicked, pass to animate function					
                clicked = $(this).attr('href').match('[^#/]+$') - 1;
                // if current slide equals clicked, don't do anything
                if (current != clicked) {
                    animate('pagination', paginationEffect, clicked);
                }
                return false;
            });

            if (option.play) {
                // set interval
                playInterval = setInterval(function () {
                    animate('next', effect);
                }, option.play);
                // store interval id
                elem.data('interval', playInterval);
            }
        });
    };

    // default options
    $.fn.slides.option = {
        preload: false, // boolean, Set true to preload images in an image based slideshow
        preloadImage: '/img/loading.gif', // string, Name and location of loading image for preloader. Default is "/img/loading.gif"
        container: 'slides_container', // string, Class name for slides container. Default is "slides_container"
        generateNextPrev: false, // boolean, Auto generate next/prev buttons
        next: 'next', // string, Class name for next button
        prev: 'prev', // string, Class name for previous button
        pagination: true, // boolean, If you're not using pagination you can set to false, but don't have to
        generatePagination: true, // boolean, Auto generate pagination
        prependPagination: false, // boolean, prepend pagination
        paginationClass: 'pagination', // string, Class name for pagination
        currentClass: 'current', // string, Class name for current class
        fadeSpeed: 350, // number, Set the speed of the fading animation in milliseconds
        fadeEasing: '', // string, must load jQuery's easing plugin before http://gsgd.co.uk/sandbox/jquery/easing/
        slideSpeed: 350, // number, Set the speed of the sliding animation in milliseconds
        slideEasing: '', // string, must load jQuery's easing plugin before http://gsgd.co.uk/sandbox/jquery/easing/
        start: 1, // number, Set the speed of the sliding animation in milliseconds
        effect: 'slide', // string, '[next/prev], [pagination]', e.g. 'slide, fade' or simply 'fade' for both
        crossfade: false, // boolean, Crossfade images in a image based slideshow
        randomize: false, // boolean, Set to true to randomize slides
        play: 0, // number, Autoplay slideshow, a positive number will set to true and be the time between slide animation in milliseconds
        pause: 0, // number, Pause slideshow on click of next/prev or pagination. A positive number will set to true and be the time of pause in milliseconds
        hoverPause: false, // boolean, Set to true and hovering over slideshow will pause it
        autoHeight: false, // boolean, Set to true to auto adjust height
        autoHeightSpeed: 350, // number, Set auto height animation time in milliseconds
        bigTarget: false, // boolean, Set to true and the whole slide will link to next slide on click
        animationStart: function () { }, // Function called at the start of animation
        animationComplete: function () { }, // Function called at the completion of animation
        slidesLoaded: function () { } // Function is called when slides is fully loaded
    };

    // Randomize slide order on load
    $.fn.randomize = function (callback) {
        function randomizeOrder() { return (Math.round(Math.random()) - 0.5); }
        return ($(this).each(function () {
            var $this = $(this);
            var $children = $this.children();
            var childCount = $children.length;
            if (childCount > 1) {
                $children.hide();
                var indices = [];
                for (i = 0; i < childCount; i++) { indices[indices.length] = i; }
                indices = indices.sort(randomizeOrder);
                $.each(indices, function (j, k) {
                    var $child = $children.eq(k);
                    var $clone = $child.clone(true);
                    $clone.show().appendTo($this);
                    if (callback !== undefined) {
                        callback($child, $clone);
                    }
                    $child.remove();
                });
            }
        }));
    };
})(jQuery);
if (typeof p5w == "undefined") {
    var p5w = {}
}
p5w.ie6 = $.browser.msie && $.browser.version == 6;
var $zhcn = { string: { ok: '确定', title: '系统提示信息', cancel: '取消', closeTip: '关闭' } };
p5w.Alert = function (s, r, c) {
    if (p5w.ie6) { return alert(s) }
    if (typeof r == "object") {
        var i = r.icon || '';
        var ok = r.ok;
    } else {
        var i = r || '';
        var ok = c;
    }
    $.messager.defaults.ok = $zhcn.string.ok;
    $.messager.defaults.cancel = $zhcn.string.cancel;
    return $.messager.alert($zhcn.string.title, s, i, ok);
};
p5w.alert = p5w.Alert;
p5w.confirm = function (s, r) {
    if (p5w.ie6) { return confirm(s) }
    return $.messager.confirm($zhcn.string.title, s, r);
};

//加载js方法
function loadJs(url, callback, charset) {
    if (!charset) {
        charset='uft-8';
    }
    //标志变量，js是否加载并执行
    var done = false;
    var script = document.createElement('script');//创建script dom
    script.type = 'text/javascript';
    script.language = 'javascript';
    script.charset = charset;
    script.src = url;
    script.onload = script.onreadystatechange = function () {
        //onload是firefox 浏览器事件，onreadystatechange,是ie的，为了兼容，两个都写上，这样写会导致内存泄露
        //script.readyState只是ie下有这个属性，如果这个值为undefined，说明是在firefox,就直接可以执行下面的代码了。反之为ie，需要对script.readyState
        //状态具体值进行判别，loaded和complete状态表示，脚本加载了并执行了。
        if (!done && (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')) {
            done = true;
            script.onload = script.onreadystatechange = null;//释放内存，还会泄露。
            if (callback) {//加载后执行回调
                callback.call(script);
            }
        }
    };
    //具体加载动作，上面的onload是注册事件，
    document.getElementsByTagName("head")[0].appendChild(script);
}
//运行js ,看代码逻辑可知，运行js,只是在js执行后，将这个script删除而已
function runJs(url, callback) {
    loadJs(url, function () {
        document.getElementsByTagName("head")[0].removeChild(this);
        if (callback) {
            callback();
        }
    });
}
p5w.loadJs = loadJs;
p5w.runJs = runJs;
// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};
String.prototype.len = function () {
    return this.replace(/[^\x00-\xff]/g, "aa").length;
};
String.prototype.sub = function (n, o) {
    var r = /[^\x00-\xff]/g;
    if (this.replace(r, "mm").length <= n) return this;
    // n = n - 3;  
    var p = o ? o : "";
    var m = Math.floor(n / 2);
    for (var i = m; i < this.length; i++) {
        if (this.substr(0, i).replace(r, "mm").length >= n) {
            var rs = this.substr(0, i) + p;
            return rs;
        }
    } return this;
};
/**
 * jQuery  Tabs version 1.1.0
 *
 * Author: lifuping
 * E-mail: lifuping@p5w.net
 * URL: http://www.p5w.net/
 * Copyright: (c) 2012 Panorama Network Co., Ltd.
 *
 * Example:
 * $('.Tabs').Tabs();
 *  
 * Works for:
 * <div class="Tabs">
 *     <div class="tabsHead">
 *     <ul>
 *         <li>tab 1</li>
 *         <li>tab 2</li>
 *     </ul>
 *     </div>
 *     <div class="tabBox">
 *         content for tab 1
 *     </div>
 *     <div class="tabBox">
 *         content for tab 2
 *     </div>
 * </div>
 *
 */

(function ($) {
    $.fn.Tabs = function (option) {
        // override defaults with specified option
        option = $.extend({}, $.fn.Tabs.option, option);
        if (option.TabEvent != "click" && option.TabEvent != "mouseover") {
            option.TabEvent = "click";
        }
        return this.each(function () {
            // Visible index
            var currentIndex = 0;
            var tabs = $('.' + option.TabsHead, this);
            var tabsDiv = $('.' + option.TabsDivCss, this);
            $(this).each(function () {
                $(option.TabTag + ':eq(' + currentIndex + ')', tabs).addClass(option.TabsLiCurrent);
                $(tabsDiv).hide();
                if (option.fadeSpeed > 0) {
                    $(tabsDiv.get(currentIndex)).fadeIn(option.fadeSpeed).show();
                } else {
                    $(tabsDiv.get(currentIndex)).show();
                }
            });

            $('ul li', tabs).bind(option.TabEvent, function () {
                $('li', tabs).removeClass(option.TabsLiCurrent);
                tabsDiv.hide();
                $(this).addClass(option.TabsLiCurrent);
                var $clickedIndex = $('li', tabs).index(this);
                var a = tabsDiv.get(currentIndex), b = tabsDiv.get($clickedIndex);
                if (option.fadeSpeed > 0) {
                    $(a).fadeOut(option.fadeSpeed, function () {
                        $(b).fadeIn(option.fadeSpeed).show();
                    });
                    $(a).hide();
                } else {
                    $(a).hide();
                    $(b).show();
                }
                currentIndex = $clickedIndex;
                if (typeof option.onClick == "function") {
                    option.onClick.call(this, currentIndex, tabsDiv);
                }
                if (typeof option.onHover == "function") {
                    option.onHover.call(this, currentIndex, tabsDiv);
                }
            });
        });
    };
    // default options
    $.fn.Tabs.option = {
        fadeSpeed: 0, // fade Speed,default 0  	        
        TabsLiCurrent: 'hover', //Clicked tab class 	      
        TabsHead: 'tabsHead', //
        TabsDivCss: 'tabBox', //
        TabEvent: 'mouseover', //mouseover or click
        TabTag: 'ul li',
        onClick: null, // Function is called when Tabs click
        onHover: null
    };
})(jQuery);
//指定JSON数据的地址
var jsonSrv = "http://www.p5w.net/jsdata/";
$.ajaxSetup({ cache: false });
$(function () {
    var keyword = $('.top-search-select-3');
    if (keyword[0]) {
        var defval = "\u8bf7\u8f93\u5165\u8bc1\u5238\u4ee3\u7801\u3001\u7b80\u79f0\u3001\u9996\u5b57\u6bcd\u641c\u7d22\u8bc1\u5238\u8d44\u8baf";
        keyword.bind("focus", function () {
            if (this.value == defval) {
                this.value = "";
            }
        }).bind("blur", function () {
            if (this.value == "") {
                this.value = defval;
            }
        });
        $('.top-search-btn a').attr('href', 'javascript:;').click(function () {
            if (keyword.val() == defval) {
                alert(defval);
                return false;
            }
            window.open('http://search.p5w.net/newsIndexSearch.action?keyword=' + encodeURI(keyword.val().substring(0, 80).replace(/[#$%'^&*()]/g, '').replace(/\r\n/ig, '')));
        });
    }
});
$(function() {
	$("#cwqz iframe").attr("src", "http://www.p5w.net/stock/cwqz/t/cwqz.htm").load(function(){
		var height = $(this).contents().find(".content_hd").height() + 2;
		$(this).height(height < 125 ? 125 : height);
	});
	/*$(".zwright .mod-list5 iframe").attr("src", "http://www.p5w.net/sy/index_45.htm").load(function(){
		var height = $(this).contents().find(".mod-list5").height() + 2;
		$(this).height(height < 245 ? 245 : height);
	});*/
	$("#hd iframe").attr("src", "http://www.p5w.net/sy/hdcwqz.htm").load(function(){
		var height = $(this).contents().find(".content_hd").height() + 2;
		$(this).height(height < 235 ? 235 : height);
	});
	$("#zt iframe").attr("src", "http://www.p5w.net/sy/index_46.htm").load(function(){
		var height = $(this).contents().find(".mod-list3").height() + 2;
		$(this).height(height < 300 ? 300 : height);
	});

});
function foot13() {
    var _bdhmProtocol = (("https:" == document.location.protocol) ? "https://": "http://");
    var arr = ['<div class="foot13">', '<div class="foot13-inner">', '<div class="f-l">', '<p>\u5408\u4f5c\u7535\u8bdd\uff1a<span class="fontArial">0755-83990201\u300183256219&nbsp;&nbsp;Email\uff1a<a href="mailto:service@p5w.net" target="_blank">service@p5w.net</a></span></p>', '<p>\u5168\u666f\u7f51\u7edc\uff1a\u83b7\u51c6\u4ece\u4e8b\u767b\u8f7d\u8d22\u7ecf\u7c7b\u65b0\u95fb\u4e1a\u52a1\u0020\u83b7\u51c6\u7ecf\u8425\u56e0\u7279\u7f51\u4fe1\u606f\u670d\u52a1\u4e1a\u52a1</p>', '<p class="fontArial">Copyright &copy; 2000-2014 Panorama Network Co., Ltd, All Rights Reserved</p>', '<p>\u5168\u666f\u7f51\u7edc\u6709\u9650\u516c\u53f8\u7248\u6743\u6240\u6709</p>', '<p>\u672a\u7ecf\u5168\u666f\u7f51\u4e66\u9762\u6388\u6743\uff0c\u8bf7\u52ff\u8f6c\u8f7d\u5185\u5bb9\u6216\u5efa\u7acb\u955c\u50cf\uff0c\u8fdd\u8005\u4f9d\u6cd5\u5fc5\u7a76\uff01</p>', '  </div>', '  <div class="f-r">', '    <div style="float:left"><a href="http://www.sznet110.gov.cn/webrecord/innernet/Welcome.jsp?bano=4403101901278" target="_blank"><img src="http://www.p5w.net/images/sznet110anwang.gif" width="70" height="81"></a></div>', '    <div style="float:left"><a href="http://www.sznet110.gov.cn/" target="_blank"><img src="http://www.p5w.net/images/sznet110gangting.gif" width="60" height="80"></a></div>', '    <div style="float:left;margin-top:8px;margin-left:5px;"><a href="http://www.miibeian.gov.cn/" target="_blank">\u7ecf\u8425\u8bb8\u53ef\u8bc1\u53f7\u0020\u7ca4<span class="fontArial">B2-20050249</span>\u53f7</a><br />\u4fe1\u606f\u7f51\u7edc\u4f20\u64ad\u89c6\u542c\u8282\u76ee\u8bb8\u53ef\u8bc1<br />\u8bb8\u53ef\u8bc1\u53f7\uff1a<span class="fontArial">1903034</span></div>', '  </div>', '  <div style="clear:both;text-align:center;display:none;">', '    <script type="text/javascript" src="' + _bdhmProtocol + 'hm.baidu.com/h.js?ed9dac8a2b525df95dc69c97bbcda470" type="text/javascript"></script><script src="http://s21.cnzz.com/stat.php?id=3475086&web_id=3475086&show=pic" type="text/javascript"></script>', '</div>', '</div></div>'];
    document.write(arr.join(''))
}
function mininav() {
    document.writeln("  <div class=\"mininav-left\">");
    document.writeln("    <a href=\"http://www.p5w.net\" target=\"_blank\">\u9996\u9875</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/kuaixun/\" target=\"_blank\">\u5feb\u8baf</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/stock/\" target=\"_blank\">\u80a1\u7968</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/fund/\" target=\"_blank\">\u57fa\u91d1</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/news/\" target=\"_blank\">\u8d22\u7ecf</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/futures/zhzx/\" target=\"_blank\">\u671f\u8d27</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/money/\" target=\"_blank\">\u7406\u8d22</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/forex/\" target=\"_blank\">\u5916\u6c47</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/zt/\" target=\"_blank\">\u4e13\u9898</a> | ");
    document.writeln("    <a href=\"http://bbs.p5w.net\" target=\"_blank\">\u793e\u533a</a> | ");
    document.writeln("    <a href=\"http://zlzq.p5w.net\" target=\"_blank\">\u4e13\u680f</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/tradingday/\" target=\"_blank\">\u89c6\u9891</a> | ");
    document.writeln("    <a href=\"http://rsc.p5w.net\" target=\"_blank\">\u8def\u6f14</a> | ");
    document.writeln("    <a href=\"http://irm.p5w.net\" target=\"_blank\">\u4e92\u52a8\u5e73\u53f0</a> | ");
    document.writeln("    <a href=\"http://www.p5w.net/yuqing/\" target=\"_blank\">\u8206\u60c5</a>");
    document.writeln("  </div>");
    document.writeln("  <div class=\"mininav-right\">");
    document.writeln("    <div id=\"user-menu\">");
    document.writeln("      <ul class=\"menu\">");
    document.writeln("        <li class=\"item\"><a class=\"link link-hover\" href=\"http://www.p5w.net/cftxclub/club/201008/t20100825_97025.htm\" target=\"_blank\"><em>\u5e2e\u52a9</em></a></li>");
    document.writeln("        <li class=\"item\"><a class=\"link link-hover\" href=\"http://company.p5w.net/passport/index.asp\" target=\"_blank\"><em>\u901a\u884c\u8bc1</em></a></li>");
    document.writeln("        <li class=\"item\"><a class=\"link link-hover\" href=\"http://company.p5w.net/passport/login.asp\" name=\"userlogin_box\"><em>\u767b\u5f55</em></a></li>");
    document.writeln("        <li class=\"item\"><a class=\"link link-hover\" href=\"http://company.p5w.net/passport/register.asp\" target=\"_blank\"><em>\u6ce8\u518c</em></a></li>");
    document.writeln("      </ul>");
    document.writeln("    </div>");
    document.writeln("  </div>")
}
var util = {
    init: function () {
        $('.select .option-list').perfectScrollbar();
        $('.select-tree .option-list').perfectScrollbar();
    },
    indexInit: function () {
        $(document).on('focus', '.select, .select-tree', function () {
            $(this).addClass('focus');
        }).on('blur', '.select, .select-tree', function () {
            $(this).removeClass('focus');
        }).on('click', '.select li', function (e) {
            e.stopPropagation();
            $(this).parents('.select').find('p').text($(this).text());
            $(this).parents('.select').blur();
        }).on('click', '.select-tree li > div > i', function (e) { //树形下拉菜单点击展开隐藏箭头事件
            e.stopPropagation();
            $(this).parent().siblings('ul').toggle();
            $(this).toggleClass('icon-uniE61D3').toggleClass('icon-uniE61C3');
        });
    },
    /**
     * 将json转换成字符串
     * @param {JSON} data    json对象
     */
    j2s: function (data) {
        try {
            return JSON.stringify(data);
        } catch (ex) {
            return "";
        }
    },
    /**
     * 将字符串转换成json
     * @param {string} str    字符串
     */
    s2j: function (str) {
        try {
            return JSON.parse(str);
        } catch (ex) {
            return {};
        }
    },
    /**
     * 验证是否是手机号
     * @param {string} value    手机号
     */
    checkMobile: function (value) {
        try {
            //首先要保证全部是数字
            if (!/\d{1,11}$/.test(value)) {
                return false;
            }
            //解决了当输入框复制进来一组139 1234 5678这样的号码时的校验失败的问题
            value = value.replace(/[^\d]/g, '');
            return value.match(/^((\+?86)|(\(\+86\)))?1\d{10}$/);
        } catch (ex) {
            return false;
        }
    },
    /**
     * 验证数字账户
     * @param {string} value    数字账户，全部为数字并且长度<=11
     */
    checkNumAccount: function (value) {
        try {
            return value.length <= 11 && /\d{1,11}$/.test(value);
        } catch (ex) {
            return false;
        }
    },
    /**
     * 验证是否是account账号
     * @param {string} value    账号
     */
    checkAccount: function (value) {
        try {
            return /^\d{8}$/.test(value);
        } catch (ex) {
            return false;
        }
    },
    /**
     * 验证是否是邮箱
     * @param {string} value    邮箱地址
     */
    checkEmail: function (value) {
        try {
            return value.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        } catch (ex) {
            return false;
        }
    },
    /**
     * 根据输入的密码，判断密码强度
     * @param {Object} that        密码控件
     */
    checkPassword: function (val) {
        var pwdLevel = 0;
        var strongRegex = new RegExp("^(?=.{6,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
        var mediumRegex = new RegExp("^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
        var enoughRegex = new RegExp("(?=.{6,}).*", "g");
        if (false == enoughRegex.test(val)) {
            pwdLevel = 1;
        } else if (strongRegex.test(val)) {
            pwdLevel = 4;
        } else if (mediumRegex.test(val)) {
            pwdLevel = 3;
        } else {
            pwdLevel = 2;
        }
        return pwdLevel;
    },
    /**
     * 根据输入的密码，判断密码强度
     * @param {Object} that        密码控件
     */
    checkStrong: function (that) {
        var maths, smalls, bigs, corps, cat, num, point;
        var str = $(that).val()
        var len = str.length;
        cat = /.*[\u4e00-\u9fa5]+.*$/
        if (cat.test(str)) return -1;
        cat = /\d/;
        maths = cat.test(str);
        cat = /[a-z]/;
        smalls = cat.test(str);
        cat = /[A-Z]/;
        bigs = cat.test(str);
        corps = util.corpses($(that));
        num = maths + smalls + bigs + corps;

        if (len == 0) {
            point = 0;
        } else if (len <= 6) {
            point = 1;
        } else if (len >= 7 && len <= 9) {
            point = num == 1 || num == 2 ? 2 : 3;
        } else if (len >= 10 && len <= 13) {
            point = num == 1 || num == 2 ? 3 : 4;
        } else {
            return 4
        }

        return point;
    },
    corpses: function (that) {
        var cat = /./g
        var str = $(that).val();
        if (str.length > 0) {
            var sz = str.match(cat)
            for (var i = 0; i < sz.length; i++) {
                cat = /\d/;
                maths_01 = cat.test(sz[i]);
                cat = /[a-z]/;
                smalls_01 = cat.test(sz[i]);
                cat = /[A-Z]/;
                bigs_01 = cat.test(sz[i]);
                if (!maths_01 && !smalls_01 && !bigs_01) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    },
    /**
     * 保存cookie
     * @param {string} name        键名
     * @param {Object} value    值
     */
    setStorage: function (name, value) {
        $.cookie(name, value, {expires: 7, path: "/"});
    },
    setStorage: function (name, value, domain) {
        $.cookie(name, value, {expires: 7, path: "/", domain: domain});
    },
    /**
     * 读取cookie
     * @param {string} name        键名
     */
    getStorage: function (name) {
        return $.cookie(name);
    },
    /**
     * 移除cookie
     * @param {string} name        键名
     */
    removeStorage: function (name) {
        return $.cookie(name, null);
    },
    removeStorage2: function (name, domain) {
        $.cookie(name, "", {
            expires: 7, path: '/', domain: domain
        });
    },
    /**
     * ajax方法
     * @param {string} url        ajax页面地址
     * @param {Object} data        ajax传递参数
     * @param {boolean} async    是否异步加载
     * @param {Object} obj        需要执行ajax的对象
     * @param {Object} callback    执行成功后的回调函数
     */
    ajax: function (url, data, async, obj, callback) {
        var that = this;
        this.gd = function (data) {
            if (data.data != undefined) {
                data.data = util.j2s(data.data);
            }
            return data;
        };

        if (obj.ajax) //如果已经有ajax正在执行操作，则不再响应正在执行的ajax
            obj.ajax.abort();
        obj.ajax = $.ajax({
            url: url,
            data: that.gd(data),
            type: 'POST',
            timeout: 60 * 1000,//有时候会存在超时
            async: async,
            beforeSend: function () {
                //console.log(data);
            }
        }).done(function (html) {
            var data = util.j2s(util.s2j($.trim(html))) == "{}" ? html : util.s2j($.trim(html));
            if (data.result == 1007 && __user.uid > 0) { //票据丢失
                if (typeof(pc) != "undefined") {
                    pc.logout();
                } else if (typeof(mc) != "undefined") {
                    mc.logout();
                } else {
                    location.href = __config.loginUrl;
                }
            } else {
                callback && callback.call(obj, data);
            }
        }).fail(function () {
            //console.log("ajax失败");
        }).always(function () {
            //console.log("ajax完成");
        });
    },
    /**
     * jsonp方法
     * @param {string} url        jsonp页面地址
     * @param {Object} data        jsonp传递参数
     * @param {boolean} async    是否异步加载
     * @param {Object} obj        需要执行jsonp的对象
     * @param {Object} callback    执行成功后的回调函数
     */
    jsonp: function (url, data, async, obj, callback) {
        if (obj.ajax)
            obj.ajax.abort();
        obj.ajax = $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            timeout: 60 * 1000,//有时候会存在超时
            jsonp: 'callback',
            data: data,
            async: async,
            beforeSend: function () {
                //console.log(data);
            }
        }).done(function (html) {
            callback && callback.call(obj, html);
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(XMLHttpRequest.status);
            //console.log(XMLHttpRequest.readyState);
            //console.log(textStatus);
            //if (errorThrown || textStatus == "error" || textStatus == "parsererror" || textStatus == "notmodified") {
            //    console.log("请求数据时发生错误！");
            //}
            //if (textStatus == "timeout") {
            //    console.log("请求数据超时！");
            //}
        }).always(function () {
            //console.log("jsonp完成");
        });
    },
    /**
     * 附件上传
     */
    fileUpload: function () {
        var rs = {};
        var filedata = new FormData($('#frm_upload')[0]);
        $.ajax({
            url: "./php/upload.php",
            type: 'POST',
            data: filedata,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                //console.log(filedata);
            },
            success: function (html) {
                rs = util.s2j(html);
            },
            error: function () {
                //console.log("上传ajax报错");
            }
        });
        return rs;
    },
    /**
     * 根据条件，得到数组中的元素对象的索引
     * @param {Array} arr        数组
     * @param {string} key        对象的键名
     * @param {Object} value    对象的键值
     */
    arr_getIndex: function (arr, key, value) {
        var result = -1;
        $.grep(arr, function (cur, i) {
            if (cur[key] == value) {
                result = i;
            }
        });
        return result;
    },
    /**
     * 根据条件，得到数组中的元素对象
     * @param {Array} arr       数组
     * @param {String} key      对象的键名
     * @param {String} value    对象的键值
     */
    arr_getItem: function (arr, key, value) {
        var result = {};
        $.grep(arr, function (cur, i) {
            if (cur[key] == value) {
                result = cur;
            }
        });
        return result;
    },
    /**
     * 根据条件，删除数组中的元素对象
     * @param {Object} arr        数组
     * @param {string} key        对象的键名
     * @param {Object} value    对象的键值
     */
    arr_remove: function (arr, key, value) {
        return $.grep(arr, function (cur, i) {
            return cur[key] != value;
        });
    },
    /**
     * 将时间戳转换为时间显示
     * @param {float} unixTime    时间戳
     * @param {int} dateType    显示的时间类型:1.yyyy-MM-dd HH:mm; 2.MM-dd HH:mm; 3.yyyy-MM-dd; 4.MM-dd;
     * @param {int} size 尺寸
     */
    unixToDate: function (datetime, dateType, size) {
        size = size || 1;
        if (datetime == undefined || datetime == null) return "";

        var unixTime, year, month, day, hours, minute, second, time;
        unixTime = new Date(datetime * size);
        year = unixTime.getFullYear();
        month = unixTime.getMonth() + 1 < 10 ? "0" + (unixTime.getMonth() + 1) : unixTime.getMonth() + 1;
        day = unixTime.getDate() < 10 ? "0" + unixTime.getDate() : unixTime.getDate();
        hours = unixTime.getHours() < 10 ? "0" + unixTime.getHours() : unixTime.getHours();
        minute = unixTime.getMinutes() < 10 ? "0" + unixTime.getMinutes() : unixTime.getMinutes();
        second = unixTime.getSeconds() < 10 ? "0" + unixTime.getSeconds() : unixTime.getSeconds();

        switch (dateType) {
            case 1: //yyyy-MM-dd HH:mm
                return year + "-" + month + "-" + day + " " + hours + ":" + minute;
            case 2: //MM-dd HH:mm
                return month + "-" + day + " " + hours + ":" + minute;
            case 3: //yyyy-MM-dd
                return year + "-" + month + "-" + day;
            case 4: //MM-dd
                return month + "-" + day;
            default: //yyyy-MM-dd HH:mm:ss
                return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;
        }
    },
    /**
     * 日期 转换为 Unix时间戳
     * @param    {String}    日期格式: yyyy-MM-dd HH:mm:ss
     * @return    {int}        时间戳
     */
    dateToUnix: function (string) {
        var f = string.split(' ', 2);
        var d = (f[0] ? f[0] : '').split('-', 3);
        var t = (f[1] ? f[1] : '').split(':', 3);
        return (new Date(
            parseInt(d[0], 10) || null, (parseInt(d[1], 10) || 1) - 1,
            parseInt(d[2], 10) || null,
            parseInt(t[0], 10) || null,
            parseInt(t[1], 10) || null,
            parseInt(t[2], 10) || null
        )).getTime();
    },
    /**
     * 日期比较
     * @param {string} sd    起始时间;
     * @param {string} ed    结束时间;
     * @param {string} dateType    加减的日期类型: "day"; "week"; "month"; "year";
     */
    dateCompare: function (sd, ed) {
        var start = new Date(sd.replace(/-/g, "/"));
        var end = new Date(ed.replace(/-/g, "/"));
        return end > start;
    },
    /**
     * 判断浏览器版本
     */
    getBrowser: function () {
        var Sys = {
            browser: "未知",
            verson: 0
        };
        var ua = window.navigator.userAgent.toLowerCase();

        // 首先判断edge
        var re = /(edge).*?([\d.]+)/;
        var m = ua.match(re);

        // 非edge的场合
        if (!m) {
            // ie，firefox，chrome，opera，safari判断
            re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/;
            m = ua.match(re);
        }

        // ie 11判断
        if (ua.indexOf("trident") > -1 && ua.indexOf("rv") > -1) {
            Sys.browser = "ie";
            Sys.verson = 11;
        }

        // 常用浏览器的场合
        if (m) {
            Sys.browser = m[1].replace(/version/, "safari");
            Sys.verson = m[2];

            // chrome内核
            if (Sys.browser === "chrome") {
                var external = window.external;
                var appVersion = window.navigator.appVersion;
                function _mime(option, value) {
                    var mimeTypes = navigator.mimeTypes;
                    for (var mt in mimeTypes) {
                        if (mimeTypes[mt][option] == value) {
                            return true;
                        }
                    }
                    return false;
                }

                // 搜狗
                if (external && "SEVersion" in external) {
                    Sys.browser = "搜狗";
                } else if (external && "LiebaoGetVersion" in external) {
                    Sys.browser = "猎豹";
                } else if (/QQBrowser/.test(appVersion)) {
                    Sys.browser = "qq";
                } else if (/Maxthon/.test(appVersion)) {
                    Sys.browser = "遨游";
                } else if (/TaoBrowser/.test(appVersion)) {
                    Sys.browser = "淘宝";
                } else if (/BIDUBrowser/.test(appVersion)) {
                    Sys.browser = "百度";
                } else if (/UBrowser/.test(appVersion)) {
                    Sys.browser = "uc";
                } else if (_mime("type", "application/vnd.chromium.remoting-viewer")) {
                    Sys.browser = "360极速版";
                }
            }
        }

        return Sys;
    },
    /**
     * 提示框(手机端H5)
     */
    message: function (message, _type) {
        var type = "";
        var iconClass = "";
        switch (_type) {
            case "primary":
                type = "primary";
                break;
            case "info":
                type = "info";
                iconClass = "uniE6062";
                break;
            case "danger":
                type = "danger";
                iconClass = "uniE6062";
                break;
            case "success":
                type = "success";
                iconClass = "uniE60F2";
                break;
            case "warning":
                type = "warning";
                iconClass = "uniE6062";
                break;
            default:
                type = "defalut";
                break;
        }
        var iconHtml = iconClass != "" ? '<i class="icon-' + iconClass + '"></i>' : '';
        var template = '<div class="messager messager-' + type + '" style="display:none"><div class="messager-content">' + iconHtml + message + '</div><div class="messager-actions"><button type="button" class="close action">×</button></div></div>';
        $("body").append(template).find(".messager").fadeIn(500);
        $(".messager-actions .close").click(function () {
            $(this).parent().parent().fadeOut(100, function () {
                $(this).remove();
            });
        });
        setTimeout(function () {
            $(".messager").fadeOut(1000, function () {
                $(this).remove()
            });
        }, 1000);
    },
    /**
     * 获取焦点事件
     * @param {Object} that    控件
     * @param {string} str    提示字符串
     */
    getFocus: function (that, str) {
        if ($(that).val() == str) {
            $(that).val("");
            $(that).removeClass('color-999').addClass('color-000');
        }
    },
    /**
     * 失去焦点事件
     * @param {Object} that    控件
     * @param {string} str    提示字符串
     */
    getBlur: function (that, str) {
        if ($.trim($(that).val()) == "") {
            $(that).val(str);
            $(that).removeClass('color-000').addClass('color-999');
        }
    },
    /**
     * 初始化顶部Banner区域
     */
    initTopBanner: function (itemList, vm) {
        $('header').topbar({
            appName: itemList.appName,
            useAppList: itemList.useAppList,
            companyName: __user.companyName,
            userImg: __user.picture,
            isSuperAdmin: __user.superAdmin,
            msgCount: vm.newMsgCount,
            homeURL: __config.moaUrl + "/ui/homepage/",
            msgURL: __config.messageUrl + "/ssdbSessInit.php",
            userCenterURL: __config.moaUrl + "/ssdbSessInit.php?type=2",
            companyCenterURL: __config.moaUrl + "/ssdbSessInit.php?type=1",
            addressListURL: __config.addressUrl + "/ssdbSessInit.php",
            appList: vm.appList,
            token: __user.member_token,
            ticket: __user.ticket,
            useAddressList: false,
            useAppSet: false,
            backHome: function () {
                vm.openPage(itemList.routerName);
            },
            logout: function () {
                vm.logout();
            }
        });
    },
    /*start以下两个跳转方法在下面页面用到：[homePage->homepage.js],[personCenter->index.js],[managerCenter->index.js]  start*/
    /**
     * 跳转应用
     * @param {string} aUrl    应用地址
     * @param {int} id        应用ID
     */
    gotoApp: function (link, id, isTrial) {
        var trial = "";
        if (isTrial != undefined && isTrial == 4) {
            trial = "&isTrial=1";
        }
        window.open(link + "?member_token=" + __user.member_token + "&ticket=" + __user.ticket + trial);
        /*if((link.indexOf(".php")>1)
         || (link.indexOf(".jsp")>1)
         || (link.indexOf(".aspx")>1)){
         window.open(link + "?member_token=" + __user.member_token + "&ticket=" + __user.ticket);
         }else{
         var url = "";
         if (id == 1011 || id == 1012) {
         url = link + "/soaredirect.aspx?member_token=" + __user.member_token + "&ticket=" + __user.ticket;
         } else if (id == 10014) {
         url = link + "/direct/login.ashx?member_token=" + __user.member_token + "&ticket=" + __user.ticket;
         } else if (id == 10051) {
         url = link + "/ssdbSessInit.php?type=11&member_token=" + __user.member_token + "&ticket=" + __user.ticket;
         } else if (id == 1010 || id == 1014 || id == 1015) {
         url = link + "/ssdbSessInit.jsp?member_token=" + __user.member_token + "&ticket=" + __user.ticket;
         }
         else if(id == 10026){
         url = link + "?member_token=" + __user.member_token + "&ticket=" + __user.ticket;
         }else {
         url = link + "/ssdbSessInit.php?member_token=" + __user.member_token + "&ticket=" + __user.ticket;
         }
         window.open(url);
         }*/
    },
    /**
     * 跳转到其他应用
     * @param {int} op    应用编号: 1.管理中心; 2.个人中心; 3.通讯录; 4.
     */
    gotoOtherApp: function (op) {

        var url = "";
        if (op < 3) {
            url = __config.moaUrl + "/ssdbSessInit.php?type=" + op;
        }
        else {
            url = __config.addressUrl + "/ssdbSessInit.php";
        }

        if (url.indexOf('?') > 0) {
            url = url + "&member_token=" + __user.member_token + "&ticket=" + __user.ticket;
        } else {
            url = url + "?member_token=" + __user.member_token + "&ticket=" + __user.ticket;
        }

        window.open(url);
    }
    /*end以下两个跳转在：homePage,personCenter,managerCenter  end*/
};
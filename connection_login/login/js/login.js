/**
 * Created by admin on 2018/2/1.
 */
var login = {
        $id: "login",
        validateCode: '',//图片验证码
        codes: '',//验证码
        baseInfo: {cid: 0, type: 3, account: '', password: '', ipAddress: "", codeKey: "", verifyCode: ""},
        companyList: [],//账号对应的空间
        isRemember: false,
        codeShow: false, //第一次登录不显示验证码
        flag: 0,//给提示语做判断用 0#无弹出层 1#有弹出层
        statusFlag: -1,    //用户登录激活状态
        userId: 0,         //用户ID
        imageKey: "",
        appId: "13001",
        /**
         * 检查用户是否已登陆
         */
        checkLogin: function () {
            // var token = util.getStorage("ms_member_token");
            // var cid = util.getStorage("ms_cid");
            // if (token != undefined && cid != undefined && token.length > 0 && cid != 0) {
            //     location.href = __selfConfig.moaUrl + "/ssdbSessInit.php?type=0&cid=" + cid + "&member_token=" + token + "&ticket=123456789";
            // }
        },
        /**
         * 登陆
         */
        btnLogin: function () {
            if (login.imageKey != "") {
                login.codes = $("#txtVerifyCode").val().trim();
                var data = {imageCodeKey: login.imageKey, verifyCode: login.codes, case: 2};
                $.getJSON(__selfConfig.baseUrl + "/auth/checkImageCode", data, function (d) {
                    if (d.code == 0) {
                        $('input').eq(3).next().next().addClass('hidden');
                        login.login();
                        return true;
                    } else {
                        $('input').eq(3).next().next().removeClass('hidden').html('* 验证码输入有误！');
                        return false;
                    }
                });
            } else {
                login.login();
            }

        },
        login: function () {
            if (!login.check_value('account')) return;
            if (!login.check_value('password')) return;
            //if (login.codeShow && !login.check_value('code')) return;

            if (login.imageKey != "") {
                login.codes = $("#txtVerifyCode").val().trim();
            }

            $(this).attr({'data-toggle': '', 'data-target': ''});
            var browserInfo = util.getBrowser();
            var dataParam = {
                userName: login.baseInfo.account,
                password: login.baseInfo.password,
                appId: login.appId,
                codeKey: login.imageKey,
                verifyCode: login.codes,
                browser: browserInfo.browser
            };

            //这里还是要用cookie，否则页面刷新的时候会将login对象刷没了
            util.setStorage("account", login.baseInfo.account);
            //util.setStorage("specialCode", login.baseInfo.password);
            util.setStorage("ms_type", login.baseInfo.type);
            $.ajax({
                type: "POST",
                url: __selfConfig.baseUrl + "/auth",
                data: util.j2s(dataParam),
                success: function (d) {
                    if (d.code == 0) { //登录成功
                        var data = d.data;
                        if (login.isRemember) {
                            util.setStorage("isRemember", '1');
                            util.setStorage("account", login.baseInfo.account);
                        } else {
                            util.setStorage("isRemember", '0');
                            util.setStorage("account", "");
                        }
                        $('.modal-backdrop').hide();

                        login.statusFlag = data.statusFlag;    //用户激活状态
                        login.userId = data.userId;               //用户ID

                        //如果用户状态未激活跳转到修改密码页面进行密码修改
                        if (login.statusFlag == 0) {
                            location.href = __selfConfig.moaUrl + "/#!/updatePwd?oldPassword=" + login.baseInfo.password + "&statusFlag=" + login.statusFlag + "&userId=" + login.userId;
                        } else {
                            util.setStorage("ms_member_token", data.token);
                            util.setStorage("ms_emailActive", data.emailActive);
                            //处理多公司选择
                            var companyList = data.companyList;
                            if (companyList.length > 0) {
                                login.fillCompanyList(companyList, data);
                            } else {
                                location.href = __selfConfig.loginUrl + 'register?a=1&s=0&u=' + login.userId + '&employeeId=0';
                            }
                        }

                    }
                    // else if (d.code == 110350 && login.flag == 1) { //公司已停用    且   有弹出层
                    //     $('#loginZone').next().removeClass('hidden').html('* 该公司已被停用，当前无法登录');
                    //     return;
                    // }
                    else {
                        var str = d.detail;
                        $('.pwd').removeClass('hidden').html('* ' + str);
                        login.baseInfo.password = "";
                        login.codes = "";
                        login.changeValidateCode();
                        login.codeShow = true;
                        login.openValidateCode();
                    }

                },
                contentType: "application/json"
            });

        },
        //选择空间
        choose: function () {
            $('#loginZone').next().removeClass('hidden').html('');//清除所有该label的样式
            login.baseInfo.cid = $(this).attr('cid');
            $('.selectsk p').text($(this).attr('name'));
        },
        cancelChooseSk: function () {
            login.baseInfo.cid = 0;
            $("#chooseSK").addClass("fade").hide();
        },

        fillCompanyList: function (data, user) {
            login.companyList = data;
            var content = [];
            if (data.length == 1) {

                login.baseInfo.cid = data[0].companyId;
                util.setStorage("ms_cid", login.baseInfo.cid);
                var checkState = login.checkCompanyState(data[0]);
                if (!checkState)
                    return;
                if (window.location.href.indexOf("returnUrl") > -1) {
                    window.location.href = window.location.href.split("returnUrl=")[1] + "?cid=" + util.getStorage("ms_cid") + "&token=" + util.getStorage("ms_member_token");
                } else {
                    if ( user.emailActive == false && user.email && user.email.length > 3) {
                        activityEmail(user.email);
                    } else {
                        location.href = __selfConfig.moaUrl + "/ssdbSessInit.php?type=0&cid=" + util.getStorage("ms_cid") + "&member_token=" + util.getStorage("ms_member_token");
                    }

                }
            }
            else {
                for (var i = 0; i < data.length; i++) {
                    var state = "";
                    if (data[i].auditingFlag == "1" || data[i].auditingFlag == "3") {
                        //state = "(审核中)";
                    } else {
                        content.push(' <li title="' + data[i].name + state + '"  data-cid="' + data[i].companyId + '" data-name="' + data[i].name + '">' + data[i].name + state + '</li>');
                    }
                }
                $("#companyList").html(content.join(''));

                if ($("#companyList li").length < 1) {
                    location.href = __selfConfig.loginUrl + 'register?a=1&s=0&u=' + login.userId + '&employeeId=0';
                }

                $("#companyList li").each(function () {
                    $(this).on("click", function () {
                        var cid = $(this).attr("data-cid");
                        if (cid != "null") {
                            var name = $(this).attr("data-name");
                            login.baseInfo.cid = cid;
                            var currentCompany = null;
                            for (var i = 0; i < login.companyList.length; i++) {
                                if (login.companyList[i].name == name) {
                                    currentCompany = login.companyList[i];
                                    util.setStorage("ms_cid", cid);
                                    break;
                                }
                            }
                            var state = login.checkCompanyState(currentCompany);
                            if (state)
                                if (user.emailActive == false && user.email && user.email.length > 3) {
                                    activityEmail(user.email);
                                } else {
                                    login.chooseLogin();
                                }
                            else {

                            }
                        }
                    });
                });
                $("#chooseSK").removeClass("fade").show();
            }
        },
        chooseLogin: function () {
            //跳转新平台
            //location.href = "http://inlet.viphrm.com";
            if (window.location.href.indexOf("returnUrl") > -1) {
                window.location.href = window.location.href.split("returnUrl=")[1] + "?cid=" + util.getStorage("ms_cid") + "&token=" + util.getStorage("ms_member_token");
            } else {
                location.href = __selfConfig.moaUrl + "/ssdbSessInit.php?type=0&cid=" + util.getStorage("ms_cid") + "&member_token=" + util.getStorage("ms_member_token");
            }
        },
        checkCompanyState: function (company) {
            var state = true;
            /** 认证状态:1#等待审核|2#审核通过|3#审核失败 */
            var auditingFlag = parseInt(company.auditingFlag);

            switch (auditingFlag) {
                case 1:
                    location.href = __selfConfig.loginUrl + 'register?a=1&s=3&u=' + login.userId + '&c=' + company.companyId;
                    state = false;
                    break;
                case  3:
                    location.href = __selfConfig.loginUrl + 'register?a=1&s=4&u=' + login.userId + '&c=' + company.companyId;
                    state = false;
                    break;
            }

            if (company.statusFlag && parseInt(company.statusFlag) == 1) {
                $('input').eq(1).next().removeClass('hidden').html('* 该公司已被停用，当前无法登录！');
                return false;
            }
            /**
             * 申请类型|审核类型:1#moa创建公司|2#moa变更公司|3#crm创建公司|4#crm变更公司|5#实名认证 | 99#基础数据
             */
            var requestType = company.requestType;
            if (requestType == "1" || requestType == "3") {
                if (auditingFlag == "1") {
                    location.href = __selfConfig.loginUrl + 'register?a=1&s=1&u=' + login.userId + '&c=' + company.companyId;
                    state = false;
                }
                if (auditingFlag == "3") {
                    location.href = __selfConfig.loginUrl + 'register?a=1&s=2&u=' + login.userId + '&c=' + company.companyId;
                    state = false;
                }
            }
            if (company.employeeStatus == "2" || company.employeeStatus == "8" || company.employeeStatus == "9") {
                location.href = __selfConfig.loginUrl + 'register?a=1&s=0&u=' + login.userId + '&employeeId=' + company.employeeId;
                state = false;
            }
            return state;
        },
        /**
         * 非空及格式验证
         * @param {string} str    验证项目
         */
        check_value: function (str) {
            if (str == 'account') {
                login.baseInfo.account = $("#txtAccount").val();
                login.baseInfo.account = $.trim(login.baseInfo.account).replace(/\s+/g, "");
                if (login.baseInfo.account == "") {
                    $('input').eq(0).next().removeClass('hidden').html('* 请输入账号！');
                    return false;
                } else if (util.checkEmail(login.baseInfo.account)) {//验证邮箱
                    login.baseInfo.type = 1;
                } else if (util.checkMobile(login.baseInfo.account)) {//验证手机号
                    login.baseInfo.type = 2;
                } else if (util.checkNumAccount(login.baseInfo.account)) {//验证是不是数字帐号
                    login.baseInfo.type = 6;
                } else {
                    login.baseInfo.type = 4;
                }
                $('input').eq(0).next().addClass('hidden');
            } else if (str == 'password') {
                login.baseInfo.password = $("#txtPassword").val();
                login.baseInfo.password = $.trim(login.baseInfo.password).replace(/\s+/g, "");
                if (login.baseInfo.password == '') {
                    $('input').eq(1).next().removeClass('hidden').html('* 请输入密码！');
                    return false;
                }
                $('input').eq(1).next().addClass('hidden');
            } else if (str == 'code') {
                login.codes = $.trim($("#txtVerifyCode").val()).replace(/\s+/g, "");
                if (login.codes == '') {
                    $('input').eq(3).next().next().removeClass('hidden').html('* 请输入验证码！');
                    return false;
                } else if (login.codes.length < 4) {
                    $('input').eq(3).next().next().removeClass('hidden').html('* 验证码格式不正确！');
                    return false;
                } else {
                    return login.checkCode(login.codes)
                }
            }
            return true;
        }
        ,
        /**
         * 刷新图片验证码
         */
        changeValidateCode: function () {
            login.imageKey = parseInt(Math.random() * 1000000) + 100000;
            $(".acode-info img").attr("src", __selfConfig.baseUrl + "/auth/imageCode?case=2&imageCodeKey=" + login.imageKey);
        }
        ,
        openValidateCode: function () {
            $(".clearfix").show();
        }
        ,
        /**
         * 验证验证码是否正确
         * @param {string} value    验证码
         */
        checkCode: function (value) {
            var data = {imageCodeKey: login.imageKey, verifyCode: value, case: 2};
            $.getJSON(__selfConfig.baseUrl + "/auth/checkImageCode", data, function (d) {
                if (d.code == 0) {
                    $('input').eq(3).next().next().addClass('hidden');
                    return true;
                } else {
                    $('input').eq(3).next().next().removeClass('hidden').html('* 验证码输入有误！');
                    return false;
                }
            });
        }
        ,


        init: function () {
            /* 登录 */
            $("#btnLogin").on("click", function () {
                login.btnLogin();
            });
            $(".login-info").keyup(function (e) {
                if (e.keyCode == 13) {
                    login.btnLogin();
                }
            });
            /*注册链接*/
            $(".btn-res").click(function () {
                window.location.href = __selfConfig.moaUrl + "/#!/register";
            });

        }
    }
    ;


$(function () {
    login.init();
    login.checkLogin();
});
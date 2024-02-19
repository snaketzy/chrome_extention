/**注册页面 */
$(function () {
    /**邮件正则 */
    var emailRegExp = /^[\w-.]+@[\w-]+(\.[\w-]+)+$/;
    /**手机正则 */
    var telRegExp = /^[1][\d]{10}$/;
    /**用户密码正则 */
    var isValidRegExp = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]+).{8,20}$/;
    var imageCodeKey;
    var fields = {
        account: checkAccount,
        regUserName: checkUserName,
        regPassword: checkPassword,
        confirmPwd: checkConfirmPwd,
        // verifyCode: checkVerifyCode,
        agreement: checkAgreement
    };

    var urlParam = $.moa.formatUrlParams();
    var hasSourceAppCode = urlParam && urlParam.sourceAppCode == "20032";
    if (!hasSourceAppCode) {
        $(".header-btn").html('<a href="/" class="btn">登录</a>');
        $(".service-file").removeClass("hide");
        $(".private-file").addClass("hide");
        $(".register-file").addClass("hide");
    } else {
        $(".header-logo").addClass("xiang-ma").attr("href", "javascript:void(0);");
        $(".footer-xiang-ma").addClass("show");
        $(".footer").addClass("hide");
        $(".service-file").addClass("hide");
        $(".private-file").removeClass("hide");
        $(".register-file").removeClass("hide");
    }
   
    /**表单各字段验证 */
    $('.register-form').formCheck(fields);

    //重新设置的验证事件，因为safari中checkbox不支持focus事件
    $('[name=agreement]').click(function () {
        checkAgreement(window.formValidate, fields);
    });

    /**获取图片验证码 */
    $('.js-verify-img').click(function () {
        /**清空图形验证码 */
        $("[name=imgVerifyCode]").val("");
        imageCodeKey = parseInt(Math.random() * 1000000) + 100000;
        $(this).attr("src", moaConfig.newImageCodeUrl + "/home-server/auth/code/reg/get/img?account=" + imageCodeKey);
    });

    /**账号改变时，重置验证码输入框校验状态和值，禁用下一步按钮 */
    $('.form-control[name=account]').on("keyup", function() {
        $('.register-form').resetVerifyCodeStatus("");
    })

    /**表单验证错误及验证码框为空，则禁用下一步 */
    $('[name=verifyCode]').on("keyup", function() {
        if ($(this).val().length === 4) {
            $('.btn[formBind]').removeClass('btn-disabled');
        } else {
            $('.btn[formBind]').addClass('btn-disabled');
        }
        $('.register-form').formCheck(fields)
        checkAgreement(window.formValidate, fields);
    })

    /**初始化请求图形验证码 */
    $('.js-verify-img').click();


    /**获取验证码 */
    $('.js-send-verify').click(function () {
        var params, isValid, count = 10;
        var $this = $(this);
        var formTips = $this.parents('.form-group').find('.form-tips');
        var accountVal = $('.form-control[name=account]').val();
        var imgValue = $('.form-control[name=imgVerifyCode]').val();

        // 按钮为禁用状态，则不往下检测
        if ($this.hasClass('btn-disabled')) {
            return false;
        }

        /**重置验证码输入框校验状态和值 */
        $('.register-form').resetVerifyCodeStatus("");


        var imgDomTips = $(".js-verify-img").parents(".form-group").find('.form-tips');
        if (!imgValue || !imgValue.trim()) {           
            imgDomTips.html('请输入图形验证码').show();
            return false;
        } else {
            imgDomTips.hide();
        }

        if (!hasSourceAppCode) {
            if (emailRegExp.test(accountVal)) {
                isValid = true;
                params = { type: 1, address: accountVal, subject: '欢迎注册VIPHRM平台', content: mailTemp.regMail, imageCode: imgValue, case: 1, imageCodeKey: imageCodeKey };
            } else if (telRegExp.test(accountVal)) {
                isValid = true;
                params = { type: 2, mobile: accountVal, content: '【VIPHRM】您的验证码为{code}，正在进行注册操作，请勿将验证码告知他人。', imageCode: imgValue, case: 1, imageCodeKey: imageCodeKey };
            } else {
                isValid = false;
            }
        } else {
            if (emailRegExp.test(accountVal)) {
                isValid = true;
                params = "?type=2&appId=20032&case=1&userName=" + accountVal;
            } else if (telRegExp.test(accountVal)) {
                isValid = true;
                params = "?type=1&appId=20032&case=1&userName=" + accountVal;
            } else {
                isValid = false;
            }
        }

        // 账号不合法，则不往下检测
        if (!isValid) {
            formTips.html('请检查账号是否正确').show();
            return false;
        }

        // 倒计时
        formTips.hide();
        $this.html(count + '秒后重试').addClass('btn-disabled');
        var countdown = setInterval(function () {
            count--;
            $this.html(count + '秒后重试');

            if (count < 1) {
                $this.html('获取验证码').removeClass('btn-disabled');
                clearInterval(countdown);
            }
        }, 1000);

        if (hasSourceAppCode) {
            $.ajax({
                type: 'get',
                url: moaConfig.baseUrl + '/auth/commonCode' + params,
                timeout: 60 * 1000,
                async: false,
                success: function (res) {
                  if (!parseInt(res.code)) {
                    formTips.hide();
                  } else {
                    formTips.html(res.detail).show();
                  }
                },
                error: function () {
                  formTips.html('验证码发送失败').show();
                }
            });
        } else {
            $.ajax({
                type: 'post',
                url: '/api/register',
                dataType: 'json',
                data: { action: 'sendVerifyCode', data: JSON.stringify(params) },
                success: function (res) {
                    if (res.result) {
                        imgDomTips.html(res.detail).show();
                        $('.js-verify-img').click();
                    } else {
                        res.resultStatus ? formTips.html(res.result).show() : formTips.hide() ;
                    }                    
                },
                error: function () {
                    formTips.html('验证码发送失败').show();
                }
            });
        }
    });

    /**提交表单，校验验证码 */
    $('.btn[formBind]').click(function () {
        if ($('.btn[formBind]').hasClass('btn-disabled')) {
            return false;
        }
        /**提交前校验各字段合规性，防止用户规避 */
        $('.register-form').formCheck(fields);
        $('.btn[formBind]').removeClass('btn-disabled');
        checkVerifyCode(window.formValidate, fields);
    });


    /**提交表单，进入下一步 */
    function nextStep() {
       
        var formData = $('.register-form').serializeJson();
        $.ajax({
            type: 'post',
            url: '/api/register',
            dataType: 'json',
            data: {
                action: 'registerUser',
                data: JSON.stringify({
                    account: formData.account,
                    realName: formData.regUserName,
                    userPwd: formData.regPassword,
                    code: formData.verifyCode
                })
            },
            success: function (res) {
                if (res.result.success) {
                    window.location.href = '/app/join.html?uid=' + res.result.userId + "&account=" + formData.account + (hasSourceAppCode ? "&sourceAppCode=20032" : "");
                } else {
                    /**提交异常 */
                    $('.js-error-popup').show();
                    $('.js-error-popup').find('.popup-body-inner').html(res.result.resultView || res.detail);
                }
            }
        });
    }

    /**显示'服务条款'弹出框 */
    $('.form-check').on('click', '.service-file', function () {
        $('.agree-popup').show();
    });

    // 关闭'服务条款'弹出框
    $('.popup-close').click(function () {
        $('.agree-popup').hide();
    });

    // 显示'注册协议'弹出框
    $('.form-check').on('click', '.register-file', function () {
        $('.register-popup').show();
    });

    // 关闭'注册协议'弹出框
    $('.popup-close').click(function () {
        $('.register-popup').hide();
    });

    /**显示'隐私协议'弹出框 */
    $('.form-check').on('click', '.private-file', function () {
        $('.private-popup').show();
    });

    /**关闭'隐私协议'弹出框 */
    $('.popup-close').click(function () {
        $('.private-popup').hide();
    });

    /**关闭错误提示框 */
    $('.js-error-popup').on('click', '.btn-primary', function () {
        $('.js-error-popup').hide();
        /**重新获取【图形验证码】 */
        $('.js-verify-img').click();
        /**清空图形验证码，清空验证码，清空密码，清空确认密码，清空同意checkbox，禁用下一步 */
        $('.register-form').find('[name=imgVerifyCode]').val("");
        $('.register-form').find('[name=verifyCode]').val("");
        $('.register-form').find('[name=regPassword]').val("");
        $('.register-form').find('[name=confirmPwd]').val("");
        resetNextStep()
    });

    /**重置表单 */
    $('.js-form-reset').click(function () {
        $('.register-form').children('[validate]').attr('validate', 'false');
        $('.btn[formBind]').addClass('btn-disabled');
    });

    /**重置【阅读】及【下一步】 */
    function resetNextStep() {
        $('.register-form').find('[name=agreement]').attr("checked", false)
        $('.btn[formBind]').addClass('btn-disabled');
    }

    /**检测用户账号 */
    function checkAccount(fn, fiels) {
        var el = $('.register-form').find('[name=account]');
        var isValid;
        var val = el.val().trim();
        var params = { account: val };

        if (!val.length) {
            fn(el, false, '账号不能为空', fiels);
            return false;
        }

        if (emailRegExp.test(val)) {
            isValid = true;
            params.type = 1;
        } else if (telRegExp.test(val)) {
            isValid = true;
            params.type = 2;
        } else {
            isValid = false;
        }

        fn(el, isValid, '不是有效的邮箱地址或手机号码', fiels);

        if (!isValid) {
            return false;
        }
        
        /**账号正确时，重置验证码的输入框状态 */
        $('.register-form').resetVerifyCodeStatus()

        $.ajax({
            type: 'post',
            url: '/api/register',
            dataType: 'json',
            data: { action: 'checkAccount', data: JSON.stringify(params) },
            success: function (res) {
                fn(el, res.result.success, res.result.resultView, fiels);
            },
            error: function () {
                fn(el, false, '账号检测失败', fiels);
            }
        });
    }

    /**检测用户姓名 */
    function checkUserName(fn, fields) {
        var el = $('.register-form').find('[name=regUserName]');
        var val = el.val().trim();
        var isValid = /^[a-zA-Z\u4e00-\u9fa5]{2,10}$/.test(val);

        if (!val.length) {
            fn(el, false, '姓名不能为空', fields);
            return false;
        }

        fn(el, isValid, '姓名只能是2-10个汉字或字母', fields);
    }

    /**检测用户密码 */
    function checkPassword(fn, fields) {
        var el = $('.register-form').find('[name=regPassword]');
        var val = el.val().trim();
        var confirmPwd = $('.form-control[name=confirmPwd]');
        var conformVal = confirmPwd.val().trim();
        var isValid = isValidRegExp.test(val);

        if (!val.length) {
            fn(el, false, '密码不能为空', fields);
            return false;
        }

        fn(el, isValid, '密码为8-20位数字, 字母及特殊字符的任意组合', fields);

        if (conformVal) {
            fn(confirmPwd, (val === conformVal), '两次输入密码不一致', fields);
        }
    }

    // 检测确认密码
    function checkConfirmPwd(fn, fields) {
        var el = $('.register-form').find('[name=confirmPwd]');
        var val = el.val().trim();
        var pwdVal = $('.form-control[name=regPassword]').val().trim();
        fn(el, (val === pwdVal), '两次输入密码不一致', fields);
    }


    // 检测验证码
    function checkVerifyCode(fn, fields) {
        
       var el = $('.register-form').find('[name=verifyCode]');
        var type;
        var val = el.val().trim();
        var account = $('.form-control[name=account]');
        var accountVal = account.val().trim();
        var params = !hasSourceAppCode 
        ? { account: accountVal, code: val } 
        : {userName: accountVal, verifCode: val, appId: "20032", inCase: "1"};
        var url;
        var paramData;

        // 账号不合法，则不继续检测
        if (account.parents('.form-group').attr('validate') !== 'true') {
            fn(el, false, '请检查账号是否正确', fields);
            return false;
        }

        if (!val.length) {
            fn(el, false, '验证码不能为空', fields);
            return false;
        }

        if (val.length !== 4) {
            fn(el, false, '验证码长度错误', fields);
            return false;
        }

        if (emailRegExp.test(accountVal)) {
            type = 1;
        } else if (telRegExp.test(accountVal)) {
            type = 2;
        }
        params.type = type;

        if (hasSourceAppCode) {
            url = moaConfig.baseUrl + "/auth/checkCommonCode";
            paramData = JSON.stringify(params);
            $.ajax({
                type: 'post',
                url: url,
                dataType: 'json',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                data: paramData,
                success: function (res) {
                    fn(el, !parseInt(res.code), res.detail, fields);
                },
                error: function () {
                    fn(el, false, '验证码检测失败', fields);
                }
            });
        } else {
            url = "/api/register";
            paramData = { action: 'checkVerifyCode', data: JSON.stringify(params) };
            $.ajax({
                type: 'post',
                url: url,
                dataType: 'json',
                data: paramData,
                success: function (res) {
                    if(res.resultStatus === 0) {
                        nextStep()
                    } else {
                        /**验证码校验失败重新获取图形验证码 */
                        $('.js-verify-img').click();
                    }
                    fn(el, !parseInt(res.resultStatus), res.result, fields);
                },
                error: function () {
                    fn(el, false, '验证码检测失败', fields);
                }
            });
        }
    }

    /**检测是否同意条款 */
    function checkAgreement(fn, fields) {
        var el = $('.register-form').find('[name=agreement]');
        fn(el, el.is(':checked'), null, fields);
    }
});
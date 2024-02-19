// 忘记密码 - 手机或邮箱找回页面
$(function () {
  var imgCodeKey;
  var uid; // 短信或邮箱验证码校验成功后，才有值
  var emailRegExp = /^[\w-.]+@[\w-]+(\.[\w-]+)+$/;
  var telRegExp = /^[1][\d]{10}$/;

  var urlParam = $.moa.formatUrlParams();
  var hasSourceAppCode = urlParam && urlParam.sourceAppCode == "20032";
  if (!hasSourceAppCode) {
    $(".header-btn").html('<a href="/" class="btn">登录</a>');
  } else {
    $(".header-logo").addClass("xiang-ma").attr("href", "javascript:void(0);");
    $(".footer-xiang-ma").addClass("show");
    $(".footer").addClass("hide");
  }

  // 手机表单验证
  $('.forget-tel-form').formCheck({
    account: checkTelAccount,
    imgVerifyCode: checkImgVerifyCodeForTel,
    msgVerifyCode: checkMsgVerifyCodeForTel
  });

  // 邮箱表单验证
  $('.forget-email-form').formCheck({
    account: checkEmailAccount,
    imgVerifyCode: checkImgVerifyCodeForMail,
    msgVerifyCode: checkMsgVerifyCodeForMail
  });

  // 获取图片验证码
  $('.js-verify-img').click(function () {
    imgCodeKey = parseInt(Math.random() * 1000000) + 100000;
    $(this).attr("src", moaConfig.baseUrl + "/auth/imageCode?case=2&imageCodeKey=" + imgCodeKey);
  });

  // tab 切换
  $('.tab-nav').on('click', 'li', function () {
    var forCls = '.'+$(this).attr('forCls');
    uid = '';   // 表单重置了，uid 也必须重置
    $(this).addClass('active').siblings().removeClass('active');
    $(forCls).show().siblings('.tab-panel').hide();
    $(forCls).find('.js-verify-img').click();
    $(forCls).find('.js-form-reset').click();

  });
  $('.tab-nav').find('.active').click();

  

  // 发送手机或邮件验证码
  $('.js-send-verify').click(function () {
    var type, param, isValid, count = 10;
    var $this = $(this);
    var form = $this.parents('form.tab-panel');
    var formTips = $this.parents('.form-group').find('.form-tips');
    var accountVal = form.find('.form-control[name=account]').val().trim();

    // 按钮为禁用状态，则不往下检测
    if ($this.hasClass('btn-disabled')) {
      return false;
    }

    if (emailRegExp.test(accountVal)) {
      isValid = true;
      type = 2;
    } else if (telRegExp.test(accountVal)) {
      isValid = true;
      type = 1;
    } else {
      isValid = false;
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

    if (!hasSourceAppCode) {
      param = {
        userName: accountVal,
        case: 3,
        type: type
      };
      $.ajax({
        type: 'get',
        url: moaConfig.baseUrl + '/auth/commonCode',
        timeout: 60 * 1000,
        async: false,
        data: param,
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
      param = "?appId=20032&case=3&type=" + type + "&userName=" + accountVal;
      $.ajax({
        type: 'get',
        url: moaConfig.baseUrl + '/auth/commonCode' + param,
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
    }
  });

  // 提交表单，并跳转到设置新密码页面
  $('.btn[formBind]').click(function () {
    if ($(this).hasClass('btn-disabled')) {
      return false;
    }
    var urlParam = uid ? ('?uid=' + uid) : '';
    window.location.href = '/app/reset.html' + urlParam + (hasSourceAppCode ? (urlParam ? "&sourceAppCode=20032" : "?sourceAppCode=20032") : "");
  });

  // 重置表单
  $('.js-form-reset').click(function () {
    var form = $(this).parents('form');
    form.find('.form-group').removeClass('form-status-error').removeAttr('validate');
    form.find('.form-tips').hide();
    form.find('.btn[formBind]').addClass('btn-disabled');
  });

  // 校验手机号码
  function checkTelAccount(fn,fields) {
    var accountField = $('.forget-tel-form').find('[name=account]');
    var val = accountField.val().trim();
    var verifyBtn = accountField.parents('form').find('.js-send-verify');
    var isValid = telRegExp.test(val);
    fn(accountField, isValid, '手机号码格式错误', fields);

    if (!isValid) {
      verifyBtn.addClass('btn-disabled');
      return false;
    }

    // 检测账号是否注册，检测成功后，保存uid
    verifyBtn.removeClass('btn-disabled');
    $.ajax({
      type: 'post',
      url: moaConfig.baseUrl + '/auth/validate/' + val,
      async: false,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      timeout: 60 * 1000,
      data: {},
      success: function (res) {
        var isValidAcc = !parseInt(res.code);
        fn(accountField, isValidAcc, res.detail, fields);

        if (isValidAcc) {
          verifyBtn.removeClass('btn-disabled');
          uid = res.data;
        } else {
          verifyBtn.addClass('btn-disabled');
        }
      },
      error: function () {
        fn(accountField, false, '账号检测失败', fields);
        verifyBtn.addClass('btn-disabled');
      }
    });
  }

  // 校验邮箱格式
  function checkEmailAccount(fn, fields) {
    var accountField = $('.forget-email-form').find('[name=account]');
    var val = accountField.val().trim();
    var verifyBtn = accountField.parents('form').find('.js-send-verify');
    var isValid = emailRegExp.test(val);
    fn(accountField, isValid, '邮箱地址格式错误', fields);

    if (!isValid) {
      verifyBtn.addClass('btn-disabled');
      return false;
    }

    // 检测账号是否注册，检测成功后，保存uid
    verifyBtn.removeClass('btn-disabled');
    $.ajax({
      type: 'post',
      url: moaConfig.baseUrl + '/auth/validate/' + val,
      async: false,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      timeout: 60 * 1000,
      data: {},
      success: function (res) {
        var isValidAcc = !parseInt(res.code);
        fn(accountField, isValidAcc, res.detail, fields);

        if (isValidAcc) {
          verifyBtn.removeClass('btn-disabled');
          uid = res.data;
        } else {
          verifyBtn.addClass('btn-disabled');
        }
      },
      error: function () {
        fn(accountField, false, '账号检测失败', fields);
        verifyBtn.addClass('btn-disabled');
      }
    });
  }

  function checkImgVerifyCodeForTel(fn, fields) {
    return checkImgVerifyCod('.forget-tel-form', fn, fields);
  }
  function checkImgVerifyCodeForMail(fn, fields) {
    return checkImgVerifyCod('.forget-email-form', fn, fields);
  }

  // 校验图形验证码
  function checkImgVerifyCod(formCls,fn, fields) {
    var imgVerifyCode = $(formCls).find('[name=imgVerifyCode]');
    var val = imgVerifyCode.val().trim();

    if (val.length !== 4) {
      fn(imgVerifyCode, false, '验证码格式错误', fields);
      return false;
    }

    var verifyCodeParams = { imageCodeKey: imgCodeKey, verifyCode: val, case: 2 };
    var verifyCodeApi = moaConfig.baseUrl + '/auth/checkImageCode';
    $.getJSON(verifyCodeApi, verifyCodeParams, function (res) {
      fn(imgVerifyCode, (res.code === 0), (res.detail || '验证码检测有误！'), fields);
    });
  }

  function checkMsgVerifyCodeForMail(fn, fields) {
    return checkMsgVerifyCode('.forget-email-form', fn, fields);
  }

  function checkMsgVerifyCodeForTel(fn, fields) {
    return checkMsgVerifyCode('.forget-tel-form', fn, fields);
  }

  // 校验手机或邮箱收到的验证码
  function checkMsgVerifyCode(formCls, fn, fields) {
    var imgVerifyCode = $(formCls).find('[name=msgVerifyCode]');
    var type;
    var val = imgVerifyCode.val().trim();
    var form = imgVerifyCode.parents('form.tab-panel');
    var account = form.find('.form-control[name=account]');
    var accountVal = account.val().trim();
    var params = !hasSourceAppCode 
    ? { userName: accountVal, verifyCode: val }
    : {userName: accountVal, verifCode: val, appId: "20032", inCase: "3"};

    // 账号不合法，则不继续检测
    if (account.parents('.form-group').attr('validate') !== 'true') {
      fn(imgVerifyCode, false, '请检查账号是否正确', fields);
      return false;
    }

    if (val.length < 4) {
      fn(imgVerifyCode, false, '验证码格式错误', fields);
      return false;
    }

    if (emailRegExp.test(accountVal)) {
      type = 2;
    } else if (telRegExp.test(accountVal)) {
      type = 1;
    }
    params.type = type;

    if (hasSourceAppCode) {
      $.ajax({
        type: 'post',
        url: moaConfig.baseUrl + "/auth/checkCommonCode",
        async: false,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        timeout: 60 * 1000,
        data: JSON.stringify(params),
        success: function (res) {
          fn(imgVerifyCode, !parseInt(res.code), res.detail, fields);
  
          // 为了设置新密码页面使用
          $.cookie('verifyCode', val);
          $.cookie('account', accountVal);
        },
        error: function () {
          fn(imgVerifyCode, false, '验证码检测失败', fields);
        }
      });
    } else {
      $.ajax({
        type: 'get',
        url: moaConfig.baseUrl + '/auth/forgetPassword?userName=' + accountVal + '&verifyCode=' + val,
        async: false,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        timeout: 60 * 1000,
        success: function (res) {
          fn(imgVerifyCode, !parseInt(res.code), res.detail, fields);
  
          // 为了设置新密码页面使用
          $.cookie('verifyCode', val);
          $.cookie('account', accountVal);
        },
        error: function () {
          fn(imgVerifyCode, false, '验证码检测失败', fields);
        }
      });
    }
  }
});

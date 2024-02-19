// 新账号激活页面
$(function () {

  var urlParam = $.moa.formatUrlParams();
  var hasSourceAppCode = urlParam && urlParam.sourceAppCode == "20032";
  if (!hasSourceAppCode) {
    $(".header-btn").html('<a href="/" class="btn">登录</a>');
  } else {
    $(".header-logo").addClass("xiang-ma").attr("href", "javascript:void(0);");
    $(".footer-xiang-ma").addClass("show");
    $(".footer").addClass("hide");
  }

  // 检测uid是否存在，不存在跳转到找回密码页面
  $.moa.checkUID(null, '/app/forget.html' + (hasSourceAppCode ? "?sourceAppCode=20032" : ""));

  // 表单验证
  $('.reset-password-form').formCheck({
    oldPassword: checkOldPassword,
    password: checkPassword,
    confirmPwd: checkConfirmPwd
  });

  // 提交表单
  $('.btn[formBind]').click(function () {
    if ($(this).hasClass('btn-disabled')) {
      return false;
    }

    var form = $(this).parents('form');
    var formTips = form.find('.form-tips').eq(-1);
    $.ajax({
      type: 'post',
      url: moaConfig.baseUrl + '/auth/password',
      async: false,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      timeout: 60 * 1000,
      data: JSON.stringify({
        newPassword: form.serializeJson().password,
        oldPassword: form.serializeJson().oldPassword,
        userId: $.moa.formatUrlParams().uid,
        passType: '01'
      }),
      success: function (res) {
        if (!res.code) {
          window.location.href = '/';
        } else {
          formTips.html(res.detail).show();
        }
      },
      error: function () {
        formTips.html('修改密码失败').show();
      }
    });

  });

  // 重置表单
  $('.js-form-reset').click(function () {
    var form = $(this).parents('form');
    form.find('.form-group').removeClass('form-status-error').removeAttr('validate');
    form.find('.form-tips').hide();
    form.find('.btn[formBind]').addClass('btn-disabled');
  });

  // 检测旧密码
  function checkOldPassword(fn,fields) {
    var el = $('.reset-password-form').find('[name=oldPassword]');
    var val = el.val().trim();
    var isValid = val.length > 5 && val.length < 21;
    fn(el, isValid, '密码必须为6-20个字符', fields);
  }

  // 密码新检测
  function checkPassword(fn, fields) {
    var el = $('.reset-password-form').find('[name=password]');
    var val = el.val().trim();
    var isValid = val.length > 5 && val.length < 21;
    var confirmPwd = $('.form-control[name=confirmPwd]');
    var confirmVal = confirmPwd.val().trim();
    var strongItem = $('.password-strong').find('.strong-item');

    fn(el, isValid, '密码必须为6-20个字符', fields);
    isValid ? checkStrong(val, strongItem) : strongItem.removeClass('active');

    if (confirmVal) {
      fn(confirmPwd, (val === confirmVal), '两次输入密码不一致', fields);
    }
  }

  // 检测确认密码
  function checkConfirmPwd(fn, fields) {
    var el = $('.reset-password-form').find('[name=confirmPwd]');
    var val = el.val().trim();
    var pwdVal = $('.form-control[name=password]').val();
    fn(el, (val === pwdVal), '两次输入密码不一致',fields);
  }

  // 密码强度判断
  function checkStrong(val, strongItem) {
    var isDigit = /^[\d]{6,}$/.test(val);
    var isChar = /^[a-zA-Z]{6,}$/.test(val);
    var digitAndChar = /^(?!(\d+|[a-zA-Z]+)$)[a-zA-Z\d]{6,}$/.test(val);    // 只能是数字和字母
    var digitAndSign = /^(?!(\d+|[^a-zA-Z\d])$)[^a-zA-Z]{6,}$/.test(val);   // 只能是数字和特殊字符
    var charAndSign = /^(?!([a-zA-Z]+|[^a-zA-Z\d])$)[^\d]{6,}$/.test(val);  // 只能是字母和特殊字符
    var weak = isDigit || isChar;
    var medium = digitAndChar || digitAndSign || charAndSign;
    var strong = /(?=.*[\d]+)(?=.*[a-zA-Z]+)(?=.*[^a-zA-Z\d]+).{6,}/.test(val); // 只能同时包含数字，字母和特殊字符

    if (weak) {
      strongItem.eq(0).addClass('active');
      strongItem.eq(1).removeClass('active');
      strongItem.eq(2).removeClass('active');
    } else if (medium) {
      strongItem.eq(0).addClass('active');
      strongItem.eq(1).addClass('active');
      strongItem.eq(2).removeClass('active');
    } else if (strong) {
      strongItem.eq(0).addClass('active');
      strongItem.eq(1).addClass('active');
      strongItem.eq(2).addClass('active');
    }
  }
});
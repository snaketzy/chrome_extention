// 登录页面（首页）
$(function () {
  var imgCodeKey;
  var loginSpaceList = [];
  var appId = '13001';
  var LoginData;
  // 获取图片验证码
  $('.verify-img').click(function () {
    var val = $('[name=verifyCode]').val().trim();
    imgCodeKey = parseInt(Math.random() * 1000000) + 100000;
    $(this).attr('src', moaConfig.baseUrl + '/auth/imageCode?case=2&imageCodeKey=' + imgCodeKey);

    if (!val) {
      return false;
    }

    // 校验验证码
    $(this).parents('.form-group').addClass('form-status-error').attr('validate', 'false');
    $(this).parents('.form-group').find('.form-tips').html('验证码错误').show();

  });

  var userNameField = $("input[name=userName]");
  var checkPasswordField = $("input[name=password]");
  var verifyCodeField = $("input[name=verifyCode]");
  // 校验账号
  function checkUserName() {
    var val = userNameField.val().trim();
    var isValid = val !== "";
    formValidate(userNameField, isValid, '账号不能为空');
    return isValid;
  }

  // 校验密码
  function checkPassword() {
    var val = checkPasswordField.val().trim();
    var isValid = val.length > 0 && val.length < 21;
    formValidate(checkPasswordField, isValid, '密码必须为1-20个字符');
    return isValid;
  }

  // 校验验证码
  function checkVerifyCode() {
    var val = verifyCodeField.val().trim();
    var isValid = val.length === 4;
    formValidate(verifyCodeField, isValid, '验证码格式错误');
    if (isValid === false) {
      return isValid;
    }

    var verifyCodeParams = { imageCodeKey: imgCodeKey, verifyCode: val, case: 2 };
    var verifyCodeApi = moaConfig.baseUrl + '/auth/checkImageCode';
    $.ajaxSettings.async = false;
    $.getJSON(verifyCodeApi, verifyCodeParams, function (res) {
      isValid = res.code === 0;
      formValidate(verifyCodeField, isValid, (res.detail || '验证码检测有误！'));
    });
    $.ajaxSettings.async = true;
    return isValid;
  }

  function formValidate(el, isValid, errorMsg) {
    var formGroup = el.parents('.form-group');
    var formTips = formGroup.find('.form-tips');

    errorMsg = errorMsg || '';
    formGroup.attr('validate', Boolean(isValid));

    // 显示或隐藏错误信息
    if (!isValid) {
      formGroup.addClass('form-status-error');
      formTips.html(errorMsg).show();
    } else {
      formGroup.removeClass('form-status-error');
      formTips.hide();
    }
  }

  userNameField.val($.cookie('account'));


  // 点击登录按钮，提交登陆表单，并判断是否显示登录空间
  $('.btn[formBind]').click(function () {
    var isVaild = true;
    isVaild = checkUserName();

    isVaild = isVaild && checkPassword();
    if ($('.verify-code-group').css("display") === "block") {
      isVaild = isVaild && checkVerifyCode();
    }

    if (!isVaild) {
      return;
    }

    var formData = $('.login-form').serializeJson();
    $.moa.setCookie('account', formData.userName.trim());
    //$.moa.setCookie('specialCode', formData.password.trim());
    $.moa.setCookie('ms_type', '3');

    $.ajax({
      type: 'post',
      url: moaConfig.baseUrl + '/auth',
      contentType: "application/json",
      dataType: 'json',
      data: JSON.stringify({
        userName: formData.userName.trim(),
        password: formData.password.trim(),
        verifyCode: formData.verifyCode.trim(),
        codeKey: imgCodeKey || '',
        appId: appId,
        browser: util.getBrowser().browser
      }),
      success: function (res) {
        if (res.code === 0) {
          var companyList = res.data.companyList;
          LoginData = res.data;

          // 登陆成功
          if (formData.isRemember === '1') {
            $.moa.setCookie('isRemember', '1');
            $.moa.setCookie('account', formData.userName);
          } else {
            $.moa.setCookie('isRemember', '0');
            $.moa.setCookie('account', '');
          }

          var statusFlag = res.data.statusFlag;    // 用户激活状态
          var userId = res.data.userId;            // 用户ID
          
          // 如果用户状态未激活，则跳转到修改密码页面
          if (!parseInt(statusFlag)) {
            var updatePwdURL = '/app/update.html';
            updatePwdURL += '?statusFlag=' + statusFlag;
            updatePwdURL += '&uid=' + userId;
            window.location.href = updatePwdURL;
          }

          
          $.moa.setCookieTime('ms_member_token', res.data.token, res.data.seconds);
          localStorage.setItem("ms_member_token", res.data.token)
          
          $.moa.setCookie('ms_emailActive', res.data.emailActive);

          // 没有公司时，跳转到加入公司页面 flag=-1 公司列表为空
          if (!companyList.length) {
            window.location.href = '/app/join.html?uid=' + userId + '&flag=-1';
            return false;
          }

          // 只有一个公司时，直接登陆
          if (companyList.length === 1) {
            chooseLogin(companyList[0], userId, res.data);
            return false;
          }

          // 有多个公司时，显示登录空间弹窗，并动态创建下拉框
          loginSpaceList = JSON.parse(JSON.stringify(companyList));
          $('.login-popup').attr('uid', userId).show();
          $('.js-login-select').createSelect({
            data: loginSpaceList,
            displayField: 'name',
            valueField: 'companyId',
            attrs: { name: 'companyId', cls: 'form-control login-space-list' }
          });
        } else {
          // 登陆失败时，重置相关验证状态，显示验证码，并且重新设置表单验证
          $('.verify-code-group').show();
          $('.login-form').formCheck({
            userName: checkUserName,
            password: checkPassword,
            verifyCode: checkVerifyCode
          });
          $('input[name=verifyCode]').val('');

          $('.verify-img').click();
          $('.js-login-tips').html(res.detail).show();
        }
      }
    });
  });

  // 回车键登陆
  $('.login-form').keyup(function (e) {
    if (e.keyCode === 13) {
      $('.btn[formBind]').click();
    }
  });

  // 关闭登录空间
  $('.js-popup-close').click(function () {
    $('.login-popup').hide();
  });

  // 确认登录空间，并跳转相应的地址
  $('.login-popup').on('click', '.btn-primary', function () {
    var uid = $('.login-popup').attr('uid');
    var cid = $('.js-login-space-form').serializeJson().companyId;

    // loginSpaceList 是在点击登录按钮时，登录请求发送成功时赋的值
    if (loginSpaceList.length) {
      $.each(loginSpaceList, function (index, item) {
        (item.companyId === cid) && chooseLogin(item, uid, LoginData);
      });
    }
  });

  /**根据公司信息，检测公司状态，并跳转相应地址 */
  function chooseLogin(companyInfo, uid, user) {
    var returnUrl = $.moa.formatUrlParams().returnUrl;

    // 公司认证状态:
    // [1: 等待审核, 2: 审核通过, 3: 审核失败]
    var auditFlag = parseInt(companyInfo.auditingFlag);

    // 用户申请加入公司的审核状态:
    // [0: '审核中', 1: '正常', 2: '停用', 8: '拒绝', 9: '注销']
    var employeeStatus = parseInt(companyInfo.employeeStatus);

    // 申请类型和审核类型:
    // [1: moa创建公司, 2: moa变更公司, 3: crm创建公司, 4: crm变更公司, 5: 实名认证: 99: 基础数据]
    // var requestType = parseInt(companyInfo.requestType);

    if (companyInfo.statusFlag && parseInt(companyInfo.statusFlag) === 1) {
      $('.js-login-tips').html('该公司已被停用，当前无法登录').show();
      return false;
    }

    if ([1, 3].indexOf(auditFlag) !== -1) {
      // 失败时需要通过cid发送请求，从而获取审核失败理由
      var c = (auditFlag === 3) ? ('&cid=' + companyInfo.companyId) : '';
      window.location.href = '/app/result.html?uid=' + uid + '&flag=' + auditFlag + c;
      return false;
    }

    if ([0, 2, 8, 9].indexOf(employeeStatus) !== -1) {
      window.location.href = '/app/result.html?uid=' + uid + '&es=' + employeeStatus;
      return false;
    }

    if (returnUrl) {
      //判断供应商
      var hasSupplierUrl = returnUrl.indexOf(moaConfig.supplierUrl) !== -1;
      var hasSupplierAuth = parseInt(companyInfo.companyType) !== 4;
      if (hasSupplierUrl && hasSupplierAuth) {
        $('.js-login-tips').html('该账号没有商城供应商端的权限').show();
        return false;
      }
      // 初始化user-register 数据
      $.ajax({
        url: moaConfig.registerUrl + "/v1/member/initLoginData",
        type: "GET",
        contentType: "application/json",
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        data: {
          cid: companyInfo.companyId,
          expires: user.seconds
        },
        dataType: 'json',
        success: function (res) {
          $(this).addClass("done");

          $.moa.setCookie('ms_cid', companyInfo.companyId);
          // var returnUrlParam = '?cid=' + companyInfo.companyId;
          // returnUrlParam += '&token=' + $.cookie('ms_member_token');
          // window.location.href = returnUrl + returnUrlParam;
        }
      });
    } else {
      $.moa.setCookie('ms_cid', companyInfo.companyId);
      localStorage.setItem("ms_cid", companyInfo.companyId)
      if (parseInt(companyInfo.companyType) === 4) {
        // var returnUrlParam_1 = '?cid=' + companyInfo.companyId;
        // returnUrlParam_1 += '&token=' + $.cookie('ms_member_token');
        // window.location.href = moaConfig.supplierUrl + returnUrlParam_1;
      } else {
        // 初始化user-register 数据
        $.ajax({
          url: moaConfig.registerUrl + "/v1/member/initLoginData",
          type: "GET",
          contentType: "application/json",
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          data: {
            cid: companyInfo.companyId,
            expires: user.seconds
          },
          dataType: 'json',
          success: function (res) {
            $(this).addClass("done");
            var homeUrl = "";
            if((companyInfo.companyType === "3" || companyInfo.companyId === "288572")) {
              homeUrl = moaConfig.mossUrl 
            } else {
              /** 
               * 企业端 通过afterLoginJump字段判断登录后默认进入 
               * 1。viphrm.com
               * 2。smarthr.cn
               */
               if(companyInfo.afterLoginJump === "2") {
                homeUrl = moaConfig.smartHRUrl + "?cid=" + companyInfo.companyId +  "&token=" + $.cookie('ms_member_token');
                } else {
                homeUrl = moaConfig.homeUrl
              }
            }

            // 测试给content_script发送信息
            chrome.tabs.query({
              active: true,
              currentWindow: true
            }, (tabs) => {
                let message = {
                    info: {
                      ms_cid: localStorage.getItem("ms_cid"),
                      ms_member_token: localStorage.getItem("ms_member_token"),
                      supplierId: user.userId,
                      supplierName: user.realName,
                      operatorName: user.realName
                    }
                }
                
                chrome.tabs.sendMessage(tabs[0].id, message, res => {
                    console.log('popup=>content')
                    console.log(res)
                })
            })
            // window.location.href = homeUrl;
          }
        });

       
      }
    }
  }
});
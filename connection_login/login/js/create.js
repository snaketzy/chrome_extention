// 创建公司页面
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

  $.moa.checkUID(null, '/app/register.html' + (hasSourceAppCode ? "?sourceAppCode=20032" : ""));

  // 加载'公司类型'和'行业'下拉框，并做表单验证
  $.ajax({
    type: 'post',
    url: '/api/register',
    dataType: 'json',
    data: {
      action: 'getIndustryList',
      data: JSON.stringify({ type: 3 })
    },
    success: function (res) {
      $('.js-company-type').createSelect({
        data: res.companyList,
        displayField: 'name',
        valueField: 'id',
        value: 1,
        attrs: { cls: 'form-control', name: 'companyType' }
      });

      $('.js-industry').createSelect({
        data: res.industryList,
        displayField: 'name',
        valueField: 'id',
        value: 0,
        attrs: { cls: 'form-control', name: 'industryId' }
      });

      // 初始化添加行业名称
      var industryName = $('.form-control[name=industryId]').find('option[selected=selected]').text();
      $('[name=industryName]').val(industryName);

      // 动态更改行业名称
      $('.form-control[name=industryId]').change(function () {
        var selected = $(this).find('option[value="' + $(this).val() + '"]');
        $('[name=industryName]').val(selected.text());
      });

      // 表单验证
      $('.register-form').formCheck({
        name: checkCompanyName,
        contactName: checkContactName,
        businessLicenseCode: checkLicenseCode,
        fileUpload: checkLicenseImg
      });
    }
  });

  // 提交表单
  $('.btn[formBind]').click(function () {
    if ($(this).hasClass('btn-disabled')) {
      return false;
    }

    var formData = $('.register-form').serializeJson();
    formData.uid = $.moa.formatUrlParams().uid;
    formData.cid = '';
    formData.auditId = '';
    formData.businessLicense = $("#uploadImg").attr("src");
    $.ajax({
      type: 'post',
      url: '/api/register',
      dataType: 'json',
      data: {
        action: 'registerCompany',
        data: JSON.stringify(formData)
      },
      success: function (res) {
        if (res.result.success) {
          var urlParam = '?flag=-1';
          urlParam += '&uid=' + $.moa.formatUrlParams().uid;
          window.location.href = '/app/result.html' + urlParam + (hasSourceAppCode ? "&sourceAppCode=20032" : "");
        } else {
          var errMsg = res.result.resultView || res.result;
          $('.js-error-popup').show();
          $('.js-error-popup').find('.popup-body-inner').html(errMsg);
        }
      }
    });
  });

  // 跳转到'加入公司'
  $('.js-btn-join').click(function () {
    window.location.href = '/app/join.html?uid=' + $.moa.formatUrlParams().uid + (hasSourceAppCode ? "&sourceAppCode=20032" : "");
  });

  // 关闭错误提示框
  $('.js-error-popup').on('click', '.btn-primary', function () {
    $('.js-error-popup').hide();
  });

  // 关闭加入公司确认框
  $('.js-join-popup').find('.btn-default').click(function () {
    $('.js-join-popup').hide();
  });

  // 校验公司名称
  function checkCompanyName(fn, fields) {
    var el = $('.register-form').find('[name=name]');
    var val = el.val().trim();
    var isCompanyName = /^[\u4e00-\u9fa5a-zA-Z\d（）()" "]{2,60}$/.test(val);
    fn(el, isCompanyName, '公司名称只能是2-60个数字，字母或汉字', fields);

    if (!isCompanyName) {
      return false;
    }

    if (!val.length) {
      fn(el, false, '公司名称不能为空', fields);
      return false;
    }

    $.ajax({
      type: 'post',
      url: '/api/register',
      dataType: 'json',
      data: {
        action: 'checkCompany',
        data: JSON.stringify({ name: el.val(), type: '' })
      },
      success: function (res) {
        var isValid, msg;

        if (res.result.success) {
          isValid = true;
        } else {
          var joinLink = '是否 <a class="js-apply-join" style="color: #008aea;" href="javascript:void(0)">申请加入</a> ？';
          msg = res.result.roleId ? res.result.resultView + joinLink : res.result.resultView;
          isValid = false;
        }

        fn(el, isValid, msg, fields);
        joinCompany(res.result.roleId, el.val());
      },
      error: function () {
        fn(el, false, '公司名称检测失败', fields);
      }
    });
  }

  // 校验联系人姓名
  function checkContactName(fn, fields) {
    var el = $('.register-form').find('[name=contactName]');
    var val = el.val().trim();
    var isContactName = /^[a-zA-Z\u4e00-\u9fa5]{2,}$/.test(val);

    if (!val.length) {
      fn(el, false, '联系人姓名不能为空', fields);
      return false;
    }

    fn(el, isContactName, '联系人姓名只能是汉字或字母，且最少2个字符');
  }

  // 校验证件号码
  function checkLicenseCode(fn,fields) {
    var el = $('.register-form').find('[name=businessLicenseCode]');
    var val = el.val().trim();
    var isLicenseCode = /^[a-zA-Z\d]{18}$/.test(val);

    if (!val.length) {
      fn(el, false, '证件号码不能为空', fields);
      return false;
    }

    fn(el, isLicenseCode, '证件号码只能为18位数字或字母', fields);
  }

  // 上传并校验证件照片
  function checkLicenseImg(fn,fields) {
    var el = $('.register-form').find('[name=fileUpload]');
    var imageForm = new FormData();
    imageForm.append('file', $(".form-file-input")[0].files[0]);

    if (imageForm.get('file').size > 2 * 1024 * 1024) {
      fn(el, false, '图片大小不能超过2MB', fields);
      return false;
    }

    $.ajax({
      type: 'post',
      // url: '/api/v1/upload',
      url: "/filemanager/picupload.jsx?uid=" + $.moa.formatUrlParams().uid,
      processData: false,  // 不处理发送的数据
      contentType: false,   // 不设置Content-Type请求头
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      data: imageForm,
      success: function (res) {
        if (res.result === 0 && res.data) {
          $('[name=licenseImg]').val(res.data.url);
          $('.upload-img-area').show();
          $('#uploadImg').attr("src", res.data.url);
          fn(el, true,null, fields);
        } else {
          fn(el, false, '上传失败', fields);
        }
      },
      error: function (e) {
        fn(el, false, '上传失败', fields);
        console.error(e);
      }
    });
  }

  // 加入公司
  function joinCompany(cid, name) {
    // 显示弹窗
    $('.js-apply-join').click(function () {
      $('.js-join-popup').attr('cid', cid).show();
      $('.js-join-popup').find('.js-company-name').html(name);
    });

    // 确定加入
    $('.js-join-popup').on('click', '.btn-primary', function () {
      var cid = $('.js-join-popup').attr('cid');
      $.ajax({
        type: 'post',
        url: '/api/register',
        dataType: 'json',
        data: {
          action: 'addToCompany',
          data: JSON.stringify({
            uid: $.moa.formatUrlParams().uid,
            cid: cid,
            employeeId: ''
          })
        },
        success: function (res) {
          if (!res.errorCode) {
            window.location.href = '/app/result.html?es=0&uid=' + $.moa.formatUrlParams().uid;
          } else {
            //  console.error(res.errorText);
            $('.js-join-popup').removeAttr('cid').hide();
            $('.js-error-popup').show();
            $('.js-error-popup').find('.popup-body-inner').html(res.errorText);
          }
        }
      });
    });
  }
});
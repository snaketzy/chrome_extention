// 初始化
$(function () {
  // 检测浏览器版本是否小于或等于IE8
  if ($('html').is('.lt-ie9')) {
    var ltIE9Style = 'padding: 4px 0; width: 100%; text-align: center; font-size: 16px; color: #fff; background-color: red;';
    var ltIE9Text = '由于您的浏览器版本过低，部分功能无法使用，请升级浏览器后使用本网站';
    var ltIE9Html = '<div style="' + ltIE9Style + '">' + ltIE9Text + '</div>';
    $(ltIE9Html).insertBefore('#header');
  }

  $(window).resize(function () {
    setBodyMinHeight();
  });

  setBodyMinHeight();

  // 动态设置最小宽度，使其初始化占满全屏
  function setBodyMinHeight() {
    var docHeight = $(window).height();
    var headerHeight = $('#header').outerHeight();
    var footerHeight = $('#footer').outerHeight();
    $('#body').css('min-height', docHeight - headerHeight - footerHeight);
  }
});

// 表单类插件
// $('.form').serializeJson()
// $('.form').formCheck()
// $('.element').createSelect()
// $('.element').createTable()
(function ($) {
  // 将表单值序列号为json数据
  $.fn.serializeJson = function () {
    var rs = [];

    this.each(function () {
      var dataObj = {};
      $.each($(this).serializeArray(), function (index, item) {
        dataObj[item.name] = item.value;
      });

      // 由于 $.serializeArray() 不序列化没选中的单选和多选框
      // 添加未选中的radio, checkbox
      $.each($('input[type=radio],input[type=checkbox]', this), function () {
        if (!dataObj.hasOwnProperty(this.name)) {
          var len = $('input[name=' + this.name + ']:checked').length;
          !len && (dataObj[this.name] = '');
        }
      });

      rs.push(dataObj);
    });

    return rs.length > 1 ? rs : rs[0];
  };

  /**重置验证码的输入框状态 */
  $.fn.resetVerifyCodeStatus = function(value) {
    $("[name=verifyCode]").parents(".form-group").removeClass("form-status-error");
    $("[name=verifyCode]").parents(".form-group").find('.form-tips').hide();
    if(typeof(value) === "string") {
        $("[name=verifyCode]").val(value);
    }
    if($("[name=verifyCode]").val() === "") {
      $('.btn[formBind]').addClass('btn-disabled');
    }
  };

  /**
   * 表单验证, 表单按钮上需要添加'formBind'属性
   * @param fields {object}
   * @param fields[key] {string}  表单的name值
   * @param fields[value] {function}  验证函数
   */
  $.fn.formCheck = function (fields) {
    fields = fields || {};
    var $this = $(this);

    $.each(fields, function (key, fn) {
      var lastValue = '',
        element = $this.find('[name=' + key + ']');
      element.focus(function () {
        var formGroup = element.parents('.form-group');
        var formTips = formGroup.find('.form-tips');
        formGroup.removeClass('form-status-error');
        formTips.hide();
      }).blur(function () {
        if (lastValue !== element.val()|| true) {
          fn(window.formValidate, fields);
          lastValue = element.val();
        }
      })
    });
  };

  // 表单验证函数
  window.formValidate = function (el, isValid, errorMsg, fields) {
    var validates = [];
    var isAllValid = true;
    var formGroup = el.parents('.form-group');
    var form = el.parents('form');
    var formTips = formGroup.find('.form-tips');
    var submitBtn = $('.btn[formBind]');

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

    // 每次调用本函数时，检测表单是否全部通过验证
    // 是否通过验证的依据是，$('.form-group')上的'validate'属性是否为'true'
    $.each(fields, function (name) {
      var iv = form.find('[name=' + name + ']').parents('.form-group').attr('validate');
      validates.push(iv);
    });

    // 如果有一个验证不通过，则整个表单验证不通过
    $.each(validates, function (index, item) {
      if (item !== 'true') {
        isAllValid = false;
      }
    });

    // 除校验字段外，验证码和图形验证码也不能为空
    if($('.register-form').find('[name=verifyCode]').val() && $('.register-form').find('[name=verifyCode]').val().length !== 4) {
      isAllValid = false;
    }

    isAllValid ? submitBtn.removeClass('btn-disabled') : submitBtn.addClass('btn-disabled');
  };


  /**
   * 动态创建select
   * @param config {object}
   * @param config.data {array<object>} 下拉列表数据
   * @param config.displayField {string} 展示文字字段
   * @param config.valueField {string} 值字段
   * @param config.value {string} 默认值
   * @param config.attrs {object} select标签上的属性值
   */
  $.fn.createSelect = function (config) {
    var list = [];
    var listCfg = { tag: 'select', attrs: config.attrs };

    $.each(config.data, function (index, item) {
      var itemCfg = { tag: 'option', content: item[config.displayField] };

      if (item[config.valueField] === config.value) {
        itemCfg.attrs = { value: item[config.valueField], selected: 'selected' };
      } else {
        itemCfg.attrs = { value: item[config.valueField] };
      }

      list.push($.moa.createTag(itemCfg));
    });

    listCfg.content = list.join('');
    this.html($.moa.createTag(listCfg));

    // 更改选中属性
    var $select = this.find('select');
    $select.children('option:selected').attr('selected', true);
    $select.change(function () {
      var selectedItem = $(this).children('option:selected');
      selectedItem.attr('selected', true).siblings().removeAttr('selected');
    });
  };

  /**
   * 动态创建table
   * @param config {object}
   *
   * @param config.data {array<object>} 列表数据
   * @param config.emptyText {string} 空数据提示文字
   * @param config.header {boolean} 是否显示thead
   * @param config.footer {array<object>} tfoot内容
   * @param config.attrs {object} table标签上的属性值
   * @param config.afterRender {object} 渲染完成后的回调函数
   *
   * @param config.columns {array<object>} table列
   * @param config.columns.type {string} 可选'rownumber','action'
   * @param config.columns.dataIndex {string} 数据字段
   * @param config.columns.header {object} thead里th的内容
   * @param config.columns.html {object} 仅限action列，td 里的内容
   * @param config.columns.attrs {object} td标签上的属性
   */
  $.fn.createTable = function (config) {
    var table, thead, tbody, tfoot,
      headerCells = [],
      footerCells = [],
      bodyRows = [];

    config.data = config.data || [];
    config.columns = config.columns || [];
    config.footer = config.footer || [];

    // 生成 thead
    $.each(config.columns, function (index, item) {
      var cellConfig = {
        tag: 'th',
        content: '<div class="tb-cell">' + (item.header || '') + '</div>'
      };
      headerCells.push($.moa.createTag(cellConfig));
    });

    thead = $.moa.createTag({
      tag: 'thead',
      content: $.moa.createTag({ tag: 'tr', content: headerCells.join('') })
    });

    // 生成tbody
    $.each(config.data, function (index, item) {
      var tr, cells = [];

      $.each(config.columns, function (i, column) {
        var cellConfig = {
          tag: 'td',
          attrs: column.attrs
        };

        // 数据列
        if (column.dataIndex) {
          cellConfig.content = '<div class="tb-cell">' + item[column.dataIndex] + '</div>';
        }

        // 行号
        if (column.type === 'rownumber') {
          cellConfig.content = '<div class="tb-cell">' + (index + 1) + '</div>';
        }

        // 操作列
        if (column.type === 'action') {
          cellConfig.content = '<div class="tb-cell">' + column.html + '</div>';
        }
        cells.push($.moa.createTag(cellConfig));
      });

      tr = $.moa.createTag({
        tag: 'tr',
        content: cells.join(''),
        attrs: { 'data-record-index': index }
      });
      bodyRows.push(tr);
    });

    // 生成空数据tbody
    if (!config.data.length) {
      var emptyCell = $.moa.createTag({
        tag: 'td',
        attrs: { cls: 'tb-empty-rows' },
        content: '<div class="tb-cell">' + config.emptyText + '</div>'
      });
      bodyRows.push($.moa.createTag({ tag: 'tr', content: emptyCell }));
    }

    tbody = $.moa.createTag({
      tag: 'tbody',
      content: bodyRows.join('')
    });

    // 生成tfoot
    $.each(config.footer, function (index, item) {
      var cellConfig = {
        tag: 'td',
        attrs: item.attrs,
        content: '<div class="tb-cell">' + item.html + '</div>'
      };
      footerCells.push($.moa.createTag(cellConfig));
    });

    tfoot = $.moa.createTag({
      tag: 'tfoot',
      content: $.moa.createTag({ tag: 'tr', content: footerCells.join('') })
    });

    // 生成table
    table = $.moa.createTag({
      tag: 'table',
      attrs: config.attrs,
      content: config.header ? thead + tbody + tfoot : tbody + tfoot
    });

    // 添加table
    this.html(table);

    // 渲染完成后的回调函数
    if (config.afterRender) {
      config.afterRender(this, config.data);
    }

    // 使链式操作生效
    return this;
  }
}(jQuery));

// 工具类
(function ($) {
  $.moa = {};



  /**
   * 将对象转换为字符串
   * 注意：传入的对象里，不能有'class'属性，用'cls'替代'class'
   * @param obj {object} 需要转换的对象
   * @return {string} 返回key="value"形式的字符串，多个用空格分隔
   */
  $.moa.o2s = function (obj) {
    obj = obj || {};
    var arr = [];

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var attr = (key === 'cls') ? 'class' : key;
        arr.push(attr + '="' + obj[key] + '"');
      }
    }
    arr.splice(0, 0, '');

    return arr.join(' ');
  };

  // 将地址栏URL的参数格式化为Json
  $.moa.formatUrlParams = function () {
    var urlParams = {};
    var urlSearch = window.location.search;

    if (!urlSearch) {
      return false;
    }

    $.each(urlSearch.substr(1).split('&'), function (index, item) {
      var paramArr = item.split('=');
      urlParams[paramArr[0]] = paramArr[1] || '';
    });
    return urlParams;
  };

  /**
   * 创建html标签
   * @param opts {object}
   * @param opts.tag {string} 标签名称
   * @param opts.content {string} 标签内容
   * @param opts.attrs {string} 标签属性
   */
  $.moa.createTag = function (opts) {
    return '<' + opts.tag + $.moa.o2s(opts.attrs) + '>' + opts.content + '</' + opts.tag + '>';
  };

  // 设置cookie
  $.moa.setCookie = function (name, value) {
    $.cookie(name, value, { expires: 7, path: '/', domain: 'viphrm.com' });
  };

  // 设置cookie
  $.moa.setCookieTime = function (name, value, expires) {
    var date = new Date();
    date.setTime(date.getTime() + expires * 1000);//只能这么写，10表示10秒钟
    $.cookie(name, value, { expires: date, path: '/', domain: 'viphrm.com' });
  };
  /**
   * 检测地址栏里是UID是否正确，不正确时，跳转回相应页面
   * @param success {function} 成功时的回调函数
   * @param directTo {string} 需要跳转的页面
   * @return {boolean}
   */
  $.moa.checkUID = function (success, directTo) {
    directTo = directTo || '/app/register.html';
    // url里无'uid'或'uid'为空时，返回注册页面
    if (!$.moa.formatUrlParams().uid) {
      window.location.href = directTo;
      return false;
    }

    // 通过 uid 查询用户信息，
    // 不符合的 uid 将跳转回用户注册页面
    $.ajax({
      type: 'post',
      url: '/api/register',
      dataType: 'json',
      data: {
        action: 'queryUserInfo',
        data: JSON.stringify({ uid: $.moa.formatUrlParams().uid })
      },
      success: function (res) {
        if (res) {
          success && success(res);
        } else {
          window.location.href = directTo;
        }
      }
    });
  }
}(jQuery));
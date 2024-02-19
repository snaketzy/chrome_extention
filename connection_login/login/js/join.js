// 加入公司页面
$(function () {

    var urlParam = $.moa.formatUrlParams();
    var hasSourceAppCode = urlParam && urlParam.sourceAppCode == "20032";
    if (!hasSourceAppCode) {
        $(".header-btn").html('<a href="/" class="btn">登录</a>');
        $(".tiyan").removeClass("hide");
    } else {
        $(".header-logo").addClass("xiang-ma").attr("href", "javascript:void(0);");
        $(".footer-xiang-ma").addClass("show");
        $(".footer").addClass("hide");
        $(".tiyan").addClass("hide");
    }

    // 检测UID
    $.moa.checkUID(function (res) {
        var text = res.result.userInfo.email || res.result.userInfo.mobilePhone;
        $('.rs-account').html(text);
    }, '/app/register.html' + (hasSourceAppCode ? "?sourceAppCode=20032" : ""));

    var uid = $.moa.formatUrlParams().uid;
    var title, content;

    if ($.moa.formatUrlParams().flag === '-1') {
        title = '你还没有加入企业';
        content = '请加入企业或创建企业，等待相关权限审核通过<br>';
        setText('wait', title, content);
    } else {
        title = '恭喜您，已经完成了账号注册！';
        content = '您的登陆账号是：<span class="rs-account">' + ($.moa.formatUrlParams().account || "") + '</span><br>';
        content += '赶快加入或创建一个公司开始体验吧~';
        setText('success', title, content);
    }

    // 搜索公司
    $('.js-search-btn').click(function () {
        $.ajax({
            type: 'post',
            url: '/api/register',
            dataType: 'json',
            data: {
                action: 'queryCompanyList',
                data: JSON.stringify({name: $('.form-control[name=company]').val().trim()})
            },
            beforeSend: function () {
                $('.search-list').createTable({
                    attrs: {cls: 'search-table'},
                    emptyText: '加载中...'
                }).show();
            },
            error: function () {
                $('.search-list').createTable({
                    attrs: {cls: 'search-table'},
                    emptyText: '数据查询出错'
                }).show();
            },
            success: function (res) {
                var sourceAppParam = hasSourceAppCode ? "&sourceAppCode=20032" : "";
                if (res.result.success) {
                    var footerHtml = '<div>没有找到您的公司，可以输入更准确的关键字，也可以选择</div>';
                    footerHtml += '<a class="tb-cell-link" href="/app/create.html?uid=' + uid + sourceAppParam + '">创建新公司</a>';
                    footerHtml += !hasSourceAppCode ? '<a class="tb-cell-link" href="/?returnUrl=http://dvwordpress.viphrm.com/">跳过此步骤立即体验</a>' : "";

                    $('.search-list').createTable({
                        data: res.result.companyInfos,
                        header: false,
                        emptyText: '暂无数据',
                        afterRender: onAfterTableRender,
                        attrs: {
                            cls: 'search-table'
                        },
                        columns: [
                            {
                                type: 'rownumber',
                                header: '行号',
                                attrs: {cls: 'tb-cell-num'}
                            },
                            {
                                dataIndex: 'name',
                                header: '公司名称',
                                attrs: {cls: 'tb-cell-company'}
                            },
                            {
                                type: 'action',
                                header: '操作',
                                html: '<a class="tb-cell-link">加入公司</a>'
                            }
                        ],
                        footer: [
                            {
                                html: footerHtml,
                                attrs: { colspan: 3 }
                            }
                        ]
                    }).show();
                } else {
                    $('.search-list').createTable({
                        attrs: {cls: 'search-table'},
                        emptyText: res.result
                    });
                }
            }
        });
    });

    // 回车键搜索
    $('.search-form').keypress(function (e) {
        if (e.keyCode === 13) {
            $('.js-search-btn').click();
            return false;
        }
    });

    // 搜索框无值时，隐藏搜索结果
    $('.search-form').on('input', '.form-control', function () {
        if (!$(this).val().length) {
            $('.search-list').hide();
        }
    });

    // 确认加入公司
    $('.js-join-popup').on('click', '.btn-primary', function () {
        var cid = $('.js-join-popup').attr('cid');
        $.ajax({
            type: 'post',
            url: '/api/register',
            dataType: 'json',
            data: {
                action: 'addToCompany',
                data: JSON.stringify({uid: uid, cid: cid, employeeId: ''})
            },
            success: function (res) {
                if (!res.errorCode) {
                    window.location.href = '/app/result.html?es=0&uid=' + uid + (hasSourceAppCode ? "&sourceAppCode=20032" : "");
                } else {
                    $('.js-join-popup').attr('cid', '').hide();
                    $('.js-error-popup').show();
                    $('.js-error-popup').find('.popup-body-inner').html(res.errorText);
                }
            }
        });
    });

    // 跳转到创建公司页面
    $('.js-create-btn').click(function () {
        window.location.href = '/app/create.html?uid=' + uid + (hasSourceAppCode ? "&sourceAppCode=20032" : "");
    });

    // 关闭弹窗
    $('.js-join-popup').on('click', '.btn-default', function () {
        $('.js-join-popup').attr('cid', '').hide();
    });

    // 关闭错误提示框
    $('.js-error-popup').on('click', '.btn-primary', function () {
        $('.js-error-popup').hide();
    });

    // 列表渲染完成后，点击加入公司
    function onAfterTableRender(container, data) {
        container.find('tbody').find('.tb-cell-link').click(function () {
            var i = $(this).parents('tr').data('record-index');
            $('.js-join-popup').attr('cid', data[i].companyId).show();
            $('.js-join-popup').find('.js-company-name').html(data[i].name);
        });
    }

    function setText(status, title, content) {
        $('.result').addClass('result-status-' + status);
        $('.result-title').html(title);
        $('.result-content').html(content);
    }
});
// 结果展示页面
$(function () {
    var title = '', content = '';
    var uid = $.moa.formatUrlParams().uid;
    var joinLink = '<a class="form-link" href="/app/join.html?uid=' + uid + '">加入已有公司</a>';
    var createLink = '<a class="form-link" href="/app/create.html?uid=' + uid + '">创建公司</a>';

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

    // 公司审核状态
    switch ($.moa.formatUrlParams().flag) {
        case '-1':
            title = '该公司还未审核';
            content = '我们会尽快审核您的信息，并为您开通相关权限<br>';
            content += '审核完成后，您将收到邮件通知，请注意查收';
            setText('error', title, content);
            break;

        case '1':
            title = '该公司正在审核中';
            content = '我们会尽快审核您的信息，并为您开通相关权限<br>';
            content += '审核完成后，您将收到邮件通知，请注意查收';
            setText('wait', title, content);
            break;

        case '3':

            if ($.moa.formatUrlParams().cid) {
                $.ajax({
                    type: 'post',
                    url: '/api/register',
                    dataType: 'json',
                    data: {
                        action: 'queryCompanyName',
                        data: JSON.stringify({cid: $.moa.formatUrlParams().cid})
                    },
                    success: function (res) {
                        if (res.result.success) {
                            title = '该公司审核未通过!';
                            content = '未通过理由：' + companyInfo.denyReason + '<br>';
                            content += '你可以重新 ' + joinLink + ' 或 ' + createLink;
                            setText('error', title, content);
                        }
                    }
                });
            }
            else {
                title = '你的申请审核未通过!';
                content = '你可以重新 ' + joinLink + ' 或 ' + createLink;
                setText('error', title, content);
            }
            break;
    }

    // 状态注释详见 index.js 里 chooseLogin() employeeStatus
    var es = parseInt($.moa.formatUrlParams().es);
    if ([0, 1, 2, 8, 9].indexOf(es) === -1) {
        return false;
    }

    // 用户申请加入公司的审核状态
    switch ($.moa.formatUrlParams().es) {
        case '0':
            title = '您的申请正在审核中';
            content = '我们会尽快审核您的信息，并为您开通相关权限<br>';
            content += '审核完成后，您将收到邮件通知，请注意查收';
            setText('wait', title, content);
            break;
        case '1':
            title = '恭喜您，成功加入公司';
            if (hasSourceAppCode) {
                content = '<span>您可以重新登录使用相马云系统了</span>'
            } else {
                content = '<a class="form-link" href="/">返回首页</a>';
            }            
            setText('success', title, content);
            break;
        case '2':
            title = '您加入的公司已经被停用';
            content += '你可以重新 ' + joinLink + ' 或 ' + createLink;
            setText('error', title, content);
            break;
        case '8':
            title = '您的申请审核未通过';
            content += '你可以重新 ' + joinLink + ' 或 ' + createLink;
            setText('error', title, content);
            break;
        case '9':
            title = '您加入的公司已经被注销';
            content += '你可以重新 ' + joinLink + ' 或 ' + createLink;
            setText('error', title, content);
            break;
    }

    function setText(status, title, content) {
        $('.result').addClass('result-status-' + status);
        $('.result-title').html(title);
        $('.result-content').html(content);
    }
});
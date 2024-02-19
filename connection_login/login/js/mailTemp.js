var mailTemp = {
    regMail: "<center>" +
	            "<table border='0' cellpadding='0' cellspacing='0' style='width: 640px; margin: auto;font-size:14px;line-height:24px;'>" +
                "<tr><td colspan='5' style='height: 20px;'></td></tr>" +
                "<tr><td colspan='5' style='height: 79px;'><img src='http://moa.viphrm.com/img/title.gif' height='79' width='640' alt='' /></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='width: 7px; border-left: 1px solid #f4f4f4;'></td><td style='width: 33px;'></td><td>{account}&nbsp;您好！</td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='width: 7px; border-left: 1px solid #f4f4f4;'></td><td style='width: 33px;'></td><td>欢迎加入中国领先的人力资源服务共享平台————VIPHRM.com！</td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>您在VIPHRM.com的注册邮箱为：{account}</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>您的验证码是：{identifyCode}</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>如果通过此方法无法激活，您可以拨打我们的客服电话：400 820 9911。</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>有任何问题，欢迎与我们联系！ </td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>advisor@viphrm.com &nbsp;&nbsp;&nbsp;&nbsp;400 820 9911 </td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>本邮件包含个人信息，请勿转发他人。</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>本邮件为系统自动发出，请勿直接回复。<br />Please do not reply to this email, as we are unable to respond from this address.</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>祝您使用愉快！</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'><a href='http://www.viphrm.com/modules/user/introduction.html' target='_blank'>关于我们</a></td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center; font-size: 14px; background-color: #eee;'>Copyright 2015 Microseer Group, All Rights Reserved</td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center; font-size: 14px; background-color: #eee;'>微知网络科技(上海)有限公司 版权所有 沪ICP证120424号</td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee;'></td></tr>" +
                "<tr><td colspan='5' style='height: 7px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee; border-bottom: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 12px;'></td></tr>" +
                "</table>" +
			 "</center>",
    bindMail: "<center>" +
	            "<table border='0' cellpadding='0' cellspacing='0' style='width: 640px; margin: auto;font-size:14px;line-height:24px;'>" +
                "<tr><td colspan='5' style='height: 20px;'></td></tr>" +
                "<tr><td colspan='5' style='height: 79px;'><img src='http://moa.viphrm.com/img/title.gif' height='79' width='640' alt='' /></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='width: 7px; border-left: 1px solid #f4f4f4;'></td><td style='width: 33px;'></td><td>{account}&nbsp;您好！</td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='width: 7px; border-left: 1px solid #f4f4f4;'></td><td style='width: 33px;'></td><td>欢迎加入中国领先的人力资源服务共享平台————VIPHRM.com！</td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>您在VIPHRM.com的绑定邮箱为：{account}</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>您的验证码是：{identifyCode}</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>如果通过此方法无法绑定，您可以拨打我们的客服电话：400 820 9911。</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>有任何问题，欢迎与我们联系！ </td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>advisor@viphrm.com &nbsp;&nbsp;&nbsp;&nbsp;400 820 9911 </td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>本邮件包含个人信息，请勿转发他人。</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>本邮件为系统自动发出，请勿直接回复。<br />Please do not reply to this email, as we are unable to respond from this address.</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>祝您使用愉快！</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'><a href='http://www.viphrm.com/modules/user/introduction.html' target='_blank'>关于我们</a></td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee;'></td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center; font-size: 14px; background-color: #eee;'>Copyright 2015 Microseer Group, All Rights Reserved</td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center; font-size: 14px; background-color: #eee;'>微知网络科技(上海)有限公司 版权所有 沪ICP证120424号</td></tr>" +
                "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee;'></td></tr>" +
                "<tr><td colspan='5' style='height: 7px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee; border-bottom: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td colspan='5' style='height: 12px;'></td></tr>" +
                "</table>" +
			 "</center>",
    regSuccess: "<table border='0' cellpadding='0' cellspacing='0' style='width: 640px; margin: auto;'>" +
			    "<tr><td colspan='5' style='height: 20px;'></td></tr>" +
			    "<tr><td colspan='5' style='height: 79px;'><img src='http://moa.viphrm.com/img/title.gif' height='79' width='640' alt=''></td></tr>" +
			    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
			    "<tr><td style='width: 7px; border-left: 1px solid #f4f4f4;'></td><td style='width: 33px;'></td><td>尊敬的<a class='blue no' href='>{account}</a>阁下：</td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
			    "<tr><td style='width: 7px; border-left: 1px solid #f4f4f4;'></td><td style='width: 33px;'></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您好！</td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
			    "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
			    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
			    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您已注册成功，恭喜您成为VIPHRM.com的会员。</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以下是您的账号信息，请妥善保存，并做好保密工作。</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
			    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;访问地址：www.viphrm.com <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;登录账号： {account} <br /></td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
			    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了您账号的安全考虑，密码不显示。若您忘记密码，请 <a href='http://www.viphrm.com/modules/user/findPw.html' target='_blank'>点击此处</a> 找回密码，或者将下面的链接地址复制至地址栏并打开：<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http://www.viphrm.com/modules/user/findPw.html</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
			    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为获得更完善的服务，请您尽快登陆VIPHRM.com完善个人信息。</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
			    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center;'><a href='http://www.viphrm.com/modules/user/login.html' target='_blank'>立即登录注册  开启高效之旅</a></td></tr>" +
			    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本邮件包含个人信息，请勿转发他人。为了安全起见，我们建议您立即删除本邮件。</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
			    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本邮件为系统自动发出，请勿直接回复。<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please do not reply to this email, as we are unable to respond from this address.</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
			    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;祝您使用愉快！</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
			    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center;'><a href='http://www.viphrm.com/modules/user/introduction.html' target='_blank'>关于我们</a></td></tr>" +
			    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center;'>Copyright © 2015 Microseer Group, All Rights Reserved</td></tr>" +
			    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center;'>微知网络科技(上海)有限公司 版权所有 沪ICP证120424号</td></tr>" +
			    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
			    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
			    "<tr><td colspan='5' style='height: 7px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; border-bottom: 1px solid #f4f4f4;'></td></tr>" +
			    "<tr><td colspan='5' style='height: 12px;'></td></tr>" +
			    "</table>",
    findPassword: "<center>" +
	                "<table border='0' cellpadding='0' cellspacing='0' style='width: 640px; margin: auto;font-size:14px;line-height:24px;'>" +
                    "<tr><td colspan='5' style='height: 20px;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 79px;'><img src='http://moa.viphrm.com/img/title.gif' height='79' width='640' alt='' /></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='width: 7px; border-left: 1px solid #f4f4f4;'></td><td style='width: 33px;'></td><td>{account}&nbsp;您好！</td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='width: 7px; border-left: 1px solid #f4f4f4;'></td><td style='width: 33px;'></td><td>您在【VIPHRM】申请的验证码是： {identifyCode}</td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>如果通过此方法无法激活，您可以拨打我们的客服电话：400 820 9911。</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>有任何问题，欢迎与我们联系！ </td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>advisor@viphrm.com &nbsp;&nbsp;&nbsp;&nbsp;400 820 9911 </td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>本邮件包含个人信息，请勿转发他人。</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>本邮件为系统自动发出，请勿直接回复。<br />Please do not reply to this email, as we are unable to respond from this address.</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>祝您使用愉快！</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'><a href='http://www.viphrm.com/modules/user/introduction.html' target='_blank'>关于我们</a></td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center; font-size: 14px; background-color: #eee;'>Copyright 2015 Microseer Group, All Rights Reserved</td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center; font-size: 14px; background-color: #eee;'>微知网络科技(上海)有限公司 版权所有 沪ICP证120424号</td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 7px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee; border-bottom: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 12px;'></td></tr>" +
                    "</table>" +
				  "</center>",
    inviteReg: "<center>" +
	                "<table border='0' cellpadding='0' cellspacing='0' style='width: 640px; margin: auto;font-size:14px;line-height:24px;'>" +
                    "<tr><td colspan='5' style='height: 20px;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 79px;'><img src='http://moa.viphrm.com/img/title.gif' height='79' width='640' alt='' /></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='width: 7px; border-left: 1px solid #f4f4f4;'></td><td style='width: 33px;'></td><td>{account}&nbsp;您好！</td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='width: 7px; border-left: 1px solid #f4f4f4;'></td><td style='width: 33px;'></td><td>您的朋友<a class='blue no' href=''>{userName}</a>邀请您加入 【{companyName}】!</td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>请点击链接【<a class='blue no' href='{registerUrl}'>{registerUrl}</a>】完成注册。【VIPHRM】</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>如果您是业务人员，您可以随时随地与团队成员沟通，在线跟进业务流程、项目进度，并与团队共享点滴经验及知识成果！</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>如果您是HR，您可以免费获得优质的人力资源服务，摆脱繁琐的重复性工作，专注于更有价值的核心业务！</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>高效的公司人都已进入云时代。您也快来升级自己的装备吧！ </td><td></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>有任何问题，欢迎与我们联系！ </td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>advisor@viphrm.com &nbsp;&nbsp;&nbsp;&nbsp;400 820 9911 </td><td></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td style='width: 53px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>本邮件包含个人信息，请勿转发他人。</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>本邮件为系统自动发出，请勿直接回复。<br />Please do not reply to this email, as we are unable to respond from this address.</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>祝您使用愉快！</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'><a href='http://www.viphrm.com/modules/user/introduction.html' target='_blank'>关于我们</a></td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center; font-size: 14px; background-color: #eee;'>Copyright 2015 Microseer Group, All Rights Reserved</td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center; font-size: 14px; background-color: #eee;'>微知网络科技(上海)有限公司 版权所有 沪ICP证120424号</td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 7px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee; border-bottom: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 12px;'></td></tr>" +
                    "</table>" +
            "</center>",
    inviteJoinCompany: "<center>" +
	                "<table border='0' cellpadding='0' cellspacing='0' style='width: 640px; margin: auto;font-size:14px;line-height:24px;'>" +
                    "<tr><td colspan='5' style='height: 20px;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 79px;'><img src='http://moa.viphrm.com/img/title.gif' height='79' width='640' alt='' /></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='width: 7px; border-left: 1px solid #f4f4f4;'></td><td style='width: 33px;'></td><td>{account}&nbsp;您好！</td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='width: 7px; border-left: 1px solid #f4f4f4;'></td><td style='width: 33px;'></td><td>您的朋友<a class='blue no' href=''>{userName}</a>邀请您加入 【{companyName}】!</td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>这是他给您的留言：{hisorhermessage}</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>请点击链接【<a class='blue no' href='{registerUrl}'>{registerUrl}</a>】完成注册。【VIPHRM】</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td><a class='blue no' href='{downloadAppUrl}'>点击下载APP</a></td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>如果您是业务人员，您可以随时随地与团队成员沟通，在线跟进业务流程、项目进度，并与团队共享点滴经验及知识成果！</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>如果您是HR，您可以免费获得优质的人力资源服务，摆脱繁琐的重复性工作，专注于更有价值的核心业务！</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>高效的公司人都已进入云时代。您也快来升级自己的装备吧！ </td><td></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>有任何问题，欢迎与我们联系！ </td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>advisor@viphrm.com &nbsp;&nbsp;&nbsp;&nbsp;400 820 9911 </td><td></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td style='width: 53px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>本邮件包含个人信息，请勿转发他人。</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>本邮件为系统自动发出，请勿直接回复。<br />Please do not reply to this email, as we are unable to respond from this address.</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>祝您使用愉快！</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'><a href='http://www.viphrm.com/modules/user/introduction.html' target='_blank'>关于我们</a></td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center; font-size: 14px; background-color: #eee;'>Copyright 2015 Microseer Group, All Rights Reserved</td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center; font-size: 14px; background-color: #eee;'>微知网络科技(上海)有限公司 版权所有 沪ICP证120424号</td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 7px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee; border-bottom: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 12px;'></td></tr>" +
                    "</table>" +
            "</center>",
    approveJoinCompany: "<center>" +
	                "<table border='0' cellpadding='0' cellspacing='0' style='width: 640px; margin: auto;font-size:14px;line-height:24px;'>" +
                    "<tr><td colspan='5' style='height: 20px;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 79px;'><img src='http://moa.viphrm.com/img/title.gif' height='79' width='640' alt='' /></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='width: 7px; border-left: 1px solid #f4f4f4;'></td><td style='width: 33px;'></td><td>{name}&nbsp;您好！</td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='width: 7px; border-left: 1px solid #f4f4f4;'></td><td style='width: 33px;'></td><td>【{companyName}】, 已{message1}了您的加入申请!</td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>请点击链接【<a class='blue no' href='{loginUrl}'>{loginUrl}</a>】，{message2}【VIPHRM】</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>如果您是业务人员，您可以随时随地与团队成员沟通，在线跟进业务流程、项目进度，并与团队共享点滴经验及知识成果！</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>如果您是HR，您可以免费获得优质的人力资源服务，摆脱繁琐的重复性工作，专注于更有价值的核心业务！</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>高效的公司人都已进入云时代。您也快来升级自己的装备吧！ </td><td></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td style='width: 33px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>有任何问题，欢迎与我们联系！ </td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td>advisor@viphrm.com &nbsp;&nbsp;&nbsp;&nbsp;400 820 9911 </td><td></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='height: 20px; border-left: 1px solid #f4f4f4;'></td><td></td><td style='border-bottom: 2px dotted #d0d0d0;'></td><td style='width: 53px;'></td><td style='width: 7px; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>本邮件包含个人信息，请勿转发他人。</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>本邮件为系统自动发出，请勿直接回复。<br />Please do not reply to this email, as we are unable to respond from this address.</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'>祝您使用愉快！</td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td style='border-left: 1px solid #f4f4f4;'></td><td></td><td style=' font-size: 12px;'><a href='http://www.viphrm.com/modules/user/introduction.html' target='_blank'>关于我们</a></td><td></td><td style='border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center; font-size: 14px; background-color: #eee;'>Copyright 2015 Microseer Group, All Rights Reserved</td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; text-align: center; font-size: 14px; background-color: #eee;'>微知网络科技(上海)有限公司 版权所有 沪ICP证120424号</td></tr>" +
                    "<tr><td colspan='5' style='height: 20px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 7px; border-left: 1px solid #f4f4f4; border-right: 1px solid #f4f4f4; background-color: #eee; border-bottom: 1px solid #f4f4f4;'></td></tr>" +
                    "<tr><td colspan='5' style='height: 12px;'></td></tr>" +
                    "</table>" +
            "</center>",
};

var smsTemp = {
    regCode: "亲，您的短信验证码为：{identifyCode}，请尽快输入完成操作。谢谢您使用相马平台！",
    regSuccess: "亲，您已成功邀请注册相马网！"
}

export const emailTemplate2 = "<p>The following evaluations have been assigned&nbsp;to you. Use your current account&nbsp;and go &nbsp;to portal to view these evaluations.</p><p><br /><a href=\"http://www.mydata.com\" onClick=\"return false;\">SIGN IN USING SECURE PORTAL&nbsp;</a></p><p>&nbsp;</p><p>The&nbsp;login will time out after 60 minutes.&nbsp;Your answers&nbsp;will be lost if you do not click on the &quot;FINISH&quot; button before 60 minutes lapses. There is no reminder&nbsp;when your 60 minute login&nbsp;has expired. Please save all comments often as well as&nbsp;check your time.</p><p>&nbsp;</p><p><!--[if !supportLineBreakNewLine]-->Go ahead and send me any questions your need taken care of.&nbsp;<!--[endif]--></p><p>Have a great day!</p><p>&nbsp;</p><p>Elizabeth Hollinger</p><p>ITS Account Evaluations</p><p>Connected to Microsoft Exchange</p><p>&copy; 2014 Microsoft Corporation. All rights reserved.</p><p>&nbsp;</p><p>&nbsp;</p>"

export const emailTemplate: string = `
<body style="font-family: Arial, sans-serif; color: #333333;">
    <table width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td align="center" bgcolor="#f8f8f8" style="padding: 20px 0;">
                <table width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="border-radius: 10px; overflow: hidden; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td align="center" bgcolor="#0044cc" style="padding: 20px;">
                            <img src="https://via.placeholder.com/150" alt="Bank Logo" width="150" style="border: 0; display: block;">
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="padding: 20px; color: #333333; font-size: 16px; line-height: 1.5;">
                            <h2 style="color: #0044cc; margin: 0 0 10px;">Urgent: Action Required</h2>
                            <p>Dear valued customer,</p>
                            <p>We have detected suspicious activity on your account. As a result, your account has been temporarily suspended to protect your personal information.</p>
                            <p>To restore access to your account, please verify your information by clicking the link below:</p>
                            <p style="text-align: center;">
                                <a href="http://maliciouslink.com" target="_blank" style="background-color: #ff6600; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Now</a>
                            </p>
                            <p>If you do not verify your account within 24 hours, it will be permanently disabled.</p>
                            <p>Thank you for your attention to this important matter.</p>
                            <p>Sincerely,</p>
                            <p><strong>Customer Support Team</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" bgcolor="#f8f8f8" style="padding: 20px; font-size: 12px; color: #999999;">
                            <p>This is an automated message. Please do not reply to this email.</p>
                            <p>© 2024 Your Bank. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
`

/*
1. Display mutiple blocks
Done 2. Fix feedback acording to response 
3. Monitoring actions from user (Attachments)
4. Insert into database
5. Pass User throgout pages
*/
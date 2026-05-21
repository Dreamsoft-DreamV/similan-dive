import nodemailer from 'nodemailer';

// 邮件配置 - 从环境变量读取
const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.coze.cn',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: process.env.SMTP_SECURE === 'true' || true,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
};

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ava@coze.email';
const FROM_NAME = process.env.SMTP_FROM_NAME || '斯米兰船潜';
const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || 'noreply@similandive.com';

interface BookingData {
  name: string;
  phone: string;
  experience: string;
  booking_date?: string;
  message?: string;
}

function getExperienceLabel(exp: string): string {
  const expMap: Record<string, string> = {
    none: '无经验',
    ow: '开放水域 (OW)',
    aow: '进阶开放水域 (AOW)',
    rescue: '救援潜水员',
    divemaster: '潜水长以上',
  };
  return expMap[exp] || exp;
}

export async function sendBookingNotification(booking: BookingData): Promise<boolean> {
  // 如果没有配置 SMTP，跳过发送
  if (!SMTP_CONFIG.auth.user || !SMTP_CONFIG.auth.pass) {
    console.log('[Email] SMTP not configured, skipping notification');
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      secure: SMTP_CONFIG.secure,
      auth: {
        user: SMTP_CONFIG.auth.user,
        pass: SMTP_CONFIG.auth.pass,
      },
    });

    const experienceText = getExperienceLabel(booking.experience);
    const subject = `【新预订】${booking.name} - ${experienceText}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0369a1; border-bottom: 2px solid #0369a1; padding-bottom: 10px;">
          🤿 新预订通知
        </h2>
        
        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">姓名</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${booking.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">联系电话</td>
            <td style="padding: 10px; border: 1px solid #ddd;">
              <a href="tel:${booking.phone}">${booking.phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">潜水经验</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${experienceText}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">预约日期</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${booking.booking_date || '未指定'}</td>
          </tr>
          ${booking.message ? `
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">备注</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${booking.message}</td>
          </tr>
          ` : ''}
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px;">
          <p style="margin: 0; color: #666;">
            请及时处理此预订。您可以在 
            <a href="#" style="color: #0369a1;">管理后台</a> 
            查看和管理所有预订。
          </p>
        </div>
        
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          此邮件由斯米兰船潜网站自动发送
        </p>
      </div>
    `;

    const mailOptions = {
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`[Email] Booking notification sent to ${ADMIN_EMAIL}`);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send notification:', error);
    return false;
  }
}

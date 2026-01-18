import { addInquiry, InquiryInput } from '../services/franchiseService';

interface EmailData {
    to: string;
    subject: string;
    html: string;
}

export const sendConfirmationEmail = async (inquiry: InquiryInput): Promise<void> => {
    try {
        const emailData: EmailData = {
            to: inquiry.email,
            subject: getEmailSubject(inquiry.type),
            html: getEmailTemplate(inquiry)
        };

        // Send email via your backend API or email service
        // For now, we'll log it (you'll need to implement actual email sending)
        console.log('Email would be sent to:', emailData.to);
        console.log('Subject:', emailData.subject);

        // TODO: Implement actual email sending via backend API
        // Example: await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(emailData) });

    } catch (error) {
        console.error('Error sending confirmation email:', error);
        // Don't throw - email failure shouldn't prevent form submission
    }
};

const getEmailSubject = (type: string): string => {
    switch (type) {
        case 'feedback':
            return 'Thank You for Your Feedback - Rabuste Café';
        case 'contact':
            return 'We Received Your Inquiry - Rabuste Café';
        case 'seeds':
            return 'Your Seed Inquiry Has Been Received - Rabuste Café';
        default:
            return 'Thank You for Contacting Rabuste Café';
    }
};

const getEmailTemplate = (inquiry: InquiryInput): string => {
    const baseTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; background-color: #f4f1ea; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #3b2a2a 0%, #5d3a3d 100%); padding: 40px 20px; text-align: center; }
        .header h1 { color: #D4AF37; margin: 0; font-size: 32px; font-family: 'Georgia', serif; }
        .header p { color: #f5efe6; margin: 10px 0 0 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; }
        .content { padding: 40px 30px; color: #3b2a2a; line-height: 1.8; }
        .content h2 { color: #5d3a3d; font-size: 24px; margin-bottom: 20px; }
        .content p { margin: 15px 0; }
        .highlight { background: #fef5e7; padding: 20px; border-left: 4px solid #D4AF37; margin: 20px 0; border-radius: 8px; }
        .footer { background: #3b2a2a; color: #f5efe6; padding: 30px; text-align: center; font-size: 12px; }
        .footer a { color: #D4AF37; text-decoration: none; }
        .button { display: inline-block; background: #D4AF37; color: #3b2a2a; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>RABUSTE CAFÉ</h1>
          <p>Where Coffee Meets Community</p>
        </div>
        <div class="content">
          ${getContentByType(inquiry)}
        </div>
        <div class="footer">
          <p><strong>Rabuste Café</strong></p>
          <p>Surat, Gujarat 395007</p>
          <p>Phone: 9574006100 | Email: hello@rabuste.cafe</p>
          <p style="margin-top: 20px;">
            <a href="https://www.instagram.com/rabuste.coffee">Instagram</a> | 
            <a href="https://rabuste.cafe">Website</a>
          </p>
          <p style="margin-top: 20px; opacity: 0.7;">© 2025 Rabuste Café. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

    return baseTemplate;
};

const getContentByType = (inquiry: InquiryInput): string => {
    const name = (inquiry as any).name;
    const email = (inquiry as any).email;

    switch (inquiry.type) {
        case 'feedback':
            return `
        <h2>Thank You, ${name}! ☕</h2>
        <p>We truly appreciate you taking the time to share your experience with us.</p>
        <div class="highlight">
          <p><strong>Your feedback helps us brew better experiences every day.</strong></p>
          <p>Our team has received your ${'rating' in inquiry ? (inquiry as any).rating : ''}-star review and we're grateful for your honest thoughts.</p>
        </div>
        <p>We're constantly working to improve, and your input is invaluable to us. If you have any additional thoughts or suggestions, feel free to reach out anytime.</p>
        <p>We hope to see you again soon at Rabuste Café!</p>
        <p style="margin-top: 30px;">Warm regards,<br><strong>The Rabuste Team</strong></p>
      `;

        case 'contact':
            return `
        <h2>Hello ${name},</h2>
        <p>Thank you for reaching out to Rabuste Café!</p>
        <div class="highlight">
          <p><strong>We've received your inquiry regarding: ${'reason' in inquiry ? (inquiry as any).reason : 'your request'}</strong></p>
          <p>Reference: ${new Date().toLocaleDateString()} - ${email}</p>
        </div>
        <p>Our team is reviewing your message and will get back to you within 24-48 hours. We're excited about the possibility of working together!</p>
        <p>In the meantime, feel free to explore our website or visit us at our café in Surat.</p>
        <a href="https://rabuste.cafe" class="button">Visit Our Website</a>
        <p style="margin-top: 30px;">Best regards,<br><strong>The Rabuste Team</strong></p>
      `;

        case 'seeds':
            return `
        <h2>Hello ${name},</h2>
        <p>Thank you for your interest in our premium Robusta seeds!</p>
        <div class="highlight">
          <p><strong>Seed Inquiry Details:</strong></p>
          <p>Type: ${'seedType' in inquiry ? (inquiry as any).seedType : 'Premium Robusta'}<br>
          Quantity: ${'quantity' in inquiry ? (inquiry as any).quantity : 'As requested'}</p>
        </div>
        <p>Our agricultural team will review your requirements and contact you within 24 hours with:</p>
        <ul>
          <li>Current availability and pricing</li>
          <li>Seed quality specifications</li>
          <li>Growing guidance and support</li>
          <li>Delivery timeline</li>
        </ul>
        <p>We're passionate about helping you grow the finest Robusta coffee!</p>
        <p style="margin-top: 30px;">Warm regards,<br><strong>The Rabuste Agricultural Team</strong></p>
      `;

        default:
            return `
        <h2>Hello ${name},</h2>
        <p>Thank you for contacting Rabuste Café!</p>
        <p>We've received your message and our team will respond shortly.</p>
        <p style="margin-top: 30px;">Best regards,<br><strong>The Rabuste Team</strong></p>
      `;
    }
};

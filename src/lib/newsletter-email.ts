import Handlebars from 'handlebars';
import { join } from 'node:path';
import nodemailer from 'nodemailer';

const logoPath = join(process.cwd(), 'public', 'logo.png');

const logoAttachment = {
  filename: 'beyond-the-statute-logo.png',
  path: logoPath,
  cid: 'bts-logo',
};

function emailFrame(preheader: string, content: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <style>
      @media only screen and (max-width: 620px) {
        .email-shell { width: 100% !important; }
        .email-gutter { padding-left: 22px !important; padding-right: 22px !important; }
        .email-title { font-size: 32px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#f9f7fc;color:#211e2b;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${preheader}
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f9f7fc;">
      <tr>
        <td align="center" style="padding:36px 14px;">
          <table role="presentation" class="email-shell" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #e7e0f0;border-radius:4px;">
            <tr>
              <td class="email-gutter" style="padding:26px 40px 22px;border-bottom:1px solid #e7e0f0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td valign="middle" style="padding-right:16px;">
                      <img
                        src="cid:bts-logo"
                        width="84"
                        alt="Beyond the Statute logo"
                        style="display:block;width:84px;max-width:100%;height:auto;border:0;"
                      >
                    </td>
                    <td valign="middle">
                      <span style="font-family:Georgia,'Times New Roman',serif;font-size:20px;line-height:1.25;color:#211e2b;">
                        Beyond the Statute
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="email-gutter" style="padding:34px 40px 38px;">
                ${content}
              </td>
            </tr>

            <tr>
              <td class="email-gutter" style="padding:20px 40px 24px;border-top:1px solid #e7e0f0;background-color:#fbf9fd;">
                <p style="margin:0;color:#625a6b;font-size:12px;line-height:1.7;">
                  Beyond the Statute · Independent publication
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

const welcomeTemplate = Handlebars.compile(`
  <p style="margin:0 0 14px;color:#562f88;font-size:11px;line-height:1.5;text-transform:uppercase;">
    Newsletter
  </p>
  <h1 class="email-title" style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:38px;font-weight:400;line-height:1.15;color:#211e2b;">
    You’re subscribed.
  </h1>
  <p style="margin:0 0 18px;color:#393442;font-size:16px;line-height:1.75;">
    Thanks for joining. We’ll send new articles and publication updates to
    <strong>{{email}}</strong>.
  </p>
  <p style="margin:0 0 18px;color:#625a6b;font-size:14px;line-height:1.75;">
    You can unsubscribe at any time using the link below.
  </p>
  <p style="margin:24px 0 0;font-size:14px;line-height:1.7;">
    <a href="{{unsubscribeUrl}}" style="color:#562f88;text-decoration:underline;">
      Unsubscribe from this newsletter
    </a>
  </p>
`);

const unsubscribeTemplate = Handlebars.compile(`
  <p style="margin:0 0 14px;color:#562f88;font-size:11px;line-height:1.5;text-transform:uppercase;">
    Newsletter
  </p>
  <h1 class="email-title" style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:38px;font-weight:400;line-height:1.15;color:#211e2b;">
    You’re unsubscribed.
  </h1>
  <p style="margin:0 0 18px;color:#393442;font-size:16px;line-height:1.75;">
    <strong>{{email}}</strong> has been removed from the newsletter list. You won’t receive future newsletter emails.
  </p>
  <p style="margin:0;color:#625a6b;font-size:14px;line-height:1.75;">
    You can still read all published articles on the website.
  </p>
`);

const contactTemplate = Handlebars.compile(`
  <p style="margin:0 0 14px;color:#562f88;font-size:11px;line-height:1.5;text-transform:uppercase;">
    Website enquiry
  </p>
  <h1 class="email-title" style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;font-size:34px;font-weight:400;line-height:1.2;color:#211e2b;">
    New {{topic}} enquiry
  </h1>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid #e7e0f0;">
    <tr>
      <td style="padding:12px 12px 12px 0;border-bottom:1px solid #e7e0f0;color:#625a6b;font-size:13px;">Name</td>
      <td style="padding:12px 0;border-bottom:1px solid #e7e0f0;color:#211e2b;font-size:14px;">{{name}}</td>
    </tr>
    <tr>
      <td style="padding:12px 12px 12px 0;border-bottom:1px solid #e7e0f0;color:#625a6b;font-size:13px;">Email</td>
      <td style="padding:12px 0;border-bottom:1px solid #e7e0f0;color:#211e2b;font-size:14px;">{{email}}</td>
    </tr>
    <tr>
      <td style="padding:12px 12px 12px 0;border-bottom:1px solid #e7e0f0;color:#625a6b;font-size:13px;">Organization</td>
      <td style="padding:12px 0;border-bottom:1px solid #e7e0f0;color:#211e2b;font-size:14px;">
        {{#if organization}}{{organization}}{{else}}Not provided{{/if}}
      </td>
    </tr>
  </table>

  <p style="margin:22px 0 8px;color:#625a6b;font-size:13px;">Message</p>
  <p style="margin:0;color:#393442;font-size:15px;line-height:1.75;white-space:pre-wrap;">{{message}}</p>
`);

export async function sendNewsletterWelcomeEmail({
  email,
  unsubscribeUrl,
}: {
  email: string;
  unsubscribeUrl: string;
}): Promise<boolean> {
  const smtpUrl = process.env.SMTP_URL;
  const from = process.env.EMAIL_FROM;

  if (!smtpUrl || !from) return false;

  const transporter = nodemailer.createTransport(smtpUrl);
  const content = welcomeTemplate({ email, unsubscribeUrl });

  await transporter.sendMail({
    from,
    to: email,
    subject: 'You’re subscribed to the newsletter',
    text: `Thanks for subscribing. You can unsubscribe at any time: ${unsubscribeUrl}`,
    html: emailFrame(
      'Thanks for joining the Beyond the Statute newsletter.',
      content
    ),
    attachments: [{ ...logoAttachment }],
    headers: {
      'List-Unsubscribe': `<${unsubscribeUrl}>`,
    },
  });

  return true;
}

export async function sendNewsletterUnsubscribeEmail({
  email,
}: {
  email: string;
}): Promise<boolean> {
  const smtpUrl = process.env.SMTP_URL;
  const from = process.env.EMAIL_FROM;

  if (!smtpUrl || !from) return false;

  const transporter = nodemailer.createTransport(smtpUrl);
  const content = unsubscribeTemplate({ email });

  await transporter.sendMail({
    from,
    to: email,
    subject: 'You have been unsubscribed',
    text: `${email} has been removed from the newsletter list. You won't receive future newsletter emails.`,
    html: emailFrame(
      'You have been removed from the newsletter list.',
      content
    ),
    attachments: [{ ...logoAttachment }],
  });

  return true;
}

export async function sendContactEnquiryEmail({
  name,
  email,
  topic,
  organization,
  message,
}: {
  name: string;
  email: string;
  topic: string;
  organization?: string;
  message: string;
}): Promise<boolean> {
  const smtpUrl = process.env.SMTP_URL;
  const from = process.env.EMAIL_FROM;

  if (!smtpUrl || !from) return false;

  const transporter = nodemailer.createTransport(smtpUrl);
  const safeTopic = topic.replaceAll('-', ' ');
  const content = contactTemplate({
    name,
    email,
    topic: safeTopic,
    organization,
    message,
  });

  const text = [
    `New ${safeTopic} enquiry from Beyond the Statute website`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Organization: ${organization || 'Not provided'}`,
    `Topic: ${safeTopic}`,
    '',
    message,
  ].join('\\n');

  await transporter.sendMail({
    from,
    to: 'beyondthestatutee@gmail.com',
    replyTo: { name, address: email },
    subject: `Website enquiry: ${safeTopic}`,
    text,
    html: emailFrame(`New website enquiry: ${safeTopic}`, content),
    attachments: [{ ...logoAttachment }],
  });

  return true;
}

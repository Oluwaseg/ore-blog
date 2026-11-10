import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';

const welcomeTemplate = Handlebars.compile(`
<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f7f3ed;color:#302b29;font-family:Arial,sans-serif;">
    <main style="max-width:560px;margin:0 auto;padding:40px 24px;">
      <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#684d8f;">Beyond the Statute · Newsletter</p>
      <h1 style="font-family:Georgia,serif;font-size:32px;font-weight:400;line-height:1.2;">You’re subscribed.</h1>
      <p style="font-size:16px;line-height:1.7;">Thanks for joining. We’ll send new articles and publication updates to {{email}}.</p>
      <p style="font-size:14px;line-height:1.7;">You can unsubscribe at any time using the link below.</p>
      <p style="margin-top:28px;"><a href="{{unsubscribeUrl}}" style="color:#684d8f;">Unsubscribe from this newsletter</a></p>
    </main>
  </body>
</html>
`);

const unsubscribeTemplate = Handlebars.compile(`
<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f7f3ed;color:#302b29;font-family:Arial,sans-serif;">
    <main style="max-width:560px;margin:0 auto;padding:40px 24px;">
      <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#684d8f;">Beyond the Statute · Newsletter</p>
      <h1 style="font-family:Georgia,serif;font-size:32px;font-weight:400;line-height:1.2;">You’re unsubscribed.</h1>
      <p style="font-size:16px;line-height:1.7;">{{email}} has been removed from the newsletter list. You won’t receive future newsletter emails.</p>
      <p style="font-size:14px;line-height:1.7;">You can still read all published articles on the website.</p>
    </main>
  </body>
</html>
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

  if (!smtpUrl || !from) {
    return false;
  }

  const html = welcomeTemplate({ email, unsubscribeUrl });
  const transporter = nodemailer.createTransport(smtpUrl);

  await transporter.sendMail({
    from,
    to: email,
    subject: 'You’re subscribed to the newsletter',
    text: `Thanks for subscribing. You can unsubscribe at any time: ${unsubscribeUrl}`,
    html,
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

  if (!smtpUrl || !from) {
    return false;
  }

  const html = unsubscribeTemplate({ email });
  const transporter = nodemailer.createTransport(smtpUrl);

  await transporter.sendMail({
    from,
    to: email,
    subject: 'You have been unsubscribed',
    text: `${email} has been removed from the newsletter list. You won't receive future newsletter emails.`,
    html,
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
  const text = [
    `New ${safeTopic} enquiry from Beyond the Statute website`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Organization: ${organization || 'Not provided'}`,
    `Topic: ${safeTopic}`,
    '',
    message,
  ].join('\n');

  await transporter.sendMail({
    from,
    to: 'beyondthestatutee@gmail.com',
    replyTo: { name, address: email },
    subject: `Website enquiry: ${safeTopic}`,
    text,
  });

  return true;
}

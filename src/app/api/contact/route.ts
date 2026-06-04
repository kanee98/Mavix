import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  goal?: string;
  message?: string;
};

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request payload.' }, { status: 400 });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const phone = clean(payload.phone);
  const goal = clean(payload.goal);
  const message = clean(payload.message);

  if (!name || !email || !phone || !goal || !message) {
    return NextResponse.json({ message: 'Please complete all required fields.' }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = process.env.SMTP_SECURE !== 'false';
  const to = process.env.CONTACT_TO || 'hello@mavix.lk';

  if (!host || !user || !pass) {
    return NextResponse.json({ message: 'SMTP is not configured.' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const submittedAt = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Colombo',
  });

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New Website Inquiry</h2>
      <p style="margin: 0 0 20px;">A new consultation request was submitted from the Mavix website.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tr><td style="padding: 8px 0; font-weight: 700; width: 150px;">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Phone</td><td>${escapeHtml(phone)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Growth Goal</td><td>${escapeHtml(goal)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Message</td><td>${escapeHtml(message).replace(/\n/g, '<br />')}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Submitted</td><td>${escapeHtml(submittedAt)}</td></tr>
      </table>
    </div>
  `;

  const text = [
    'New Website Inquiry',
    '',
    'A new consultation request was submitted from the Mavix website.',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Growth Goal: ${goal}`,
    '',
    'Message:',
    message,
    '',
    `Submitted: ${submittedAt}`,
  ].join('\n');

  try {
    await transporter.sendMail({
      from: `Mavix Website <${user}>`,
      to,
      replyTo: email,
      subject: 'Website Inquiry from Mavix Website',
      text,
      html,
    });

    return NextResponse.json({ message: 'Your consultation request has been sent.' });
  } catch (error) {
    console.error('Contact form SMTP error:', error);
    return NextResponse.json(
      { message: 'Your request could not be sent. Please contact us through WhatsApp or Facebook.' },
      { status: 500 }
    );
  }
}

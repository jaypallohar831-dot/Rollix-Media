
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testEmail() {
  console.log('--- SMTP Diagnostic ---');
  console.log('Host:', process.env.SMTP_HOST || 'smtp.gmail.com');
  console.log('Port:', process.env.SMTP_PORT || '587');
  console.log('User:', process.env.SMTP_USER);
  console.log('Pass Length:', process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0);
  console.log('Admin Email:', process.env.ADMIN_EMAIL);

  const isGmail = (process.env.SMTP_HOST || 'smtp.gmail.com').includes('gmail.com');
  
  const config = isGmail ? {
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  } : {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  const transporter = nodemailer.createTransport(config);

  try {
    console.log('Attempting verification...');
    await transporter.verify();
    console.log('✅ Connection verified!');

    console.log('Sending test message...');
    const info = await transporter.sendMail({
      from: `"Diagnostic Test" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Diagnostic Test - " + new Date().toISOString(),
      text: "Testing email functionality at " + new Date().toLocaleString(),
    });

    console.log('✅ Email sent! Message ID:', info.messageId);
    console.log('Response:', info.response);
  } catch (error) {
    console.error('❌ Diagnostic Failed:');
    console.error(error);
  }
}

testEmail();

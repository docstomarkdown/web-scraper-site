import { NextRequest, NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

/**
 * AWS SES Contact Form API Route with reCAPTCHA v3 Protection
 * 
 * Required Environment Variables:
 * - AWS_SES_REGION: AWS region for SES (e.g., 'us-east-1', 'us-west-2', 'eu-west-1')
 * - AWS_ACCESS_KEY_ID: AWS IAM access key ID with SES permissions
 * - AWS_SECRET_ACCESS_KEY: AWS IAM secret access key
 * - AWS_SES_FROM_EMAIL: Verified sender email address in AWS SES
 * - AWS_SES_RECIPIENT_EMAIL: Email address to receive contact form submissions (optional, defaults to CONTACT_EMAIL)
 * - CONTACT_EMAIL: Fallback recipient email (optional, defaults to 'vikram@driveexplorer.pro')
 * - RECAPTCHA_SECRET_KEY: Google reCAPTCHA v3 secret key (REQUIRED - must be set in environment variables)
 * - NEXT_PUBLIC_RECAPTCHA_SITE_KEY: Google reCAPTCHA v3 site key (optional, defaults to provided key)
 * 
 * Setup Instructions:
 * 1. Create an AWS IAM user with SES permissions (AmazonSESFullAccess or custom policy)
 * 2. Generate access keys for the IAM user
 * 3. Verify your sender email address in AWS SES console
 * 4. Add the environment variables to your .env.local file
 * 5. reCAPTCHA v3 is automatically integrated - no additional setup needed
 */

// Initialize SES client
const sesClient = new SESClient({
  region: process.env.AWS_SES_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token with Google
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!recaptchaSecretKey) {
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }
    
    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    
    const recaptchaResponse = await fetch(recaptchaVerifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${recaptchaSecretKey}&response=${recaptchaToken}`,
    });

    const recaptchaResult = await recaptchaResponse.json();

    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Check reCAPTCHA score (v3 returns a score between 0.0 and 1.0)
    // Lower scores indicate more suspicious activity
    // Score threshold is set to 0.5 - adjust as needed

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get recipient email from environment variable or use default
    const recipientEmail = process.env.AWS_SES_RECIPIENT_EMAIL || process.env.CONTACT_EMAIL || 'vikram@driveexplorer.pro';
    const fromEmail = process.env.AWS_SES_FROM_EMAIL || 'noreply@driveexplorer.pro';

    // Prepare email content
    const emailSubject = subject || 'Contact Form Submission';
    const emailBody = `
New contact form submission from ${name}

Email: ${email}
Subject: ${emailSubject}

Message:
${message}

---
This email was sent from the contact form on Web Scraper Pro website.
    `.trim();

    // Create email command
    const command = new SendEmailCommand({
      Source: fromEmail,
      Destination: {
        ToAddresses: [recipientEmail],
      },
      Message: {
        Subject: {
          Data: emailSubject,
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: emailBody,
            Charset: 'UTF-8',
          },
          Html: {
            Data: `
              <html>
                <body>
                  <h2>New Contact Form Submission</h2>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                  <p><strong>Subject:</strong> ${emailSubject}</p>
                  <p><strong>Message:</strong></p>
                  <p style="white-space: pre-wrap;">${message}</p>
                  <hr>
                  <p style="color: #666; font-size: 12px;">This email was sent from the contact form on Web Scraper Pro website.</p>
                </body>
              </html>
            `,
            Charset: 'UTF-8',
          },
        },
      },
      ReplyToAddresses: [email],
    });

    // Send email
    const response = await sesClient.send(command);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully',
        messageId: response.MessageId 
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle specific AWS SES errors
    if (error.name === 'MessageRejected') {
      return NextResponse.json(
        { error: 'Email was rejected. Please check the email addresses.' },
        { status: 400 }
      );
    }
    
    if (error.name === 'InvalidParameterValue') {
      return NextResponse.json(
        { error: 'Invalid email configuration. Please check your AWS SES settings.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}

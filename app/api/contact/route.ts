import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
import { NextRequest, NextResponse } from "next/server"

const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
})

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, captcha } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!captcha) {
      return NextResponse.json({ error: "CAPTCHA token missing" }, { status: 400 })
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
    if (!recaptchaSecret) {
      return NextResponse.json(
        { error: "Server configuration error: missing RECAPTCHA_SECRET_KEY" },
        { status: 500 }
      )
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captcha}`
    const recaptchaRes = await fetch(verifyUrl, { method: "POST" })
    const recaptchaJson = await recaptchaRes.json()

    if (!recaptchaJson.success || recaptchaJson.score < 0.5) {
      return NextResponse.json(
        {
          error: `CAPTCHA verification failed: ${recaptchaJson["error-codes"]?.[0] || "low-score"}`,
        },
        { status: 400 }
      )
    }

    const sourceEmail = process.env.AWS_SOURCE_EMAIL
    if (!sourceEmail) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }
    const toEmail: string = process.env.AWS_TO_EMAIL || sourceEmail

    const command = new SendEmailCommand({
      Source: sourceEmail,
      Destination: {
        ToAddresses: [toEmail],
      },
      ReplyToAddresses: [email],
      Message: {
        Subject: {
          Data: subject || "Inquiry via Website",
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: `You have received a new message from the contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            Charset: "UTF-8",
          },
        },
      },
    })

    await sesClient.send(command)

    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Error in /api/contact:", error)
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    )
  }
}

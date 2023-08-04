const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_USER,
    pass: process.env.NEXT_PUBLIC_SMTP_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "Not authorized to perform this action",
    });
  }

  const body = JSON.parse(req.body);
  const { name, email, phone, subject, message } = body;

  const messageSend = await transport.sendMail({
    from: "hello@adcomet.co",
    to: "issyah@adcomet.co, fauzanj@adcomet.co, fadli@adcomet.co",
    subject: `Contact form enquiry: ${subject}`,
    html: `<p>Company: ${name}</p><p>Email: ${email}</p>${
      phone ? `<p>Phone: ${phone}</p>` : undefined
    }<p>${message}</p>`,
  });
  if (messageSend?.messageId) {
    res.status(200).json({
      status: true,
      message:
        "Your message has been sent to the team! Please wait 1-5 working days to get a response from us!",
    });
  } else {
    res.status(400).json({
      status: false,
      message: "Uh oh! Something went wrong. Please try again later.",
    });
  }
}

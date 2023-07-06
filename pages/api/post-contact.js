/**
 * sends email from contact us form*/
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
    return res.status(405).json({
      status: false,
      message: "Not authorized",
    });
  }
  const body = JSON.parse(req.body);
  const { company, email, message } = body;

  const messageSend = await transport.sendMail({
    from: "issyah@adcommet.com",
    to: "issyah@adcommet.com, fauzanj@adcommet.com, fadli@adcommet.com",
    subject: `Adcommet enquiry from ${company}`,
    html: `<p>${message}</p> <p>Company: ${company}</p> <p>Email:${email}</p>`,
  });

  if (messageSend?.messageId) {
    res.status(200).json({
      status: true,
      message:
        "Your message has been sent to the team! Please wait 1-5 working days to get a response from us.",
    });
  } else {
    res.status(400).json({
      status: false,
      message: "Error! Something went wrong. Please try again",
    });
  }
}

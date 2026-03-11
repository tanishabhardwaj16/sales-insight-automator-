const nodemailer = require("nodemailer");

async function sendEmail(recipient, summary){

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: "Sales Insight Summary",
        text: summary
    });

}

module.exports = sendEmail;
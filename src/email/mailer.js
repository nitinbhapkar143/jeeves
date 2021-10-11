const nodemailer = require('nodemailer');

exports.sendMail = async to => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const result = await transporter.sendMail({
            from: `Support <${process.env.EMAIL}>`,
            to: to,
            subject: `New User Registered.`,
            html: `You are registered.`
        });
        console.log(`${result.accepted.length} mails sent. ${result.rejected.length} mails rejected.`)
    } catch (err) {
        throw err;
    }
}

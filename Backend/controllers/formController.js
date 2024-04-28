const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL , //email id which your are using for sending mail (smtp)
        pass: process.env.PASSWORD , //app password of the email id
    },
});

const apiSendContactMail = (name, email, subject, message, receiverEmail) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: receiverEmail,
        subject: `${ name } wants to connect with you - ${ subject } `,
        html: `
    <p p > Hello,</p >
            <p>You have a new message from ${name} (${email}):</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <p>Best Regards from codestream,</p>
`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
};


const sendMail = async (req, res) => {
    try {

        receiverEmail = req.params.receiveremail;

        const { name, email, subject, message } = req.body;

        // Call the sendContactMessage function
        apiSendContactMail(name, email, subject, message, receiverEmail);

        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error handling contact form submission:', error);
        res.status(500).json({ error: 'Internal server error.', message: 'Something went wrong try agail.' });
    }
}

module.exports = {
    sendMail
}
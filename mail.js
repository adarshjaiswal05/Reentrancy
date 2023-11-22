const nodemailer = require('nodemailer');



// Configure nodemailer for sending emails
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'testkroji347@gmail.com',
        pass: 'nmmjzxebbuqcjvnb',
    },
    tls: {
        rejectUnauthorized: false,
    },
});

// Function to send an email
const sendEmail = async () => {
    const mailOptions = {
        from: 'testkroji347@gmail.com',
        to: "sumitsingh@apptunix.com",
        subject: 'Notification: Deposite Function Called',
        text: 'The vulnerable function in your smart contract has been called. Take action!',
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Error sending email:', error);
        }
        console.log('Email sent:', info.response);
    });
}

module.exports = {
    sendEmail,
}

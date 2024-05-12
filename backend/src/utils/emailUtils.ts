import nodemailer from 'nodemailer';

export const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendResetCodeByEmail = async (email: string, code: string) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS,
        }
    });

    const mailOptions = {
        from: 'mohammadpalestinefree@gmail.com',
        to: email,
        subject: 'Password Reset Code',
        html: `
            <p>Hello,</p>
            <p>You have requested a password reset. Please use the following code to reset your password:</p>
            <h2 style="font-size: 24px; color: #333; background-color: #f5f5f5; padding: 10px 20px;">${code}</h2>
            <p>This code is valid for 10 minutes. If you did not request a password reset, you can ignore this email.</p>
            <p>Best regards,<br/>Your App Team</p>
        `
    };


    await transporter.sendMail(mailOptions);
};

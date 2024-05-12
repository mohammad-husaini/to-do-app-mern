import { Request, Response } from 'express';
import ResetCode from '../models/ResetCode.js';
import { generateRandomCode, sendResetCodeByEmail } from '../utils/emailUtils.js';
import User from '../models/User.js';

export const requestPasswordReset = async (req: Request, res: Response) => {

    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Email dose not exist' });
        }

        const existingResetCode = await ResetCode.findOne({ email, expiresAt: { $gt: new Date() } });

        if (existingResetCode) {
            return res.status(400).json({ message: 'A reset code has already been sent to this email address' });
        }


        const resetCode = generateRandomCode();

        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        const resetCodeData = new ResetCode({
            email,
            code: resetCode,
            expiresAt
        });
        await resetCodeData.save();


        await sendResetCodeByEmail(email, resetCode);

        res.status(200).json({ message: 'Reset code sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send reset code' });
    }
};


export const verifyResetCode = async (req: Request, res: Response) => {
    const { email, code } = req.body;

    try {
        const resetCodeData = await ResetCode.findOne({ email, code });

        if (!resetCodeData) {
            return res.status(400).json({ message: 'Invalid or expired reset code' });
        }

        if (resetCodeData.expiresAt < new Date()) {
            return res.status(400).json({ message: 'Reset code has expired' });
        }

        res.status(200).json({ message: 'Reset code verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to verify reset code' });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const { email, code, newPassword } = req.body;

    try {

        const resetCodeData = await ResetCode.findOne({ email, code });

        if (!resetCodeData) {

            return res.status(400).json({ message: 'Invalid or expired reset code' });
        }

        if (resetCodeData.expiresAt < new Date()) {

            return res.status(400).json({ message: 'Reset code has expired' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one number and one symbol' });
        }

        user.password = newPassword;
        await user.save();

        await ResetCode.deleteOne({ email, code });

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to reset password' });
    }
};
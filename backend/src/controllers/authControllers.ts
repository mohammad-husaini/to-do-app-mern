import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { DecodedToken, authRequest } from '../@types/auth.js';


export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }


        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one number and one symbol' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        let image;
        if (req.file) {
            image = req.file.buffer;
        }

        user = new User({
            username,
            email,
            password: password,
            image,
        });

        await user.save();


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as Secret, {
            expiresIn: '7d',
        });



        res.status(201).json({ token });
    } catch (error: any) {
        if (error.code === 11000 && error.keyPattern.username) {
            return res.status(400).json({ message: 'Username is already taken' });
        } else {
            console.error(error.message);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as Secret, {
            expiresIn: '7d',
        });


        res.status(200).json({ token, user: user.image });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}



export async function checkToken(req: authRequest, res: Response): Promise<void> {
    try {

        const token = req.headers.authorization;

        if (!token) {
            res.status(401).json({ message: 'Authorization token not provided' });
            return
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken
        if (!decodedToken) {
            res.status(401).json({ message: 'Invalid authorization token' });
            return
        }
        const user = await User.findById(decodedToken.userId)
        if (!user) {

            res.status(404).json({ message: 'User not found' });
            return
        }

        req.user = user;

        res.status(200).json({ message: 'Authorized User' });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: 'Authorization token has expired' });
            return
        }
        console.error('Error authenticating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

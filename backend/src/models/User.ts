import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    image?: Buffer;
}

const userSchema: Schema<UserDocument> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: Buffer },
});


userSchema.pre<UserDocument>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error: any) {
        next(error);
    }
});
const User = mongoose.model<UserDocument>('User', userSchema);


export default User;

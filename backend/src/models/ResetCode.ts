import mongoose, { Schema, Document } from 'mongoose';

export interface IResetCode extends Document {
    email: string;
    code: string;
    expiresAt: Date;
}

const ResetCodeSchema: Schema = new Schema({
    email: { type: String, required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true }
});

export default mongoose.model<IResetCode>('ResetCode', ResetCodeSchema);

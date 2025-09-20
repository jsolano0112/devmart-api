import { model, Schema } from 'mongoose';
import { IUser } from './interfaces/users';

const userSchema = new Schema<IUser>({
  id: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: false },
  mobilePhone: { type: String, required: false },
  city: { type: String, required: false },
  zipCode: { type: Number, required: false },
  isActive: { type: Boolean, default: false },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});
export const User = model<IUser>('User', userSchema);

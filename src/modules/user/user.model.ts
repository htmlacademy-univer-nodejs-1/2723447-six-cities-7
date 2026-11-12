import {Schema, model, type InferSchemaType} from 'mongoose';

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  avatarUrl: {type: String},
  password: {type: String, select: false},
  isPro: {type: Boolean, required: true}
}, {timestamps: true, collection: 'users'});

export type UserDocument = InferSchemaType<typeof userSchema>;
export const UserModel = model('User', userSchema);

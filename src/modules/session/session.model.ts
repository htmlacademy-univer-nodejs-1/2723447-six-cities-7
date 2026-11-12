import {Schema, model, type InferSchemaType} from 'mongoose';

const sessionSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  tokenHash: {type: String, required: true, unique: true, select: false},
  expiresAt: {type: Date, required: true}
}, {timestamps: true, collection: 'sessions'});
sessionSchema.index({expiresAt: 1}, {expireAfterSeconds: 0});

export type SessionDocument = InferSchemaType<typeof sessionSchema>;
export const SessionModel = model('Session', sessionSchema);

import {createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
import {inject, injectable} from 'inversify';
import {Component} from '../../shared/container/types.js';
import type {UserServiceInterface} from '../user/user-service.interface.js';
import type {SessionModel} from '../session/session.model.js';
import type {AuthServiceInterface} from './auth-service.interface.js';
import type {CreateUserDto} from '../user/dto/create-user.dto.js';
import type {HydratedDocument} from 'mongoose';
import type {UserDocument} from '../user/user.model.js';

const scrypt = promisify(scryptCallback);
const tokenHash = (token: string): string => createHash('sha256').update(token).digest('hex');

@injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @inject(Component.UserService) private readonly users: UserServiceInterface,
    @inject(Component.SessionModel) private readonly sessions: typeof SessionModel
  ) {}

  public async register(data: CreateUserDto & {password: string}): Promise<HydratedDocument<UserDocument>> {
    if (await this.users.findByEmail(data.email)) {
      throw new Error('Пользователь с таким email уже существует');
    }
    const salt = randomBytes(16).toString('hex');
    const hash = (await scrypt(data.password, salt, 64) as Buffer).toString('hex');
    return this.users.create({...data, password: `${salt}:${hash}`});
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.users.findByEmailWithPassword(email);
    if (!user?.password) {
      throw new Error('Неверный email или пароль');
    }
    const [salt, stored] = user.password.split(':');
    if (!salt || !stored) {
      throw new Error('Неверный email или пароль');
    }
    const candidate = await scrypt(password, salt, 64) as Buffer;
    const expected = Buffer.from(stored, 'hex');
    if (candidate.length !== expected.length || !timingSafeEqual(candidate, expected)) {
      throw new Error('Неверный email или пароль');
    }
    const token = randomBytes(32).toString('hex');
    await this.sessions.create({user: user._id, tokenHash: tokenHash(token), expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)});
    return token;
  }

  public async check(token: string): Promise<HydratedDocument<UserDocument> | null> {
    const session = await this.sessions.findOne({tokenHash: tokenHash(token), expiresAt: {$gt: new Date()}}).exec();
    return session ? this.users.findById(session.user) : null;
  }

  public async logout(token: string): Promise<void> {
    await this.sessions.deleteOne({tokenHash: tokenHash(token)}).exec();
  }
}

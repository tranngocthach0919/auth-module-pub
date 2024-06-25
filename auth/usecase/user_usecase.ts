import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import type { IAuthUseCase } from '../interfaces/usecase';
import type { IAuthRepository } from '../interfaces/repository';

import type { InsertUserDTO } from '../infras/transport/dto/auth_register';
import type { LoginUserDTO } from '../infras/transport/dto/auth_login';

import { User, UserPermission } from '../model/user';
import { ErrUserExists, ErrUserNotFound } from '../model/user.error';

import { generateRandomString } from '~/shared/utils/generateRandomString';
import type { ITokenService } from '~/shared/interfaces/token-service';


export class AuthUseCase implements IAuthUseCase {
  constructor(
    readonly authRepository: IAuthRepository,
    readonly tokenService: ITokenService
  ) { }

  async regitser(dto: InsertUserDTO): Promise<boolean> {

    try {
      dto.validate();
    } catch (error: any) {

      throw new Error(error.message);
    }

    let user = await this.authRepository.findByEmail(dto.email);

    if (user) {
      throw ErrUserExists;
    }

    let salt = generateRandomString(8);

    let password = dto.password + salt;

    let hashedPassword = await bcrypt.hash(password, 10);

    let user_id = uuidv4();

    let newUser = new User(
      user_id,
      dto.first_name,
      dto.last_name,
      dto.email,
      hashedPassword,
      salt,
      'active',
      dto.role
    )

    await this.authRepository.insert(newUser);

    const userActions = new UserPermission(
      uuidv4(),
      dto.actions,
      user_id,
    )
    
    await this.authRepository.insertPermission(userActions);

    return true;
  }

  async login(dto: LoginUserDTO): Promise<string> {
    try {
      dto.validate();
    } catch (error: any) {
      throw new Error(error.message);
    }

    const user = await this.authRepository.findByEmail(dto.email);
    if (!user) {
      throw ErrUserNotFound;
    }

    const isPasswordValid = await bcrypt.compare(dto.password + user.salt, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = await this.tokenService.generateToken(user.id);
    return token;
  }

}

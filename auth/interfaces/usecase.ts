import type { LoginUserDTO } from '../infras/transport/dto/auth_login';
import type { InsertUserDTO } from '../infras/transport/dto/auth_register';

export interface IAuthUseCase {
  regitser(dto: InsertUserDTO): Promise<boolean>;

  login(dto: LoginUserDTO): Promise<string>;
}
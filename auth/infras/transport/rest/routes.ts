
import { Router, type Request, type Response } from 'express';

import type { ITokenService } from '~/shared/interfaces/token-service';
import type { IAuthRepository } from '../../../interfaces/repository';
import type { IAuthUseCase } from '../../../interfaces/usecase';

import { InsertUserDTO } from '../dto/auth_register';
import { LoginUserDTO } from '../dto/auth_login';

import { authMiddleware } from '~/shared/middleware/auth-middleware';
import { authorizeMiddleWare } from '~/shared/middleware/authorization-middleware';

import { actions } from '~/shared/constant/actions.contat';
import { roles } from '~/shared/constant/roles.constant';

import { ErrUserNotFound } from '../../../model/user.error';

export class AuthService {
  constructor(
    readonly authUseCase: IAuthUseCase,
    readonly tokenService: ITokenService,
    readonly authReponsitory: IAuthRepository
  ) { }

  async register(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, password, role, actions } = req.body;
      const userDTO = new InsertUserDTO(first_name, last_name, email, password, role, actions);
      
      let user = await this.authUseCase.regitser(userDTO);

      res.status(201).send({ code: 201, message: 'insert user successful', data: user });

    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }


  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const loginDTO = new LoginUserDTO(email, password);

      const token = await this.authUseCase.login(loginDTO);

      return res.status(200).json({ message: 'Login successful', token });

    } catch (error: any) {
      if (error === ErrUserNotFound) {
        return res.status(404).json({ error: 'User not found' });
      } else if (error.message === 'Invalid password') {
        return res.status(401).json({ error: 'Invalid password' });
      } else {
        return res.status(400).json({ error: error.message });
      }
    }
  }


  setupRoutes(): Router {
    const router = Router();
    const auth = authMiddleware(this.tokenService, this.authReponsitory);

    router.post('/auth/admin/register', auth, authorizeMiddleWare([roles.ADMIN], actions.CREATED), this.register.bind(this));
    router.post('/auth', this.register.bind(this));
    router.post('/auth/login', this.login.bind(this));

    return router;
  }
}

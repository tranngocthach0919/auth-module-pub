import type { Request, Response, NextFunction } from 'express';
import type { ITokenService } from '../interfaces/token-service';
import type { IUserRepository } from '../../modules/auth/interfaces/repository';

export function authMiddleware(tokenService: ITokenService, userRepository: IUserRepository) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await tokenService.verifyToken(token);
    if (!userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const actions = await userRepository.findPermissionsByUserId(userId);

    req.user = { id: user.id, role: user.role, actions};

    next();
  };
}

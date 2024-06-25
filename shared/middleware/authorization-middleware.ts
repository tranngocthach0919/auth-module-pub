import type { Request, Response, NextFunction } from 'express';

export function authorizeMiddleWare(allowedRoles: string[], requiredActions: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userActions = req.user?.actions || 0;
    const userRole = req.user?.role || '';

    const isAuthorized = allowedRoles.includes(userRole) && ((userActions & requiredActions) === requiredActions);

    if (isAuthorized) {
      return next();
    } else {
      return res.status(403).send('Forbidden');
    }
  };
}



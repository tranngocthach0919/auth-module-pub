import jwt from 'jsonwebtoken'
import type { ITokenService } from '../interfaces/token-service'

export class JwtTokenService implements ITokenService {
  private readonly secretKey: string
  private readonly expiresIn: string | number

  constructor(secretKey: string, expiresIn: string | number) {
    this.secretKey = secretKey
    this.expiresIn = expiresIn
  }

  async generateToken(userId: string): Promise<string> {
    const payload = { userId }
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn })
  }

  async verifyToken(token: string): Promise<string | null> {
    try {
      const decoded = jwt.verify(token, this.secretKey) as { userId: string }
      return decoded.userId
    } catch (error) {
      return null
    }
  }
}

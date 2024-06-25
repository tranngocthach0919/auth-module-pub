export interface ITokenService {
    generateToken(id: string): Promise<string>; 
    verifyToken(token: string): Promise<string | null>; 
}
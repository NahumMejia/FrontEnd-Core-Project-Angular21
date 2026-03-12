import { JwtPayload as JwtDecodePayload } from 'jwt-decode';

export interface AuthTokens {
  token: string;
  refreshToken: string;
}

export interface JwtPayload extends JwtDecodePayload {
  authorities?: string[];
}

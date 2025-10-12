export interface JWTPayload {
  email: string;
  isAdmin: boolean;
  uuid: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

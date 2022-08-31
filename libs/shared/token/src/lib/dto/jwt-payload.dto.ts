export interface AuthJwtPayload extends TokenPayload {
  id: number
  email: string
}

export interface TokenPayload {
  type: TokenType
}

export type TokenType = 'LOGIN' | 'RESET_PASSWORD'

export interface ResetPasswordAuthJwtPayload extends TokenPayload {
  email: string
  id: number
}

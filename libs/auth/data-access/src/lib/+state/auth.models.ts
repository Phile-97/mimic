/**
 * Interface for the 'Auth' data
 */
export interface AuthEntity {
  username: string ; // Primary ID
  password: string;
  grant_type: string;
  scope: string;
  client_id: string;
  client_secret: string;
}

export interface LoginResponse{
  access_token: string;
  token_type: string;
}



/**
 * Interface for the 'Users' data
 */
export interface UsersEntity {
  id: string | number; // Primary ID
  username: string; 
  email: string; 
  created_at: string;
  updated_at: string;
}

export interface RegisterUserContext{
  username: string;
  email: string;
  password: string;
}

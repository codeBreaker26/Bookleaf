export type UserRole = 'admin' | 'author' | 'support' | 'guest';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

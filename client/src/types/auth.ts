export type UserRole = 'Admin' | 'Author' | 'Support' | 'Guest';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

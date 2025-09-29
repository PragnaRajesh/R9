export type UserRole = 'recruiter' | 'teamlead' | 'manager' | 'admin';

export interface User {
  email: string;
  role: UserRole;
  name: string;
}

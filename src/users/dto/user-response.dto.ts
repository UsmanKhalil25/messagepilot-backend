export class UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: Partial<UserResponseDto>) {
    Object.assign(this, user);
  }
}

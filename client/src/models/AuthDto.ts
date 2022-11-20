export interface LoginDto {
  email: string;
  password: string;
}

export interface RegistrationDto extends LoginDto{
  username: string;
}

export interface ILoginDto {
  email: string;
  password: string;
}

export interface IRegistrationDto extends ILoginDto{
  username: string;
}

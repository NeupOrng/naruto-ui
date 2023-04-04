
export interface ILoginRequest 
{
  Email: string,
  Password: string
}

export class LoginRequest implements ILoginRequest
{
  Email: string;
  Password: string;

  get GetLoginRequest(): ILoginRequest {
    return {
      Email: this.Email,
      Password: this.Password
    }
  }

  constructor() {
    this.Email = '';
    this.Password = '';
  }
}
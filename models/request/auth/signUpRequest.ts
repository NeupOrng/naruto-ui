export interface ISignUpRequest 
{
  Username: string,
  Email: string,
  Password: string
}

export class SignUpModel implements ISignUpRequest {
  Username: string = "";
  Email: string = "";
  Password: string = "";
  ConfirmPassword: string = "";

  public get IsConfirmPasswordCorrect(): Boolean {
    return this.Password === this.ConfirmPassword;
  }

  public get SignUpRequest(): ISignUpRequest {
    const request: ISignUpRequest = {
      Username: this.Username,
      Email: this.Email,
      Password: this.Password,
    };
    return request;
  }
}

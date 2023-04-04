
export interface IAuthStoreState {
  GetToken: () => string,
  UpdateToken: (token: string) => void,
}
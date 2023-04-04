import axios, { Axios, AxiosInstance } from "axios";
import { IAxiosApiResponse } from "~~/models/baseApiResponse";
import { ILoginRequest } from "~~/models/request/auth/loginRequest";
import { ISignUpRequest } from "~~/models/request/auth/signUpRequest";
import { IUserResponseDto } from "~~/models/response/auth/userResponse.dto";
import { useAuthStore } from "~~/store/auth";

console.log(process.env)
const baseUrl = "http://localhost:3000/api";
const authStore = useAuthStore();

const getAxiosInstance = (isAuth: boolean = true): AxiosInstance => {
  const headers = {
    'X-Custom-Header': 'foobar',
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': ''
  };

  if(isAuth) {
    headers['Authorization'] = `Bearer ${authStore.GetToken}`;
  }

  return axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers
  })
}

const apiCalling = {
  Register: (request: ISignUpRequest): Promise<IAxiosApiResponse<IUserResponseDto>> => {
    return getAxiosInstance(false).post('/auth/signup', request);
  },
  Login: (request: ILoginRequest): Promise<IAxiosApiResponse<IUserResponseDto>> => {
    return getAxiosInstance(false).post('/auth/login', request);
  },
}

export default apiCalling;

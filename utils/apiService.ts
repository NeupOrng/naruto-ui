import axios, { Axios, AxiosInstance } from "axios";
import { error } from "console";
import { IAxiosApiResponse, IBaseApiResponse } from "~~/models/baseApiResponse";
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

  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      
      const dataResponse: IBaseApiResponse<null> = {
        Message: error.message,
        ErrorCode: 500,
        Data: null
      };
      const response: IAxiosApiResponse<null> = {
        data: dataResponse
      };

      return response;
    }
  )

  return instance;
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

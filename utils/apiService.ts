import axios, { Axios } from "axios";
import { IAxiosApiResponse } from "~~/models/baseApiResponse";
import { ISignUpRequest } from "~~/models/request/auth/signUpRequest";

console.log(process.env)
const baseUrl = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'X-Custom-Header': 'foobar',
    'Content-Type': 'application/json; charset=utf-8',
  }
})

const apiCalling = {
  Register: (request: ISignUpRequest): Promise<IAxiosApiResponse<null>> => {
    return axiosInstance.post('/auth/signup', request);
  }
}

export default apiCalling;

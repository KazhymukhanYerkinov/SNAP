import axios, { AxiosResponse } from 'axios';
import { UserType } from '../shared/types';

export const instance = axios.create({
  baseURL: 'http://localhost:7788'
});

instance.interceptors.request.use((request: any) => {
  request.headers['Content-Type'] = 'application/json';
  return request; 
});


export enum ResultCodeEnum {
  Success = 200,
}

export const API = {
  getUsers(currentPage: number, term: string): Promise<AxiosResponse<Array<UserType>>>  {
    return instance.get(`/users?_page=${currentPage}&_limit=${8}&q=${term}`);
  },
  createUser(user: UserType, totalCount: number) {
    return instance.post(`/users`, { ...user, id: totalCount + 1, });
  },
}
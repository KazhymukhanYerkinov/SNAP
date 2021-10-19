import axios, { AxiosResponse } from 'axios';
import { UserType } from '../shared/types';

export const instance = axios.create({
  baseURL: 'http://localhost:7788'
});

export enum ResultCodeEnum {
  Success = 200,
}

export const API = {
  getUsers(currentPage: number, term: string): Promise<AxiosResponse<Array<UserType>>>  {
    return instance.get(`/users?_page=${currentPage}&_limit=${8}&q=${term}`);
  }
}
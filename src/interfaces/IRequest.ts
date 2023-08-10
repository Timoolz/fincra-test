import { Request } from 'express';

export interface IAuthRequest extends Request {
  token?: string;
  pricipal?: any;

}
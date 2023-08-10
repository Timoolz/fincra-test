import { Request, Response, RequestHandler, NextFunction } from 'express';
import { UserType } from '../interfaces/UserType';
import jwt from 'jsonwebtoken';

import {EnvConfig} from '../config';
import { IAuthRequest } from '../interfaces/IRequest';


class TokenSecurity {

  static config(): TokenSecurity {
    return new TokenSecurity();
  }

  private extractAuthToken(req: Request): string {

    if (req.headers.authorization) {
      if (/^bearer/i.test(req.headers.authorization)) {
        return req.headers.authorization.split(/\s+/)[1];
      }
    }
    return '';
  }
  
  isAuthUser(userTypes: UserType[]): RequestHandler{

    return async (req: IAuthRequest, res: Response, next: NextFunction) => {
  
      const token = this.extractAuthToken(req);
  
      // No API token provided
      if (!token) {
        res.status(401).json(transformResponse?.(401, 'Invalid authorization provided'));
        return;
      }

      try{
        const verified = await jwt.verify(token, EnvConfig.jwtKey);

      
        if(verified){
          req.pricipal = verified;
          req.token = token;
        }
      } catch(err){
        res.status(401).json(transformResponse?.(401, 'Invalid authorization provided'));
        return;
      }
  

      if (!userTypes.includes(req.pricipal.role as unknown as UserType)    ) {
        res.status(401).json(transformResponse?.(403, 'User does not have permission'));
        return;
      }

      next();


    };
  }

}

export const transformResponse = (code: number, message: any): any => {
  const data: any = {};
  if (code === 401) {
    data.code = 'TOKEN_MISSING';
  } else if (code === 403) {
    data.code = 'ACCESS_DENIED';
  } else {
    data.code = 'SERVER_ERROR';
  }
  
  if (message instanceof Error) {
    data.message = message.message;
  } else if (typeof message === 'string') {
    data.message = message;
  } else {
    data.message = 'Unable to verify request';
  }
  
  if (typeof message === 'object' && message.data) {
    data.data = message.data;
  }
  return data;
};


export const Security = TokenSecurity.config();
export default TokenSecurity;
import { Response, Request } from 'express';
import { authService } from '../services';
import { HandleErrorResponse } from '../utils/errors/ErrorHandlers';
import { IUser } from '../entities';
import {AuthResponse} from '../interfaces/IResponse';

export const AuthController = {

  async login(request: Request, response: Response) {
    try {

      const requestBody = <IUser>request.body;

      const authResponse: AuthResponse = await authService.login(requestBody);
      return response.status(200).json(authResponse);
    } catch (error) {
      return HandleErrorResponse(error, response);
    }
  },



  async signup(request: Request, response: Response) {
    try {

      const requestBody = <IUser>request.body;

      const authResponse: AuthResponse = await authService.signup(requestBody);
      return response.status(200).json(authResponse);
    } catch (error) {
      return HandleErrorResponse(error, response);
    }
  }


};

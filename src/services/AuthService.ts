import { IUser } from '../entities';
import { AuthResponse } from '../interfaces/IResponse';
import { UnauthorizedAccess, BadRequest } from '../utils/errors/ErrorHandlers';

import { userService } from './UserService';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import {EnvConfig} from '../config';
import { UserType } from '../interfaces/UserType';





export const authService = {


  async login(user: IUser): Promise<AuthResponse>{
    
    const existingUser = await userService.findUserByEmail(user.email);

    if(!existingUser){
      throw new UnauthorizedAccess({ message: 'Invalid email or password' });
    }

    const correctPassword =  await bcrypt.compare( user.password, existingUser.password);

    if(!correctPassword){
      throw new UnauthorizedAccess({ message: 'Invalid email or password' });
    }

    const payload = {
      id: existingUser._id,
      email: existingUser.email,
      role: existingUser.userType,
    };
    const token = jwt.sign(payload, EnvConfig.jwtKey);
    
    return Promise.resolve({
      id :existingUser._id,
      name: existingUser.name,
      token,
      email: existingUser.email,
      userType: existingUser.userType
    });
            
  },



  async signup(user: IUser): Promise<AuthResponse>{
    
    const existingUser = await userService.findUserByEmail(user.email);

    if(existingUser){
      throw new BadRequest({ message: 'User already exists, go to login' });
    }

    user.userType = UserType.USER;
    const createdUser = await userService.createUser(user);

    const payload = {
      id: createdUser._id,
      email: createdUser.email,
      role: createdUser.userType,
    };
    const token = jwt.sign(payload, EnvConfig.jwtKey);
    
    return Promise.resolve({
      id :createdUser._id,
      name: createdUser.name,
      token,
      email: createdUser.email,
      userType: createdUser.userType
    });
            
  },



};
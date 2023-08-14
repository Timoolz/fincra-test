

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { authService } from '../src/services/AuthService';
import { userService } from '../src/services/UserService';
import { BadRequest, UnauthorizedAccess } from '../src/utils/errors/ErrorHandlers';
import { EnvConfig } from '../src/config';
import { IUser } from '../src/entities';
import { UserType } from '../src/interfaces/UserType';


const mockFindUserByEmail = jest.fn();
const mockCreateUser = jest.fn();

const mockBcryptCompare = jest.fn();
const mockJwtSign = jest.fn();



describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  beforeEach(() => {
    userService.findUserByEmail = mockFindUserByEmail;
    userService.createUser = mockCreateUser;

    bcrypt.compare = mockBcryptCompare;
    jwt.sign = mockJwtSign;
  });

  describe('login', () => {

    it('should successfully login a user', async () => {
      const user = {
        email: 'test@example.com',
        password: 'password123',
      } as unknown as IUser;

      const existingUser = {
        _id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        userType: 'user',
        password: 'hashed_password', // hashed password
      };

      const token = 'fake_token';

      mockFindUserByEmail.mockResolvedValue(existingUser);
      mockBcryptCompare.mockResolvedValue(true);
      mockJwtSign.mockReturnValue(token);

      const result = await authService.login(user);

      expect(mockFindUserByEmail).toHaveBeenCalledWith(user.email);
      expect(mockBcryptCompare).toHaveBeenCalledWith(user.password, existingUser.password);
      expect(mockJwtSign).toHaveBeenCalledWith(
        {
          id: existingUser._id,
          email: existingUser.email,
          role: existingUser.userType,
        },
        EnvConfig.jwtKey
      );

      expect(result).toEqual({
        id: existingUser._id,
        name: existingUser.name,
        token,
        email: existingUser.email,
        userType: existingUser.userType,
      });

    });

    it('should throw UnauthorizedAccess if user is not found', async () => {
      const user = {
        email: 'nonexistent@example.com',
        password: 'password123',
      } as unknown as IUser;

      mockFindUserByEmail.mockResolvedValue(null);

      try {
        await authService.login(user);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedAccess);
      }
    });

    it('should throw UnauthorizedAccess if password is incorrect', async () => {
      const user = {
        email: 'test@example.com',
        password: 'incorrect_password',
      } as unknown as IUser;

      const existingUser = {
        _id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        userType: 'user',
        password: 'hashed_password', // hashed password
      };

      mockFindUserByEmail.mockResolvedValue(existingUser);
      mockBcryptCompare.mockResolvedValue(false);

      try {
        await authService.login(user);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedAccess);
      }
    });

  });



  describe('signup', () => {
    it('should successfully register a user', async () => {
      const user = {
        email: 'newuser@example.com',
        password: 'password123',
        name: 'New User',
      } as unknown as IUser;

      mockFindUserByEmail.mockResolvedValue(null);
      mockCreateUser.mockResolvedValue({
        _id: 'newuser123',
        ...user,
        userType: UserType.USER,
      });

      const token = 'fake_token';

      mockJwtSign.mockReturnValue(token);

      const result = await authService.signup(user);

      expect(mockFindUserByEmail).toHaveBeenCalledWith(user.email);
      expect(mockCreateUser).toHaveBeenCalledWith({
        ...user,
        userType: UserType.USER,
      });
      expect(mockJwtSign).toHaveBeenCalledWith(
        {
          id: 'newuser123',
          email: user.email,
          role: UserType.USER,
        },
        EnvConfig.jwtKey
      );

      expect(result).toEqual({
        id: 'newuser123',
        name: user.name,
        token,
        email: user.email,
        userType: UserType.USER,
      });

    });

    it('should throw BadRequest if user already exists', async () => {
      const user = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'Existing User',
      } as unknown as IUser;

      mockFindUserByEmail.mockResolvedValue({
        _id: 'existinguser123',
        ...user,
        userType: UserType.USER,
      });

      try {
        await authService.signup(user);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequest);
      }
    });
  });



});

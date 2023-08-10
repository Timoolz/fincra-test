import { UserType } from './UserType';

export type AuthResponse = {
    id: string
    name: string;
    email: string;
    token: string;
    userType: UserType
  };

export type StatusResponse = {
    successful: boolean
    message?: string;
  };
// export default AuthResponse;

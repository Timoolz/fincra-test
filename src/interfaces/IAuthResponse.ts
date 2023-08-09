import { UserType } from './UserType';

type AuthResponse = {
    id: string
    name: string;
    email: string;
    token: string;
    userType: UserType
  }
export default AuthResponse;

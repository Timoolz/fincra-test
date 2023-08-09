import { User , IUser} from '../entities/User';

export const userRepository = {




  async createUser(data: IUser) : Promise<IUser>{
    return new User(data).save();
  },


  async findByEmail(email: string) : Promise<IUser| null>{
    return  await User.findOne({email: email});
  }




};
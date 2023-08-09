
import { IUser } from '../entities';
import usersJson from '../../seeds/users.json';
import { SeedConfigType } from '../interfaces/SeedConfigType';
import { userService } from '../services';



const usersFromJson = usersJson as unknown as SeedConfigType;


export async function createBaseUsers() {

  const users: IUser[] = usersFromJson.users;


  if (
    !Array.isArray(users) 
  ) {
    return;
  }


  for (const user of users) {




    const userInDB = await userService.findUserByEmail(user.email);

    if (!userInDB) {
      await userService.createUser(user);
    } 

  }
}

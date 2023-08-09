
import { createBaseUsers } from './seedUser';



export async function seedBaseData() {

  await createBaseUsers();

}
import { User } from '../Models/user';

export default interface UserService {
  getAll(): typeof User[]
  getForId(id:string): typeof User
}
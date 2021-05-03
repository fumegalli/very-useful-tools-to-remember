import {User} from '../models/user';
import {UserDto} from '../services/User';

class UserRepository {
  public static async findByEmail(email: string): Promise<User | null> {
    return User.findOne({email});
  }

  public static async create(user: UserDto): Promise<User> {
    return User.create(user);
  }
}

export {UserRepository};

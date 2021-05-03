import {UserRepository} from '../repositories/User';
import * as yup from 'yup';
import {ApiError} from '../errors/ApiError';
import {User} from '../models/user';
import {AuthService} from './Auth';

export interface UserDto {
  email: string;
  password: string;
}

class UserService {
  public static async create(userToCreate: UserDto): Promise<User> {
    const {email, password} = userToCreate;

    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    try {
      await schema.validate(userToCreate, {abortEarly: false});
    } catch (err) {
      throw new ApiError(err, 400);
    }

    const alreadyExistingUser = await UserRepository
        .findByEmail(userToCreate.email);

    if (alreadyExistingUser) throw new ApiError('Email must be unique', 409);

    const encryptedPassword = await AuthService.hashPassword(password);

    const user = await UserRepository.create({
      email,
      password: encryptedPassword,
    });

    return user;
  }
}

export {UserService};

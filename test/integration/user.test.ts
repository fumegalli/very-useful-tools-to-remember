import request from 'supertest';
import {app} from '../../src/app';
import {User} from '../../src/models/user';
import {UserDto} from '../../src/services/User';
import {AuthService} from '../../src/services/Auth';

describe('User tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('create', () => {
    it('should return status 201 and create a new user with encrypted password', async () => {
      const newUser: UserDto = {
        email: 'any@email.com',
        password: 'any_password',
      };
      const encryptedPassword = 'any_password_encrypted';

      jest
          .spyOn(AuthService, 'hashPassword')
          .mockResolvedValue(encryptedPassword);

      const response = await request(app).post('/users').send(newUser);
      console.log('Testing');
      expect(response.status).toBe(201);
      expect(response.body.id).toEqual(expect.any(String));
      expect(response.body.password).not.toEqual(newUser.password);
      expect(response.body.password).toEqual(encryptedPassword);
    });

    it('should return status 409 if an user with provided email already exists', async () => {
      const alreadyExistingUser: UserDto = {
        email: 'any@email.com',
        password: 'any_password',
      };

      await new User(alreadyExistingUser).save();

      const conflictedEmailUser: UserDto = {
        email: 'any@email.com',
        password: 'any_password',
      };

      const response = await request(app).post('/users').send(conflictedEmailUser);

      expect(response.status).toBe(409);
      expect(response.body.message).toEqual('Email must be unique');
    });

    it('should return status 400 when email is not provided', async () => {
      const invalidUserRequest = {
        password: 'any_password',
      };

      const response = await request(app).post('/users').send(invalidUserRequest as UserDto);

      expect(response.status).toBe(400);
      expect(response.body.message.errors[0]).toEqual('email is a required field');
    });

    it('should return status 400 when email is not valid', async () => {
      const invalidEmailUser: UserDto = {
        email: 'invalid_email',
        password: 'any_password',
      };

      const response = await request(app).post('/users').send(invalidEmailUser);

      expect(response.status).toBe(400);
      expect(response.body.message.errors[0]).toEqual('email must be a valid email');
    });

    it('should return status 400 when password is not provided', async () => {
      const invalidPasswordUser = {
        email: 'any@email.com',
      };

      const response = await request(app).post('/users').send(invalidPasswordUser as UserDto);

      expect(response.status).toBe(400);
      expect(response.body.message.errors[0]).toEqual('password is a required field');
    });
  });
});

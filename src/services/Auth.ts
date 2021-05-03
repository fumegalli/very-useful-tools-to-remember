import bcrypt from 'bcrypt';

class AuthService {
  public static hashPassword(password: string, salt = 10): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

export {AuthService};

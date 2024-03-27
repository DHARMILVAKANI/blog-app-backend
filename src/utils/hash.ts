import { hashSync, compareSync } from 'bcrypt';

export const createHash = (password: string) => {
  return hashSync(password, 10);
};

export const compareHash = (password: string, hashedPassword: string) => {
  return compareSync(password, hashedPassword);
};

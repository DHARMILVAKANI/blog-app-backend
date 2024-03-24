import { hashSync, compareSync } from 'bcrypt';

export const createHash = (password: string) => {
  return hashSync(password, 10);
};

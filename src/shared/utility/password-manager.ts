import * as bcrypt from 'bcryptjs';  // Changez cette ligne comme indiqué

/*export const generateHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);  // Utilisation de la fonction sur bcrypt
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashPassword: string,
) => {
  return await bcrypt.compare(password, hashPassword);
};*/

export const generateHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashPassword: string,
) => {
  return await bcrypt.compare(password, hashPassword);
};

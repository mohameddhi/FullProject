/*import * as jwt from 'jsonwebtoken';
import config from 'config';

export const generateAuthToken = (id: string) => {
  return jwt.sign({ id }, config.get<string>('jwtSecret'), {
    expiresIn: '30d',
  });
};

export const decodeAuthToken = (token: string) => {
  return jwt.verify(token, config.get<string>('jwtSecret'));
};*/
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

export const generateAuthToken = (id: string) => {
  const jwtSecret = config.has('jwtSecret') ? config.get<string>('jwtSecret') : null;

  if (!jwtSecret) {
    throw new Error('Configuration "jwtSecret" introuvable');
  }

  return jwt.sign({ id }, jwtSecret, { expiresIn: '30d' });
};

export const decodeAuthToken = (token: string) => {
  const jwtSecret = config.has('jwtSecret') ? config.get<string>('jwtSecret') : null;

  if (!jwtSecret) {
    throw new Error('Configuration "jwtSecret" introuvable');
  }
 
  return jwt.verify(token, jwtSecret);
};





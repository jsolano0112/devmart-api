import emailExistence from 'email-existence';
import { Exception } from './exception-message';

export const validateEmailDomain = async (email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    emailExistence.check(email, (err, res) => {
      if (err) {
        return resolve(false);
      }

      if (!res) {
        return reject(new Exception('The email provided does not exist.', 550));
      }

      return resolve(true);
    });
  });
};

import emailExistence from 'email-existence';
import { userStatusCode550 } from '../../user/domain/models/interfaces/user-response';

export const validateEmailDomain = async (email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    emailExistence.check(email, (err, res) => {
      if (err) {
        return resolve(false);
      }

      if (!res) {
        return reject(userStatusCode550);
      }

      return resolve(true);
    });
  });
};

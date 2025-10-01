import { IResponse } from '../../../../shared/interfaces/response';

export const notificationCreatedStatus: IResponse = {
  statusCode: 200,
  message: 'Notification created succesfully.',
};

export const notificationDeletedStatus: IResponse = {
  statusCode: 200,
  message: 'Notification deleted succesfully.',
};

import { NotificationModel } from "../../../models/NotificationModel";
export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const CLEAR = 'CLEAR';

interface AddNotificationAction {
  type: typeof ADD;
  payload: NotificationModel;
}

interface RemoveNotificationAction {
  type: typeof REMOVE;
  payload: NotificationModel;
}

interface ClearNotificationsAction {
  type: typeof CLEAR;
}

export type NotificationAction = AddNotificationAction | RemoveNotificationAction | ClearNotificationsAction;

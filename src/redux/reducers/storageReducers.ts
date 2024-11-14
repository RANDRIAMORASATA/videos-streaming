import { ADD, CLEAR, NotificationAction, REMOVE } from './types/actions';
import { NotificationModel } from '../../models/NotificationModel';

interface StorageState {
  notifications: NotificationModel[];
}

const initState: StorageState = {
  notifications: []
};

export const storageReducers = (
  state: StorageState = initState,
  action: NotificationAction
): StorageState => {
  switch (action.type) {
    case ADD:
      return {
        notifications: [...state.notifications, action.payload!]
      };
    case REMOVE:
      return {
        notifications: state.notifications.filter(
          (notif: NotificationModel) => notif._id !== action.payload?._id
        )
      };
    case CLEAR:
      return {
        ...initState
      };
    default:
      return state;
  }
};

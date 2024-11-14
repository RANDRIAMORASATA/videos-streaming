import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Notification.css';
import { NotificationModel } from '../../models/NotificationModel';
import { getNotifications } from '../../redux/selectors/selectors';
import { REMOVE } from '../../redux/reducers/types/actions';
interface NotificationProps { }

const Notification: FC<NotificationProps> = () => {
  const notifications: NotificationModel[] = useSelector(getNotifications)
  const dispatch = useDispatch()
  const handleDelete = (notification: NotificationModel) => {
    dispatch({
      type: REMOVE,
      payload: notification
    })
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {
      notifications.map((notification: NotificationModel) => {
        setTimeout(() => {
          dispatch({
            type: REMOVE,
            payload: notification
          })
        }, notification?.timeOut || 1000)
      })
    };
    runLocalData();
  }, []); // Added dependency array to avoid infinite loops

  return (
    <div className="Notification">
      {notifications.map((notification, index) => (
        <div key={index} className={`alert alert-${notification.status}`} role="alert">
          {notification.message}
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='alert'
            aria-label="close"
            onClick={() => handleDelete(notification)}

          ></button>
        </div>

      ))}
    </div>
  );
}

export default Notification;

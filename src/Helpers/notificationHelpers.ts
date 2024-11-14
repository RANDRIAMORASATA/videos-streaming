import { NotificationModel } from "../models/NotificationModel";


export const emitNotification =(dispatch:(data:any)=>void, message: string, status: string = 'success', type:any,timeOut: number = 2000)=>{
    let notification: NotificationModel = {
        _id: (Math.random() * 45263).toString(),
        message: message,
        status: status
      };
      dispatch({
        type: type,
        payload: notification
      });
 }
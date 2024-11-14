import { NotificationModel } from "../../../src/models/NotificationModel"

const ADD = 'ADD'
const REMOVE = 'REMOVE'
export interface NotificationAction {
    type: typeof ADD | typeof REMOVE | null
    payload: NotificationModel | null
}
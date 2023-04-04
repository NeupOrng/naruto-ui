import { ElNotification } from 'element-plus';

enum enumMessageStatus {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info'

}

const notification = (message: string, type: enumMessageStatus, title?:string): void => {
  ElNotification({
    title,
    message,
    type,
    duration: 3000,
  });
};
export {
  notification,
  enumMessageStatus
};
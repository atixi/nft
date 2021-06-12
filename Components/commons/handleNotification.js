import { notification } from 'antd';
const HandleNotification = (type, title, text) => {
    notification[type]({
        message: title,
        placement: 'topRight',
        description: text,
    });
};
export default HandleNotification;
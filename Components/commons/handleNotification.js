import { notification } from "antd";
const HandleNotification = (type, title, text, postion = "topRight") => {
  notification[type]({
    message: title,
    placement: postion,
    description: text,
  });
};
export default HandleNotification;

import { notification } from "antd";
const CustomNotification = (type, title, text, postion = "topRight") => {
  notification[type]({
    message: title,
    placement: postion,
    description: text,
    duration: 10,
  });
};
export default CustomNotification;

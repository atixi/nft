import react from "react"
import { Modal, Form, notification } from "antd"
import { signin } from '../store/action/accountSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router"
function LoginModal({ showLoginModal, setShowLoginModal }) {

    const dispatch = useDispatch();
    const router = useRouter()
    const onFinish = async (values) => {
        try {
            const res = await dispatch(signin(values));
            if (res.meta?.requestStatus === "fulfilled") {
                setShowLoginModal(false)
                router.push("/")
            }
            else if (res.meta?.requestStatus === "rejected") {
                notification["error"]({
                    duration: 5,
                    message: "Username or Password is wrong",
                });
            }
        } catch (err) {
            console.log('ERR:Login:onFinish ', err);
        }
    };

    const handleCancel = () => {
        setShowLoginModal(false);
    };
    return (<Modal visible={showLoginModal} footer={false} onCancel={handleCancel}>
        <Form onFinish={onFinish} name="contactForm" id='contact_form' className="form-border" method="post" action='blank.php'>
            <h3>Login to your account</h3>
            <div className="field-set">
                <label>Email</label>
                <Form.Item name={"username"} rules={[
                    {
                        required: true,
                        message: 'This Field is Required',
                    },
                ]}>
                    <input type='text' name='name' id='name' className="form-control" placeholder="" />
                </Form.Item>
            </div>
            <div className="field-set">
                <label>Password</label>
                <Form.Item name={"password"} rules={[
                    {
                        required: true,
                        message: 'This Field is Required',
                    },
                ]}>
                    <input type='password' name='email' id='email' className="form-control" placeholder="" />
                </Form.Item>
            </div>
            <div id='submit'>
                <input type='submit' id='send_message' value='Login' className="btn btn-main color-2" />

            </div>
        </Form>
    </Modal>)
}
export default LoginModal
import react from "react"
import { Modal, Form } from "antd"
import { signin } from '../store/action/accountSlice';
import { useDispatch } from 'react-redux';
function LoginModal({ showLoginModal, setShowLoginModal }) {

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        console.log("submitting")
        try {
            const res = await dispatch(signin(values));
            if (res.meta?.requestStatus === "fulfilled") {
                setShowLoginModal(false)
            }
            else if (res.meta?.requestStatus === "rejected") {
                console.log("username or password is wrong")
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
                <label>Username</label>
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
                <div id='mail_success' class='success'>Your message has been sent successfully.</div>
                <div id='mail_fail' class='error'>Sorry, error occured this time sending your message.</div>
                <div className="clearfix"></div>
                <div className="spacer-single"></div>
            </div>
        </Form>
    </Modal>)
}
export default LoginModal
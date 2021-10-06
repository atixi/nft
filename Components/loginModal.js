import react, { useState } from "react"
import { Modal, Form, notification, Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';

import { signin } from '../store/action/accountSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router"
const antIcon = <LoadingOutlined style={{ fontSize: 16, marginLeft: "-25px", marginRight: "20px", position: "relative", top: "-5px", color: "white" }} spin />;
function LoginModal({ showLoginModal, setShowLoginModal }) {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter()
    const onFinish = async (values) => {
        setLoading(true)
        try {
            const res = await dispatch(signin(values));
            if (res.meta?.requestStatus === "fulfilled") {
                setLoading(false)
                setShowLoginModal(false)
                router.push("/")
            }
            else if (res.meta?.requestStatus === "rejected") {
                setLoading(false)
                notification["error"]({
                    duration: 5,
                    message: "Username or Password is wrong",
                });
            }
        } catch (e) {
            setLoading(false)
            notification["error"]({
                duration: 5,
                message: e,
            });
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
                <button type='submit' id='send_message' className="btn btn-main color-2">{loading && <Spin indicator={antIcon} color={"white"} />} Login</button>
            </div>
        </Form>
    </Modal>)
}
export default LoginModal
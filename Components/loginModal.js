import react, { useState } from "react"
import { Modal, Form, Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import { signin } from '../store/action/accountSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router"
import { Notification } from "../Utils/utils"
const antIcon = <LoadingOutlined style={{ fontSize: 16, marginLeft: "-25px", marginRight: "20px", position: "relative", top: "-5px", color: "white" }} spin />;
function LoginModal({ showLoginModal, setShowLoginModal }) {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter()
    const NavigateTo = (path) => {
        return router.push(path)
    }
    const onFinish = async (values) => {
        setLoading(true)
        const res = await dispatch(signin(values));
        if (res.meta?.requestStatus === "fulfilled") {
            setShowLoginModal(false)
            NavigateTo("/")
        }
        if (res.meta?.requestStatus === "rejected") {
            Notification("Username or Password is wrong", "error")
        }
        setLoading(false)
    };
    return (<Modal visible={showLoginModal} footer={false} onCancel={() => setShowLoginModal(false)}>
        <Form onFinish={onFinish} id='contact_form' className="form-border">
            <h3>Login to your account</h3>
            <div className="field-set">
                <label>Email</label>
                <Form.Item name={"username"} rules={[
                    {
                        required: true,
                        message: 'This Field is Required',
                    },
                ]}>
                    <input type='text' className="form-control" />
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
                    <input type='password' className="form-control" />
                </Form.Item>
            </div>
            <div id='submit'>
                <button type='submit' className="btn btn-main color-2">{loading && <Spin indicator={antIcon} color={"white"} />} Login</button>
            </div>
        </Form>
    </Modal>)
}
export default LoginModal
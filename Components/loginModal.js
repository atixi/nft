import react from "react"
import { Modal } from "antd"

function LoginModal({ showLoginModal, setShowLoginModal }) {
    const handleCancel = () => {
        setShowLoginModal(false);
    };
    return (<Modal visible={showLoginModal} footer={false} onCancel={handleCancel}>
        <form name="contactForm" id='contact_form' class="form-border" method="post" action='blank.php'>
            <h3>Login to your account</h3>
            <div class="field-set">
                <label>Username</label>
                <input type='text' name='name' id='name' class="form-control" placeholder="" />
            </div>
            <div class="field-set">
                <label>Password</label>
                <input type='password' name='email' id='email' class="form-control" placeholder="" />
            </div>
            <div id='submit'>
                <input type='submit' id='send_message' value='Login' class="btn btn-main color-2" />
                <div id='mail_success' class='success'>Your message has been sent successfully.</div>
                <div id='mail_fail' class='error'>Sorry, error occured this time sending your message.</div>
                <div class="clearfix"></div>
                <div class="spacer-single"></div>
            </div>
        </form>
    </Modal>)
}
export default LoginModal
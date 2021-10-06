import react, { useState, useEffect } from "react"
function Login() {
    return <div className="no-bottom" id="content">
        {/* <div id="top"></div> */}
        <section id="subheader" className="text-light AssetSubheader" data-bgimage="url(images/background/subheader.jpg) top">
            <div className="center-y relative text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1>Register</h1>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        </section>
        <section aria-label="section">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 offset-md-3">
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
                    </div>
                </div>
            </div>
        </section>
    </div>
}
export default Login;
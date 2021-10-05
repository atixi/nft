import react, { useState, useEffect } from "react"
function Register() {
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
                    <div class="col-md-8 offset-md-2">
                        <h3>Don't have an account? Register now.</h3>
                        <p>Sell, buy and create assets by creating an account</p>

                        <div class="spacer-10"></div>

                        <form name="contactForm" id='contact_form' class="form-border" method="post" action='blank.php'>

                            <div class="row">

                                <div class="col-md-6">
                                    <div class="field-set">
                                        <label>Name:</label>
                                        <input type='text' name='name' id='name' class="form-control" />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="field-set">
                                        <label>Email Address:</label>
                                        <input type='text' name='email' id='email' class="form-control" />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="field-set">
                                        <label>Choose a Username:</label>
                                        <input type='text' name='username' id='username' class="form-control" />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="field-set">
                                        <label>Phone:</label>
                                        <input type='text' name='phone' id='phone' class="form-control" />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="field-set">
                                        <label>Password:</label>
                                        <input type='text' name='password' id='password' class="form-control" />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="field-set">
                                        <label>Re-enter Password:</label>
                                        <input type='text' name='re-password' id='re-password' class="form-control" />
                                    </div>
                                </div>


                                <div class="col-md-12">

                                    <div id='submit' class="pull-left">
                                        <input type='submit' id='send_message' value='Register Now' class="btn btn-main color-2" />
                                    </div>

                                    <div id='mail_success' class='success'>Your message has been sent successfully.</div>
                                    <div id='mail_fail' class='error'>Sorry, error occured this time sending your message.</div>
                                    <div class="clearfix"></div>

                                </div>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    </div>
}
export default Register;
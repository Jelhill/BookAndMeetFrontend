import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class ForgotPassword extends Component {
    render() {
        return (
            <div className="loginBackground" onClick={this.onClose}>
            <div className="loginmodal">
                <div className="LoginLeft">
                    <h1 className="boardRoom">BoardRoom</h1>
                </div>
                <div className="LoginRight">
                    <div className='LoginHeader'>
                        <button className="closeWrapper"><span className="close" onClick={this.onClose} >&times;</span></button>
                    </div>
                    <div className="forgotPassword">
                    <h4 className="forgotPasswordText">Forget Password?</h4>
                        <form>
                            <div className="form-group ">
                                <input type="email" className=" form-control forgotEmail" placeholder="enter your email address"/>
                                <input type="submit" value="Send" className="form-control forgetSubmit"  onClick={this.handleSignup} />
                            </div>
                        </form>
                        <p>I did not receive the email</p>
                        <input type="submit" value="Resend" className="form-control forgetSubmit" onClick={this.handleSignup} />
                            <p className="forgetPasswordParagraph">Not a member ? <Link>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
           
        )
    }
}

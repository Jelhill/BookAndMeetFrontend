import React, { Component } from "react";
import Login from "../Modals/Login";
import SignUp from "../Modals/signup";
import { connect } from "react-redux"
import {Link} from 'react-router-dom'
import { showSignup, showSignIn} from "../../Actions/userActions"
import '../../App.css';

class Landing2 extends Component {
  state = {
    show: false,
    show2: false
  };

  showLogin = e => {
    this.setState({
      show: !this.state.show
    });
    this.props.showLogin(false)
  };
  

  handleSignIn = () => this.props.showSignin(true)
  openSignUpModal = () => this.props.showSignup(true)
  signInNew = () => this.props.signInModal(true)
 
  render() {
    return (        
        <div className="landingWrapper">
          <div className="header">
            <div className="logoWrapper">
              <h2 className="logo">LOGO</h2>
            </div>

          <div className="loginSignupWrapper" >
          
            <Link id="login" to="" onClick={this.handleSignIn}>Login</Link>
            <Link id="signup" to="" onClick={this.openSignUpModal}>Sign up</Link>

            <Login />  
            <SignUp />
            </div>
          </div>

          <div className="landingBody">
              <input type="text" placeholder="Conference room" id="search"></input>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { userReducer } = state
  return {  
    signUpFormDetails: userReducer.signUpFormDetails,
    showSignUp: userReducer.showSignUp,
    showSignIn: userReducer.showSignIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showSignin: (values) => dispatch(showSignIn(values)),
    showSignup: (values) => dispatch(showSignup(values))    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Landing2);

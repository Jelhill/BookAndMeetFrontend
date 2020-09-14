import React, { Component } from 'react'
import logo from "../../Images/meeting.png"
import { Link } from "react-router-dom"
import Login from "../Modals/Login";
import SignUp from "../Modals/Signup"
import { connect } from "react-redux"
import { showSignup, showSignIn} from "../../Actions/userActions"
import SuccessRegisterModal from '../Modals/SuccessRegisterModal';
import { updateStateForHeader, showLogout } from "../../Actions/userActions"
import { getWithExpiry } from "../../Actions/helperFunctions"
import Logout from '../Modals/Logout';


class LandingPageHeader extends Component {
  openLogOutModal = () => this.props.showLogout(true)

    componentDidMount = () => {
      const response = getWithExpiry("token")
      this.props.updateStateForHeader(response)
    }

    handleSignIn = () => this.props.showSignin(true)
    openSignUpModal = () => this.props.showSignup(true)
    signInNew = () => this.props.signInModal(true)

    render() {
        return (
            <div className="header">
            <div className="logoWrapper">
              <img src={logo} alt="Logo"/>
              <h2 className="logo">boardroom</h2>
            </div>
            <input type="checkbox" id="check"/>
            <label htmlFor="check">
                <i className="fa fa-bars" id="checkBtn" />
            </label>

            {!this.props.isLoggedIn ? 
            <div className="loginSignupWrapper" >
              <span id="login" onClick={this.handleSignIn}>Login</span>
              <span id="signup" onClick={this.openSignUpModal}>Sign up</span>
              <Login />  
              <SignUp />
              <SuccessRegisterModal />
            </div>
          :
            <ul className="landingLoginProfile">
              <Link to="userHistory"><li>History</li></Link>
              <Link to="userProfile"><li>My Profile</li></Link>
              <li onClick={this.openLogOutModal}>Logout</li>
              <Logout />
            </ul> 
          }
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { userReducer } = state
    return {  
      signUpFormDetails: userReducer.signUpFormDetails,
      showSignUp: userReducer.showSignUp,
      showSignIn: userReducer.showSignIn,
      showSuccessfulRegModal: userReducer.showSuccessfulRegModal,
      isLoggedIn: userReducer.isLoggedIn,
      firstname: userReducer.userFirstname,
      id: userReducer.userid,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      showSignin: (values) => dispatch(showSignIn(values)),
      showSignup: (values) => dispatch(showSignup(values)),
      updateStateForHeader: (values) => dispatch(updateStateForHeader(values)),
      showLogout:(value) => dispatch(showLogout(value))   
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(LandingPageHeader);

import React, {Component} from 'react';
import { Link, withRouter } from "react-router-dom"
import { connect } from 'react-redux';
import { showSignIn, getSignupInputs, showSignup } from "../../Actions/userActions"
import { errorMessage } from "../../Actions/userActions"
import { setWithExpiry } from "../../Actions/helperFunctions"
import Signup from './Signup';


class Login extends Component{  

    openSignUpModal = () => {
      this.props.showSignin(false)
      this.props.showSignup(true)
    }
    
    onClose = () => {
        this.props.showSignin(false)  
        this.props.errorMessage("")
    }
    
    getUserInput = (e) => {
      this.props.getSignupInputs({[e.target.name]: e.target.value})
    }
    
    handleLogin = async (e) => {  
      e.preventDefault()
      this.props.errorMessage("")
      console.log(this.props.signUpFormDetails);
      if(!this.props.signUpFormDetails.email || !this.props.signUpFormDetails.password ) {
        let message = "All fields are required"
        this.props.errorMessage(message)
        return 
      }
        fetch(`https://bookandmeet.herokuapp.com/login`, {
        // fetch(`http://localhost:3001/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(this.props.signUpFormDetails)
      })
      .then(response => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse)

        if(jsonResponse.message === "success" && jsonResponse.token !== null){
          const currentRoute = this.props.history.location.pathname;
          localStorage.setItem("user", JSON.stringify(jsonResponse.response))
          setWithExpiry("token", jsonResponse.token, 7200000, jsonResponse.payload)  
          if(currentRoute === "/"){
            this.props.history.push("home")
          }else{
            this.props.history.push(currentRoute)
          }  
          // window.location.reload(true)
          this.onClose()               
        }else{
          this.props.errorMessage(jsonResponse.message)
        }      
      })
      .catch((err) => console.log(err))
    }

    render(){
        if(!this.props.showSignIn){
            return null;
        }
        return(          
            <div className="modalDiv">
              <div className="signupmodal">
                  <div className="leftModal">
                      <h1 className="boardRoom">BoardRoom</h1>
                  </div>
                  <div className="rightModal">
                      <div className="signupheader">
                          <button className="closeWrapper"><span className="close" onClick={this.onClose} >&times;</span></button>
                          <h3 className="modalTitle2">Sign in</h3>
                      </div>
                      <small></small>
                      <div className="modalContent">
                        {!this.props.errorMessageDisplay ? null :
                          <div className="errorMessageDiv">{this.props.errorMessageDisplay}</div>      
                        }                
                      <form>
                       <div className="formDiv">
                         <div className="flexInput">
                         <small></small>
                         <input 
                            type="email" 
                            name="email" 
                            className="input" 
                            placeholder="Email" 
                            onChange={this.getUserInput}
                          />
                          </div>
                          <div className="flexInput">
                          <small></small>
                         <input
                            type="password" 
                            name="password" 
                            className="input" 
                            placeholder="Password" 
                            autoComplete="off" 
                            onChange={this.getUserInput}
                          />
                          </div>
                           <input 
                            type="checkbox" 
                            name="rememberme" 
                            className="checkbox">
                            </input>
                           <label 
                            htmlFor="rememberme">Remember me</label>
                           <span><Link to="#" className="forgetPassword">forget password ?</Link></span>
                         <button 
                            onClick={this.handleLogin}
                            className="form-control signupsubmit">
                             Login
                          </button>
                       </div>
                       </form>
                       <p className="loginparagraph">Not yet registered<span className="linkSignup" onClick={this.openSignUpModal} >Sign up</span></p>
                       <Signup />
                      </div>
                      </div>
                  </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const { userReducer } = state
    return {
      showSignIn: userReducer.showSignIn,
      signUpFormDetails: userReducer.signUpFormDetails,
      errorMessageDisplay: userReducer.errorMessage,
      showSignUp: userReducer.showSignup
    }
}
  
  const mapDispatchToProps = (dispatch) => {
    return {
      showSignin: (values) => dispatch(showSignIn(values)),
      getSignupInputs: (values) => dispatch(getSignupInputs(values)),
      errorMessage: (values) => dispatch(errorMessage(values)),
      showSignup: (values) => dispatch(showSignup(values)),
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
  

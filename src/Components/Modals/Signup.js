import React, {Component} from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import { showSignup, getSignupInputs, successMessage} from "../../Actions/userActions"
import { showValidationError } from "../../Actions/formValidation"
import SuccessRegisterModal from './SuccessRegisterModal'

class SignUp extends Component{

    onClose = (e) => {
      e.preventDefault()
      this.props.showSignup(false)
    }

    userInputValidation = (e) => {
      const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      this.props.showValidationError({name: e.target.name, message: ""})  
      
      if (e.target.name === "password" && e.target.value !== "" && e.target.value.length < 8) {
        this.props.showValidationError({name: e.target.name, message: `${e.target.name} must be at least 8 characters long`})
      }

      if (e.target.name === "email" && e.target.value !== "" && !pattern.test(e.target.value)) {
        this.props.showValidationError({name: e.target.name, message: `${e.target.name} must be a valid email address`})
      }

      if ((e.target.name === "surname" || e.target.name === "firstname" ) && e.target.value !== "" && !/^([a-zA-Z]+)$/.test(e.target.value)) {
        this.props.showValidationError({name: e.target.name, message: `${e.target.name} can only contain letters`})
      }

      if ((e.target.name === "surname" || e.target.name === "firstname" ) && e.target.value !== "" && e.target.value.length < 3) {
        this.props.showValidationError({name: e.target.name, message: `${e.target.name} must contain minimum of 3 characters`})
      }
    }
    
    getUserInput = (e) => {
      this.props.getSignupInputs({[e.target.name]: e.target.value})
      this.userInputValidation(e)    
    }

    handleSignup = (e) => {
      e.preventDefault()
      fetch("https://bookandmeet.herokuapp.com/signUp", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(this.props.signUpFormDetails)
      })
      .then(response => response.json())
      .then((jsonResponse) => {
        console.log("response", jsonResponse)
        if(jsonResponse.message === "Registered Successfully") {
          this.props.successMessage(jsonResponse.message)
        }else{
          this.props.successMessage("Failed Registration")
        }
      })
      .catch((err) => console.log(err))
    }
  
    render(){
        if(this.props.showSignUp === false){
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
                          <h3 className="modalTitle">Sign up</h3>
                      </div>
                      <small className="successulRegistrationMessage">{this.props.successDisplayMessage}</small>
                      <div className="modalContent">
                    <form>
                      <div className="formDiv">
                          <div className="flexInput">
                              <small>{this.props.surnameErrorMessage}</small>
                              <input type="text" name="surname" className="input" placeholder="Surname" onChange={this.getUserInput}/>
                          </div>
                          <div className="flexInput">
                              <small>{this.props.firstnameErrorMessage}</small>
                              <input type="text" name="firstname" className="input" placeholder="First Name" onChange={this.getUserInput}/>  
                          </div>
                        <div className="flexInput">
                            <small>{this.props.emailErrorMessage}</small>
                            <input type="email" name="email" className="input" placeholder="email" onChange={this.getUserInput}/>
                        </div>
                        <div className="flexInput">
                            <small>{this.props.passwordErrorMessage}</small>
                            <input type="password" name="password" className="input" placeholder="password" autoComplete="off" onChange={this.getUserInput}/>
                        </div>
                        <div className="flexInput">
                            <small></small>
                            <input type="password" name="confirmPassword" className="input" placeholder="confirm password" autoComplete="off" onChange={this.getUserInput}/>
                        </div>
                            <input type = "checkbox" name ="rememberme" value="" className="checkbox"></input>
                        <label htmlFor ="rememberme" >Remember me</label>
                        <button className="signupsubmit" onClick={this.handleSignup} >Sign Up</button>
                        
                      </div>                   
                    </form>
                      <p className="loginparagraph">Already have an account? <Link to="#"><span>Sign in</span></Link></p>
                      
                  </div>
                      </div>
                  </div>
                  <SuccessRegisterModal />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
  const { userReducer } = state
  const { formReducer } = state
  return {
    signUpFormDetails: userReducer.signUpFormDetails,
    firstname: userReducer.signUpFormDetails.firstname,
    surname: userReducer.signUpFormDetails.surname,
    email: userReducer.signUpFormDetails.email,
    password: userReducer.signUpFormDetails.password,
    showSignUp: userReducer.showSignUp,
    surnameErrorMessage: formReducer.surnameErrorMessage,
    firstnameErrorMessage: formReducer.firstnameErrorMessage,
    emailErrorMessage: formReducer.emailErrorMessage,
    passwordErrorMessage: formReducer.passwordErrorMessage,
    successDisplayMessage: userReducer.successMessage,
    showSuccessfulRegModal: userReducer.showSuccessfulRegModal
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    showSignup: (values) =>  dispatch(showSignup(values)),
    getSignupInputs: (values) => dispatch(getSignupInputs(values)),
    showValidationError: (values) => dispatch(showValidationError(values)),
    successMessage: (message) => dispatch(successMessage(message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

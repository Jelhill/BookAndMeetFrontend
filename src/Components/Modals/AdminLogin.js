import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { showAdminSignup, getSignupInputs} from '../../Actions/userActions'
import { setWithExpiry } from "../../Actions/helperFunctions"

 
class AdminLogin extends Component {
    onClose = () => {
        e.preventDefault()
        this.props.showAdminLogin(false)  
    }

    getInput = (e) => {
        this.props.getSignupInputs({[e.target.name]:e.target.value})
    }
    handleAdminLogin = (e) => {
        e.preventDefault()
        console.log('log', this.props.signUpFormDetails);
        fetch("https://bookandmeet.herokuapp.com/adminLogin", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(this.props.signUpFormDetails)
      })
      .then(response => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse)
        if(jsonResponse.message === "success" && jsonResponse.token !== null){
          // const unprotectedRoutes = ["home", "aboutRoom" ]
          const currentRoute = this.props.history.location.pathname;
          setWithExpiry("token", jsonResponse.token, 7200000, jsonResponse.payload)  
          if(currentRoute === "/"){
            this.props.history.push("/adminlanding")
          }else{
            this.props.history.push(currentRoute)
          }  
          // window.location.reload(true)
          this.onClose()               
        }       
      })
      .catch((err) => console.log(err))
    }
    render() {
        if(!this.props.showadminsignup){
            return null;
        }
        return (
            <div className="modalDiv">
                <div className="signupmodal">
                    <div className="leftModal">
                        <h1 className="boardRoom">BoardRoom</h1>
                    </div>
                    <div className="rightModal">
                        <div className="signupheader">
                            <button className="closeWrapper"><span className="close" onClick={this.onClose} >&times;</span></button>
                            <h3 className="modalTitle2">Welcome To Admin Portal</h3>
                        </div>
                        {/* <small> Result Here </small> */}
                        <div className="modalContent">
                            <form>
                                <div className="formDiv">
                                    <input
                                        type="email"
                                        name="email"
                                        className="input"
                                        placeholder="Email"
                                        onChange = {this.getInput}
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        className="input"
                                        placeholder="Password"
                                        autoComplete="off"
                                        onChange = {this.getInput}
                                    />
                                    <input
                                        type="checkbox"
                                        name="rememberme"
                                        className="checkbox">
                                    </input>
                                    <label
                                        htmlFor="rememberme">Remember me</label>
                                    <span><Link to="#" className="forgetPassword">forget password ?</Link></span>
                                    <button
                                        onClick={this.handleAdminLogin}
                                        className="form-control signupsubmit">
                                        Login
                              </button>
                                </div>
                            </form>
                            {/* <p className="loginparagraph">Not yet registered <Link to="#"><span>Sign up</span></Link></p> */}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { userReducer } = state
    // const now = new Date()
    //     console.log("Login State", now.getTime(), userReducer.loggedInUserInfo)
    return {
        showadminsignup: userReducer.showAdminLogin,
        signUpFormDetails: userReducer.signUpFormDetails,
    }
}
  
  const mapDispatchToProps = (dispatch) => {
    return {
        showAdminLogin: (values) => dispatch(showAdminSignup(values)), 
      getSignupInputs: (values) => dispatch(getSignupInputs(values)),
    }
  }
 
 export default withRouter( connect(mapStateToProps,mapDispatchToProps)(AdminLogin) )
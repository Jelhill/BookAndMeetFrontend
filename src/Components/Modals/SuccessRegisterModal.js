import React, { Component } from 'react'
import {connect} from 'react-redux'
import { showSuccessfulRegModal}  from '../../Actions/userActions'
import {withRouter} from 'react-router-dom'


class SuccessRegisterModal extends Component {

  closeSuccessRegModal = () => {
    this.props.showSuccessfulRegModal(false)  
  }

  goToProfile = () =>{
    this.props.history.push("/userProfile")
    this.closeSuccessRegModal()
  }

  render() {
    if(!this.props.successfulRegModal){
      return null;
  }
    return (
      <div className="modalDiv">
        <div className="signupmodal">
          <div className="leftModal">
            <h1 className="boardRoom">BoardRoom</h1>
          </div>
          <div className="rightModal">
          {/* <button className="closeWrapper"><span className="close" onClick={this.onClose} >&times;</span></button> */}
                <div>
                  <div className="successContentWrapper">
                  <h1 className="thankyou">Thank You </h1>
                  <p className="paragraph1">Thank you for signing up with BoardRoom we hope you enjoy your time with us </p>
                  <p className="paragraph2">Check your account and update your profile</p>
                  </div>
                  <div>
                    <button className="contdButton" onClick={this.closeSuccessRegModal}>Continue</button>
                  </div>
                  <div><button className="myAccButton" onClick={this.goToProfile}>My Account</button></div>
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
    successfulRegModal: userReducer.showSuccessfulRegModal,

  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    showSuccessfulRegModal: (value) => dispatch(showSuccessfulRegModal(value))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SuccessRegisterModal));
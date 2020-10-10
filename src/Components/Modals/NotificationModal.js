import React, { Fragment } from 'react'
import { Modal } from "react-bootstrap"
import { connect } from 'react-redux'
import { showSignIn } from "../../Actions/userActions"
import Login from './Login'


function NotificationModal(props) {

  const handleSignIn = () => {
    props.onHide()
    props.showSignin(true)
  }

    return (
      <Fragment>          
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className= "shownotificationWrapper"
      >
          <Modal.Title id="contained-modal-title-vcenter" >
          <h3 className="successfullbookingHeader"><i className="fa fa-exclamation exclaim"></i></h3>
          </Modal.Title>
        <Modal.Body className = "successfullbookingBottom">
        <p className="successfullbookingParagraph">Please login to book room</p>
        <button onClick={handleSignIn} className="successfullbookingLink">Login</button>
        {/* <button onClick={props.onHide} className="successfullbookingLink">Close</button> */}
        </Modal.Body>
      </Modal>
      <Login />
      </Fragment>
    ); 
  }
  
  
const mapStateToProps = (state) => {
	const { userReducer } = state
	return {	
    showNotificationModal: userReducer.showNotificationModal,
    showSignIn: userReducer.showSignIn,

	}
  }

  const mapDispatchToProps = (dispatch) => {
    return {	
      showSignin: (values) => dispatch(showSignIn(values)),
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(NotificationModal)
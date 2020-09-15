import React from 'react'
import { Modal } from "react-bootstrap"
import { connect } from 'react-redux'
import { successfulBookingModal } from "../../Actions/userActions"
import { withRouter } from "react-router-dom"


function SuccessfulBookingModal(props) {

    const onHide = () => {
      props.successfulBookingModal(false)
      props.history.push("/home")
    }

    return (
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
      <p className="successfullbookingParagraph">Booked Successful</p>
      <button onClick={onHide} className="successfullbookingLink">Close</button>
      </Modal.Body>
  </Modal>
    ); 
    
  }
  
  
const mapStateToProps = (state) => {
  const { userReducer } = state
  console.log(userReducer.successfulBookingModal);
	return {	
        showSuccessfulBookingModal: userReducer.successfulBookingModal,
        // showSuccessfulBookingModal: userReducer.showSuccessfulBookingModal,

	}
}

  const mapDispatchToProps = (dispatch) => {
    return {	
      successfulBookingModal: (value) => dispatch(successfulBookingModal(value))
    }
  }

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SuccessfulBookingModal))
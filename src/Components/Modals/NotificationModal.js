import React from 'react'
import { Modal } from "react-bootstrap"
import { connect } from 'react-redux'

function NotificationModal(props) {

    return (
            
    //   <Modal
    //   {...props}
    //   size="md"
    //   aria-labelledby="contained-modal-title-vcenter"
    //   centered
    // >
    //   <Modal.Header closeButton>
    //     <Modal.Title id="contained-modal-title-vcenter">
    //       Login
    //     </Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <p>Please Login to book a room</p>
    //   </Modal.Body>
    //   <Modal.Footer>
    //     <button onClick={props.onHide} className="btn btn-primary">Close</button>
    //   </Modal.Footer>
    // </Modal>

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
    <p className="successfullbookingParagraph">Please Login to Book your favorite room</p>
    <button onClick={props.onHide} className="successfullbookingLink">Close</button>
    </Modal.Body>
  </Modal>
    ); 
    
  }
  
  
const mapStateToProps = (state) => {
	const { userReducer } = state
	return {	
    showNotificationModal: userReducer.showNotificationModal
	}
  }

  const mapDispatchToProps = (dispatch) => {
    return {	

    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(NotificationModal)
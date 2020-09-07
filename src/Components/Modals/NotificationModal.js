import React from 'react'
import { Modal } from "react-bootstrap"
import { connect } from 'react-redux'

function NotificationModal(props) {

    return (
            
      <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please Login to book a room</p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide} className="btn btn-primary">Close</button>
      </Modal.Footer>
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
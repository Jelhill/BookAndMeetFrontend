import React from 'react'
import { connect } from 'react-redux'
import { getUserBookingDetails } from "../../Actions/bookingActions"
import { formatDateTime, getWithExpiry } from "../../Actions/helperFunctions"
import { notificationModal } from "../../Actions/userActions"
import { bookingSuccessMessage } from "../../Actions/bookingActions"
import NotificationModal from '../Modals/NotificationModal'

function BookingPageRightDiv(props) {
    
    const getBookingInputs = (e) => {
        props.getUserBookingDetails({[e.target.name]: e.target.value})
            
    }

    const bookRoom = (e) => {
        e.preventDefault()
        const user = getWithExpiry("token")
        const { checkinDate, checkinTime, checkoutDate, checkoutTime, surname, firstname, email} = props.bookersDetails
        const { userId, roomId} = props
        const checkin = formatDateTime(checkinDate, checkinTime)
        const checkout = formatDateTime(checkoutDate, checkoutTime)
        const body = {checkin, checkout, surname, firstname, email, userId, roomId} 
        if(user === false) {
            props.notificationModal(true)
        }else{
        fetch("https://bookandmeet.herokuapp.com/bookRoom", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
          })
          .then(response => response.json())
          .then((jsonResponse) => {
              console.log(jsonResponse)
              if(jsonResponse.status === "success"){
                  props.bookingSuccessMessage()   
              }
          })
          .catch((err) => console.log(err))
        }
    }

    const { name, category } = props
    return (
        <div className="bookingPageRightSide">
            <div className="bookingRoomDetails">
                <h5>{name}</h5>
                <label>{category}</label>
            </div>
           {!props.bookingSuccessStatus.length ? null :
            <div className="bookingSuccessDiv">{props.bookingSuccessStatus}</div>
           }
            <label className="fillMessage">Fill the booking form</label>
            <div className="checkInDiv">
                <div className="dateTime">
                    <label>Check in Date :</label>
                    <input type="date" name="checkinDate" onChange={getBookingInputs}/>
                </div>
                <div className="dateTime">
                    <label>Check in time :</label>
                    <input type="time" name="checkinTime" onChange={getBookingInputs}/>
                </div>   
            </div>    
            <div className="checkInDiv">
                <div className="dateTime">
                    <label>Checkout date :</label>
                    <input type="date" name="checkoutDate" onChange={getBookingInputs}/>
                </div>
                <div className="dateTime">
                    <label>Checkout time :</label>
                    <input type="time" name="checkoutTime" onChange={getBookingInputs}/>
                </div>   
            </div>    
            
            <div className="checkInDiv">
                <input type="text" name="surname" placeholder="Surname" onChange={getBookingInputs}/>                    
                <input type="text" name="firstname" placeholder="Firstname" onChange={getBookingInputs}/>                     
            </div>  
            <div className="checkInDiv2">
                <input type="email" name="email" placeholder="Email" onChange={getBookingInputs}/>
            </div>   
        
            <div className="bookingFormBtnDiv">
                <button className="button2" onClick={bookRoom}>Book</button>    
            </div>        
            <NotificationModal
                style={{paddingTop: "20px", marginLeft: "100px" }}
                show={props.showNotificationModal}
                onHide={() => props.notificationModal(false)}
                />
        </div>        
    )
 }

 const mapStateToProps = (state) => {
    const { userReducer } = state
    const { roomReducer } = state
    const {bookingReducer } = state
    return {
      renderPage: userReducer.renderPage,
      imageurl: roomReducer.currentRoom.imageurl,
      name: roomReducer.currentRoom.name,
      category: roomReducer.currentRoom.category,
      bookersDetails: bookingReducer.userBookingDetails,
      userId: userReducer.userId,
      firstname: userReducer.userFirstname,
      bookingSuccessStatus: bookingReducer.bookingSuccessStatus,
      showNotificationModal: userReducer.showNotificationModal,
 
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getUserBookingDetails: (values) => dispatch(getUserBookingDetails(values)),
        bookingSuccessMessage: () => dispatch(bookingSuccessMessage()),
        notificationModal: (value) => dispatch(notificationModal(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingPageRightDiv)
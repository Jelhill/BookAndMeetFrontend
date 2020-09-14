import React, { useEffect } from 'react'
import Header from "../Header"
import Footer2 from "../Footer2"
import BookingPageRightDiv from "./BookingPageRightDiv"
import { Link, withRouter, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateStateWithAPI, updateStateWithUserInfo } from "../../Actions/userActions"
import { updateStateWithRoomInfo } from "../../Actions/roomActions"
import { getWithExpiry } from "../../Actions/helperFunctions"
import NotificationModal from '../Modals/NotificationModal'
import Loader from 'react-loader-spinner'




const BookingForm = (props) => {
    const { id } = useParams()
    const { roomImage } = props
    useEffect(() => {
        const user = getWithExpiry("token")
        props.updateStateWithUserInfo(user)
        fetch(`https://bookandmeet.herokuapp.com/booking/${id}`,{
        // fetch(`http://localhost:3001/booking/${id}`,{
            method: "GET",
            headers: {"Content-type": "application/json", 
                authorization: `Bearer ${user.token}`,
                credentials: "include"
            }
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            if(jsonResponse.message === "success") {
                props.updateStateWithRoomInfo(jsonResponse.data.result)
                props.updateStateWithAPI(true);
            }
        }).catch((err) => {
            console.log(err)
        })
    })  

         return (      
            props.renderPage !== true ?
            props.renderPage :               
            <div>
                <Header />
                <div className="aboutRoomNav">
                    <ul>
                        <Link to="/home"><li>Meeting Rooms</li></Link>
                        <span><i className="fa fa-greater-than"></i></span>
                        <Link to={"/aboutRoom"}><li>Booking Page</li></Link>
                    </ul>
                </div>
                <div className="bookingPageBody">
                    <div className="bookingPageLeftSide">
                         <img src={roomImage} alt="ImageRoom14"/>
                    </div>
                    <BookingPageRightDiv roomId={id}/>
                </div>
                <NotificationModal
                    show={props.showNotificationModal}
                    onHide={() => props.notificationModal(false)}
                />
                <div className="spaceDiv"></div>         
                <Footer2 />
            </div>
        )
    }


const mapStateToProps = (state) => {
    const { userReducer } = state
    const { roomReducer } = state
    const { bookingReducer } = state
    return {
      renderPage: userReducer.renderPage,
      roomImage: roomReducer.imageurl,
      roomName: roomReducer.imageurl,
      allBookings: bookingReducer.allBookings
    }
}
  
  const mapDispatchToProps = (dispatch) => {
    return {
        updateStateWithAPI: (value) => dispatch(updateStateWithAPI(value)),
        updateStateWithRoomInfo: (values) => dispatch(updateStateWithRoomInfo(values)),
        updateStateWithUserInfo: (values) => dispatch(updateStateWithUserInfo(values)),
    }
  }
    
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingForm));
  
import React from 'react'
import Footer2 from '../Footer2'
import ItemsInRoom from './ItemsInRoom'
import Header from '../Header'
import { Link, useParams } from "react-router-dom"
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { updateStateWithRoomInfo } from "../../Actions/roomActions"
import { updateStateWithBookings, updateCountDownTimer } from "../../Actions/bookingActions"
import { checkingBookedStatus, countDown } from "../../Actions/helperFunctions"
import Loader from 'react-loader-spinner'

 
function AboutRoom (props) {
    const { name, roomImage } = props
    const { id } = useParams()
    const getBookings = () => {
        fetch("https://bookandmeet.herokuapp.com/getBookings", {
        // fetch("http://localhost:3001/getBookings", {
            method: "GET",
            headers: { "Content-type": "application/json" }
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            if(jsonResponse.status === "success") {
                console.log(jsonResponse)
                props.updateStateWithBookings(jsonResponse.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getRoomDetails = () => {
        fetch(`https://bookandmeet.herokuapp.com/getRoomDetails/${id}`, {
        // fetch(`http://localhost:3001/getRoomDetails/${id}`, {
            method: "GET",
            headers: {"Content-type": "application/json"}
        })
        .then(response => response.json())
        .then((jsonResponse) => {
            console.log("Room details", jsonResponse);
            if(jsonResponse.message === "success")
            props.updateStateWithRoomInfo(jsonResponse.response.result)
        })
        .catch(err => console.log(err))
    }
            
    useEffect(() => {
        setTimeout(() => {
            props.updateCountDownTimer(countDown(props.allBookings, Number(id)))
        }, 1000);
    })

    useEffect(() => {
        Promise.all([getRoomDetails(), getBookings()])
    },[])

        // if (!props.allBookings.length) {
        //     return <div className="LoaderDiv"><Loader type="ThreeDots" color="#00BFFF" height={100} width={100} /></div>
        // }

        return (
            <div className="aboutRoomContainer">
                <Header />
                <div className="aboutRoomNav">
                    <ul>
                        <Link to="/home"><li>Meeting Rooms</li></Link>
                        <span><i className="fa fa-greater-than"></i></span>
                        <li>Room Details</li>
                    </ul>
                </div>
                
                <div className="aboutRoomBelowBar">
                    <div className="title-conf">
                        <h4>{name}</h4>
                        <p>Room 301, 3rd Floor Main Building</p>
                    </div>
                    <span className="status">{checkingBookedStatus(props.allBookings, Number(id)) === "Available" ? "Available" : "in Use"}</span>  
                    <div className="availableIn">                
                        {checkingBookedStatus(props.allBookings, Number(id)) === "Available" ? null : <div className="timerDiv"><h5>Available In</h5><span>{props.countDownTime}</span></div>}
                    </div>  
                </div>

                <div className="bodyWhiteDiv">
                    <div className="imageAndItems">
                        <img src={roomImage} alt="RoomImage"/>
                        <ItemsInRoom  />
                    </div>
                    
                    <div className="roomInfoBtnDIv">
                        <Link to={`/booking/${id}`}><span>Book now</span></Link>
                    </div>
                </div>  
                <Footer2 />
            </div>
        )
    }


    const mapStateToProps = (state) => {
        const { userReducer } = state
        const { roomReducer } = state
        const { bookingReducer } = state
        console.log("CDT", bookingReducer.countDownTime);
        return {
          renderPage: userReducer.renderPage,
          roomName: roomReducer.name,
          roomImage: roomReducer.imageurl,
          allBookings: bookingReducer.allBookings,   
          countDownTime: bookingReducer.countDownTime
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            updateStateWithRoomInfo: (values) => dispatch(updateStateWithRoomInfo(values)),
            updateStateWithBookings: (data) => dispatch(updateStateWithBookings(data)),
            updateCountDownTimer: (timer) => dispatch(updateCountDownTimer(timer)),

        }
    }
    export default connect(mapStateToProps, mapDispatchToProps)(AboutRoom)
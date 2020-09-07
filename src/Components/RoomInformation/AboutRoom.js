import React from 'react'
import Footer2 from '../Footer2'
import ItemsInRoom from './ItemsInRoom'
import Header from '../Header'
import { Link, useParams } from "react-router-dom"
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { updateStateWithRoomInfo } from "../../Actions/roomActions"
 
function AboutRoom (props) {
    const { name, roomImage } = props
    const { id } = useParams()
    useEffect(() => {
        fetch(`https://bookandmeet.herokuapp.com/getRoomDetails/${id}`, {
        // fetch(`http://localhost:3001/getRoomDetails/${id}`, {
            method: "GET",
            headers: {"Content-type": "application/json"}
        })
        .then(response => response.json())
        .then((jsonResponse) => {
             if(jsonResponse.message === "success")
             props.updateStateWithRoomInfo(jsonResponse.response.result)
        })
        .catch(err => console.log(err))
    })
    
        return (
            <div className="aboutRoomContainer">
                <Header />
                <div className="aboutRoomNav">
                    <ul>
                        <Link to="home"><li>Meeting Rooms</li></Link>
                        <span><i className="fa fa-greater-than"></i></span>
                        <li>Room Details</li>
                    </ul>
                </div>
                
                <div className="aboutRoomBelowBar">
                    <div className="title-conf">
                        <h4>{name}</h4>
                        <p>Room 301, 3rd Floor Main Building</p>
                    </div>
                    <span className="status">In Use</span>
                    <div className="availableIn">
                        <h5>Available In</h5>
                        <span>01:00:56</span>
                    </div>
                </div>

                <div className="bodyWhiteDiv">
                    <div className="imageAndItems">
                        <img src={roomImage} alt="RoomImage"/>
                        <ItemsInRoom  />
                    </div>
                    
                    <div className="roomInfoBtnDIv">
                        <Link to={`/booking/${id}`}><span>Book now</span></Link>
                        {/* <Link to={{pathname:"/booking", room: room}}><span>Book now</span></Link> */}
                    </div>
                </div>  
                <Footer2 />
            </div>
        )
    }


    const mapStateToProps = (state) => {
        const { userReducer } = state
        const { roomReducer } = state
        return {
          renderPage: userReducer.renderPage,
          roomName: roomReducer.name,
          roomImage: roomReducer.imageurl,
    
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            updateStateWithRoomInfo: (values) => dispatch(updateStateWithRoomInfo(values))
        }
    }
    export default connect(mapStateToProps, mapDispatchToProps)(AboutRoom)
import React from 'react'
import { connect } from 'react-redux'
import ImageAirConditioner from "../../Images/air-conditioner.png";
import ImageProjector from "../../Images/projector.png";
import ImageWaterCooler from "../../Images/water-cooler.png";
import ImagePresentation from "../../Images/presentation.png";
import ImageFriend from "../../Images/friend.png";


function ItemsInRoom (props){
    const {hasAirCondition, hasProjector, hasWaterDispenser, hasWhiteBoard, capacity } = props
        return (
            <div className="roomInfoDiv">
                <div className="roomInfoSpanDiv">

                    <span> <img src={ImageFriend} alt="Room 5" /></span>
                    <div className="flexItemsInRoom">
                        <span>Capacity</span>
                        <span>{capacity} Seats</span>
                    </div>
                </div>
                <div className="roomInfoSpanDiv">
                   <span> <img src={ImageAirConditioner} alt="Room 5" /></span>
                    <div className="flexItemsInRoom">
                        <span>Air Condition</span>
                        <span>{hasAirCondition ? "Yes" : "No"}</span>
                    </div>
                </div>
                <div className="roomInfoSpanDiv">
                    <span> <img src={ImageProjector} alt="Room 5" /></span>
                    <div className="flexItemsInRoom">
                        <span>Projector</span>
                        <span>{hasProjector ? "Yes" : "No"}</span>
                    </div>
                </div>
                <div className="roomInfoSpanDiv">
                    <span> <img src={ImageWaterCooler} alt="Room 5" /></span>
                    <div className="flexItemsInRoom">
                        <span>Water Dispenser</span>
                        <span>{hasWaterDispenser ? "Yes" : "No"}</span>
                    </div>
                </div>
                    <div className="roomInfoSpanDiv">
                    <span> <img src={ImagePresentation} alt="Room 5" /></span>

                    <div className="flexItemsInRoom">
                        <span>White Board</span>
                        <span>{hasWhiteBoard ? "Yes" : "No"}</span>
                    </div>
                </div>
            </div>
        )
    }

    const mapStateToProps = (state) => {
        const { userReducer } = state
        const { roomReducer } = state
        return {
          renderPage: userReducer.renderPage,
          roomName: roomReducer.currentRoom.name,
          roomImage: roomReducer.currentRoom.imageurl,
          hasWhiteBoard: roomReducer.currentRoom.whiteBoard,
          hasWaterDispenser: roomReducer.currentRoom.waterDispenser,
          hasProjector: roomReducer.currentRoom.projector,
          hasAirCondition: roomReducer.currentRoom.airCondition,
          capacity: roomReducer.currentRoom.capacity,
        }
    }

    export default connect(mapStateToProps)(ItemsInRoom)
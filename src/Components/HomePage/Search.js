import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer2 from "../Footer2";
import SearchFilter from "../HomePage/SearchFilter";
import { updateStateWithRooms, saveCurrentRoom } from "../../Actions/roomActions"
import { updateStateWithBookings } from "../../Actions/bookingActions"
import { checkingBookedStatus } from "../../Actions/helperFunctions"
import ImageAirConditioner from "../../Images/air-conditioner.png";
import ImageProjector from "../../Images/projector.png";
import ImageWaterCooler from "../../Images/water-cooler.png";
import ImagePresentation from "../../Images/presentation.png";
import ImageFriend from "../../Images/friend.png";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

class Search extends Component {

    getRooms = () => {
        fetch("https://bookandmeet.herokuapp.com/getRooms", {
        // fetch("http://localhost:3001/getRooms", {
            method: "GET",
            headers: { "Content-type": "application/json" }
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            this.props.updateStateWithRooms(jsonResponse.rooms)
        }).catch((error) => {
            console.log(error)
        })
    }

    getBookings = () => {
        fetch("https://bookandmeet.herokuapp.com/getBookings", {
        // fetch("http://localhost:3001/getBookings", {
            method: "GET",
            headers: { "Content-type": "application/json" }
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            if(jsonResponse.status === "success") {
                this.props.updateStateWithBookings(jsonResponse.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    componentDidMount = async () => {
        if(this.props.searchedRooms.length > 0) {
            this.props.updateStateWithRooms(this.props.searchedRooms)
        }else{
            Promise.all([this.getRooms(), this.getBookings()])
            
        }
    }

    saveCurrentRoom = (room) => {
        this.props.saveCurrentRoom(room)
        this.props.history.push("/booking")
    }

    viewRoomDetails = (room) => {
        this.props.saveCurrentRoom(room)
        this.props.history.push("/aboutRoom")
    }
    
    render() {
        const renderingRoom = this.props.filteredRoom.length ? this.props.filteredRoom : this.props.rooms
        return (
            <div className="homePageWrapper">
            {!this.props.rooms.length ? 
                <div className="LoaderDiv"><Loader type="Circles" color="#00BFFF" height={100} width={100} /></div> :
               <Fragment>
                <Header />
                <SearchFilter />                
                    <small className="searchNotification">{ this.props.filteredRoom.length ? `${this.props.filteredRoom.length} Rooms Found`  : "No Record Found"}</small>

                <div className="bookingRoomSearchWrapper">
                    {renderingRoom.map((room, index) => {
                      return <div key={index}className="room1">
                        <img src={room.imageurl} alt="Room 5" />
                        <div className="roomFeatures">
                            <div className="boardRoomFeatures">
                                <Link to={`/aboutRoom/${room.id}`} ><span>{`${room.name}`}</span></Link>
                                <span className="roomTypeSpan">{`(${room.type})`}</span>
                                {/* <label className="isAvailable">{room.available ? "Available" : "In use"}</label> */}
                                <label className="isAvailable">{checkingBookedStatus(this.props.allBookings, room.id)}</label>
                            </div>
                            
                            <div className="roomNumber">
                                <label>{room.location}</label>
                            </div>
                           
                            <div className="features">
                                <p>Features:</p>
                            </div>
                            <div className="featureAccessories">
                                <div className="features1">
                                    <span> <img src={ImageFriend} alt="Room 5" /></span>
                                    <div className="flexRoomItems">
                                        <span><p>Capacity</p></span>
                                        <span><p>{room.capacity} seats</p></span>
                                    </div>
                                </div>
                                <div className="features1">
                                    <span> <img src={ImageAirConditioner} alt="Room 5" /></span>
                                    <div className="flexRoomItems">
                                        <span><p>Air Condition</p></span>
                                        <span><p>{room.airCondition ? "Yes" : "No"}</p></span>
                                    </div>
                                </div>
                                <div className="features1">
                                    <span><img src={ImageProjector} alt="Room 5" /></span>
                                    <div className="flexRoomItems">
                                        <span><p>Projector</p></span>
                                        <span><p>{room.projector ? "Yes" : "No"}</p></span>
                                    </div>
                                </div>
                                <div className="features1">
                                    <span><img src={ImageWaterCooler} alt="Room 5" /></span>
                                    <div className="flexRoomItems">

                                        <span><p>Water Dispenser</p></span>
                                        <span><p>{room.waterDispenser ? "Yes" : "No"}</p></span>
                                    </div>
                                </div>
                                <div className="features1">
                                    <span><img src={ImagePresentation} alt="Room 5" /></span>
                                    <div className="flexRoomItems">
                                        <span><p>White Board</p></span>
                                        <span><p>{room.hasWhiteBoard ? "Yes" : "No"}</p></span>
                                    </div>
                                </div>
                            </div>
                            
                            <Link to={`/booking/${room.id}`}><div className="bookNowLink">Book Now</div></Link>                            
                            </div>
                        </div>
                    })}

                </div><br />
                <Footer2 />
                </Fragment>
            }
            </div>   
        
        )
        
    }
}

const mapStateToProps = (state) => {
    const { roomReducer } = state
    const { bookingReducer } = state
    return {
        rooms: roomReducer.rooms,
        filteredRoom: roomReducer.filteredRoom,
        searchedRooms: roomReducer.searchedRooms,
        allBookings: bookingReducer.allBookings
    }    
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStateWithRooms: (values) => dispatch(updateStateWithRooms(values)),
        saveCurrentRoom: (values) => dispatch(saveCurrentRoom(values)),
        updateStateWithBookings: (data) => dispatch(updateStateWithBookings(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
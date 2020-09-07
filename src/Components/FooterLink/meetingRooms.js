import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Header from "../Header"
import AdminSideMenu from "./AdminSideMenu"
import { updateStateWithRooms } from "../../Actions/roomActions"
import { connect } from 'react-redux'


class MeetingRooms extends Component {

    
    deleteRoom = (id) => {
        fetch(`https://bookandmeet.herokuapp.com/deleteRoom/${id}`, {method: "DELETE"})
        .then(response => response.json())
        .then(jsonResponse => {
            window.location.reload(true)
        })
    }

    editRoom = (id) => {
        fetch(`https://bookandmeet.herokuapp.com/editRoom/${id}`, {method: "PUT"})
        .then(response => response.json())
        .then(jsonResponse => {
            console.log("Feedback", jsonResponse)
            window.location.reload(true)
        })
    }

    componentDidMount = () => {
        fetch("https://bookandmeet.herokuapp.com/getRooms", {
            method: "GET",
            headers: {"Content-type": "application/json"}
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            console.log("MMMMM", jsonResponse)
            this.props.updateStateWithRooms(jsonResponse.rooms)
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
            <Header />
            <div className="adminLandingPageWrapper">
                <AdminSideMenu />
                <div className="adminRightSide">
                    <div className="adminRightSideHeader">
                        <div className="adminRightSearchDiv">
                            <select name="Type" className="selectRoom">
                                <option value="Type">Type</option>
                            </select>
                            <button className="searchButton">Search</button>
                        </div>
                        <Link to="addnewroom" className="addRoom"><span>Add New Room</span></Link>
                    </div>
    
                        <div className="adminRightSideBody">

                        {this.props.rooms.map((room, index) => (
                            <div key={index} className="roomCards">
                                <img src={room.imageurl} alt="room1" className="roomImg"></img>
                                <div className="deleteWrapper">
                                    <div>
                                        <span className="boardRoomTag">{room.name}</span>
                                        <span className="available">Available</span>
                                    </div>
                                    <div className="buttonContainer">
                                        <span className="deleteButton" onClick={() => this.deleteRoom(room.id)}>Delete</span>
                                        <Link to={`/editRoomForm/${room.id}`}><span className="editButton">Edit</span></Link>
                                    </div>
                                </div>
                            </div>
                        ))}                    
                       
                        </div>

                    <div className="nextPage" style={{textAlign:"center"}}>
                        <p>Showing result 1-8 of 36
                    <span>
                    <button className="preview">Preview</button>
                    <button className="navButton">1</button>
                    <button className="navButton">2</button>
                    <button className="navButton">3</button>
                    <button className="navButton">4</button>
                    <button className="navButton">5</button>
                    <button className="next">Next</button>
                    </span>
                    </p>  
                </div>
                </div>
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { roomReducer } = state
    return {
        rooms: roomReducer.rooms
    }    
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStateWithRooms: (values) => dispatch(updateStateWithRooms(values)),
        // saveCurrentRoom: (values) => dispatch(saveCurrentRoom(values))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingRooms)
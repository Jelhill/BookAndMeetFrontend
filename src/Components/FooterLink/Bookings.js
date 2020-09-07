import React, { Component } from 'react'
import Header from '../Header'
import AdminSideMenu from './AdminSideMenu'
import { updateStateWithBookings } from "../../Actions/bookingActions"
import { bookingDuration, bookingStatus } from "../../Actions/helperFunctions"
import { connect } from "react-redux"


 class Bookings extends Component {

    getBookings = () => {
        fetch("https://bookandmeet.herokuapp.com/getBookings", {
        // fetch("http://localhost:3001/getBookings", {
            method: "GET",
            headers: { "Content-type": "application/json" }
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            console.log("Booking!!!!", jsonResponse)
            if(jsonResponse.status === "success") {
                this.props.updateStateWithBookings(jsonResponse.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount = async () => {  
        this.getBookings()
    }

    render() {
        return (
            <div>
                <Header />
                <div className="adminLandingPageWrapper">
                <AdminSideMenu />
                <div className="adminRightSide">
                    <div className="bookingsContainer">
                    <div className="bookingsHeader">
                    <h4 className="history">Bookings</h4>   
                        <select className="selectRoom">
                            <option value = "Private">Private</option>
                        </select>
                        <input type="date" placeholder="Start Date" className="date"></input>
                        <input type="date" placeholder="Start Date" className="date"></input>
                        <button className="searchButton">Search</button>
                    </div>
                    <div>
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>MEETING ROOMS</th>
                                <th>BOOKED BY</th>
                                <th>TIME</th>
                                <th>DATE</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>                        
                        {
                            this.props.allBookings.map((booking, index) => (
                                <tr key={booking.id}>
                                    <td>{booking.roomid}</td>
                                    <td>{booking.userid}</td>
                                    <td>{booking.bookingdate.split("T")[0]}</td>
                                    <td>{bookingDuration(booking.checkin, booking.checkout)}</td>
                                    <td>{bookingStatus(booking.status)}</td>
                                </tr>
                            ))
                        } 
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { bookingReducer } = state
    const { roomReducer } = state
    console.log(roomReducer.rooms)
    return {
        allBookings: bookingReducer.allBookings,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStateWithBookings: (data) => dispatch(updateStateWithBookings(data)),

    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Bookings)
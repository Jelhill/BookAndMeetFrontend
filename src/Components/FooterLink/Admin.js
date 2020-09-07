import React, { Component, Fragment } from 'react'
import AdminSideMenu from './AdminSideMenu';
import { Line } from "react-chartjs-2"
import { connect } from 'react-redux';
import AdminHeader from '../AdminHeader'
import { updateStateWithRooms } from "../../Actions/roomActions"
import { updateStateWithBookings } from "../../Actions/bookingActions"
import { bookingDuration, bookingStatus } from "../../Actions/helperFunctions"
import { getUserComments } from '../../Actions/userActions'



class Admin extends Component {

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

    getRooms = () => {
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
   
    getComments = () => {
        fetch("https://bookandmeet.herokuapp.com/feedbackComments", {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        })
        .then(response => response.json())
        .then((jsonResponse) => {
            if(jsonResponse){
                this.props.getUserComments(jsonResponse)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    componentDidMount = async () => {  
        Promise.all([this.getRooms(), this.getBookings(), this.getComments()])    
    }

    render() {
        const cancellation = this.props.allBookings.filter(booking => booking.status === 3)
        return (
            <Fragment>
            <AdminHeader/>
            <div className="adminLandingPageWrapper">
            <AdminSideMenu />
            <div className="adminRightSide">
                <div className="container">
                    <div className="row">
                        <div className="notifier">                
                            <span>Available Rooms</span>
                            <label>{this.props.rooms.length}</label>
                            <p className="view-details"></p>
                        </div>
                        <div className="notifier">
                            <span>Booked Rooms</span>
                            <label>{this.props.allBookings.length}</label>                            
                            <p className="view-details"></p>
                        </div>
                        <div className="notifier">
                            <span>Cancellations</span>
                            <label>{cancellation.length}</label>
                            <p className="view-details"></p>
                        </div>
                        <div className="notifier">
                            <span>Feedbacks</span>
                            <label>{this.props.userComments.length}</label>
                            <p className="view-details"></p>
                        </div>
                    </div>
                    <div className="bookingRate">
                        <span>Booking Rate</span>
                    </div>
                    <div className="graphDiv">
                        <Line data={this.props.chartData}
                            height={60}
                            width={200}
                            options={{maintainAspectRatio: false}}
                        />
                    </div>
                    <div className="bookingsToday">
                    <span>Today's Bookings</span>
                    </div>
                <table style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th>Room Type</th>
                            <th>Booked By</th>
                            <th>Date</th>
                            <th>Duration</th>
                            <th>Status</th>
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
        </Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    const { bookingReducer } = state
    const { roomReducer } = state
    const { feedbackReducer } = state
    return {
        chartData: bookingReducer.chartData,
        rooms: roomReducer.rooms,
        allBookings: bookingReducer.allBookings,
        userComments: feedbackReducer.userComments

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStateWithRooms: (values) => dispatch(updateStateWithRooms(values)),
        updateStateWithBookings: (data) => dispatch(updateStateWithBookings(data)),
        getUserComments: (value) => dispatch(getUserComments(value)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
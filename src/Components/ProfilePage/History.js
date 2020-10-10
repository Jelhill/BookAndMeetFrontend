import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Header from "../Header"
import { getWithExpiry} from "../../Actions/helperFunctions"
import {updateStateWithUserBookings} from "../../Actions/bookingActions"
// import { booking } from '../../../../server/Controller/roomController'


function History(props) {

    const getUserBookings = () => {
        const token = getWithExpiry("token").token
        const id = JSON.parse(localStorage.getItem("user")).id
        fetch(`https://bookandmeet.herokuapp.com/userBookings/${id}`,{
        // fetch(`http://localhost:3001/booking/${id}`,{
            method: "GET",
            headers: {"Content-type": "application/json", 
                authorization: `Bearer ${token}`,
            }
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            console.log(jsonResponse);
            if(jsonResponse.status === "error" && jsonResponse.message === "No data to fetch") {
                props.updateStateWithUserBookings([])
            }
            if(jsonResponse.status === "success") {
                props.updateStateWithUserBookings(jsonResponse.data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(getUserBookings,[])        


    return (
        <div>
        <Header />
        <div className="adminLandingPageWrapper">
        <div className="adminRightSide">
            <div className="bookingsContainer">
            <div className="bookingsHeader">
            <h4 className="history">History</h4>   
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
                        <th>ROOM ID</th>
                        <th>DATE BOOKED</th>
                        <th>CHECK IN</th>
                        <th>CHECK OUT</th>
                        <th>STATUS</th>
                    </tr>                        
                </thead>
                <tbody>
                {props.allUserBookings.map((booking) => {
                  return <tr key={booking.id}>
                        <td className="bold">{booking.roomid}</td>
                        <td>{booking.bookingdate.split("T")[0]}</td>
                        <td>{`${booking.checkin.split("T")[0]} ${booking.checkin.split("T")[1].split(".")[0]}`}</td>
                        <td>{`${booking.checkout.split("T")[0]} ${booking.checkout.split("T")[1].split(".")[0]}`}</td>
                        <td>{booking.status === 0 ? "Running" : "Completed"}</td>
                    </tr>
                })}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    </div>
    )
}

const mapStateToProps = (state) => {
    const { bookingReducer } = state
    console.log(bookingReducer.allUserBookings);
    return {
        allUserBookings: bookingReducer.allUserBookings
    }
}
  
  const mapDispatchToProps = (dispatch) => {
    return {
        updateStateWithUserBookings: (values) => dispatch(updateStateWithUserBookings(values)),
    }
  }


 export default connect(mapStateToProps, mapDispatchToProps)(History)
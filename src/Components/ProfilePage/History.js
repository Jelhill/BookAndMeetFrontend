import React, { Component } from 'react'
import Header from "../Header"

export default class History extends Component {
    render() {
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
                            <th>ROOM</th>
                            <th>LOCATION</th>
                            <th>TIME</th>
                            <th>DATE</th>
                            <th>STATUS</th>
                        </tr>                        
                    </thead>
                    <tbody>
                        <tr>
                            <td className="bold">Senate</td>
                            <td> Room 201, Second floor Main Building</td>
                            <td>4:30 - 6:00</td>
                            <td>07/09/2020</td>
                            <td id="running">Running</td>
                        </tr>
                        <tr>
                            <td className="bold">Conference Room</td>
                            <td>Room 201, Second floor Main Building</td>
                            <td>7:00 - 9:00</td>
                            <td>04/10/2020</td>
                            <td id="completed">Completed</td>
                        </tr>
                        <tr>
                            <td className="bold">Private Meeting Room</td>
                            <td>Room 201, Second floor Main Building</td>
                            <td>9:00 - 10:00</td>
                            <td>12/12/2020</td>
                            <td id="upcoming">Upcoming</td>
                        </tr>
                        <tr>
                            <td className="bold">Private Meeting Room</td>
                            <td>Room 201, Second floor Main Building</td>
                            <td>9:00 - 10:00</td>
                            <td>12/12/2020</td>
                            <td id="upcoming">Upcoming</td>
                        </tr>
                        <tr>
                            <td className="bold">Private Meeting Room</td>
                            <td>Room 201, Second floor Main Building</td>
                            <td>9:00 - 10:00</td>
                            <td>12/12/2020</td>
                            <td id="upcoming">Upcoming</td>
                        </tr>
                        <tr>
                            <td className="bold">Private Meeting Room</td>
                            <td>Room 201, Second floor Main Building</td>
                            <td>9:00 - 10:00</td>
                            <td>12/12/2020</td>
                            <td id="upcoming" >Upcoming</td>
                        </tr>
                        <tr>
                            <td className="bold">Private Meeting Room</td>
                            <td>Room 201, Second floor Main Building</td>
                            <td>9:00 - 10:00</td>
                            <td>12/12/2020</td>
                            <td id="cancelled">Cancelled</td>
                        </tr>
                        <tr>
                            <td className="bold">Private Meeting Room</td>
                            <td>Room 201, Second floor Main Building</td>
                            <td>9:00 - 10:00</td>
                            <td>12/12/2020</td>
                            <td id="cancelled">Cancelled</td>
                        </tr>
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

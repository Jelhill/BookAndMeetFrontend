import React, { Component } from 'react'
import Header from '../Header'
import AdminSideMenu from './AdminSideMenu'
import { Link } from 'react-router-dom'

export default class AdminPortal extends Component {
    render() {
        return (

            <div>
                <Header />
                <div className="adminLandingPageWrapper">
                    <AdminSideMenu />
                    <div className="adminRightSide">
                        <div className="bookingsContainer">
                            <div className="bookingsHeader">
                                <h4 className="history">Admin Portal</h4>
                            </div>
                            <div className="addAdmin"><Link to="addAdminForm" className="addAdminLink">+Add Admin</Link></div>
                            <div>
                                <table style={{ width: "100%" }}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>code</th>
                                            <th>Department</th>
                                            <th>E-mail</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="bold">Temitope Daniel</td>
                                            <td>005</td>
                                            <td>305</td>
                                            <td>temid@gmail.com</td>
                                            <td id="cancelled">Remove</td>
                                        </tr>
                                        <tr>
                                            <td className="bold">Dolly p</td>
                                            <td>017</td>
                                            <td>412</td>
                                            <td>p@yahoo.com</td>
                                            <td id="cancelled">Remove</td>
                                        </tr>
                                        <tr>
                                            <td className="bold">Dolly p</td>
                                            <td>017</td>
                                            <td>412</td>
                                            <td>p@yahoo.com</td>
                                            <td id="cancelled">Remove</td>
                                        </tr>
                                        <tr>
                                            <td className="bold">Dolly p</td>
                                            <td>017</td>
                                            <td>412</td>
                                            <td>p@yahoo.com</td>
                                            <td id="cancelled">Remove</td>
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

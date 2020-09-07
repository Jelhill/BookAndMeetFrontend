import React, { Component } from 'react'
import Header from "../Header"
import avatar from "../../Images/avatar.png"
import Footer2 from '../Footer2'

export default class UserProfilePage extends Component {
    state = {
        show3 : false
    }

    showLogout = e =>{
        this.setState({
            show3:!this.state.show3
        });
    };

    onClose= e=>{
        this.setState({
            show3:false
        })
    };


    render() {
        return (
            <div>
                <Header />
                <div className="userProfileBody">
                    {/* <div className="userProfileLeft">
                        <h5>User Profile</h5>
                        <ul>
                            <Link><li>User Info</li></Link>
                            <Link><li>History</li></Link>
                            <Link><li>Downloads</li></Link>
                            <Link><li>Edit Profile</li></Link>
                            <Link><li>Notification</li></Link>
                        </ul>
                        <Link onClick={e=>{this.showLogout(e);}}><p className="userProfileLogout" >Logout</p></Link>
                    <Logout show3={this.state.show3}>
                    <h2 className="logoutheader">Log Out</h2>
                    <p className="logoutparagraph">Do you wish to log out?</p>
                    <div className='logoutlink'>
                        <Link to="#"> <p className="logoutlink1">Yes</p> </Link>
                        <Link onClick={e=>{this.onClose(e)}} ><p className="logoutlink2">No</p></Link>
                    </div>
                    </Logout>
                    </div> */}
                    <div className="userProfileRight">
                        <div className="avatarDiv">
                            <img src={avatar} alt="ImagePhoto"/>
                            <div>
                                <h4>Jelhill Umaru</h4>
                                <p>Lagos Nigeria</p>
                            </div>
                        </div>
                        <div className="avatarDiv">
                            <div className="avatarInput">
                                <label htmlFor="">First Name</label><br/>
                                <input type="text" name=""/>
                            </div>
                            <div className="avatarInput">
                                <label htmlFor="">Last Name</label><br/>
                                <input type="text" name="" />
                            </div>
                        </div>
                        <div className="avatarDiv">
                            <div className="avatarInput">
                                <label htmlFor="">Email</label><br/>
                                <input type="text" name=""/>
                            </div>
                            <div className="avatarInput">
                                <label htmlFor="">Phone Number</label><br/>
                                <input type="text" name="" />
                            </div>
                        </div>
                        <div className="avatarDiv">
                            <div className="avatarInput">
                                <label htmlFor="">Gender</label><br/>
                                <input type="text" name=""/>
                            </div>
                            <div className="avatarInput">
                                <label htmlFor="">Staff Identity Code</label><br/>
                                <input type="text" name="" />
                            </div>
                        </div>    
                        <div className="profileButtonDiv">
                        <button className="profileButton">Save Changes</button> 
                        </div>               
                    </div>
                </div> 
                <Footer2 />                              
            </div>
        )
    }
}

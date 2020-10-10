import React, { useEffect } from 'react'
import Header from "../Header"
import avatar from "../../Images/avatar.png"
import Footer2 from '../Footer2'
import {Link} from 'react-router-dom'
import Logout from "../Modals/Logout"
import {getWithExpiry} from "../../Actions/helperFunctions"
import {updateStateWithUserInfo} from "../../Actions/userActions"
import { connect } from "react-redux"

function UserProfilePage(props) {

    useEffect(() => {
        const user = getWithExpiry("token")
        fetch(`https://bookandmeet.herokuapp.com/user/${user.id}`,{
            // fetch(`http://localhost:3001/booking/${id}`,{
                method: "GET",
                headers: {"Content-type": "application/json", 
                authorization: `Bearer ${user.token}`,
                }
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            console.log(jsonResponse);
            if(jsonResponse.status === "success") {
                props.updateStateWithUserInfo(jsonResponse.data)
                // props.updateStateWithAPI(true);
            }
        }).catch((err) => {
            if(err.message === "No data to fetch") {
                props.updateStateWithUserInfo([])

            console.log(err)
            }
        })
    })

    return (
        <div>
            <Header />
            <div className="userProfileBody">
                <div className="userProfileLeft">
                    <h5>User Profile</h5>
                    <ul>
                        <Link to="/editUserProfile"><li>Edit Profile</li></Link>
                    </ul>
                <Logout>
                <h2 className="logoutheader">Log Out</h2>
                <p className="logoutparagraph">Do you wish to log out?</p>
                <div className='logoutlink'>
                    <Link to="#"> <p className="logoutlink1">Yes</p> </Link>
                    <Link onClick={e=>{this.onClose(e)}} ><p className="logoutlink2">No</p></Link>
                </div>
                </Logout>
                </div>
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
                            <input type="text" name="firstname" value={props.firstname}/>
                        </div>
                        <div className="avatarInput">
                            <label htmlFor="">Last Name</label><br/>
                            <input type="text" name="surname" value={props.surname}/>
                        </div>
                    </div>
                    <div className="avatarDiv">
                        <div className="avatarInput">
                            <label htmlFor="">Email</label><br/>
                            <input type="email" name="email" value={props.email}/>
                        </div>
                        <div className="avatarInput">
                            <label htmlFor="">User Id</label><br/>
                            <input type="text" name="id" value={props.id}/>
                        </div>
                    </div>
                    {/* <div className="avatarDiv">
                        <div className="avatarInput">
                            <label htmlFor="">Gender</label><br/>
                            <input type="text" name=""/>
                        </div>
                        <div className="avatarInput">
                            <label htmlFor="">Staff Identity Code</label><br/>
                            <input type="text" name="" />
                        </div>
                    </div>     */}
                    <div className="profileButtonDiv">
                    <button className="profileButton">Save Changes</button> 
                    </div>               
                </div>
            </div> 
            <Footer2 />                              
        </div>
    )

}

const mapStateToProps = (state) => {
    const { userReducer } = state
    return {
        firstname: userReducer.userDetails.firstname,
        surname: userReducer.userDetails.surname,
        id: userReducer.userDetails.id,
        email: userReducer.userDetails.email
      
    }
}
  
  const mapDispatchToProps = (dispatch) => {
    return {
        updateStateWithUserInfo: (values) => dispatch(updateStateWithUserInfo(values)),
    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage)
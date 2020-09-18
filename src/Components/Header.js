import React, { useEffect } from 'react'
import { Link, withRouter } from "react-router-dom"
import logo from "../Images/meeting.png"
import { connect } from 'react-redux'
import { updateStateForHeader, showSignup, showSignIn, showLogout } from "../Actions/userActions"
import Login from './Modals/Login'
import { getWithExpiry } from "../Actions/helperFunctions"
import Logout from './Modals/Logout'
import SuccessRegisterModal from '../Components/Modals/SuccessRegisterModal'
import Signup from '../Components/Modals/Signup'

const Header = (props) => {    
    const handleSignIn = () => props.showSignin(true)
    const openSignUpModal = () => props.showSignup(true)
    const openLogOutModal = () => props.showLogout(true)

    useEffect(() => {
        const response = getWithExpiry("token")
        props.updateStateForHeader(response)
    })

    const {isLoggedIn} = props
    return (
        <div className="headerPurpleDiv">
            <div className="headerIconDiv">
                <div className="logoWrapper">
                    <Link to="/"><img src={logo} alt="Logo"/></Link>
                    <h2 className="logo">boardroom</h2>                    
                </div>
                
                {isLoggedIn ?        
                
                <ul>
                    <li><Link to="/userHistory">History</Link></li>
                    <li><Link to="/userProfile">My Profile</Link></li>
                    <li><Link to="#" onClick={openLogOutModal}>Logout</Link></li>
                    <Logout />
                </ul> 
                :
                <ul>
                    <li><Link to="#" className="noDecoration" onClick={handleSignIn}>Login</Link></li>
                    <li><Link to="#" className="noDecoration" onClick={openSignUpModal}>Signup</Link></li>
                    <Login />  
                    <Signup />
                    <SuccessRegisterModal/>
                </ul> 
                }
            </div>          
        </div>
    )
}


const mapStateToProps = (state) => {
    const { userReducer } = state
    console.log(userReducer.showSignUp)
    return {
        isLoggedIn: userReducer.isLoggedIn,
        firstname: userReducer.userFirstname,
        id: userReducer.userid,
        showSignUp: userReducer.showSignUp,
        showSuccessfullRegModal:userReducer.showSuccessfullRegModal,
        showSignIn: userReducer.showSignIn,
        showLogoutModal : userReducer.showLogOut
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStateForHeader: (values) => dispatch(updateStateForHeader(values)),
        showSignin: (values) => dispatch(showSignIn(values)),
        showSignup: (values) => dispatch(showSignup(values)) ,
        showLogout:(value) => dispatch(showLogout(value))   
    }
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
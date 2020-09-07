import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {connect} from 'react-redux'
import { showAdminSignup} from "../Actions/userActions"

class Footer2 extends Component {
    adminLogin = () => this.props.showAdminLogin(true)
    render() {
        return (
            <div className="footer2Div">
                <div className="footerDiv1">
                    <Link to="aboutUs"><span>About us</span></Link>
                    <Link to="adminlogin"onClick = {this.adminLogin} ><span>Admin</span></Link>
                    <Link to="feedbackForm"><span>Feedback</span></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { userReducer } = state
    return { 
      showadminsignup: userReducer.showAdminLogin
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      showAdminLogin: (values) => dispatch(showAdminSignup(values)),   
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Footer2);
  
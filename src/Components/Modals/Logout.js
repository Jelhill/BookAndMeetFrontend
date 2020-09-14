import React, {Component} from 'react';
import { showLogout } from "../../Actions/userActions"
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { unprotectedRoutes } from "../../Data/data"

class Logout extends Component{
    onClose = () => {
        this.props.showLogout(false)
    }

    logOutUser = (e) => {
      e.preventDefault()
      localStorage.removeItem("token")
      const unprotected = unprotectedRoutes 
      const pathName = this.props.history.location.pathname
      const routeIndexOne = `/${pathName.split("/")[1]}`
      const currentRoute = `/${pathName.split("/")[1]}/${pathName.split("/")[2]}`;
      if(unprotected.includes(routeIndexOne)){
        window.location = `${currentRoute}`
      }else{
        window.location = "/home"
      }
      this.onClose()
    }
    
    render(){
        if(!this.props.showLogoutModal){
            return null;
        }
        return (
            
            <div className="logoutModalDiv">
                <div className='logoutmodal'>
                  <h2>Log Out</h2>
                  <p className="logoutparagraph">Do you wish to log out?</p>
                  <div className="logoutButtonsDiv">
                    <button className="yesButton" onClick={this.logOutUser}>Yes</button>
                    <button className="noButton" onClick={this.onClose}>No</button>
                  </div>                  
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { userReducer } = state
    return {
      showLogoutModal : userReducer.showLogOut
    }
}
  
  const mapDispatchToProps = (dispatch) => {
    return {
      showLogout: (value) => dispatch(showLogout(value)),
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
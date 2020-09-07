import React, { Component } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import AdminSideMenu from './AdminSideMenu'
import { connect } from 'react-redux'
import {getAdminRegInputs} from '../../Actions/userActions'


 class AddAdminForm extends Component {
        adminRegInput = (e)=>{
            this.props.getAdminregFormInput({[e.target.name]:e.target.value})
        }
        handleAdminSignUp = (e) =>{
            e.preventDefault()
            fetch("https://bookandmeet.herokuapp.com/adminsignup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(this.props.adminRegformDetails)
              })
              .then(response => response.json())
              
              .then((jsonResponse) => {
                  console.log("json",jsonResponse);
                if(jsonResponse.message === "Registered Successfully") {
                  this.props.successMessage(jsonResponse.message)
                }else{
                  this.props.successMessage("Failed Registration")
                }
              })
              .catch((err) => console.log(err))
        }
        
    render() {
        return (
            <div>
                <AdminHeader />
                <div className="adminLandingPageWrapper">
                    <AdminSideMenu />
                    <div className="adminRightSide">
                        <div className="bookingsContainer">
                            <div className="bookingsHeader">
                                <h4 className="history">Register Form </h4>
                            </div>
                            <div className="adminFormWrapper">
                                <form className="adminform">
                                    <div className="doubleInputDiv2">
                                        <div>
                                            <label className="adminFormLabel">First Name</label><br></br>
                                            <input type="text" className="adminFormInput" name = "firstname" onChange={this.adminRegInput}></input><br></br>
                                        </div>
                                        <div>
                                            <label className="adminFormLabel">Surname</label><br></br>
                                            <input type="text" className="adminFormInput" name = "surname" onChange={this.adminRegInput}></input>
                                        </div>
                                    </div>
                                    <div className="adminFormEmailWrapper">
                                    <label className="adminFormLabel">Email</label><br></br>
                                    <input type="email"  className="adminFormEmail" name = "email" onChange={this.adminRegInput}></input>
                                    </div>
                                    
                                    <div className="doubleInputDiv2">
                                        <div>
                                            <label className="adminFormLabel">Department</label><br></br>
                                            <input type="text" placeholder="305" className="adminFormInput" name = "department" onChange={this.adminRegInput}></input>
                                        </div>
                                    </div>
                                    <div className="doubleInputDiv2">
                                        <div>
                                            <label className="adminFormLabel">Password</label><br></br>
                                            <input type="password" placeholder="password"className="adminFormInput" name = "password" onChange={this.adminRegInput}></input><br></br>
                                        </div>
                                        <div>
                                            <label className="adminFormLabel">Confirmpassword</label><br></br>
                                            <input type="password" placeholder="confirmpassword" className="adminFormInput" name = "confirmpassword" onChange={this.adminRegInput}></input>
                                        </div>
                                    </div>
                                    
                                    <div className="adminFormSubmitWrapper">
                                        <button className="adminFormSubmitButton" onClick = {this.handleAdminSignUp}>Add</button>
                                    </div>                                                                                  
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
   const  {userReducer}=state
//    console.log('uuuuuu', userReducer);

    return {
        adminRegformDetails: userReducer.adminRegFormDetails
    }
   
}

const mapDispatchToProps  = (dispatch)=>{
    return {
        getAdminregFormInput: (values)=>dispatch(getAdminRegInputs(values))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddAdminForm)
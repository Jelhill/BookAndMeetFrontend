import React, { Component } from 'react'
import Header from "./Header";
import Footer2 from "./Footer2";
import { getFeedbackInputs } from '../Actions/userActions';
import { connect } from 'react-redux'


 class Feed extends Component {
  getUserInput = (e) => {
    this.props.getFeedbackInputs({[e.target.name]: e.target.value})
  }
  submitFeedBack =async (e)=>{
      e.preventDefault()
      fetch("https://bookandmeet.herokuapp.com/feedback",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(this.props.feedBackFormDetails)
      })
      .then(response =>response.json())
      .catch((err)=>console.log(err))
  }


  render() {
    return (
    <div className="feedBackFormContainer">
      <Header/>
        <div className="feedbackFormWrapper">        
            <h5>Leave your Comment</h5><br />
            <div className="feedbackInputDiv">
              <div className="feedbackSmallInput">
                <label>First Name</label><br/>
                <input type="text" name="firstname" onChange={this.getUserInput}/>
              </div>
              <div className="feedbackSmallInput">
                <label>Last Name</label><br/>
                <input type="text" name="lastname" onChange={this.getUserInput}  />
              </div>
            </div>
            <div className="feedbackLongInput">
              <label>Email</label>
              <input type="text" name="email" onChange={this.getUserInput}/>
            </div>
            <div className="feedbackCommentDiv">
              <label>Comment</label><br/>
              <textarea cols="76" rows="10" type="text" name="comments"onChange={this.getUserInput} />            
            </div>
            <div className="feedbackBtnDiv"><button onClick={this.submitFeedBack}>Submit</button></div>
        </div>
      <Footer2 />
    </div>
    )
  }
}

const mapStateToProps = (state)=>{
  const {userReducer} = state
  return{
    feedBackFormDetails:userReducer.feedBackFormDetails
  }
}

const mapDispatchToProps = {getFeedbackInputs}

export default connect(mapStateToProps,mapDispatchToProps)(Feed)

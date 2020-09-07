import React, { Component, Fragment } from 'react'
import AdminSideMenu from './AdminSideMenu';
import Header from '../Header'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserComments } from '../../Actions/userActions'


class Feedback extends Component {
    componentDidMount = async () => {
        await fetch("https://bookandmeet.herokuapp.com/feedbackComments", {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        })
            .then(response => response.json())
            .then((jsonResponse) => {
                // console.log(jsonResponse)
                if(jsonResponse){
                    this.props.getUserComments(jsonResponse)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    render() {
        return (
            <Fragment>
                <Header />
                <div className="adminLandingPageWrapper">
                    <AdminSideMenu />
                    <div className="adminRightSide">
                        <h3 className="feedBacksHeader">Feedbacks</h3>

                       {this.props.userComments.map((item, index) => {
                           return <div className="feedBacksWrapper">
                                {console.log("item", item)}
                                <i className="far fa-user-circle userImage"></i>
                                <div className="feedBackContent">
                                    <div className="feedBackContentHeader">
                                        <div><span className="name">{`${item.firstname.toLowerCase()} ${item.lastname.toLowerCase()}`}</span></div>
                                        <div><span className="time">24 hours ago</span></div>
                                    </div>
                                    <p className="content"> {item.comments}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const { feedbackReducer } = state
    // console.log("######", feedbackReducer.userComments);
    return {
        userComments: feedbackReducer.userComments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserComments: (value) => dispatch(getUserComments(value)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feedback));

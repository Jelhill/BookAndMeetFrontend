import React from 'react';
import { Route , Switch } from "react-router-dom"
import Landing from './Components/LandingPage/Landing';
import AboutRoom from './Components/RoomInformation/AboutRoom';
import Search from './Components/HomePage/Search';
import BookingForm from './Components/BookingPage/BookingForm';
import { Fragment } from 'react';
import UserProfilePage from './Components/ProfilePage/UserProfilePage';
import Login from './Components/Modals/Login';
import SignUp from './Components/Modals/Signup';
import CompleteSignUp from "./Components/Modals/CompleteSignUp"
import Error404 from "./Components/404"
import imageLoader from "./Components/imageLoader"
import AboutUs from "./Components/FooterLink/AboutUs"
import Feedback from "./Components/FooterLink/Feedback"
import Admin from "./Components/FooterLink/Admin"
import MeetingRooms from './Components/FooterLink/meetingRooms';
import AddNewRoom from './Components/FooterLink/addNewRoom';
// import EditRoom from './Components/FooterLink/editRoom';
import Bookings from './Components/FooterLink/Bookings';
import FeedbackForm from './Components/FeedbackForm';
import History from "./Components/ProfilePage/History"
import AdminHeader from './Components/AdminHeader';
,import AddAdminForm from './Components/FooterLink/AddAdminForm';
import EditRoomForm from './Components/FooterLink/EditRoomForm';
import AdminLogin from './Components/Modals/AdminLogin';




function App() {

  return (
    //  <AdminHeader/>

    <Fragment>    
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Search} />
        <Route exact path="/booking/:id" component={BookingForm} />
        <Route exact path="/aboutRoom/:id" component={AboutRoom} />
        <Route exact path="/userProfile" component={UserProfilePage} />
        <Route exact path="/Login" component={ Login } />
        <Route exact path="/Signup" component={SignUp} />
        <Route exact path="/adminlogin" component={AdminLogin} />

         {/* <Route exact path="/Logout" component={Logout} />   */}
         <Route exact path="/completeSignUp" component={CompleteSignUp} />
        <Route exact path="/404" component={Error404} />
        <Route exact path="/imageLoader" component={imageLoader} /> 
        <Route exact path="/aboutUs" component={AboutUs} />
        <Route exact path="/adminFeedback" component={Feedback} />
        {/* <Route exact path="/admin" component={AdminLogin} /> */}
        <Route exact path="/meetingRooms" component={MeetingRooms}/>
        <Route exact path="/adminDashboard" component={Admin}/>
        <Route exact path="/addnewroom" component={AddNewRoom}/>
        {/* <Route exact path="/editroom" component={EditRoom}/> */}
        <Route exact path="/adminBooking" component={Bookings}/>
        <Route exact path="/userHistory" component={History}/>
        <Route exact path="/feedbackForm" component={FeedbackForm}/>
        <Route exact path="/adminHeader" component={AdminHeader}/>
        <Route exact path="/addadminForm" component={AddAdminForm}/> 
        {/* <Route exact path="/addAdminForm" component={AddAdminForm}/> */}
        <Route exact path="/editRoomForm/:id" component={EditRoomForm}/>
        <Route exact path= "/adminlanding" component={Admin}/>
      </Switch>
    </Fragment> 
  );
}

export default App;

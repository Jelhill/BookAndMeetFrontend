import { 
    GET_SIGNUP_INPUTS,
    GET_ADMINFORM_INPUT, 
    GET_FEEDBACK_INPUTS,
    GET_IMAGE_INPUTS, 
    SHOW_SIGNUP,
    SHOW_LOGIN,
    SAVE_INITIAL_USER_DETAILS,
    UPDATE_STATE_WITH_API,
    UPDATE_STATE_FOR_HEADER,
    SHOW_LOGOUT,
    SUCCESS_MESSAGE,
    SUCCESSFUL_REG_MODAL,
    SHOW_ADMIN_SIGNIN,
    UPDATE_STATE_WITH_USER_INFO,
    SHOW_NOTIFICATION_MODAL,
    SHOW_SUCCESSFUL_BOOKING_MODAL, SHOW_ERROR_MESSAGE
 } from "../Actions/userActions"

const initialState = {
    signUpFormDetails: {},
    adminRegFormDetails: {},
    imageInputs: {},
    showSignUp: false,
    showSignIn: false,
    showLogOut: false,
    showAdminLogin: false,
    showSuccessfulRegModal: false,
    renderPage: false,
    userIsLoggedIn: false,
    userFirstname: "",
    userId: 0,
    successMessage: "",
    loggedInUserInfo: {},
    feedBackFormDetails:{},
    populateFeedbackPage:[],
    showNotificationModal: false,
    successfulBookingModal: false,
    errorMessage: "",

    
}   

const userReducer = (state = initialState, action) => {
    const newState = {...state}

    if(action.type === GET_SIGNUP_INPUTS) {
        Object.assign(newState.signUpFormDetails, action.values)
    }
    if(action.type === GET_ADMINFORM_INPUT) {
        Object.assign(newState.adminRegFormDetails, action.values)
    }
    if(action.type === GET_FEEDBACK_INPUTS){
        Object.assign(newState.feedBackFormDetails,action.values)
    }

    if(action.type === GET_IMAGE_INPUTS) {
        Object.assign(newState.imageInputs, action.values)
    }

    if(action.type === SHOW_SIGNUP) {
        newState.showSignUp = action.values
    }
    if(action.type === SHOW_ADMIN_SIGNIN) {
        newState.showAdminLogin = action.values
    }

    if(action.type === SHOW_LOGIN) {
        newState.showSignIn = action.values
    }
    if(action.type === SHOW_LOGOUT ){
        newState.showLogOut = action.value
    }
    if(action.type === SUCCESSFUL_REG_MODAL){
        newState.showSuccessfulRegModal = action.values
    }

    if(action.type === SAVE_INITIAL_USER_DETAILS) {
        Object.assign(newState.signUpFormDetails, action.values)
    }

    if(action.type === UPDATE_STATE_WITH_API) {
        newState.renderPage = action.value
    }

    if(action.type === UPDATE_STATE_FOR_HEADER) {
        newState.isLoggedIn = action.values.isLoggedIn
        newState.userFirstname = action.values.firstname
        newState.userId = action.values.id
    }

    if(action.type === SUCCESS_MESSAGE) {
        newState.successMessage = action.message
        newState.showSuccessfulRegModal = true
        newState.showSignUp = false
        
    }

    if(action.type === UPDATE_STATE_WITH_USER_INFO) {
       newState.userId = action.values.id
    }

    if(action.type === SHOW_NOTIFICATION_MODAL) {
       newState.showNotificationModal = action.value
    }

    if(action.type === SHOW_SUCCESSFUL_BOOKING_MODAL) {
       newState.successfulBookingModal = action.value

    }
    if(action.type === SHOW_ERROR_MESSAGE) {
       newState.errorMessage = action.value
    }

    return newState
}

export default userReducer

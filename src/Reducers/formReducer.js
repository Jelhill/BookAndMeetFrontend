import { ERROR_MESSAGE } from '../Actions/formValidation';

const initialState = {
    surnameErrorMessage: "",
    firstnameErrorMessage: "",
    emailErrorMessage: "",
    passwordErrorMessage: "",
    errorTracker: []
}

const formReducer = (state = initialState, action) => {
    const newState = {...state}

    if(action.type === ERROR_MESSAGE) {
        const { name, message } = action.values
        if(name === "surname") newState.surnameErrorMessage = message
        if(name === "firstname") newState.firstnameErrorMessage = message
        if(name === "email") newState.emailErrorMessage = message
        if(name === "password") newState.passwordErrorMessage = message
        
    }
    return newState

    
}

export default formReducer

// Length of each field
// If some fields contains unwanted character
// 
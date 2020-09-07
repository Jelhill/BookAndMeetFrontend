import { 
    GET_USER_COMMENTS 
    
 } from "../Actions/userActions"

const initialState = {
    userComments:[]
}   

const feedbackReducer = (state = initialState, action) => {
    const newState = {...state}

    if(action.type === GET_USER_COMMENTS) {
        newState.userComments = action.values
    }
   


    return newState
}

export default feedbackReducer;

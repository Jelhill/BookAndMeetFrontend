import { chartData } from '../Data/data';
import { GET_USER_BOOKING_DETAILS, 
    BOOKING_SUCCESS_MESSAGE, 
    UPDATE_STATE_WITH_BOOKING,
    UPDATE_STATE_WITH_COUNTDOWN_TIMER
} from "../Actions/bookingActions"

const iniialState = {
    chartData: chartData,
    userBookingDetails: {},
    bookingSuccessStatus: "",
    allBookings: [],
    countDownTime: null
}

const bookingReducer = (state = iniialState, action) => {
    const newState = {...state}

    if(action.type === GET_USER_BOOKING_DETAILS){
        Object.assign(newState.userBookingDetails, action.values)
    }

    if(action.type === BOOKING_SUCCESS_MESSAGE){
        newState.bookingSuccessStatus = action.message
    }

    if(action.type === UPDATE_STATE_WITH_BOOKING){
        newState.allBookings = action.data
    }

    if(action.type === UPDATE_STATE_WITH_COUNTDOWN_TIMER){
        newState.countDownTime = action.timer
    }

    return newState
}

export default bookingReducer

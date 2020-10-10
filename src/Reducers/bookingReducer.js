import { chartData } from '../Data/data';
import { GET_USER_BOOKING_DETAILS, 
    BOOKING_SUCCESS_MESSAGE, 
    UPDATE_STATE_WITH_BOOKING,
    UPDATE_STATE_WITH_COUNTDOWN_TIMER,
    UPDATE_STATE_WITH_USER_BOOKINGS
} from "../Actions/bookingActions"

const iniialState = {
    chartData: chartData,
    userBookingDetails: {},
    bookingSuccessStatus: "",
    allBookings: [],
    countDownTime: null,
    allUserBookings: []
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

    if(action.type === UPDATE_STATE_WITH_USER_BOOKINGS){
        console.log(action.values);
        newState.allUserBookings = action.values
    }

    return newState
}

export default bookingReducer

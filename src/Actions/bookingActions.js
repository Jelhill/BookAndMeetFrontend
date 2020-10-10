export const GET_USER_BOOKING_DETAILS = 'GET_USER_BOOKING_DETAILS'
export const BOOKING_SUCCESS_MESSAGE = 'BOOKING_SUCCESS_MESSAGE'
export const UPDATE_STATE_WITH_BOOKING = 'UPDATE_STATE_WITH_BOOKING'
export const UPDATE_STATE_WITH_COUNTDOWN_TIMER = 'UPDATE_STATE_WITH_COUNTDOWN_TIMER'
export const UPDATE_STATE_WITH_USER_BOOKINGS = 'UPDATE_STATE_WITH_USER_BOOKINGS'

export const getUserBookingDetails = (values) => {
  return{
    type: GET_USER_BOOKING_DETAILS,
    values
  }
}


export const bookingSuccessMessage = (message) => {
  return{
    type: BOOKING_SUCCESS_MESSAGE,
    message
  }
}
export const updateStateWithBookings = (data) => {
  return{
    type: UPDATE_STATE_WITH_BOOKING,
    data
  }
}

export const updateCountDownTimer = (timer) => {
  return{
    type: UPDATE_STATE_WITH_COUNTDOWN_TIMER,
    timer
  }
}

export const updateStateWithUserBookings = (values) => {
  return{
    type: UPDATE_STATE_WITH_USER_BOOKINGS,
    values
  }
}
export const GET_USER_BOOKING_DETAILS = 'GET_USER_BOOKING_DETAILS'
export const BOOKING_SUCCESS_MESSAGE = 'BOOKING_SUCCESS_MESSAGE'
export const UPDATE_STATE_WITH_BOOKING = 'UPDATE_STATE_WITH_BOOKING'

export const getUserBookingDetails = (values) => {
  return{
    type: GET_USER_BOOKING_DETAILS,
    values
  }
}


export const bookingSuccessMessage = () => {
  return{
    type: BOOKING_SUCCESS_MESSAGE
  }
}
export const updateStateWithBookings = (data) => {
  return{
    type: UPDATE_STATE_WITH_BOOKING,
    data
  }
}
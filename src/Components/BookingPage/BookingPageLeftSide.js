import React from 'react'

const BookingPageLeftSide = ({room})  =>{

    return (
        <div className="bookingPageLeftSide">
            <img src={room.imageurl} alt="ImageRoom14"/>
        </div>
    )
}

export default BookingPageLeftSide
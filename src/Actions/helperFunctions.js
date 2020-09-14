
// Checking for Token and Updating State
export const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key)  
    if (!itemStr) {
      return false
    }        
    const token = itemStr.split(" ")[0] 
    const expiryTime = itemStr.split(" ")[1] 
    const id = itemStr.split(" ")[2] 
    const firstname = itemStr.split(" ")[3] 

    const now = new Date()
    if (now.getTime() > expiryTime) {
      localStorage.removeItem(key)
      return {isLoggedIn: false}
    }
    return {isLoggedIn: true, id, firstname, token}
}

//SET TOKEN IN LOCAL STORAGE
export const setWithExpiry = (key, token, tokenDuration, userInfo) => {
    const now = new Date()
    const expiryTime = now.getTime() + tokenDuration
    localStorage.setItem(key, `${token} ${expiryTime} ${userInfo.id} ${userInfo.firstname}`)
}

export const formatDateTime = (date, time) => {
  return `${date} ${time}`
}


export const checkingBookedStatus = (bookings, id) => {
  let isAvailable = true
  const now = (new Date()).getTime()

  if(bookings.length === 0) isAvailable = true
  const findRoomId = bookings.filter(booking => booking.roomid === id)
  if(!findRoomId) isAvailable = true

    for (let i = 0; i < findRoomId.length; i++) {
    let checkin = new Date(findRoomId[i].checkin.split("T").join(" ").split(".")[0]).getTime()
    let checkout = new Date(findRoomId[i].checkout.split("T").join(" ").split(".")[0]).getTime()
     
      if (now > checkin && now < checkout) {
        isAvailable = false    
      }
    }
  return isAvailable ? "Available" : "In Use"
}

export const checkCurrenBooking = (bookings, id, userDate) => {
  let roomsBooked = []
  let newUserDate = new Date(userDate).getTime()
  let filterById = bookings.filter(booking => {
    if(booking.roomid === id && booking.status === 1) {
      return false
    }
    return true
  }) 

 for (let i = 0; i < filterById.length; i++) {
  let checkin = new Date(filterById[i].checkin.split("T").join(" ").split(".")[0]).getTime()
  let checkout = new Date(filterById[i].checkout.split("T").join(" ").split(".")[0]).getTime()
   
    if (newUserDate > checkin && newUserDate < checkout) {
      roomsBooked.push(filterById[i])
    }
  }

  return roomsBooked.length > 0 ? true : false
}



export const bookingDuration = (checkin, checkout) => {
  checkin = new Date(checkin.split("T").join(" ").split(".")[0]).getTime()
  checkout = new Date(checkout.split("T").join(" ").split(".")[0]).getTime()

  let seconds = (checkout - checkin)/1000
  if(seconds < 60) return `${seconds} seconds`
  if(seconds > 60 && seconds < 3600) {
      let minutes =  Math.floor(seconds / 60)
      return `${minutes} minutes`
  }

  if(seconds > 3600 && seconds < 86400 ) {
      let hours = Math.floor(seconds/ 3600)
      return `${hours} hour`
  }

  if(seconds > 86400 ) {
      let days = Math.floor(seconds/ 86400)
      return `${days} days`
  }
}


export const bookingStatus = (statusId) => {
  if (statusId === 1) {
    return "Pending"
  }else if(statusId === 2){
    return "Completed"
  }else{
    return "Cancelled"
  }
}


export const countDown = (bookings, id) => {
  let timeleft = null
  let isAvailable = true
  let now = (new Date()).getTime()
  let filterById = bookings.filter(booking => booking.roomid === id)

  // let filterById = bookings.filter(booking => {
  //   if(booking.roomid === id && booking.status === 1) {
  //     return false
  //   }
  //   return true
  // }) 
  

  for (let i = 0; i < filterById.length; i++) {
    let checkin = new Date(filterById[i].checkin.split("T").join(" ").split(".")[0]).getTime()
    let checkout = new Date(filterById[i].checkout.split("T").join(" ").split(".")[0]).getTime()       
    
    if (now > checkin && now < checkout) {
      isAvailable = false
    }

    if(isAvailable === false) {
      timeleft = checkout - now
    }
  }

  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

   let countDownTimer = `${days}d ${hours}h ${minutes}m ${seconds}s `
   return countDownTimer
}



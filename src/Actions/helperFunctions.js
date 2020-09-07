
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
    console.log("PAyload", userInfo)
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
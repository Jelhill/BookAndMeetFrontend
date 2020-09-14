 export const roomList = {
  rooms: [
    {
      id: 1,
      name: 'Conference Room',
    },
    {
      id: 2,
      name: 'Customers Meeting Room',
    },
    {
      id: 3,
      name: 'Regular Meeting Room',
    },
    {
      id: 4,
      name: 'Private Meeting Room',
    },
    {
      id: 5,
      name: 'Senate Meeting Room',
    }
  ]
};

export const RangeList = {
  ranges: [
      {
          id: 1,
          name: '2-5 Seats',
      },
      {
          id: 2,
          name: '6-15 Seats',
      },
      {
          id: 1,
          name: '16-50 Seats',
      },
      {
          id: 1,
          name: 'Above 50 Seats',
      }
  ]
}

export const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [{
    label: "Bookings", 
    data: [70,45,60,20,87,63,12,90,50,45,21,6],
    backgroundColor: ["#F9E79F", "#DC7633", "#48C9B0", "#C39BD3", "#E74C3C", "#D68910", "#F9E79F", "#DC7633", "#48C9B0", "#C39BD3", "#E74C3C", "#D68910"]
  }]
}

export const unprotectedRoutes = ["/home", "/aboutRoom", "/", "/booking"]

export default roomList 
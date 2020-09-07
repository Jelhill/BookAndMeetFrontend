 import { ADD_LIST } from "../Actions/catAction"
 import { roomList } from '../Data/data'
 


 export default (state = roomList, action) => {
   switch(action.type){
     case ADD_LIST:
       return {
         ...state,
         rooms: [...state.rooms, action.payload]
       }
    default:
      return state
   }
 }

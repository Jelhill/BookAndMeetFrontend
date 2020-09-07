import {RangeList} from '../Data/data';
import { ADD_RANGE } from "../Actions/catAction"
// import * as CONSTANTS from '../Components/core copy/constants'


export default (state = RangeList, action) => {
    switch(action.type){
      case ADD_RANGE:
        return {
          ...state,
          ranges: [...state.ranges, action.payload]
        }
     default:
       return state
    }
  }
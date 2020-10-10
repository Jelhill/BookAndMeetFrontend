import { GET_ROOM_FORM_INPUTS, 
    SET_LOADING,
    GET_ROOM_IMAGE, 
    UPDATE_STATE_WITH_ROOMS,
    EDIT_ROOM_FORM_INPUTS,
    SAVE_CURRENT_ROOM ,
    UPDATE_STATE_WITH_ROOM_INFO,
    EDIT_FORM_INPUTS,
    UPDATE_STATE_WITH_SEARCH_INPUT,
    UPDATE_STATE_WITH_FILTERED_ROOM,
    UPDATE_STATE_WITH_SEARCH
} from "../Actions/roomActions"

const initialState = {
    addRoomFormInputs: {}, 
    editRoomFormInputs: {},
    setLoading: false, 
    roomImage: null,
    rooms: [],
    currentRoom: {},
    roomInfo: {},
    capacity: 0,
    waterDispenser: false,
    airCondition: false,
    roomName: "",
    roomType: "",
    whiteBoard: false,
    roomLocation: "",
    projector: false,
    isavailable: false,
    imageurl: "",
    searchInput: {},
    filteredRoom: [],
    roomId: 0,
    searchedRooms: []
}

const roomReducer = (state = initialState, action) => {
    const newState = {...state}

    if(action.type === GET_ROOM_FORM_INPUTS) {
        Object.assign(newState.addRoomFormInputs, action.values)
    }
    if(action.type === EDIT_ROOM_FORM_INPUTS) {
        Object.assign(newState.editRoomFormInputs, action.values)
        Object.assign(newState.roomInfo, action.values)
    }

    if(action.type === SET_LOADING) {
        newState.setLoading = action.value
    }

    if(action.type === GET_ROOM_IMAGE) {
        newState.roomImage = action.value
    }

    if(action.type === UPDATE_STATE_WITH_ROOMS) {
        newState.rooms = action.values
    }

    if(action.type === SAVE_CURRENT_ROOM) {
   
        Object.assign(newState.currentRoom, action.values)
    }

    if(action.type === UPDATE_STATE_WITH_ROOM_INFO) {
        // Object.assign(newState.roomInfo, action.values)
        newState.capacity = action.values.capacity
        newState.waterDispenser = action.values.haswaterdispenser
        newState.airCondition = action.values.hasaircondition
        newState.roomName = action.values.name
        newState.roomType = action.values.type
        newState.whiteBoard = action.values.haswhiteboard
        newState.roomLocation = action.values.location
        newState.projector = action.values.hasprojector
        newState.isavailable = action.values.isavailable
        newState.imageurl = action.values.imageurl
    }

    if(action.type === EDIT_FORM_INPUTS) {
        Object.assign(newState.editRoomFormInputs, action.values)
        newState.capacity = action.values.capacity
        newState.waterDispenser = action.values.haswaterdispenser
        newState.airCondition = action.values.hasaircondition
        newState.roomName = action.values.name
        newState.roomType = action.values.type
        newState.whiteBoard = action.values.haswhiteboard
        newState.roomLocation = action.values.location
        newState.projector = action.values.hasprojector
        newState.isavailable = action.values.isavailable
        newState.imageurl = action.values.imageurl
        newState.roomId = action.values.id
    }

    if(action.type === UPDATE_STATE_WITH_SEARCH_INPUT) {
        Object.assign(newState.searchInput, action.values)
    }

    if(action.type === UPDATE_STATE_WITH_FILTERED_ROOM) {
        newState.filteredRoom = action.values
    }
    if(action.type === UPDATE_STATE_WITH_SEARCH) {
        newState.searchedRooms = action.values
    }
    return newState
}



export default roomReducer;
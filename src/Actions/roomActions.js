export const GET_ROOM_FORM_INPUTS = "GET_ROOM_FORM_INPUTS"
export const EDIT_ROOM_FORM_INPUTS = "EDIT_ROOM_FORM_INPUTS"
export const SET_LOADING = "SET_LOADING"
export const GET_ROOM_IMAGE = "GET_ROOM_IMAGE"
export const UPDATE_STATE_WITH_ROOMS = "UPDATE_STATE_WITH_ROOMS"
export const SAVE_CURRENT_ROOM = "SAVE_CURRENT_ROOM"
export const UPDATE_STATE_WITH_ROOM_INFO = "UPDATE_STATE_WITH_ROOM_INFO"
export const EDIT_FORM_INPUTS = "EDIT_FORM_INPUTS"
export const UPDATE_STATE_WITH_SEARCH_INPUT = "UPDATE_STATE_WITH_SEARCH_INPUT"
export const UPDATE_STATE_WITH_FILTERED_ROOM = "UPDATE_STATE_WITH_FILTERED_ROOM"
export const UPDATE_STATE_WITH_SEARCH = "UPDATE_STATE_WITH_SEARCH"


export const getRoomFormInputs = (values) => {
    return {
        type: GET_ROOM_FORM_INPUTS,
        values
    }
}
export const editRoomFormInputs = (values) => {
    return {
        type: EDIT_ROOM_FORM_INPUTS,
        values
    }
}

export const setLoading = (value) => {
    return {
        type: SET_LOADING,
        value
    }
}

export const getRoomImage = (value) => {
    return {
        type: GET_ROOM_IMAGE,
        value
    }
}

export const updateStateWithRooms = (values) => {
    return {
        type: UPDATE_STATE_WITH_ROOMS,
        values
    }
}

export const saveCurrentRoom = (values) => {
    return {
        type: SAVE_CURRENT_ROOM,
        values
    }
}

export const updateStateWithRoomInfo = (values) => {
    return {
        type: UPDATE_STATE_WITH_ROOM_INFO,
        values
    }
}

export const editFormInputs = (values) => {
    return{
        type: EDIT_FORM_INPUTS,
        values
    }
}


export const updateStateWithSearchInput = (values) => {
    return{
        type: UPDATE_STATE_WITH_SEARCH_INPUT,
        values
    }
}


export const updateStateWithFilteredRoom = (values) => {
    return{
        type: UPDATE_STATE_WITH_FILTERED_ROOM,
        values
    }
}

export const updateStateWithSearch = (values) => {
    return{
        type: UPDATE_STATE_WITH_SEARCH,
        values
    }
}
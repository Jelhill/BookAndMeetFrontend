export const ADD_LIST = 'ADD_LIST'
export const ADD_RANGE = 'ADD_RANGE'

export const addList = (category) => {
  return({
    type: ADD_LIST,
    payload: category
  })
}

export const addRange = (range) => {
  return({
    type: ADD_RANGE,
    payload: range
  })
}

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateStateWithSearchInput, updateStateWithFilteredRoom } from  "../../Actions/roomActions"



class seachFilter extends Component {
    
    getSearchInput = (e) => {
        this.props.updateStateWithSearchInput({[e.target.name]: e.target.value})
    }
    
    searchForRooms = (e) => {
        e.preventDefault()                
        const { roomType, roomCapacity } = this.props
        let minimum = 0, maximum = 0
        switch(roomCapacity) {
            case "oneToTen":
                minimum = 1
                maximum = 10
                break;
            case "elevenToFifty":
                minimum = 11
                maximum = 50
                break;
            case "fiftyOneToOneHundred":
                minimum = 51
                maximum = 100
                break;
            case "hundredToTwoHundred":
                minimum = 101
                maximum = 200
                break;
            case "aboveTwoHundred":
                minimum = 201
                maximum = 5000
                break;
            default: 
                minimum = 0;
                maximum = 0;
        }

        const filteredRoom = this.props.rooms.filter(room => {
            if(room.type === roomType && (room.capacity >= minimum && room.capacity <= maximum) ){
                return true
            }
            return false
        })
        this.props.updateStateWithFilteredRoom(filteredRoom)
    }

    render() {
        return (
            <div className="searchAreaDiv">
                <select name="roomType" defaultValue={"Type"} onChange={this.getSearchInput}>
                    <option disabled hidden>Type</option>
                    <option value="Board Room">Board Room</option>
                    <option value="Private Room">Private Room</option>
                    <option value="Conference Room">Conference</option>
                    <option value="Auditorium">Auditorium</option>
                </select>

                <select name="capacity" defaultValue={"Capacity"} onChange={this.getSearchInput}>
                    <option disabled hidden>Capacity</option>
                    <option value="oneToTen">1 - 10 seats</option>
                    <option value="elevenToFifty">11 - 50 seats</option>
                    <option value="fiftyOneToOneHundred">51 - 100 seats</option>
                    <option value="hundredToTwoHundred">101 - 200 seats</option>
                    <option value="aboveTwoHundred">Above 200 seats</option>
                </select>
                {/* <input type="date" name="dateSearch" onChange={this.getSearchInput}/>
                <input type="time" name="timeSearch" onChange={this.getSearchInput}/> */}
                <button onClick={this.searchForRooms}>Search</button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const { roomReducer } = state
    return {
        rooms: roomReducer.rooms,
        roomType: roomReducer.searchInput.roomType,
        roomCapacity: roomReducer.searchInput.capacity,
        dateSearch: roomReducer.searchInput.dateSearch,
        timeSearch: roomReducer.searchInput.timeSearch,  
        filteredRoom: roomReducer.filteredRoom  
    }   
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStateWithSearchInput: (values) => dispatch(updateStateWithSearchInput(values)),
        updateStateWithFilteredRoom: (values) => dispatch(updateStateWithFilteredRoom(values))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(seachFilter);

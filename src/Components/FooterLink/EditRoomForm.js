import React, {useEffect} from 'react'
import { withRouter, useParams } from "react-router-dom"
import AdminSideMenu from './AdminSideMenu'
import { getRoomFormInputs, getRoomImage, editFormInputs } from "../../Actions/roomActions"
import { connect } from 'react-redux'
import { updateStateWithRoomInfo } from '../../Actions/roomActions'

const EditRoomForm = (props) =>  {
    const {id} = useParams()
    const { roomName, roomType, whiteBoard, airCondition, waterDispenser, capacity, roomLocation, isavailable, projector, imageurl } = props
    const fetchRoom = () => {
        fetch(`https://bookandmeet.herokuapp.com/getRoomDetails/${id}`, {method: "GET"})
        .then((response) => response.json())
        .then((jsonRes) => {
            props.updateStateWithRoomInfo(jsonRes.response.result)
        })
    }

    useEffect(fetchRoom, [])

    const getFormInput = (e) => {
        props.editFormInputs({[e.target.name]: e.target.value})
    }

    const updateRoom = (e) => {
        e.preventDefault()       
        fetch(`https://bookandmeet.herokuapp.com/editRoom/${id}`, {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(props.editRoomFormInputs)
        })
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse)
        })
    }

    return (
        <div className="adminLandingPageWrapper">
            <AdminSideMenu />
            <div className="adminRightSide"> 
                <div className="form">
                    <form>
                        <div className="roomType">
                            <label>Room type</label>
                            <select name="type" onChange={getFormInput} value={roomType}>
                                <option disabled hidden>Select Type</option>
                                <option value="Private Room">Private Room</option>
                                <option value="Board Room">Board Room</option>
                                <option value="Conf. Room">Conference Room</option>
                                <option value="Auditorium">Auditorium </option>
                            </select>
                        </div>
                        <div className="roomAndLocation">
                            <div className="roomLocation">
                                <label >Location</label>
                                <input type="text" name="location" value={roomLocation} onChange={getFormInput} ></input>
                            </div>
                            <div className="roomLocation">
                                <label>Room Capacity</label>
                                <input type="number" name="capacity" onChange={getFormInput} value={capacity}></input>
                            </div>
                        </div>
                        <div className="roomAndLocation">
                            <div className="roomLocation">
                                <label> Room Name</label>
                                <input type="text" name="name" onChange={getFormInput} value={roomName}></input>
                            </div>
                            <div className="roomLocation">
                                <label>Available</label>
                                <select name="isavailable" onChange={getFormInput} defaultValue={isavailable}>
                                    <option disabled hidden>Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="inputFile">
                            <img src={imageurl} alt=""/>
                            <input type="file" name="imageurl" id="file" onChange={getRoomImage} />
                        </div>
                        <div>
                        <h4 className="selectEquipment">Select Equipment/Features</h4>
                        <div className="roomItemDiv">
                            <div className="roomListDiv">
                                <div className="roomItemListDiv">
                                    <label>Projector</label>
                                    <select name="hasprojector" onChange={getFormInput} defaultValue={projector ? "Yes" : "No"}>
                                        <option disabled hidden>Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div className="roomItemListDiv">
                                    <label>White Board</label>
                                    <select name="haswhiteboard" onChange={getFormInput} defaultValue={whiteBoard ? "Yes" : "No"}>
                                        <option disabled hidden>Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="roomListDiv">
                                <div className="roomItemListDiv">
                                    <label>Air Condition</label>
                                    <select name="hasaircondition" onChange={getFormInput} defaultValue={airCondition ? "Yes" : "No"}>
                                        <option disabled hidden>Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div className="roomItemListDiv">
                                    <label>Water Dispenser</label>
                                    <select name="haswaterdispenser" onChange={getFormInput} defaultValue={waterDispenser ? "Yes" : "No"  }>
                                        <option disabled hidden>Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div className="addRoomButtonDiv">
                            <button className="addRoomButton" onClick={updateRoom}>Update Room</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        )
    }


const mapStateToProps = (state) => {
    const { roomReducer } = state
    console.log("Room Info", roomReducer.editRoomFormInputs)
    return {
        roomImage: roomReducer.roomImage,
        editRoomFormInputs: roomReducer.editRoomFormInputs,
        addRoomFormInputs: roomReducer.addRoomFormInputs,
        setRoomLoading: roomReducer.setLoading,
        capacity: roomReducer.capacity,
        waterDispenser: roomReducer.waterDispenser,
        airCondition: roomReducer.airCondition,
        roomName: roomReducer.roomName,
        roomType: roomReducer.roomType,
        whiteBoard: roomReducer.whiteBoard,
        roomLocation: roomReducer.roomLocation,
        projector: roomReducer.projector,
        isavailable: roomReducer.isavailable,
        imageurl: roomReducer.imageurl,
        roomId: roomReducer.id
    }
}
    
const mapDispatchToProps = (dispatch) => {
    return {
        getRoomFormInputs: (values) => dispatch(getRoomFormInputs(values)),
        getRoomImage: (value) => dispatch(getRoomImage(value)),
        setLoading: (value) => dispatch(getRoomFormInputs(value)),
        updateStateWithRoomInfo: (values) => dispatch(updateStateWithRoomInfo(values)),
        editFormInputs: (values) => dispatch(editFormInputs(values)),
    }
}
        
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditRoomForm));
      

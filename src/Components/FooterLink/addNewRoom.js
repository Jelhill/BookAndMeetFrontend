import React from 'react'
import { withRouter } from "react-router-dom"
import AdminSideMenu from './AdminSideMenu'
import { getRoomFormInputs, getRoomImage } from "../../Actions/roomActions"
import { connect } from 'react-redux'

const AddNewRoom = (props) =>  {

    const getFormInput = (e) => {
        props.getRoomFormInputs({[e.target.name]: e.target.value})
    }

    const getRoomImage = (e) => {
        props.getRoomImage({[e.target.name]: e.target.files})
    }

    const addNewRoom = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("file", props.roomImage.image[0])
        data.append("upload_preset", "jelhill")
        props.setLoading(true)
        const res = await fetch("https://api.cloudinary.com/v1_1/dvbaflmgm/image/upload", {
            method: "POST",
            body: data
        })  
        const jsonRes = await res.json()
        const {type, location, capacity, name, available, hasProjector, hasAirCondition, hasWaterDispenser, hasWhiteBoard} = props.addRoomFormInputs
        const secure_url = jsonRes.secure_url
        const body = {type, location, capacity, name, available, hasProjector, hasAirCondition, hasWaterDispenser, hasWhiteBoard, secure_url}
        await fetch("https://bookandmeet.herokuapp.com/addRoom",{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body)
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            console.log(jsonResponse)
        }).catch((err) => {
            console.log(err)
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
                            <select name="type" onChange={getFormInput}>
                                <option disabled selected hidden>Select Type</option>
                                <option value="Private Room">Private Room</option>
                                <option value="Board Room">Board Room</option>
                                <option value="Conference Room">Conference Room</option>
                                <option value="Auditorium">Auditorium </option>
                            </select>
                            {/* <input type="text" name="type" onChange={getFormInput}></input> */}
                        </div>
                        <div className="roomAndLocation">
                            <div className="roomLocation">
                                <label >Location</label>
                                <input type="text" name="location" onChange={getFormInput}></input>
                            </div>
                            <div className="roomLocation">
                                <label>Room Capacity</label>
                                <input type="number" name="capacity" onChange={getFormInput}></input>
                            </div>
                        </div>
                        <div className="roomAndLocation">
                            <div className="roomLocation">
                                <label> Room Name</label>
                                <input type="text" name="name" onChange={getFormInput}></input>
                            </div>
                            <div className="roomLocation">
                                <label>Available</label>
                                <select name="available" onChange={getFormInput}>
                                    <option disabled selected hidden>Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="inputFile">
                            <input type="file" name="image" id="file" onChange={getRoomImage} />
                        </div>
                        <div>
                        <h4 className="selectEquipment">Select Equipment/Features</h4>
                        <div className="roomItemDiv">
                            <div className="roomListDiv">
                                <div className="roomItemListDiv">
                                    <label>Projector</label>
                                    <select name="hasProjector" id="" onChange={getFormInput} placeholder="Projector">
                                        <option disabled selected hidden>Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div className="roomItemListDiv">
                                    <label>White Board</label>
                                    <select name="hasWhiteBoard" id="" onChange={getFormInput} placeholder="Projector">
                                        <option disabled selected hidden>Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="roomListDiv">
                                <div className="roomItemListDiv">
                                    <label>Air Condition</label>
                                    <select name="hasAirCondition" id="" onChange={getFormInput}>
                                        <option disabled selected hidden>Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div className="roomItemListDiv">
                                    <label>Water Dispenser</label>
                                    <select name="hasWaterDispenser" id="" onChange={getFormInput} placeholder="a">
                                        <option disabled selected hidden>Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div className="addRoomButtonDiv">
                            <button className="addRoomButton" onClick={addNewRoom}>Add Room</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        )
    }


const mapStateToProps = (state) => {
    const { roomReducer } = state
    console.log(roomReducer.addRoomFormInputs)
    return {
        roomImage: roomReducer.roomImage,
        addRoomFormInputs: roomReducer.addRoomFormInputs,
        setRoomLoading: roomReducer.setLoading
    }
}
    
const mapDispatchToProps = (dispatch) => {
    return {
        getRoomFormInputs: (values) => {dispatch(getRoomFormInputs(values))},
        getRoomImage: (value) => {dispatch(getRoomImage(value))},
        setLoading: (value) => {dispatch(getRoomFormInputs(value))}
    }
}
        
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddNewRoom));
      

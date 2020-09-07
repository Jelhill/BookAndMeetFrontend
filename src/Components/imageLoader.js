import React, { Component } from 'react'

export default class imageLoader extends Component {
    state = {
        image: "",
        setLoading: false
    }
    uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        console.log("Filesssss", files)
        data.append("file", files[0])
        data.append("upload_preset", "jelhill")
        
        this.setState({
            setLoading: true
        })

        const res = await fetch("https://api.cloudinary.com/v1_1/dvbaflmgm/image/upload", {
            method: "POST",
            body: data
        })  
        const jsonRes = await res.json()
        console.log(jsonRes)
        this.setState({
            image: jsonRes.secure_url,
            setLoading: false    
        })
        console.log("Image", this.state.image)
    }

    render() {
        return (
            <div>
                <input type="file" name="myImage" onChange={this.uploadImage}/>
                {this.state.setLoading ? <h3>Loading....</h3> : <img src={this.state.image} alt="Display" style={{width: "300px", height: "300px"}}/>}
            </div>
        )
    }
}

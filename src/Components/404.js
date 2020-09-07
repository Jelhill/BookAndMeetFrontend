import React from 'react'
import { Link } from 'react-router-dom'



export default function Error404() {
    return (
        <div className="Container404Page">

        <div className="Error">
            <div className="Big404">
                <p>404</p>
            </div>
            <div className="Ooops">
            <small>Ooops!!</small>
            </div>
            <div className="PageExist">
            <span>THAT PAGE DOESN'T EXIST OR IS UNAVAILABLE</span>
            </div>
            <Link to="/home" className="Button404">Go Back to Home</Link>
            
        </div>
    
        </div>
    )
}

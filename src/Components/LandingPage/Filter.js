import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="rows">
                <div className="col-md-4">
                  <span>Search Results: {this.props.count} Rooms Found</span>  
                    </div>                
            </div>
        )
    }
}

import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Bookings extends Component {

    render() {
        console.log("Test");
        return (
            <div>
                <span>test page</span>
                <Link to="/home">Click me</Link>
            </div>
        )  
    }

}

export default Bookings
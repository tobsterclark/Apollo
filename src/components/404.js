import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {

    render() {
        return (
            <div className="flex justify-center items-center flex-col font-sans font-light">
                <span className="text-4xl">Sorry, your page was not found.</span>
                <Link to="/" className="">Click here to go back to the home page.</Link>
            </div>
        )  
    }

}

export default NotFound
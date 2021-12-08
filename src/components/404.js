import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Background from './background'

class NotFound extends Component {

    render() {
        return (
            <div>
                <div className="flex justify-center items-center w-full h-screen text-white flex-col font-sans font-light">
                    <span className="text-4xl z-10">Sorry, your page was not found.</span>
                    <Link to="/" className="z-10">Click here to go back to the home page.</Link>
                </div>
                <Background />
            </div>
        )  
    }

}

export default NotFound
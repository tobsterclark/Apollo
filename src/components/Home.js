import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {

    render() {
        return (
            <div className="font-sans font-light text-white text-4xl z-10">
                <div></div>
                <Link to="/book" className="bg-red-vibrant rounded-2xl py-3 px-5 hover:bg-white hover:text-red-vibrant">Book Now</Link>
            </div>  
        )  
    }

}

export default Home
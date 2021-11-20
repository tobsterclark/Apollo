import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {

    render() {
        return (
            <div>
                <div className="font-sans font-medium text-white text-4xl">
                    <div></div>
                    <Link to="/book" className="bg-red-vibrant rounded-2xl py-3 px-5 hover:bg-white hover:text-red-vibrant">Book Now</Link>
                </div>  

            </div>
        )  
    }

}

export default Home
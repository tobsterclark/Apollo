import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import exampleMovie from './Images/exampleMovie.png'
import exampleMovie2 from './Images/exampleMovie2.png'
import exampleMovie3 from './Images/exampleMovie3.png'

class Home extends Component {
    state = {
        index:1,
        picList:[exampleMovie, exampleMovie2, exampleMovie3]
    }
    render() {
        return (
            <div className="font-sans font-light text-white text-4xl z-10 flex justify-center items-center h-screen">
                <div className="h-3/4">
                    <div className="h-full justify-center items-center">
                        <div className="h-full flex">
                            <img src={this.state.picList[this.state.index - 1]} alt="this is a movie" className="h-full rounded-2xl -mx-20"/>
                            <img src={this.state.picList[this.state.index + 1]} alt="this is a movie" className="h-full rounded-2xl -mx-20"/>
                        </div>
                        <div className="absolute inset-10 flex justify-center items-center h-screen">
                            <img src={this.state.picList[this.state.index]} alt="this is a movie" className="h-3/4 rounded-2xl"/>
                        </div>
                    </div>
                    <div className="absolute inset-0 top-10 flex justify-center items-center">
                        <Link to="/book" className="bg-red-vibrant rounded-2xl py-3 px-5 hover:bg-white hover:text-red-vibrant">Book Now</Link>
                    </div>
                </div>
                
            </div>  
        )  
    }

}

export default Home
import React, {Component} from 'react'
import exampleMovie from './Images/exampleMovie.png'
import exampleMovie2 from './Images/exampleMovie2.png'
import exampleMovie3 from './Images/exampleMovie3.png'

class Showing extends Component {
    state = {
        index:1,
        picList:[exampleMovie, exampleMovie2, exampleMovie3]
    }
    render() {
        return (
            <div className="bg-white z-10 w-full py-20">
                <div className="flex flex-col items-center gap-y-20 font-sans font-light">
                    <span className="text-4xl">Now Showing</span>
                    <div className="flex gap-x-20">
                        <div className="flex flex-col items-center">
                            <span>Movie 1</span>
                            <img src={this.state.picList[this.state.index]} alt="this is a movie" className="h-56"/>
                        </div>
                        <div className="flex flex-col items-center">
                            <span>Movie 2</span>
                            <img src={this.state.picList[this.state.index + 1]} alt="this is a movie"  className="h-56"/>
                        </div>
                        <div className="flex flex-col items-center">
                            <span>Movie 3</span>
                            <img src={this.state.picList[this.state.index - 1]} alt="this is a movie"  className="h-56"/>
                        </div>
                    </div>
                </div>
            </div>
        )  
    }

}

export default Showing
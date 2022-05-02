/*

*/

import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import MoviesContext from '../contexts/Movies'


/* Todo: 

 - Work on the transition between movies
 - Add drop shadows
 - Add arrows to change through the movies
 - Work on sending the user to the right place on book now button press

*/


class Home extends Component {
    static contextType = MoviesContext
    mounted = false
    state = {
        intervalId:0,
        index:1,
        prevIndex:0,
        nextIndex:2,
        picList:[]
    }

    increaseMovieIndex = () => {
        if (this.state.nextIndex + 1 === this.state.picList.length && this.mounted){
            this.setState({ 
                prevIndex: this.state.index,
                index: this.state.nextIndex,
                nextIndex: 0
            })
        } else if (this.mounted){
            this.setState({
                prevIndex: this.state.index,
                index: this.state.nextIndex,
                nextIndex: this.state.nextIndex + 1
            })
        }
    }

    arrowClicked = (lr) => {
        clearInterval(this.state.intervalId)
        if (lr === "increase") {
            this.increaseMovieIndex()
        } else if (lr === "decrease") {
            this.decreaseMovieIndex()
        }
    }

    decreaseMovieIndex = () => {
        if (this.state.prevIndex -1 === -1 && this.mounted){
            this.setState({ 
                prevIndex: this.state.picList.length - 1,
                index: this.state.prevIndex,
                nextIndex: this.state.index
            })
        } else if (this.mounted){
            this.setState({
                prevIndex: this.state.prevIndex - 1,
                index: this.state.prevIndex,
                nextIndex: this.state.index
            })
        }
    }


    componentDidMount() {
        this.mounted = true
        const posterURLS = []
        this.context.forEach((movies) => { posterURLS.push(movies.posterURL) })
        this.setState({picList: posterURLS})

        const newIntervalId = setInterval(() => {
            this.increaseMovieIndex()
        }, 5000);
    
        this.setState(prevState => {
            return {
                ...prevState,
                intervalId: newIntervalId,
            }
        })

        return () => this.mounted = false
    }

    componentWillUnmount() {
        this.state.intervalId && clearInterval(this.state.intervalId)
    }

    render() {
        return (
            <div className="font-sans font-light text-theme-white text-4xl flex justify-center items-center z-10">
                <div className="justify-center items-center">
                    <div className="absolute inset-10 flex justify-center items-center h-screen hidden md:flex">
                        <img src={this.state.picList[this.state.prevIndex]} alt="this is a movie" className="h-3/4 rounded-2xl -mx-20"/>
                        <img src={this.state.picList[this.state.nextIndex]} alt="this is a movie" className="h-3/4 rounded-2xl -mx-20"/>
                    </div>
                    <div className="absolute inset-10 flex justify-center items-center h-screen">
                        <img src={this.state.picList[this.state.index]} alt="this is a movie" className="h-3/4 rounded-2xl"/>
                    </div>
                </div>

                {/* Buttons for movie nav & book now button */}

                <div className="inset-10 flex gap-x-14 md:gap-x-44 items-center justify-center absolute h-screen text-center">
                    <button onClick={() => this.arrowClicked("decrease")} className="shadow-xl bg-theme-black rounded-full py-1 px-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#DEF2F1">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <Link state={"movie,"+this.state.index} to="/book" className="bg-theme-light shadow-2xl text-theme-black rounded-2xl py-3 px-5 hover:bg-theme-black hover:text-theme-light transition duration-150">Book Now</Link>
                    <button onClick={() => this.arrowClicked("increase")} className="shadow-2xl bg-theme-black rounded-full py-1 px-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="shadow-xlh-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#DEF2F1">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div> 
        )  
    }

}

export default Home
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import MoviesContext from '../contexts/Movies'


/* Todo: 

 - grab the movies from firebase
 - Work on the transition between movies
 - Work on sending the user to the right place on book now button press

*/

class Home extends Component {
    static contextType = MoviesContext
    state = {
        intervalID:0,
        index:1,
        prevIndex:0,
        nextIndex:2,
        picList:[]
    }
    componentDidMount() {
        let mounted = true
        const posterURLS = [] // eslint-disable-next-line
        this.context.map((movies) => {
            posterURLS.push(movies.posterURL)
        })
        this.setState({picList: posterURLS})

        if(mounted) {
            const newIntervalId = setInterval(() => {
                if (this.state.nextIndex + 1 === this.state.picList.length ){
                    this.setState({ 
                        prevIndex: this.state.index,
                        index: this.state.nextIndex,
                        nextIndex: 0
                    })
                } else {
                    this.setState({
                        prevIndex: this.state.index,
                        index: this.state.nextIndex,
                        nextIndex: this.state.nextIndex + 1
                    })
                }
            }, 5000);
        
        
            this.setState(prevState => {
                return {
                    ...prevState,
                    intervalId: newIntervalId,
                };
            });

        }
        return () => mounted = false
    }
    render() {
        return (
            <div className="font-sans font-light text-white text-4xl z-10 flex justify-center items-center h-screen">
                <div className="h-3/4">
                    <div className="h-full justify-center items-center">
                        <div className="h-full flex">
                            <img src={this.state.picList[this.state.prevIndex]} alt="this is a movie" className="h-full rounded-2xl -mx-20"/>
                            <img src={this.state.picList[this.state.nextIndex]} alt="this is a movie" className="h-full rounded-2xl -mx-20"/>
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
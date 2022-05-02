import React, {Component} from 'react'
import MoviesContext from '../contexts/Movies'
import { Link } from 'react-router-dom'

class Showing extends Component {
    static contextType = MoviesContext

    state = {
        index:1,
        movies:0,
        picList:[],
        titles:[]
    }
    componentDidMount() {
        const titles = []
        const posterURLS = [] // eslint-disable-next-line
        this.context.map((movies) => {
            posterURLS.push(movies.posterURL)
            titles.push(movies.movieName)
        })
        this.setState({picList: posterURLS, titles:titles}, () => {
            const movies = this.state.picList.map((movie, index) => {
                return (
                    <Link to="/book" state={"movie,"+index} className="flex flex-col flex-none items-center py-10" key={index}>
                        <img src={movie} alt="this is a movie" className="h-56 text-theme-black"/>
                        <span>{titles[index]}</span>
                    </Link>
                )
            })
            this.setState({movies:movies})
        })
    }
    render() {
        return (
            <div className="bg-white z-10 w-full py-20">
                <div className="flex flex-col items-center gap-y-20 font-sans font-light">
                    <span className="text-4xl text-theme-black">Now Showing</span>
                    <div className="flex flex-wrap items-center justify-center gap-x-20 mx-5">
                        {this.state.movies}
                    </div>
                </div>
            </div>
        )  
    }

}

export default Showing
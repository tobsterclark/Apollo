import React, {useContext} from 'react'
import currentTicket from '../../contexts/currentTicket'
import MoviesContext from '../../contexts/Movies'
import { useNavigate, useLocation } from 'react-router'

const Movie = (props) => {
    const movieContext = useContext(MoviesContext)
    const {ticketDetails, setTicketDetails} = useContext(currentTicket)
    const {time, seating, food, foodOption, foodTime} = ticketDetails
    const location = useLocation()
    const prevPage = location.state
    let navigate = useNavigate()

    const chooseMovie = (movieID) => {
        setTicketDetails({"movieID":movieID, "time":time, "seating":seating, "food":food, "foodOption":foodOption, "foodTime":foodTime})

        if (prevPage === "Completed") {
            navigate('/book/time', {state:"Completed"})
        } else {
            navigate('/book/time', {state:"Movie"})
        }
    }

    const movies = () => {
        const output = movieContext.map((movies, index) => {
            return(
                <button className="flex gap-x-5 items-center p-3 text-sm px-5 flex-none" onClick={() => chooseMovie(index)} key={index}>
                    <img src={movies.posterURL} alt="movie poster" className="h-28"/>
                    
                    <div className="flex flex-col items-start">
                        <span className="font-bold text-md">{movies.movieName}</span>
                        <div className="flex gap-x-1">
                            <div className="flex-col flex gap-y-1 items-start">
                                <span>Duration: {movies.length}</span>
                                <span>Cost: {movies.price}</span>
                                <span>Rating: {movies.rating}</span>
                            </div>
                            {/* span for if i wanna set up movie descriptions */}
                            <span className=""></span>
                        </div>
                    </div>
                </button>
            )
        })

        return(<div className="flex flex-wrap justify-center">{output}</div>)
    }

    return (
        <div className="flex flex-col items-center h-full w-full">
            <div className="py-5 mb-16 text-4xl">
                <span>Book a Movie</span>
            </div>
            {/* any bookings */}

            <div className="overflow-y-auto px-10">
                {movies()}
            </div>

        </div>
    )  
}


export default Movie
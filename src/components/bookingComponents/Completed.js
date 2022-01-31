import React, {useContext} from 'react'
import currentTicket from '../../contexts/currentTicket'
import MoviesContext from '../../contexts/Movies'
import timeslotsContext from '../../contexts/timeslots'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router'
import database, {auth} from '.././Firebase.js'


const Completed = (props) => {
    const movieContext = useContext(MoviesContext)
    const {ticketDetails} = useContext(currentTicket)
    const { timeslots } = useContext(timeslotsContext)
    const navigate = useNavigate()
    const {movieID, time, seating, food, foodOption, foodTime} = ticketDetails


    const movie = () => {
        const movieChosen = movieContext[movieID]
        return(
            <div className="flex gap-x-5 items-center p-3 text-sm px-10">
                <img src={movieChosen.posterURL} alt="example movie" className="h-28"/>
                <span className="font-bold text-md">{movieChosen.movieName}</span>
            </div>
        )
    }

    const submit = () => {
        //check if seat and food is still available
        const user = auth.currentUser
        const dbTicketRef = database.ref("/tickets/"+Date.now())
        const dbTimeslotRef = database.ref('timeslots')
        const epochTime = timeChosen()

        dbTimeslotRef.once("value", (snapshot) => {
            snapshot.forEach(snap => {
                if (snap.val().date === epochTime) {
                    const [row, seat] = seating.split("")
                    const ticketSeating = snap.val().seating
                    if (ticketSeating[row][seat] !== "T") {
                        ticketSeating[row][seat] = "T"

                        dbTimeslotRef.child(snap.key).child("seating").set(ticketSeating)
                    
                        dbTicketRef.set({
                            "customer":user.uid,
                            "food":food+foodOption+foodTime,
                            "movie":movieID,
                            "seat":seating,
                            "time":epochTime
                        })
                        navigate("/")
                    }
                }
            })
        })



    }

    const timeChosen = () => {
        const timeslotChosen = timeslots[time]
        return(timeslotChosen.date)
    }

    return (
        <div className="flex flex-col justify-between items-center h-full w-full">
            <div className="py-5 text-4xl">
                <span>Confirm Choices</span>
            </div>
            {/* any bookings */}

            <div className="flex flex-col divide-y divide-black px-10 items-center">
                <Link to="/book/movie" state="Completed" className="py-5 px-20">
                    {movie()}
                </Link>
                <Link to="/book/time" state="Completed" className="py-5 w-52 text-center">{timeChosen()}</Link>
                <Link to="/book/seating" state="Completed" className="py-5 w-52 text-center">your seat: {seating}</Link>
                <Link to="/book/food" state="Completed" className="py-5 w-52 text-center">
                    <span>food options</span>
                </Link>
            </div>

            {/* do a bunch of fancy stuff to check if the seat and food is still available and update the database*/}
            <button onClick={() => submit()}>Submit</button>
        </div>
    )  
}


export default Completed
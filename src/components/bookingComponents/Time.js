import React, {useContext} from 'react'
import currentTicket from '../../contexts/currentTicket'
import timeslotsContext from '../../contexts/timeslots'
import { useNavigate, useLocation } from 'react-router'


const Time = (props) => {
    const {ticketDetails, setTicketDetails} = useContext(currentTicket)
    const { timeslots } = useContext(timeslotsContext)
    const {movieID, seating, food, foodOption, foodTime} = ticketDetails
    const location = useLocation()
    const prevPage = location.state
    let navigate = useNavigate()


    const onClick = (time) => {
        setTicketDetails({"movieID":movieID, "time":time, "seating":seating, "food":food, "foodOption":foodOption, "foodTime":foodTime})

        if (prevPage === "Completed") {
            navigate('/book/seating', {state:"Completed"})
        } else {
            navigate('/book/seating', {state:"Time"})
        }
    }

    const timeslotsForMovie = () => {
        const movie = ticketDetails.movieID
        const timeslotObject = {}

        timeslots.sort(function (a, b) {
            return (a.date - b.date)
        })

        timeslots.forEach((eachTimeslot) => {
            if (eachTimeslot.movie === movie) {
                const date = new Date(eachTimeslot.date * 1000)

                console.log(date.getDate()+"/"+(date.getMonth()+1))

                timeslotObject[date.getDate()+"/"+(date.getMonth()+1)] += (date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
                timeslotObject[date.getDate()+"/"+(date.getMonth()+1)] += ((date.getHours()+4)+":"+date.getMinutes()+":"+date.getSeconds())

            }
        })

        return(timeslotObject)
    }

    const fillTimeslots = () => {
        const currentMovieTimeslots = timeslotsForMovie()

        console.log(currentMovieTimeslots)

        for (const eachDay in currentMovieTimeslots) {
            console.log(eachDay, currentMovieTimeslots[eachDay])
            for (const eachTimeslot in currentMovieTimeslots[eachDay]) {
            }
        }

        return(
            <div className="flex flex-col">
                
            </div>
            )
    }


    return (
        <div className="flex flex-col justify-between items-center h-full w-full">
            <div className="py-5 text-4xl">
                <span>Choose the time of your movie</span>
            </div>

            <div className="overflow-y-auto px-10 text-center">
                {fillTimeslots()}
            </div>
            <div />
        </div>
    )  
}


export default Time
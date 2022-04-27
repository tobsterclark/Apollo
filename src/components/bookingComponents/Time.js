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


    const chooseTimeslot = (time) => {
        setTicketDetails({"movieID":movieID, "time":time, "seating":seating, "food":food, "foodOption":foodOption, "foodTime":foodTime})

        if (prevPage === "Completed") {
            navigate('/book/seating', {state:"Completed"})
        } else {
            navigate('/book/seating', {state:"Time"})
        }
    }


    const timeslotsForMovie = () => {
        const movie = ticketDetails.movieID
        const movieTimeslots = []

        for (const key in timeslots) {
            const eachTimeslot = timeslots[key]
            if (eachTimeslot.movie === movie) {
                const date = new Date(eachTimeslot.date * 1000)
                const time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
                const day = date.getDate()+"/"+(date.getMonth()+1)

                movieTimeslots.push([day, time, eachTimeslot.date, key])
            }
        }

        movieTimeslots.sort(function (a, b) {
            return (a[2] - b[2])
        })

        return(movieTimeslots)
    }

    const fillTimeslots = () => {
        const currentMovieTimeslots = timeslotsForMovie()
        const todaysDate = new Date()
        todaysDate.setHours(0, 0, 0, 0)

        const formattedDate = todaysDate.getDate()+"/"+(todaysDate.getMonth()+1)
        
        // Setting the next days date
        const tomorrowsDate = new Date()
        tomorrowsDate.setDate(todaysDate.getDate()+1)
        const tomorrow = tomorrowsDate.getDate()+"/"+(tomorrowsDate.getMonth()+1)

        var timeslotOutput = []

        currentMovieTimeslots.forEach((eachDay) => {
            var date = ""

            if(eachDay[0] === formattedDate) { date = "Today" }
            else if (eachDay[0] === tomorrow) { date = "Tomorrow"}

            if (date !== "") {
                timeslotOutput.push(
                    <button key={eachDay[3]} className="flex flex-col shadow-inner items-center p-10 py-11 hover:bg-theme-black hover:text-white border-4 border-theme-light rounded-2xl" onClick={() => chooseTimeslot(eachDay[2])}>
                        <span>{date}</span>
                        {eachDay[0]}
    
                        <span>{eachDay[1]}</span>
                    </button>
                )
            } else if (todaysDate.getTime()/1000 < eachDay[2]){
                timeslotOutput.push(
                    <button key={eachDay[3]} className="flex flex-col items-center shadow-inner p-10 py-14 hover:bg-theme-black hover:text-white border-4 border-theme-light rounded-2xl" onClick={() => chooseTimeslot(eachDay[2])}>
                        <span>{eachDay[0]}</span>
    
                        <span>{eachDay[1]}</span>
                    </button>
                )
            }
        })

        return(
            <div className="flex items-center align-middle space-x-2 px-2 pb-5">
                {timeslotOutput}
            </div>
            )
    }


    return (
        <div className="flex flex-col justify-between items-center h-full w-full">
            <div className="pt-20 text-4xl">
                <span>Choose the time of your movie</span>
            </div>

            <div className="overflow-x-auto text-center w-full">
                {fillTimeslots()}
            </div>

            <div />
        </div>
    )  
}


export default Time
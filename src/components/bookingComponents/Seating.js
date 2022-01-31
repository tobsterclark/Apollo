import React, {useContext, useState} from 'react'
import currentTicket from '../../contexts/currentTicket'
import timeslotsContext from '../../contexts/timeslots'
import { useNavigate, useLocation } from 'react-router'

const Seating = (props) => {
    const {ticketDetails, setTicketDetails} = useContext(currentTicket)
    const { timeslots } = useContext(timeslotsContext)
    const [ seat, setSeat ] = useState('')
    // const [ seatStyles, setSeatStyles] = useState("p-1 items-center")
    const {movieID, time, food, foodOption, foodTime} = ticketDetails
    const location = useLocation()
    const prevPage = location.state
    let navigate = useNavigate()


    const onClickSubmit = () => {
        setTicketDetails({"movieID":movieID, "time":time, "seating":seat, "food":food, "foodOption":foodOption, "foodTime":foodTime})

        if (prevPage === "Completed") {
            navigate('/book/completed', {state:"Completed"})
        } else {
            navigate('/book/food', {state:"Seating"})
        }
    }

    const onClickSeat = (currentSeat) => {
        setSeat(currentSeat)

    }

    const seatStyles = (currentSeat) => {
        if (currentSeat === seat) {
            return("text-theme")
        } else {
            return("text-theme-light hover:text-theme-dark")
        }
    }

    const fillTimeslots = () => {

        const timeslotForMovie = timeslots.map((eachTimeslot, index) => {
            if (ticketDetails.time === Object.keys(timeslots)[index]) {
                const seating = eachTimeslot.seating
                const rows = []

                for (var i in seating) {
                    const row = seating[i]
                    const seats = []
                    for (var t in row) {
                        const currentSeat = i + t
                        if (row[t] === "T") {
                            seats.push(
                                <button key={t} className="p-1  cursor-not-allowed items-center">
                                    <svg width="24" height="24" className="text-red-500" fill="currentColor" stroke="curentColor">
                                        <rect width="24" height="24" style={{fill:"currentColour", strokeWidth:3, stroke:"currentColor"}}/>
                                    </svg>
                                </button>)
                        } else {
                            seats.push(
                                <button key={t} onClick={() => onClickSeat(currentSeat)} className="p-1 items-center">
                                    <svg width="24" height="24" className={seatStyles(currentSeat)} fill="currentColor" stroke="curentColor">
                                        <rect width="24" height="24" style={{fill:"currentColor", strokeWidth:3, stroke:"currentColor"}}/>
                                    </svg>
                                </button>)
                        }
                    }

                    rows.push(<div className="flex gap-x-1 items-center" key={i}>{i}  {seats}</div>)
                }

                return(<div key={index} className="">{rows}</div>)
            } else {
                return(<div key={index} />)
            }
        })

        return(
            <div className="flex flex-col items-center">
                <svg height="48" width="144" xmlns="http://www.w3.org/2000/svg" className='mb-20'>
                    <g>
                        <rect x="0" y="0" width="144" height="48" fill="white" stroke="black" strokeWidth="3"></rect>
                        <text x="36" y="34" className="text-2xl font-sans font-light">Screen</text>
                    </g>
                </svg>
                {timeslotForMovie}
            </div>
            )
    }

    return (
        <div className="flex flex-col justify-between text-center items-center h-full w-full">
            <div className="text-4xl flex justify-center py-10 flex-col w-full">
                <span className="items-center divide-none">Book a Movie</span>
            </div>
            {/* any bookings */}

            <div className="overflow-y-auto px-10">
                {fillTimeslots()}
            </div>

            {/* placeholder div to center the bookings */}
            <button className="p-10" onClick={() => onClickSubmit()}>Proceed</button>
        </div>
    )  
}


export default Seating
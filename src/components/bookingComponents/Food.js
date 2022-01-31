import React, {useContext} from 'react'
import currentTicket from '../../contexts/currentTicket'
import { useNavigate } from 'react-router'


const Food = (props) => {
    const {ticketDetails, setTicketDetails} = useContext(currentTicket)
    const {movieID, time, seating, foodOption, foodTime} = ticketDetails
    let navigate = useNavigate()

    const noFood = () => {
        setTicketDetails({"movieID":movieID, "time":time, "seating":seating, "food":false, "foodOption":foodOption, "foodTime":foodTime})
        navigate('/book/Completed', {state:"Food"})
        
    }

    return (
        <div className="flex flex-col justify-between items-center h-full w-full">
            <div className="py-5 text-4xl">
                <span>Book a Movie</span>
            </div>
            {/* any bookings */}

            <div className="overflow-y-auto px-10">
                choose your food
            </div>

            {/* placeholder div to center the bookings */}
            <div> 
                <button onClick={() => noFood()}>No food</button>
            </div>
        </div>
    )  
}


export default Food
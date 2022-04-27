import React, {useContext, useState} from 'react'
import currentTicket from '../../contexts/currentTicket'
import foodContext from '../../contexts/foodContext'
import { useNavigate } from 'react-router'


const Food = (props) => {
    const {ticketDetails, setTicketDetails} = useContext(currentTicket)
    const {food} = useContext(foodContext)
    const [ foodSelected, setFoodSelected ] = useState(false)
    const [ foodChosen, setFoodChosen ] = useState("")
    const {movieID, time, seating, foodOption, foodTime} = ticketDetails
    let navigate = useNavigate()


    const noFood = () => {
        setTicketDetails({"movieID":movieID, "time":time, "seating":seating, "food":false, "foodOption":foodOption, "foodTime":foodTime})
        navigate('/book/Completed', {state:"Food"})
    }

    const handleFood = (food) => {
        setFoodChosen(food["food"])

        setFoodSelected(true)
    }

    const handleTime = (timeChosen) => {
        setTicketDetails({"movieID":movieID, "time":time, "seating":seating, "food":true, "foodOption":foodChosen, "foodTime":timeChosen})
        navigate('/book/Completed', {state:"Food"})
    }

    const displayContent = () => {
        const output = []
        const times = ["30", "45", "60"]

        if (foodSelected) {
            output.push(<div key="first">What time into the movie would you like the food?</div>)
            for (let i in times) {
                output.push(
                    <button key={i} onClick={() => handleTime(times[i])} className="p-2 items-center shadow-inner hover:bg-theme-black transition duration-150 hover:text-white border-4 border-theme-light rounded-2xl">
                        <span>{times[i]} minutes in</span>
                    </button>
                )
            }
        } else {
            for (let i in food) {
                const eachFood = food[i]

                output.push(
                    <button key={i} onClick={() => handleFood(eachFood)} className="p-2 flex flex-col items-center shadow-inner transition duration-150 hover:bg-theme-black hover:text-white border-4 border-theme-light rounded-2xl">
                        <span>Food: {eachFood["food"]}</span>
                        <span>Cost: {eachFood["price"]}$</span>
                    </button>
                )
            }
        }

        return (
            <div className="flex flex-col overflow-y-auto space-y-2">
                {output}
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-between items-center h-full w-full p-10">
            <div className="text-4xl">
                <span>Choose your food</span>
            </div>
            {/* any bookings */}

            <div className="overflow-y-auto px-10 py-5">
                {displayContent()}
            </div>

            {/* placeholder div to center the bookings */}
            <div> 
                <button className="p-3 px-8 bg-theme rounded-2xl shadow-2xl text-white hover:bg-theme-light hover:text-black transition duration-150" onClick={() => noFood()}>No food</button>
            </div>
        </div>
    )  
}


export default Food
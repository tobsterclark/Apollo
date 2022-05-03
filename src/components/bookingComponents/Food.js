import React, {useContext, useState} from 'react'
import currentTicket from '../../contexts/currentTicket'
import foodContext from '../../contexts/foodContext'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'


const Food = (props) => {
    const {ticketDetails, setTicketDetails} = useContext(currentTicket)
    const {food} = useContext(foodContext)
    const [ foodSelected, setFoodSelected ] = useState(false)
    const [ foodChosen, setFoodChosen ] = useState("")
    const [ doneHidden, setDoneHidden ] = useState("")
    const [ editHidden, setEditHidden ] = useState("hidden")
    const {movieID, time, seating, foodOption, foodTime} = ticketDetails
    let navigate = useNavigate()


    const noFood = () => {
        setTicketDetails({"movieID":movieID, "time":time, "seating":seating, "food":false, "foodOption":foodOption, "foodTime":foodTime})
        navigate('/book/Completed', {state:"Food"})
    }

    const handleFood = (food) => {
        if (foodChosen.includes(food["food"]) === false) {
            pushFoodChosen(food["food"])
        } else {
            removeFoodChosen(food["food"])
        }
        
    }

    const pushFoodChosen = (data) => {
        const newFoodChosen = [...foodChosen]
        newFoodChosen.push(data)

        setFoodChosen(newFoodChosen)
    }

    const removeFoodChosen = (data) => {
        const newFoodChosen = [...foodChosen]

        const index = newFoodChosen.indexOf(data)
        if (index > -1) {
        newFoodChosen.splice(index, 1)
        }

        setFoodChosen(newFoodChosen)
    }

    const handleTime = (timeChosen) => {
        setTicketDetails({"movieID":movieID, "time":time, "seating":seating, "food":true, "foodOption":foodChosen, "foodTime":timeChosen})
        navigate('/book/Completed', {state:"Food"})
    }

    const foodStyle = (food) => {
        if (foodChosen.includes(food["food"])) {
            return ("bg-theme-light")
        }
    }

    const displayContent = () => {
        const output = []
        const output1 = []
        const output2 = []
        const times = ["30", "45", "60"]

        if (foodSelected) {
            if (foodChosen.length > 0) {
                output.push(<div key="first">What time into the movie would you like the food?</div>)
                for (let i in times) {
                    output.push(
                        <button key={i} onClick={() => handleTime(times[i])} className="w-1/3 p-2 items-center shadow-inner hover:bg-theme-black transition duration-150 hover:text-white border-4 border-theme-light rounded-2xl">
                            <span>{times[i]} minutes into the movie</span>
                        </button>
                    )
                }

                return(
                    <div className="flex flex-col overflow-y-auto space-y-2 text-center items-center">
                        {output}
                    </div>
                )
            } else {
                toast.error("You must choose at least one food before continuing!")
                setFoodSelected(false)
                setDoneHidden("")
                setEditHidden("hidden")
            }
        } else {
            for (let i = 0; i < Object.keys(food).length; i++) {
                const eachFood = food[Object.keys(food)[i]]
                if (eachFood.stock > 0 && i % 2 === 0) {
                    output1.push(
                        <button key={i} onClick={() => handleFood(eachFood)} className={"p-2 flex flex-col items-center shadow-inner transition duration-150 hover:bg-theme-black hover:text-white border-4 border-theme-light rounded-2xl " + foodStyle(eachFood)}>
                            <span>Food: {eachFood["food"]}</span>
                            <span>Cost: {eachFood["price"]}$</span>
                        </button>
                    )
                } else if (eachFood.stock > 0) {
                    output2.push(
                        <button key={i} onClick={() => handleFood(eachFood)} className={"p-2 flex flex-col items-center shadow-inner transition duration-150 hover:bg-theme-black hover:text-white border-4 border-theme-light rounded-2xl " + foodStyle(eachFood)}>
                            <span>Food: {eachFood["food"]}</span>
                            <span>Cost: {eachFood["price"]}$</span>
                        </button>
                    )
                }
            }

            return(
                <div className="space-x-5 flex overflow-y-auto gap-y-2 w-full justify-around">
                    <span className="space-y-3 flex flex-col w-1/3">{output1}</span>
                    <span className="space-y-3 flex flex-col w-1/3">{output2}</span>
                </div>
            )
        }

    }

    return (
        <div className="flex flex-col justify-between items-center h-full w-full p-10">
            <div className="flex w-full justify-around">
                <span className={"text-md text-white select-none " + editHidden}>edit food</span>
                <span className="text-4xl ">Choose your food</span>
                <button className={"text-md text-black " + editHidden} onClick={() => {setDoneHidden(""); setFoodSelected(false); setEditHidden("hidden")}}>edit food</button>
            </div>
            {/* any bookings */}

            <div className="overflow-y-auto px-10 py-5 w-full items-center justify-center">
                {displayContent()}
            </div>

            {/* placeholder div to center the bookings */}
            <div className="w-full flex justify-center gap-x-5"> 
                <button className={"w-1/5 p-3 px-8 bg-theme rounded-2xl shadow-2xl text-white hover:bg-theme-light hover:text-black transition duration-150 " + doneHidden} onClick={() => {setFoodSelected(true); setDoneHidden("hidden"); setEditHidden("")}}>Done</button>
                <button className="w-1/5 p-3 px-8 bg-theme rounded-2xl shadow-2xl text-white hover:bg-theme-light hover:text-black transition duration-150" onClick={() => noFood()}>No food</button>
            </div>
        </div>
    )  
}


export default Food
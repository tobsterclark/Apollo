import React, {useContext, useState, useEffect} from 'react'
import toast from 'react-hot-toast'
import currentTicket from '../../contexts/currentTicket'
import MoviesContext from '../../contexts/Movies'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router'
import database, {auth} from '.././Firebase.js'


const Completed = (props) => {
    const movieContext = useContext(MoviesContext)
    const {ticketDetails} = useContext(currentTicket)
    const navigate = useNavigate()
    const [ edit, setEdit ] = useState("edit")
    const [ content, setContent ] = useState()
    const {movieID, time, seating, food, foodOption, foodTime} = ticketDetails


    useEffect(() => {
        setEdit("edit") 
        setContent(
            <div className="flex flex-col divide-y divide-black px-10 items-center">
                <span to="/book/movie" state="Completed" className="py-4 px-20">{movie()}</span>
                <span to="/book/time" state="Completed" className="py-4 w-52 text-center">{timeChosen()}</span>
                <span to="/book/seating" state="Completed" className="py-4 w-52 text-center">your seat/s: {seating.join(", ")}</span>
                <span to="/book/food" state="Completed" className="py-4 w-52 text-center"><span>{foodChosen()}</span></span>
            </div>
        )

        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
        const dbTicketRef = database.ref("/tickets/"+user.uid+"/"+Date.now())
        const dbTimeslotRef = database.ref('timeslots')
        const dbFoodRef = database.ref('food')
        var failed = false

        dbTimeslotRef.once("value", (snapshot) => {
            snapshot.forEach(snap => {
                if (snap.val().date === time && snap.val().movie === movieID) {
                    const ticketSeating = snap.val().seating
                    for (let i in seating) {
                        const [row, seat] = seating[i].split("")
                
                        if (ticketSeating[row][seat] !== "T") {
                            ticketSeating[row][seat] = "T"
                        } else {
                            toast.error("That seat has been booked! Choose another seat and try again")
                            failed = true
                        }
                    }

                    if (failed === false) {
                        dbTimeslotRef.child(snap.key).child("seating").set(ticketSeating)
                    }
                }
            })
        })

        dbFoodRef.once("value", (snapshot) => {
            snapshot.forEach(snap => {
                if (snap.val().food === foodOption && snap.val().stock > 0) {
                    const stock = snap.val().stock - 1
                    dbFoodRef.child(snap.key).child("stock").set(stock)
                } else if (snap.val().food === foodOption) {
                    toast.error("There is no stock left for that food! Choose something different")
                    failed = true
                }
            })
        })


        if (failed === false) {
            dbTicketRef.set({
                "customer":user.uid,
                "food":food+"/"+foodOption+"/"+foodTime,
                "movie":movieID,
                "seat":seating,
                "time":time
            })

            toast.success('Successfully booked!', {
                duration: 0
            })
            navigate("/")
        }

    }

    const editButton = () => {
        if (edit === "edit") {
            setContent(
                <div className="flex flex-col divide-y divide-black px-10 items-center">
                    <Link to="/book/movie" state="Completed" className="text-theme py-4 px-20">{movie()}</Link>
                    <Link to="/book/time" state="Completed" className="text-theme py-4 w-52 text-center">{timeChosen()}</Link>
                    <Link to="/book/seating" state="Completed" className="text-theme py-4 w-52 text-center">your seat/s: {seating.join(", ")}</Link>
                    <Link to="/book/food" state="Completed" className="text-theme py-4 w-52 text-center"><span>{foodChosen()}</span></Link>
                </div>
            )
            setEdit("done")
        } else {
            setContent(
                <div className="flex flex-col divide-y divide-black px-10 items-center">
                    <span to="/book/movie" state="Completed" className="py-4 px-20">{movie()}</span>
                    <span to="/book/time" state="Completed" className="py-4 w-52 text-center">{timeChosen()}</span>
                    <span to="/book/seating" state="Completed" className="py-4 w-52 text-center">your seat/s: {seating.join(", ")}</span>
                    <span to="/book/food" state="Completed" className="py-4 w-52 text-center"><span>{foodChosen()}</span></span>
                </div>
            )
            setEdit("edit")
        }
    }

    const timeChosen = () => {

        const date = new Date(time * 1000)
        const formattedDayMonth = date.getDate()+"/"+(date.getMonth()+1)
        const formattedTime = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()

        return (formattedDayMonth + " " + formattedTime)
    }

    const foodChosen = () => {
        if (food === false) { return "No food chosen"}
        else { return foodOption + " selected, delivered " + foodTime + " minutes into the movie"}
    }



    return (
        <div className="flex flex-col justify-between items-center h-full w-full p-10">
            <div className="flex justify-between text-4xl w-full">
                <div className="text-white text-sm">done</div>
                <span>Confirm Choices</span>
                <button className="text-sm" onClick={() => editButton()}>{edit}</button>
            </div>
            {/* any bookings */}

            {content}

            <button className="p-3 px-8 bg-theme rounded-2xl shadow-2xl text-white hover:bg-theme-light hover:text-black transition duration-150" onClick={() => submit()}>Submit</button>
        </div>
    )  
}


export default Completed
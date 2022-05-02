/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react'
import timeslotContexts from '../contexts/timeslots'
import currentTicket from '../contexts/currentTicket'
import foodContext from '../contexts/foodContext'
import database from './Firebase'
import { Outlet, useNavigate, useLocation } from 'react-router'
import {auth} from './Firebase.js'
import toast from 'react-hot-toast'



const Book = (props) => {
    const {ticketDetails, setTicketDetails} = useContext(currentTicket)
    const { time, food, foodOption, foodTime, seating } = ticketDetails
    const { setTimeslots} = useContext(timeslotContexts)
    const { setFood } = useContext(foodContext)
    const [status, setStatus] = useState('idle')
    let navigate = useNavigate()
    const { state } = useLocation()
    var movieSelected = state
    const cookies = false


    //not sure why I do this twice
    useEffect(() => {

        database.ref('timeslots').once("value", (snapshot) => {
            const timeslots = {}
            snapshot.forEach(snap => {
                timeslots[snap.key] = snap.val()
            })
            setTimeslots(timeslots)
        })

        const food = {}

        
        database.ref('food').once("value", (snapshot) => {
            snapshot.forEach(snap => {
                food[snap.key] = snap.val()
            })
        })

        setFood(food)
    }, [setTimeslots, setFood])
    
    useEffect(() => {
        // add cookies here

        if (auth.currentUser === null) {
            toast.error("You need to be signed in to book a movie!")

            navigate("/login", {state:{prev:"/book"}})

        } else {
            if (movieSelected === null) {
                movieSelected = ""
            }

            const movieFormatted = movieSelected.split(",")
            if (movieFormatted[0] === "movie") {
                setTicketDetails({"movieID":parseInt(movieFormatted[1]), "time":time, "seating":seating, "food":food, "foodOption":foodOption, "foodTime":foodTime})
                navigate("/book/time")
                setStatus('resolved')
            } else if (cookies === false) {
                navigate("/book/movie")
                setStatus('resolved')
            } else {
                setStatus('resolved')
            }
        }
    }, [cookies])

    if (status === 'idle') {return(<span className="flex justify-center text-center">loading</span>)}
    if (status === 'resolved') {
        return (
            <div className="h-full w-full z-10 flex justify-center items-center font-sans font-light">
                <div className="bg-theme-white h-full w-4/5 rounded-lg">
                    <Outlet/>
                </div>
            </div>
        )  
    }
}


export default Book
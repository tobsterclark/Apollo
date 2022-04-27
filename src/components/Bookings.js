import React, {useEffect, useState, useContext} from 'react'
import {auth} from './Firebase.js'
import database from './Firebase'
import MoviesContext from '../contexts/Movies'
import {Link} from "react-router-dom"



const Book = (props) => {
    const movieContext = useContext(MoviesContext)
    const [tickets, setTickets] = useState("")
    useEffect(() => {
        if (auth.currentUser !== null) {
        const databaseTickets = []
        database.ref('tickets').once("value", (snapshot) => {
            snapshot.forEach(snap => {
                if (auth.currentUser.uid === snap.val().customer) {
                    databaseTickets.push(snap.val())
                }
            })
        }).then(() => {
            setTickets(databaseTickets.reverse())
        })}

    }, [movieContext])

    const grabData = () => {
        const output = []

        for (let i in tickets) {
            output.push(
            <div key={i} className="flex flex-col p-5 text-center">
                <span>Movie: {movieContext[tickets[i].movie].movieName}</span>
                <span>seat: {tickets[i].seat}</span>
                <span>customerID: {tickets[i].customer}</span>
                <span>time: {unixToUser(tickets[i].time)}</span>
                <span>{foodChosen(tickets[i].food)}</span>
            </div>)
        }
        
        return(output)
    }

    const foodChosen = (foodString) => {
        const [food, foodOption, foodTime] = foodString.split("/")

        if (food === "false") { return "No food chosen"}
        else { return foodOption + " selected, delivered " + foodTime + " minutes into the movie"}
    }

    const unixToUser = (unix) => {
        const date = new Date(unix * 1000)
        const dayMonth = date.getDate()+"/"+(date.getMonth()+1)
        const time = date.getHours()+":"+date.getMinutes()

        return(time + " " + dayMonth)
    }


    if (auth.currentUser === null) {
        return (
            <div className="h-full w-full z-10 flex justify-center items-center">
            <div className="bg-theme-white flex flex-col justify-center items-center h-full w-4/5 rounded-lg">
                <span>Sign in to view your bookings!</span>
                <span>press <Link to="/login" className='text-theme'>here</Link> to sign up</span>
            </div>
            </div>
        )
    } else {
        return(
        <div className="h-full w-full z-10 flex justify-center items-center">
            <div className="bg-theme-white flex flex-col justify-between items-center h-full w-4/5 rounded-lg">
                <div className='m-5'>
                    <span className='text-4xl'>Your bookings</span>
                </div>
                {/* any bookings */}

                <div className="overflow-y-auto divide-y">
                    {grabData()}
                </div>

                {/* placeholder div to center the bookings */}
                <div />
            </div>
        </div>
        )
    }

}


export default Book
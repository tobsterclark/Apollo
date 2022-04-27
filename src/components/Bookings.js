import React, {useEffect, useState} from 'react'
import {auth} from './Firebase.js'
import database from './Firebase'
import {Link} from "react-router-dom"



const Book = (props) => {
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
    }, [])

    const grabData = () => {
        const output = []

        for (let i in tickets) {
            output.push(
            <div className="flex flex-col m-5 text-center">
                <span>seat: {tickets[i].seat}</span>
                <span>customerID: {tickets[i].customer}</span>
                <span>time: {unixToUser(tickets[i].time)}</span>
                <span>food: {tickets[i].food}</span>
            </div>)
        }
        
        return(output)
    }

    const unixToUser = (unix) => {
        console.log(unix)
        const date = new Date(unix * 1000)
        const dayMonth = date.getDate()+"/"+(date.getMonth()+1)
        const time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()

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

                <div className="overflow-y-auto">
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
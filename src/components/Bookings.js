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
        database.ref('tickets/'+auth.currentUser.uid).once("value", (snapshot) => {
            snapshot.forEach(snap => {
                databaseTickets.push(snap.val())
            })
        }).then(() => {
            setTickets(databaseTickets.reverse())
        })}

    }, [movieContext])

    const returnCard = (ticket, i) => {
        var seatName = "seat"
        if (ticket.seat.length > 1) {
            seatName = "seating"
        } else {
            seatName = "seat"
        }

        return (
            <div key={i} className="flex flex-col p-3 text-left shadow-inner items-start border-4 border-theme-light rounded-2xl w-full">
                <div className="flex gap-x-5 items-center text-left py-3 text-sm">
                    <span className="font-bold text-md">{movieContext[ticket.movie].movieName}</span>
                    <img src={movieContext[ticket.movie].posterURL} alt={"poster of " + movieContext[ticket.movie].movieName} className="h-28"/>
                </div>
                <span className="w-full flex gap-x-1">{seatName}: {seatChosen(ticket.seat)}</span>
                <span>Time: {unixToUser(ticket.time)}</span>
                <span>{foodChosen(ticket.food)}</span>
            </div>
        )
    }

    const grabData = () => {
        const output = []
        const output1 = []
        const output2 = []

        if (tickets.length === 0) {
            return(
                <div className="h-full w-full z-10 flex justify-center items-center">
                    <div className="bg-theme-white flex flex-col justify-center text-center items-center h-full w-4/5 rounded-lg">
                        <span>This page is empty because you havent booked any movies!</span>
                        <span>press <Link to="/book" className='text-theme'>here</Link> to book a movie</span>
                    </div>
                </div>
            )
        } else if (tickets.length > 2) {
            for (let i in tickets) {
                if (i % 2 === 0) {
                    output1.push(returnCard(tickets[i], i))
                } else {
                    output2.push(returnCard(tickets[i], i))
                }
            }
            
            return(
                <div className="space-x-5 flex w-full justify-around">
                    <span className="space-y-3 flex flex-col w-1/3">{output1}</span>
                    <span className="space-y-3 flex flex-col w-1/3">{output2}</span>
                </div>
            )
        } else {
            for (let i in tickets) {
                output.push(returnCard(tickets[i], i))
            }

            return(
                <div className="w-full justify-center flex">
                    <span className="w-1/3 flex flex-col space-y-3">{output}</span>
                </div>
            )
        }
    }

    const seatChosen = (seating) => {
        const output = []
        for (let i in seating) {output.push(<div key={i} className="bg-theme-light rounded-2xl text-center px-3">{seating[i]}</div>)}

        return(<span className="flex gap-2 w-full flex-wrap">{output}</span>)

    }

    const eachFood = (foodOption) => {
        const output = []
        for (let i in foodOption) {output.push(<div key={i} className="bg-theme-light rounded-2xl text-center px-3">{foodOption[i]}</div>)}

        return(<span className="flex gap-2 w-full flex-wrap">{output}</span>)
    }

    const foodChosen = (foodString) => {
        const [food, foodOption, foodTime] = foodString.split("/")
        if (food === "false") { return "No food chosen"}
        else { return (
            <div className="flex flex-col w-full">
                <div className="w-full flex gap-x-1">
                    <span>Food: </span>
                    <span>{eachFood(foodOption.split(","))}</span>
                </div>
                <span className="text-left">Delivered: {foodTime} minutes into the movie</span>
            </div>
        )}
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
                <span>press <Link state={{prev:"/bookings"}} to="/login" className='text-theme'>here</Link> to sign up</span>
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

                <div className="overflow-y-auto w-full items-center justify-center">
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
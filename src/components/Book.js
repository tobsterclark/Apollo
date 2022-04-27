import React, {useContext, useEffect, useState} from 'react'
import timeslotContexts from '../contexts/timeslots'
import foodContext from '../contexts/foodContext'
import database from './Firebase'
import { Outlet, useNavigate } from 'react-router'
import {auth} from './Firebase.js'



const Book = (props) => {
    const { setTimeslots} = useContext(timeslotContexts)
    const { setFood } = useContext(foodContext)
    const [status, setStatus] = useState('idle')
    let navigate = useNavigate()
    const cookies = false

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
            alert("You need to be signed in to book a movie!")

            navigate("/login")

        } else {
            if (cookies === false) {
                navigate("/book/movie")
                setStatus('resolved')
            } else {
                setStatus('resolved')
            }
        }

    // Disabling the warning for using navigate in useEffect and not including it as a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
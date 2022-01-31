import React, {useContext, useEffect, useState} from 'react'
import timeslotContexts from '../contexts/timeslots'
import database from './Firebase'
import { Outlet, useNavigate } from 'react-router'



const Book = (props) => {
    const { setTimeslots} = useContext(timeslotContexts)
    const [status, setStatus] = useState('idle')
    let navigate = useNavigate()
    const cookies = false

    useEffect(() => {
        database.ref('timeslots').once("value", (snapshot) => {
            const timeslots = []
            snapshot.forEach(snap => {
                timeslots.push(snap.val())
            })
            setTimeslots(timeslots)
        })
    }, [setTimeslots])
    
    useEffect(() => {
        // add cookies here

        if (cookies === false) {
            navigate("/book/movie")
            setStatus('resolved')
        } else {
            setStatus('resolved')
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
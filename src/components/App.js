import React, {useState, useEffect, useRef} from 'react'
import { Outlet, Routes, Route } from "react-router-dom"
import { Toaster, toast, ToastBar } from 'react-hot-toast'
import Header from './Header'
import Showing from './Showing'
import MovieContext from '../contexts/Movies.js'
import UserDetails from '../contexts/userDetails'
import loginInputContext from '../contexts/InputInfo'
import currentTicket from '../contexts/currentTicket'
import timeslotsContext from '../contexts/timeslots'
import foodContext from '../contexts/foodContext'
import database, {auth} from './Firebase.js'
import SyncLoader from 'react-spinners/SyncLoader'
import Background from './background'


const App = () => {
  const [status, setStatus] = useState('idle')
  const [input, setInput] = useState({"email":"", "password":"", "phone":"", "name":""})
  const [food, setFood] = useState({1:{"food":"", "price":"", "stock":""}})
  const [ticketDetails, setTicketDetails] = useState({"movieID":"0", "time":"0", "seating":"0", "food":null, "foodOption":"0", "foodTime":"0"})
  const [timeslots, setTimeslots] = useState({1:{"date":"0", "movie":"1", "seating":"test"}})
  const [userDetails, setUserDetails] = useState({"displayName":""})
  const [initialLoad, setinitialLoad] = useState(true)
  const movies = useRef([])


  //Only run on first load of website
  useEffect(()=>{
    const updatedMovies = []

    database.ref('movies').once("value", (snapshot) => {
      snapshot.forEach(snap => {
        updatedMovies.push(snap.val())
      })
      movies.current = updatedMovies
      setStatus("resolved")
    })
  },[])


  //Checking if user is logged on (forcing rerender if user status changes)
  useEffect(() => {
    const initialUserCheck = () => {
      const user = auth.currentUser
      
      if (auth.currentUser) {
        if (userDetails.displayName !== user.displayName) {
          setUserDetails({"displayName":user.displayName})
        }
      } else if (auth.currentUser === null && userDetails.displayName !== "") {
        setUserDetails({"displayName":""})
      }
    }

    if (initialLoad && status === 'resolved') {
      initialUserCheck()
      setinitialLoad(false)
    }

  }, [status, initialLoad, userDetails])

  if (status === 'idle') {
    return(
      <div className="flex h-screen w-full items-center justify-center">
        <Background />
        <SyncLoader color="#2B7A78"/>
      </div>
      )
  }
  else if (status === 'resolved') {
    return (
      <UserDetails.Provider value={{userDetails, setUserDetails}}>
      <MovieContext.Provider value={movies.current}>
      <currentTicket.Provider value={{ticketDetails, setTicketDetails}}> 
      <timeslotsContext.Provider value={{timeslots, setTimeslots}}>
      <foodContext.Provider value={{food, setFood}}>
      <loginInputContext.Provider value={{input, setInput}}>
        <div className="">
          <div className="fixed left-0 right-0 top-0 z-20">
            <Header/>
          </div>

          <div className="h-screen w-full justify-center pt-28 p-8 flex">
            
              <Outlet/>
            
          </div>

          <div className="flex" >
            {/* This is temp for getting showing to work */}
            <Routes> 
              <Route path="/" element={<Showing/>} />
            </Routes>
          </div>
          
          <Toaster>
            {(t) => (
              <ToastBar toast={t}>
                {({ icon, message }) => (
                  <>
                    {icon}
                    {message}
                    {t.type !== 'loading' && (
                      <button onClick={() => toast.dismiss(t.id)}>x</button>
                    )}
                  </>
                )}
              </ToastBar>
            )}
          </Toaster>
          <Background/>
        </div>
      </loginInputContext.Provider>
      </foodContext.Provider>
      </timeslotsContext.Provider>
      </currentTicket.Provider>
      </MovieContext.Provider>
      </UserDetails.Provider>
  )}
}

export default App
import React, {useState, useEffect, useRef} from 'react'
import { Outlet, Routes, Route } from "react-router-dom"
import Header from './Header'
import Showing from './Showing'
import MovieContext from '../contexts/Movies.js'
import UserDetails from '../contexts/userDetails'
import loginInputContext from '../contexts/InputInfo'
import database, {auth} from './Firebase.js'
import SyncLoader from 'react-spinners/SyncLoader'
import Background from './background'


const App = () => {
  const [status, setStatus] = useState('idle')
  const [input, setInput] = useState({"email":"", "password":"", "phone":"", "name":""})
  const [userDetails, setUserDetails] = useState({"displayName":""})
  const movies = useRef([])

  useEffect(()=>{
    const updatedMovies = []

    database.ref('movies').once("value", (snapshot) => {
      snapshot.forEach(snap => {
        updatedMovies.push(snap.val())
      })
      movies.current = updatedMovies
      setStatus("resolved")
    })

    auth.onAuthStateChanged((user) => {
      if (userDetails.displayName !== user.displayName) {
        setUserDetails({"displayName":user.displayName})
      }
    })
  },[userDetails.displayName])

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
        <div className="">
          <div className="fixed left-0 right-0 top-0 z-50">
            <Header/>
          </div>

          <div className="h-screen w-full justify-center pt-40 p-20 flex">
            <loginInputContext.Provider value={{input, setInput}}>
              <Outlet/>
            </loginInputContext.Provider>
          </div>

          <div className="flex" >
            {/* This is temp for getting showing to work */}
            <Routes> 
              <Route path="/" element={<Showing/>} />
            </Routes>
          </div>
          <Background/>
        </div>
      </MovieContext.Provider>
      </UserDetails.Provider>
  )}
}

export default App
import React, {useState, useContext, useEffect} from 'react'
import logo from './Images/logo.svg'
import userDetailsContext from '../contexts/userDetails'
import { Link } from "react-router-dom"
import {auth} from './Firebase.js'

const Header = () => {
    const {userDetails} = useContext(userDetailsContext)
    const hidden = "hidden"
    const user = auth.currentUser
    const shown = "text-sm text-center text-theme-white font-light font-sans py-2"
    const [loginUser, setLoginUser] = useState("")
    const [loginUserPath, setLoginUserPath] = useState("")
    const [showMenu, setShowMenu] = useState(hidden)

    const handleClick = () => {
        if (showMenu === hidden) {
            setShowMenu(shown)
        } else {
            setShowMenu(hidden)
        }
    }

    useEffect(() => {
        if (auth.currentUser) {
            if (user.uid === "sglIHO7BjfW7solE7uKU6e3PiCb2") {
                setLoginUser("Admin Preferences")
                setLoginUserPath("/admin")
            } else if (user.displayName !== ""){
                setLoginUser(user.displayName)
                setLoginUserPath("/settings")
            } 
        } else {
        setLoginUser("Log in")
        setLoginUserPath("/login")            
        }
    }, [user, userDetails])

    return (

        {/* Header nav */},

        <nav className="bg-gradient-to-r from-theme-dark to-theme">
            <div className="flex justify-between px-5 font-sans font-light text-sm">

                {/* Logo */}

                <div className="text-theme-white font-bold py-3">
                    <Link to="/" className="flex gap-x-5 items-center">
                        <img src={logo} alt="Logo" className=""/>
                        <span>Apollo</span>
                    </Link>
                </div>

                {/* Navigation */}

                <div className="hidden sm:flex gap-x-7 text-theme-white items-center">
                    <Link to="/" className="py-3 hover:text-theme-black">Home</Link>
                    <Link to="/bookings" className="py-3 hover:text-theme-black">My Bookings</Link>
                    <Link state={{prev:"/"}} to={loginUserPath} className="py-3 hover:text-theme-black">{loginUser}</Link>
                    <Link to="/book/movie" className="shadow-2xl bg-theme-light rounded-2xl text-theme-black py-3 px-3 hover:bg-theme-black hover:text-theme-white transition duration-150">Make Booking</Link>
                </div>

                <div className="sm:hidden flex items-center gap-x-7">
                    <Link to="/book/movie" className="bg-theme-light rounded-2xl text-theme-black py-3 px-3 hover:bg-theme-black hover:text-theme-white transition duration-150">Make Booking</Link>
                    <button onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FEFFFF">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className={showMenu}>
                <Link to="/" onClick={handleClick} className="block hover:bg-theme-light hover:text-theme-black py-2 px-2">Home</Link>
                <Link to="/bookings" onClick={handleClick} className="block hover:bg-theme-light hover:text-theme-black py-2 px-2">My Bookings</Link>
                <Link state={{prev:"/"}} to={loginUserPath} onClick={handleClick} className="block hover:bg-theme-light hover:text-theme-black py-2 px-2">{loginUser}</Link>
            </div>
        </nav>


    )

}

export default Header
import React, {Component} from 'react'
import logo from './Images/logo.svg'
import { Link } from "react-router-dom"

class Header extends Component {

    render() {
        return (

            {/* Header nav */},

            <nav className="bg-gradient-to-r from-red-dark to-red fixed left-0 right-0 top-0 z-10">
                <div className="flex justify-between px-5 font-sans font-light text-sm">

                    {/* Logo */}

                    <div className="text-white font-bold py-3">
                        <Link to="/" className="flex gap-x-5 items-center">
                            <img src={logo} alt="Logo" className=""/>
                            <span>Apollo</span>
                        </Link>
                    </div>

                    {/* Navigation */}

                    <div className="flex gap-x-7 text-white items-center">
                        <Link to="/Bookings" className="py-3 hover:text-gray-300">My Bookings</Link>
                        <Link to="/Login" className="py-3 hover:text-gray-300">Log In</Link>
                        <Link to="/Bookings" className="bg-red-vibrant rounded-2xl py-3 px-3 hover:bg-white hover:text-red-vibrant">Make Booking</Link>
                    </div>
                </div>
            </nav>


        )
    }

}

export default Header
import React, {Component} from 'react'
import logo from './Images/logo.svg'
import { Link } from "react-router-dom"

class Header extends Component {

    render() {
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

                    <div className="flex gap-x-7 text-theme-white items-center">
                        <Link to="/Bookings" className="py-3 hover:text-theme-light">My Bookings</Link>
                        <Link to="/Login" className="py-3 hover:text-theme-light">Log In</Link>
                        <Link to="/Bookings" className="bg-theme-light rounded-2xl text-theme-black py-3 px-3 hover:bg-theme-black hover:text-theme-white">Make Booking</Link>
                    </div>
                </div>
            </nav>


        )
    }

}

export default Header
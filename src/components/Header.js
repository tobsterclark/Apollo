import React, {Component} from 'react'
import logo from './Images/logo.svg'
import { Link } from "react-router-dom"

class Header extends Component {
    hidden = "hidden"
    shown = "text-sm text-center text-theme-white font-light font-sans py-2"
    state = {
        showMenu:this.hidden
    }
    handleClick = () => {
        if (this.state.showMenu === this.hidden) {
            this.setState({showMenu:this.shown})
        } else {
            this.setState({showMenu:this.hidden})
        }
    }
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

                    <div className="hidden sm:flex gap-x-7 text-theme-white items-center">
                        <Link to="/" className="py-3 hover:text-theme-black">Home</Link>
                        <Link to="/bookings" className="py-3 hover:text-theme-black">My Bookings</Link>
                        <Link to="/login" className="py-3 hover:text-theme-black">Log In</Link>
                        <Link to="/book" className="bg-theme-light rounded-2xl text-theme-black py-3 px-3 hover:bg-theme-black hover:text-theme-white transition duration-150">Make Booking</Link>
                    </div>

                    <div className="sm:hidden flex items-center gap-x-7">
                    <Link to="/book" className="bg-theme-light rounded-2xl text-theme-black py-3 px-3 hover:bg-theme-black hover:text-theme-white transition duration-150">Make Booking</Link>
                        <button onClick={this.handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FEFFFF">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={this.state.showMenu}>
                    <Link to="/" onClick={this.handleClick} className="block hover:bg-theme-light hover:text-theme-black py-2 px-2">Home</Link>
                    <Link to="/bookings" onClick={this.handleClick} className="block hover:bg-theme-light hover:text-theme-black py-2 px-2">My Bookings</Link>
                    <Link to="/login" onClick={this.handleClick} className="block hover:bg-theme-light hover:text-theme-black py-2 px-2">Log In</Link>
                    {/* <Link to="/book" onClick={this.handleClick} className="block hover:bg-theme-light hover:text-theme-black py-2 px-2 ">Make Booking</Link> */}
                </div>
            </nav>


        )
    }

}

export default Header
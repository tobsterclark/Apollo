/*
Index.js

Written by Toby Clark

------------------------------------------------------------------------------

This file outlines the routes for the website and sets up the dom
*/

/*
------------------------------------------------------------------------------

    Importing needed files (both components and react libraries)

------------------------------------------------------------------------------
*/

import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import App from './components/App'
import Login from './components/Login'
import Bookings from './components/Bookings'
import Book from './components/Book'
import NotFound from './components/404'
import Home from './components/Home'
import LoginInput from './components/LoginInput'
import SignupInput from './components/SignupInput'
import Movie from './components/bookingComponents/movie'
import Food from './components/bookingComponents/Food'
import Seating from './components/bookingComponents/Seating'
import Time from './components/bookingComponents/Time'
import Completed from './components/bookingComponents/Completed'
import Settings from './components/Settings'
import './index.css'

/*
------------------------------------------------------------------------------

    Main render component

------------------------------------------------------------------------------
*/

const rootElement = document.getElementById("root");

// This is setting up the DOM for loading pages (manages all the routing)
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            {/* Renders the App.js file as long as website route is within this list, will then render all these paths as 'outlets */}
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />}>
                    <Route path="/login" element={<LoginInput/>}/>
                </Route>
                <Route path="/signup" element={<Login />} >
                    <Route path="/signup" element={<SignupInput/>}/>
                </Route>
                <Route path="/signup" element={<Login/>} />
                <Route path="/book" element={<Book />}>
                    <Route path="/book/movie" element={<Movie />} />
                    <Route path="/book/time" element={<Time />} />
                    <Route path="/book/seating" element={<Seating />} />
                    <Route path="/book/food" element={<Food />} />
                    <Route path="/book/completed" element={<Completed />} />
                </Route>
                <Route path="/Settings" element={<Settings />} />
                <Route path="/bookings" element={<Bookings />} />
            </Route>
            {/* If the path isnt found in the above list then it will render the page not found */}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>,
    rootElement
);

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
import './index.css'



const rootElement = document.getElementById("root");
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Login/>} />
                <Route path="/book" element={<Book />} />
                <Route path="/bookings" element={<Bookings />} />
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>,
    rootElement
);

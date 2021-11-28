import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import LoginInput from './LoginInput'
import { Routes, Route} from "react-router-dom"

class Login extends Component {
    state = {
        emailInputValue: "",
        passwordInputValue: ""
    }

    updateStateFromProps = (value) => {
        this.setState({
            emailInputValue: value.email,
            passwordInputValue: value.password
        })
    }

    render() {
        return (
            <div className="bg-theme-white h-full w-2/5 font-sans text-4xl font-light text-theme-black text-center z-10 rounded-lg flex justify-between flex-col py-10">
                <div className="flex gap-x-5 px-10">
                    <Link to="/login" className="bg-theme rounded-xl py-2 px-10 flex-1 shadow-lg">Log In</Link>
                    <Link to="/login" className="flex-1 py-2">Sign Up</Link>
                </div>
                <Routes>
                    <Route path="/" element={<LoginInput value = {this.updateStateFromProps}/>}/>
                    <Route path="/signup" element={<LoginInput value = {this.updateStateFromProps}/>}/>
                </Routes>
                <div>
                    <button className="bg-theme rounded-xl font-extralight py-2 px-10 hover:bg-theme-black hover:text-theme shadow-lg">Submit</button>
                </div>
            </div>
        )  
    }

}

export default Login
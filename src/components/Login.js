import React, {Component} from 'react'
import logo from './Images/logo.svg'
import { Link } from 'react-router-dom'

class Login extends Component {

    render() {
        return (
            <div>
                <span>test page</span>
                <Link to="/home">Click me</Link>
            </div>
        )  
    }

}

export default Login
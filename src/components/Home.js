import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {

    render() {
        return (
            <div>
                <span className="text-white">test page</span>
                <Link to="/test">Click me</Link>
            </div>  
        )  
    }

}

export default Home
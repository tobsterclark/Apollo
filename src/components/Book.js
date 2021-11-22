import React, {Component} from 'react'

import { Link } from 'react-router-dom'

class Book extends Component {

    render() {
        return (
            <div>
                <span>test page</span>
                <Link to="/home">Click me</Link>
            </div>
        )  
    }

}

export default Book
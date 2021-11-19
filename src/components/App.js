import React, {Component} from 'react'
import Header from './Header'
import { Outlet } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>

        <body className="py-40">
          
          <Outlet className="z-30"/>

        {/* Background Image Here*/}

        </body>
      </div>
    )
  }
}

export default App
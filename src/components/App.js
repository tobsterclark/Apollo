import React, {Component} from 'react'
import Header from './Header'
import Background from './background'
import { Outlet } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div className="py-0">
        <Header/>

        <body className="w-full h-auto flex justify-center items-center relative z-5">
          <Background />
          <div className="absolute flex justify-center items-center z-10">
            <Outlet className="z-10"/>
          </div>
        {/* Background Image Here*/}

        </body>
      </div>
    )
  }
}

export default App
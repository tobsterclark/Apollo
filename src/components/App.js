import React, {Component} from 'react'
import Header from './Header'
import Background from './background'
import Showing from './Showing'
import { Outlet, Routes, Route } from "react-router-dom";


class App extends Component {
  
  render() {

    return (
      <div>
        <div className="fixed left-0 right-0 top-0 z-50">
          <Header/>
        </div>

        <div className="h-screen w-full justify-center items-center p-20 flex">
          <Outlet/>
        </div>

        <div className="flex" >
          <Routes>
            <Route path="/" element={<Showing/>} />
          </Routes>
        </div>

        <Background/>
      </div>
    )
  }
}

export default App
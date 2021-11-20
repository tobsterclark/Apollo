import React, {Component} from 'react'
import Header from './Header'
import Background from './background'
import Showing from './Showing'
import { Outlet, Routes, Route } from "react-router-dom";


class App extends Component {
  
  render() {
    return (
      <div className="py-0">
        <Header/>

        <body className="w-full h-auto flex justify-center items-center relative z-5 pt-16 pb-5">
          <Background />
          <div className="absolute flex justify-center items-center z-10">
            <Outlet className="z-10"/>
          </div>
        </body>
        <Routes>
          <Route path="/" element={<Showing />} />
        </Routes>
      </div>
    )
  }
}

export default App
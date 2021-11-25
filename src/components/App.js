import React, {Component} from 'react'
import { Outlet, Routes, Route } from "react-router-dom"
import Header from './Header'
import Background from './background'
import Showing from './Showing'
import MovieContext from '../contexts/Movies.js'
import database from './Firebase.js'
import SyncLoader from 'react-spinners/SyncLoader'

class App extends Component {
  state= {
    Status:"idle"
  }
  movies = []

  componentDidMount() {
    database.ref('movies').on("value", (snapshot) => {
      snapshot.forEach(snap => {
        this.movies.push(snap.val());
        console.log(snap.val())
      })
      this.setState({
        Status:"resolved"
      })
    })

  }
  render() {
    if (this.state.Status === 'idle') {
      return(
        <div className="flex h-screen w-full items-center justify-center">
          <Background/>
          <SyncLoader color="#950740"/>
        </div>
        )
    }
    else if (this.state.Status === 'resolved') {
      return (
        <MovieContext.Provider value={this.movies}>
          <div className="pt-10">
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
        </MovieContext.Provider>
    )}
    else if (this.state.Status === 'rejected') {
      return(<div>hi</div>)
    }
  }
}

export default App
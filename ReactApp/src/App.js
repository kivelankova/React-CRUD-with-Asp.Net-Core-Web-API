import React from 'react'
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import BarChart from './components/BarChart'
import BarType from './components/BarType'
import Navbar from "./components/Navbar"

import { store } from "./actions/store";
import { Provider } from "react-redux";
import Backend from './components/Backend';

import './App.css'

const App = () => {

  return (
    <div>
      {/*
        <Provider store={store}>
          <Tulokset />

        </Provider>

      */}



      <Router>
        <Navbar />
        <Switch>
          <Route path='/barchart' component={BarChart} />
          <Route path='/bartype' component={BarType} />
          <Route path='/backend' component={Backend} />
        </Switch>
      </Router>

    </div>
  )
}

export default App

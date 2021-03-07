import React from 'react'
import './App.css'
import MainContainer from './containers/MainContainer'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
    return (
        <Router>
        <>
            <MainContainer/>
        </>
        </Router>
    )
}

export default App

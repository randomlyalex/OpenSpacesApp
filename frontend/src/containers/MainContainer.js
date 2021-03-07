import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from '../components/NavBar'
import AdminContainer from './AdminContainer'
import HomeContainer from './HomeContainer'

const MainContainer = () => {
    return (
        <Router>
            <>
                <NavBar />
                <Switch>
                    <Route exact path="/" render={() => <HomeContainer />} />
                    <Route path="/admin" render={() => <AdminContainer />} />
                </Switch>
            </>
        </Router>
    )
}

export default MainContainer

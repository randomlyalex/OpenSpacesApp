import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from '../components/NavBar'
import AdminContainer from './AdminContainer'
import HomeContainer from './HomeContainer'
import Button from '@material-ui/core/Button'

const MainContainer = () => {
    return (
            <>
                <NavBar />
                <Switch>
                    <Route exact path="/" render={() => <HomeContainer />} />
                    <Route path="/admin" render={() => <AdminContainer />} />
                </Switch>
            </>
    )
}

export default MainContainer

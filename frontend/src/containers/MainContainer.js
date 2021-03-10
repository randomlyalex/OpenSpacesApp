import { Container, Grid } from '@material-ui/core'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from '../components/NavBar'
import AdminContainer from './AdminContainer'
import HomeContainer from './HomeContainer'

const MainContainer = () => {
    return (
        <>
            <Container>
                <Grid Container>
                    <Grid xs={12}>
                        <NavBar />
                    </Grid>
                    <Grid xs={12} t={100}>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => <HomeContainer />}
                            />
                            <Route
                                path="/admin"
                                render={() => <AdminContainer />}
                            />
                        </Switch>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default MainContainer

import { Container, Grid } from '@material-ui/core'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from '../components/NavBar'
import AdminContainer from './AdminContainer'
import HomeContainer from './HomeContainer'
import UserAdminContainer from './UserAdminContainer'

const MainContainer = () => {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                <Grid item xs={12}>
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
                        <Route
                            path="/user"
                            render={() => {
                                return (
                                    <>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs={7}
                                                // sm={6}
                                                // md={8}
                                                // lg={10}
                                            >
                                                <HomeContainer />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={5}
                                                // sm={6}
                                                // md={4}
                                                // lg={2}
                                            >
                                                <UserAdminContainer />
                                            </Grid>
                                        </Grid>
                                    </>
                                )
                            }}
                        />
                    </Switch>
                </Grid>
            </Grid>
        </>
    )
}

export default MainContainer

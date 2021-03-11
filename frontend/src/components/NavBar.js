import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import HomeIcon from '@material-ui/icons/Home'
import { LockOpen as LockOpenIcon, Settings } from '@material-ui/icons'
import { Grid, Tab } from '@material-ui/core'
import { Link, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 500,
    },
})

const NavBar = ({ handleDrawerOpen }) => {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const { logout, user, loginWithRedirect, isAuthenticated } = useAuth0()
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Grid container spacing={1} justify="space-between">
                        <Grid item>
                            <Tab
                                label="Home"
                                size="small"
                                component={Link}
                                to="/"
                                icon={<HomeIcon />}
                            />
                        </Grid>

                        <Grid item>
                            <Route
                                path="/admin"
                                render={() => {
                                    return (
                                        <Tab
                                            label="Admin"
                                            size="small"
                                            component={Link}
                                            to="/admin"
                                            icon={<Settings />}
                                        />
                                    )
                                }}
                            />
                            {isAuthenticated ? (
                                <>
                                    <Tab
                                        label={user.name}
                                        size="small"
                                        icon={
                                            <img
                                                src={user.picture}
                                                alt={user.name}
                                                width="30px"
                                                style={{ borderRadius: 50 }}
                                            />
                                        }
                                        onClick={handleDrawerOpen}
                                    />
                                </>
                            ) : (
                                <Tab
                                    label="Login"
                                    size="small"
                                    icon={<LockOpenIcon />}
                                    onClick={() => {
                                        loginWithRedirect()
                                    }}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {/* 

            <AppBar position="static">
                <Toolbar>
                    

                    <IconButton disabled={true} size="small">
                        <MoreHoriz />
                        <Typography variant="button" className={classes.title}>
                            Details
                        </Typography>
                    </IconButton>
                    
                    <SignInOutProfile />

                    
                </Toolbar>
            </AppBar> */}
        </>
    )
}

export default NavBar

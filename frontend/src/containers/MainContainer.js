import {
    Container,
    Divider,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Tab,
    Typography,
    useTheme,
} from '@material-ui/core'
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    ExitToApp as ExitToAppIcon,
} from '@material-ui/icons'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from '../components/NavBar'
import AdminContainer from './AdminContainer'
import HomeContainer from './HomeContainer'
import UserAdminContainer from './UserAdminContainer'
import { useAuth0 } from '@auth0/auth0-react'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
}))

const MainContainer = () => {
    const { logout, user, loginWithRedirect, isAuthenticated } = useAuth0()
    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <NavBar handleDrawerOpen={handleDrawerOpen} />
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
                    </Switch>
                </Grid>
            </Grid>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Grid container justify="space-between">
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                        <IconButton
                            aria-label="logout"
                            onClick={() => {
                                logout()
                            }}
                        >
                            <ExitToAppIcon />
                            <Typography variant="caption">Sign Out</Typography>
                        </IconButton>
                    </Grid>
                </div>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText>My POIs</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText>Favourites</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText>Rated</ListItemText>
                    </ListItem>
                    {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                        (text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    )} */}
                </List>
                <Divider />
                <List>
                    {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))} */}
                </List>
            </Drawer>
        </>
    )
}

export default MainContainer

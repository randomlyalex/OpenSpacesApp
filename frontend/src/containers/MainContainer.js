import {
    Button,
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
    Typography,
    useTheme,
} from '@material-ui/core'
import {
    BookmarkBorder,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    ExitToApp as ExitToAppIcon,
    Queue,
    StarBorder,
    Stars,
    ThumbsUpDown,
} from '@material-ui/icons'
import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from '../components/NavBar'
import AdminContainer from './AdminContainer'
import HomeContainer from './HomeContainer'
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
    const { logout } = useAuth0()
    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [showAddPoiForm, setShowAddPoiForm] = useState(false)
    const [filterUsersPoi, setFilterUsersPoi] = useState('all')

    const handleShowAddPoiForm = () => {
        setShowAddPoiForm(!showAddPoiForm)
    }

    const handleFilterUserPoi = (filterView) => {
        if (filterView == filterUsersPoi) setFilterUsersPoi('all')
        else setFilterUsersPoi(filterView)
    }

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
                            render={() => (
                                <HomeContainer
                                    filterUsersPoi={filterUsersPoi}
                                    showAddPoiForm={showAddPoiForm}
                                />
                            )}
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
                        <IconButton onClick={handleShowAddPoiForm}>
                            <ListItemIcon>
                                {showAddPoiForm ? (
                                    <Queue color="secondary" />
                                ) : (
                                    <Queue />
                                )}
                            </ListItemIcon>
                            <ListItemText>Add POI</ListItemText>
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton
                            onClick={() => handleFilterUserPoi('allUserPoi')}
                        >
                            <ListItemIcon>
                                {filterUsersPoi === 'allUserPoi' ? (
                                    <BookmarkBorder color="secondary" />
                                ) : (
                                    <BookmarkBorder />
                                )}
                            </ListItemIcon>
                            <ListItemText>My POIs</ListItemText>
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton
                            onClick={() => handleFilterUserPoi('userFavPoi')}
                        >
                            <ListItemIcon>
                                {filterUsersPoi === 'userFavPoi' ? (
                                    <StarBorder color="secondary" />
                                ) : (
                                    <StarBorder />
                                )}
                            </ListItemIcon>
                            <ListItemText>Favourites</ListItemText>
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton
                            onClick={() => handleFilterUserPoi('userRatedPoi')}
                        >
                            <ListItemIcon>
                                {filterUsersPoi === 'userRatedPoi' ? (
                                    <ThumbsUpDown color="secondary" />
                                ) : (
                                    <ThumbsUpDown />
                                )}
                            </ListItemIcon>
                            <ListItemText>Rated</ListItemText>
                        </IconButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export default MainContainer

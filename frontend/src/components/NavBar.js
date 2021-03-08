import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import { MoreHoriz, Settings } from '@material-ui/icons'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 500,
    },
})

const NavBar = () => {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/">
                        <IconButton>
                            <HomeIcon />
                            <Typography variant="h6" className={classes.title}>
                                Home
                            </Typography>
                        </IconButton>
                    </Link>

                    <IconButton disabled="true">
                        <MoreHoriz />
                        <Typography variant="h6" className={classes.title}>
                            Details
                        </Typography>
                    </IconButton>
                    <Link to="/admin">
                        <IconButton>
                            <Settings />
                            <Typography variant="h6" className={classes.title}>
                                Admin
                            </Typography>
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar

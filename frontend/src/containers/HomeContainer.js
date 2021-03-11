import {
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Slider,
    Typography,
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import LeafletMap from '../components/LeafletMap'
import PoiSubmitForm from '../components/PoiSubmitForm'
import Request from '../helpers/request'
import { useAuth0 } from '@auth0/auth0-react'

const HomeContainer = ({ showAddPoiForm, filterUsersPoi }) => {
    const { user, isAuthenticated } = useAuth0()
    const serverUrl = process.env.REACT_APP_API_SERVER
    const [pois, setPois] = useState([])
    const [type, setType] = useState('all')
    const [sliderValue, setSliderValue] = useState(3)
    const [showMap, setShowMap] = useState(true)

    const handleShowMap = () => {
        setShowMap(!showMap)
    }

    const getPois = () => {
        const request = new Request()
        request
            .get(`${serverUrl}/api/pois?type=${type}`)
            .then((allQueriedPois) => {
                switch (filterUsersPoi) {
                    case 'all':
                        setPois(allQueriedPois)
                        break
                    case 'allUserPoi':
                        if (isAuthenticated) {
                            setPois(
                                allQueriedPois.filter(
                                    (poi) => poi.createdBy == user.sub
                                )
                            )
                        } else {
                            setPois(allQueriedPois)
                        }
                        break
                    case 'userFavPoi':
                        setPois(
                            allQueriedPois.filter((poi) => {
                                if ('favBy' in poi) {
                                    poi.favBy.indexOf(user.sub) > -1
                                } else {
                                    false
                                }
                            })
                        )

                        break
                    case 'userRatedPoi':
                        console.log('filter by userRatedPoi')
                        break
                }
            })
    }

    useEffect(() => {
        getPois()
    }, [type, filterUsersPoi])

    const handleRadio = (event) => {
        setType(event.target.value)
    }

    const handleRadiusSlide = (event) => {
        setSliderValue(event.target.value)
    }

    return (
        <>
            <Container component="main" style={{ paddingTop: 50 }}>
                {showAddPoiForm && (
                    <Grid container>
                        <PoiSubmitForm />
                    </Grid>
                )}
                <Grid container alignContent="flex-end" justify="space-around">
                    <Grid item>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">
                                Filter by Type
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-label="gender"
                                name="type"
                                value={type}
                                onChange={handleRadio}
                            >
                                <FormControlLabel
                                    value="all"
                                    control={<Radio />}
                                    label="All"
                                />
                                <FormControlLabel
                                    value="bench"
                                    control={<Radio />}
                                    label="Bench"
                                />
                                <FormControlLabel
                                    value="table"
                                    control={<Radio />}
                                    label="Table"
                                />
                                <FormControlLabel
                                    value="toilet"
                                    control={<Radio />}
                                    label="Toilet"
                                />
                                <FormControlLabel
                                    value="space"
                                    control={<Radio />}
                                    label="Space"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Slider
                            defaultValue={5}
                            step={1}
                            mix={0}
                            max={20}
                            valueLabelDisplay="on"
                            onChange={(event, value) => {
                                event.target.value = value
                                handleRadiusSlide(event)
                            }}
                        />
                        <Typography gutterBottom>Radius</Typography>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end">
                    {showMap ? (
                        <Button
                            onClick={handleShowMap}
                            startIcon={<ExpandLess />}
                        >
                            Hide Map
                        </Button>
                    ) : (
                        <Button
                            onClick={handleShowMap}
                            startIcon={<ExpandMore />}
                        >
                            Show Map
                        </Button>
                    )}
                </Grid>
                {showMap && (
                    <Grid container>
                        <LeafletMap pois={pois} sliderValue={sliderValue} />
                    </Grid>
                )}
            </Container>
        </>
    )
}

export default HomeContainer

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
import PoiSubmitForm from '../components/PoiSubmitForm'
import Request from '../helpers/request'
import { useAuth0 } from '@auth0/auth0-react'
import POIList from '../components/POIList'
import GMap from '../components/GMap'

const HomeContainer = ({
    showAddPoiForm,
    filterUsersPoi,
    handleShowAddPoiForm,
}) => {
    const serverUrl = process.env.REACT_APP_API_SERVER
    const { user, isAuthenticated } = useAuth0()
    const [pois, setPois] = useState([])
    const [type, setType] = useState('all')
    const [sliderValue, setSliderValue] = useState(5)
    const [showMap, setShowMap] = useState(true)
    const [clickedMapLatLng, setClickedMapLatLng] = useState({
        lat: 55,
        lng: -3,
    })

    const addPoiHome = (submittedPoi) => {
        const request = new Request()
        let endPoint = null
        switch (submittedPoi.type) {
            case 'bench':
                endPoint = 'benches'
                break
            case 'table':
                endPoint = 'tables'
                break
            case 'toilet':
                endPoint = 'toilets'
                break
            case 'space':
                endPoint = 'spaces'
                break
        }
        if (endPoint != null) {
            request.post(`${serverUrl}/api/${endPoint}`, submittedPoi)
        }
        console.log(endPoint)
        console.log(submittedPoi)
    }

    const handleClickMapCallback = (clickedMarker) => {
        setClickedMapLatLng(clickedMarker)
    }

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
                                if ('favBy' in poi && poi.favBy.length > 0) {
                                    return poi.favBy.indexOf(user.sub) != -1
                                } else {
                                    false
                                }
                            })
                        )

                        break
                    case 'userRatedPoi':
                        setPois(
                            allQueriedPois.filter((poi) => {
                                if (
                                    'ratedBy' in poi &&
                                    poi.ratedBy.length > 0
                                ) {
                                    return (
                                        poi.ratedBy.findIndex(
                                            (rating) => rating.user == user.sub
                                        ) != -1
                                    )
                                } else {
                                    false
                                }
                            })
                        )
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
                        <PoiSubmitForm
                            lat={clickedMapLatLng.lat}
                            lon={clickedMapLatLng.lng}
                            onPoiSubmit={(poi) => {
                                addPoiHome(poi)
                            }}
                        />
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
                                size="medium"
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
                    <Grid item>
                        {showMap ? (
                            <Button
                                onClick={handleShowMap}
                                startIcon={<ExpandLess />}
                            >
                                Show Table
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
                </Grid>

                {showMap ? (
                    <Grid container>
                        <GMap
                            handleClickMapCallback={handleClickMapCallback}
                            clickedMapLatLng={clickedMapLatLng}
                            pois={pois}
                            sliderValue={sliderValue}
                            handleShowAddPoiForm={handleShowAddPoiForm}
                        />
                    </Grid>
                ) : (
                    <Grid container>
                        <POIList pois={pois} />
                    </Grid>
                )}
            </Container>
        </>
    )
}

export default HomeContainer

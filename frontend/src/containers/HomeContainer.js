import {
    Container,
    CssBaseline,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Slider,
    Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import LeafletMap from '../components/LeafletMap'
import Request from '../helpers/request'

const HomeContainer = () => {
    const serverUrl = process.env.REACT_APP_API_SERVER
    const [pois, setPois] = useState([])
    const [type, setType] = useState('all')
    const [radius, setRadius] = useState(3)

    const getPois = () => {
        const request = new Request()
        request.get(`${serverUrl}/api/pois?type=${type}`).then((data) => {
            setPois(data)
        })
    }

    useEffect(() => {
        getPois()
    }, [type])

    useEffect(() => {
        getPois()
    }, [])

    const handleRadio = (event) => {
        setType(event.target.value)
    }

    const handleRadiusSlide = (event) => {
        setRadius(event.target.value)
    }

    return (
        <>
            <Container component="main" style={{ paddingTop: 50 }}>
                <CssBaseline />
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
                            defaultValue={3}
                            step={1}
                            mix={0}
                            max={20}
                            valueLabelDisplay="on"
                            onChange={handleRadiusSlide}
                        />
                        <Typography gutterBottom>Radius</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <LeafletMap pois={pois} />
                </Grid>
            </Container>
        </>
    )
}

export default HomeContainer

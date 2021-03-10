import {
    Checkbox,
    Container,
    CssBaseline,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    Select,
    RadioGroup,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import LeafletMap from '../components/LeafletMap'
import Request from '../helpers/request'

const HomeContainer = () => {
    const [pois, setPois] = useState([])
    const [type, setType] = useState('all')

    const getPois = () => {
        const request = new Request()
        request.get(`/api/pois?type=${type}`).then((data) => {
            setPois(data)
        })
    }

    // const PoisList = pois.map((poi) => {
    //     return (
    //         <h3 key={poi.id}>
    //             {poi.id} - {poi.type}
    //             {poi.lat} - {poi.lon}
    //         </h3>
    //     )
    // })

    useEffect(() => {
        getPois()
    }, [type])

    useEffect(() => {
        getPois()
    }, [])

    const handleRadio = (event) => {
        setType(event.target.value)
    }

    return (
        <>
            <Container component="main">
                <CssBaseline />
                <Grid container spacing={0}>
                    <Grid item xs={12}>
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

                    <Grid item xs={12}>
                        <LeafletMap pois={pois} />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default HomeContainer

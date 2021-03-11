/* eslint react/prop-types: 0 */

import {
    Container,
    Avatar,
    Typography,
    Grid,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    makeStyles,
    Select,
    MenuItem,
} from '@material-ui/core'
import { AddLocation } from '@material-ui/icons'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import '../App.css'

const PoiSubmitForm = ({ onPoiSubmit, lat, lon, isAdmin }) => {
    const { handleSubmit, register, control, watch } = useForm()

    const watchType = watch('type', 'bench')

    const onSubmit = (formData, event) => {
        onPoiSubmit(formData)
        event.target.reset()
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }))

    const classes = useStyles()

    return (
        <>
            <Container maxWidth="sm">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AddLocation />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Poi
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="type"
                                    control={control}
                                    as={Select}
                                    required
                                    label="Poi Type"
                                >
                                    <MenuItem value="" disabled>
                                        Poi Type
                                    </MenuItem>
                                    <MenuItem value={'bench'}>Bench</MenuItem>
                                    <MenuItem value={'table'}>Table</MenuItem>
                                    {isAdmin && (
                                        <MenuItem value={'toilet'}>
                                            Toilet
                                        </MenuItem>
                                    )}
                                    <MenuItem value={'space'}>Space</MenuItem>
                                </Controller>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="lat"
                                    variant="outlined"
                                    defaultValue={lat}
                                    required
                                    inputRef={register}
                                    fullWidth
                                    id="lat"
                                    label="Lat"
                                    autoFocus
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    defaultValue={lon}
                                    required
                                    inputRef={register}
                                    fullWidth
                                    id="lon"
                                    label="Lon"
                                    name="lon"
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    inputRef={register}
                                    fullWidth
                                    id="privacy"
                                    label="Privacy"
                                    name="privacy"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    inputRef={register}
                                    fullWidth
                                    id="accessibility"
                                    label="Accessibility"
                                    name="accessibility"
                                />
                            </Grid>
                            {watchType != 'space' && watchType != 'toilet' && (
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type="number"
                                        name="capacity"
                                        inputRef={register}
                                        label="Capacity"
                                        id="capacity"
                                    />
                                </Grid>
                            )}
                            {watchType != 'toilet' && (
                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        labelPlacement="start"
                                        control={
                                            <Controller
                                                as={Checkbox}
                                                control={control}
                                                name="sheltered"
                                                color="primary"
                                            />
                                        }
                                        label="Sheltered"
                                    />
                                </Grid>
                            )}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Add!
                        </Button>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default PoiSubmitForm

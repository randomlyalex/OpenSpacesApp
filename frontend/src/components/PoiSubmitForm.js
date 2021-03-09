/* eslint react/prop-types: 0 */
import React, { useState } from 'react'
import '../App.css'

const PoiSubmitForm = ({ onPoiSubmit, lat, lon }) => {
    const initialPoiFormState = {
        coord: {
            lat: 0,
            lon: 0,
        },
        lat: lat,
        lon: lon,
        privacy: '',
        accessibility: '',
        capacity: 0,
        sheltered: false,
        type: 'bench',
    }

    const [poiFormData, setPoiFormData] = useState(initialPoiFormState)

    const onSubmit = (event) => {
        event.preventDefault()
        poiFormData.coord.lat = poiFormData.lat
        poiFormData.coord.lon = poiFormData.lon
        delete poiFormData.lat
        delete poiFormData.lon
        onPoiSubmit(poiFormData)
        setPoiFormData(initialPoiFormState)
    }

    function onChange({ target }) {
        const value = target.type === 'checkbox' ? target.checked : target.value
        setPoiFormData((prevState) => ({ ...prevState, [target.name]: value }))
    }

    return (
        <div>
            <h4> New Form Test</h4>
            <form onSubmit={onSubmit}>
                <label>PoiType</label>
                <select name="type" onChange={onChange}>
                    <option value="bench">Bench</option>
                    <option value="table">Table</option>
                    <option value="toilet">Toilet</option>
                    <option value="space">Space</option>
                </select>
                <br />
                <label>Location</label>
                <br />
                <span>
                    <input
                        type="text"
                        name="lat"
                        placeholder="lat?"
                        value={poiFormData.lat}
                        onChange={onChange}
                    />

                    <input
                        type="text"
                        name="lon"
                        placeholder="lon?"
                        value={poiFormData.lon}
                        onChange={onChange}
                    />
                </span>
                <br />
                <label>Privacy</label>
                <br />
                <input
                    type="text"
                    name="privacy"
                    value={poiFormData.privacy}
                    onChange={onChange}
                />
                <br />
                <label>Accessibility</label>
                <br />
                <input
                    type="text"
                    name="accessibility"
                    value={poiFormData.accessibility}
                    onChange={onChange}
                />
                <br />
                <label>Capacity</label>
                <br />
                <input
                    type="number"
                    name="capacity"
                    value={poiFormData.capacity}
                    onChange={onChange}
                />
                <br />
                <span>
                    <label>Sheltered: </label>
                    <div onChange={onChange}>
                        Yes
                        <input type="radio" name="sheltered" value="true" />
                        No
                        <input
                            type="radio"
                            name="sheltered"
                            value="false"
                            defaultChecked
                        />
                    </div>
                </span>
                <br />
                <input type="submit" />
            </form>
        </div>
    )
}

export default PoiSubmitForm

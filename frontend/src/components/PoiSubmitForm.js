/* eslint react/prop-types: 0 */
import React, { useState } from 'react'

const PoiSubmitForm = ({ onPoiSubmit }) => {
    const [type, setType] = useState('')
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [privacy, setPrivacy] = useState('')
    const [accessibility, setAccessibility] = useState('')
    const [capacity, setCapacity] = useState('')

    const handleTypeChange = (event) => {
        setType(event.target.value)
        console.log(event.target.value)
    }

    const handleLatChange = (event) => {
        setLat(event.target.value)
    }

    const handleLonChange = (event) => {
        setLon(event.target.value)
    }

    const handlePrivacyChange = (event) => {
        setPrivacy(event.target.value)
    }

    const handleAccessibilityChange = (event) => {
        setAccessibility(event.target.value)
    }

    const handleCapacityChange = (event) => {
        setCapacity(event.target.value)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        onPoiSubmit({
            coord: {
                lat: lat,
                lon: lon,
            },
            privacy: privacy,
            accessibility: accessibility,
            capacity: capacity,
            type: type,
        })
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <select onChange={handleTypeChange}>
                    <option value="benches">Bench</option>
                    <option value="tables">Table</option>
                </select>
                <input
                    type="number"
                    step="0.0001"
                    placeholder="Lat"
                    value={lat}
                    onChange={handleLatChange}
                />
                <input
                    type="number"
                    step="0.0001"
                    placeholder="Lon"
                    value={lon}
                    onChange={handleLonChange}
                />
                <input
                    type="text"
                    placeholder="Privacy?"
                    value={privacy}
                    onChange={handlePrivacyChange}
                />
                <input
                    type="text"
                    placeholder="Accessibility?"
                    value={accessibility}
                    onChange={handleAccessibilityChange}
                />
                <input
                    type="number"
                    placeholder="capacity?"
                    value={capacity}
                    onChange={handleCapacityChange}
                />
                <input type="submit" />
            </form>
        </div>
    )
}

export default PoiSubmitForm

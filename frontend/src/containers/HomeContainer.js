import React, { useEffect, useState } from 'react'
import LeafletMap from '../components/LeafletMap'
import Request from '../helpers/request'

const HomeContainer = () => {
    const [pois, setPois] = useState([])
    const [type, setType] = useState('')

    const getPois = () => {
        const request = new Request()
        request.get(`/api/pois${type}`).then((data) => {
            setPois(data)
        })
    }

    const PoisList = pois.map((poi) => {
        return (
            <h3 key={poi.id}>
                {poi.id} - {poi.type}
                {poi.coord.lat} - {poi.coord.lon}
            </h3>
        )
    })

    const handleDropdown = (event) => {
        if (event.target.value != '') {
            setType(`?type=${event.target.value}`)
        } else {
            setType('')
        }
    }

    useEffect(() => {
        getPois()
    }, [type])

    return (
        <div>
            <p>This is the home page</p>
            <select onChange={handleDropdown}>
                <option value="">All</option>
                <option value="benches">Bench</option>
                <option value="tables">Table</option>
                <option value="toilets">Toilet</option>
                <option value="spaces">Space</option>
            </select>

            {PoisList}
            <LeafletMap pois={pois}/>
            </div>
    )
}

export default HomeContainer

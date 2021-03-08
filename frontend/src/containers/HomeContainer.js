import React, { useEffect, useState } from 'react'
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
                <option value="bench">Bench</option>
                <option value="table">Table</option>
                <option value="toilet">Toilet</option>
                <option value="space">Space</option>
            </select>

            {PoisList}
        </div>
    )
}

export default HomeContainer

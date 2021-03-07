import React, { useEffect, useState } from 'react'
import Request from '../helpers/request'

const HomeContainer = () => {
    const [pois, setPois] = useState([])

    const getPois = () => {
        const request = new Request()
        request.get('/api/pois').then((data) => {
            setPois(data)
        })
    }

    useEffect(() => {
        getPois()
    }, [])

    return (
        <div>
            <p>This is the home page</p>
        </div>
    )
}

export default HomeContainer

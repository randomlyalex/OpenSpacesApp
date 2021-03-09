import React, { useRef } from 'react'
import PoiSubmitForm from '../components/PoiSubmitForm'
import Request from '../helpers/request'

const AdminContainer = () => {
    const addPoi = (submittedPoi) => {
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
            request.post(`/api/${endPoint}`, submittedPoi)
        }
        console.log(endPoint)
        console.log(submittedPoi)
    }

    return (
        <div>
            <p>this is the Admin Page</p>
            <PoiSubmitForm
                onPoiSubmit={(poi) => {
                    addPoi(poi)
                }}
            />
        </div>
    )
}

export default AdminContainer

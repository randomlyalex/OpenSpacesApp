import React from 'react'
import PoiSubmitForm from '../components/PoiSubmitForm'
import Request from '../helpers/request'

const AdminContainer = () => {
    const serverUrl = process.env.REACT_APP_API_SERVER
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
            request.post(`${serverUrl}/api/${endPoint}`, submittedPoi)
        }
        console.log(endPoint)
        console.log(submittedPoi)
    }

    return (
        <div>
            <PoiSubmitForm
                onPoiSubmit={(poi) => {
                    addPoi(poi)
                }}
                lat={0}
                lon={0}
                isAdmin
            />
        </div>
    )
}

export default AdminContainer

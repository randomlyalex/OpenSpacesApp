import React, { useRef } from 'react'
import PoiSubmitForm from '../components/PoiSubmitForm'
import Request from '../helpers/request'

const AdminContainer = () => {
    const addPoi = (submittedPoi) => {
        const request = new Request()
        request.post(`/api/${submittedPoi.type}`, submittedPoi)
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

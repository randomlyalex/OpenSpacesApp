/* eslint react/prop-types: 0 */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import '../App.css'

const PoiSubmitForm = ({ onPoiSubmit, lat, lon }) => {
    const { handleSubmit, register } = useForm({})

    const onSubmit = (formData) => {
        onPoiSubmit(formData)
    }

    return (
        <div>
            <h4> New Form Test</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>PoiType</label>
                <select name="type" ref={register}>
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
                        ref={register}
                    />

                    <input
                        type="text"
                        name="lon"
                        placeholder="lon?"
                        ref={register}
                    />
                </span>
                <br />
                <label>Privacy</label>
                <br />
                <input type="text" name="privacy" ref={register} />
                <br />
                <label>Accessibility</label>
                <br />
                <input type="text" name="accessibility" ref={register} />
                <br />
                <label>Capacity</label>
                <br />
                <input type="number" name="capacity" ref={register} />
                <br />
                <span>
                    <label>Sheltered: </label>
                    <div ref={register}>
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

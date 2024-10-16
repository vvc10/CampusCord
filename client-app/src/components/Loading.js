import React from 'react'
import Loader from './Loader'

export default function Loading() {
    return (
        <div className='bg-black w-fit h-fit mx-auto my-auto'>
            <h1>
                CampusCord
            </h1>
            <Loader />
        </div>
    )
}

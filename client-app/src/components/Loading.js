import React from 'react'
import Loader from './Loader'

export default function Loading() {
    return (
        <div className='bg-black w-fit h-fit mx-auto my-auto'>
            <h1 className='text-white'>
                CampusCord 
            </h1>
            <p className='text-white italic'>stay cording..</p>
            <Loader />
        </div>
    )
}

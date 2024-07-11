import React from 'react'
import { useNavigate } from 'react-router';

const VFM_Avatar = ({ size, img, name, table, path }) => {
    const navigate = useNavigate();
    return (
        <>
            {name ? <button className='p-6' onClick={() => { path && navigate(path) }}>
                <img className={`w-${size} h-${size} mx-auto shadow-md shadow-gray-500 rounded-full`} src={img} alt="wait" />
                <span className={`absolute top-${size + 4}`}>{name}</span>
            </button> : <button onClick={() => { path && navigate(path) }}> <img className={`w-${size} h-${size} mx-auto shadow-md shadow-gray-500 rounded-full ${table ? 'm-1' : 'mb-2'}`} src={img} alt="wait" /></button>
            }
        </>
    )

}

export default VFM_Avatar;
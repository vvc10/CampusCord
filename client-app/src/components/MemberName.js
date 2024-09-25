import React from 'react';
import url from '../url.json';
import '../components/css/ServerList.css'
import { IoIosSettings } from "react-icons/io";

export default function MemberName(props) {

    const totalmembers = props.totalmembers;
    const name = props.name;
    const profile = props.profile;
    const cd = totalmembers.length > 1;
    return (
        <div style={{ position: 'relative', display: 'flex', overflow:'hidden' }} className="member cursor-pointer">
            <div className='flex' style={{width: '100%', height:'30px', alignItems:'center'}}>
                <div style={{ position: 'absolute', border: '1px', backgroundColor: 'grey', borderRadius: '100px', height: '30px', width: '30px' }} className=''>
                </div>

                <div style={{ position: 'absolute', border: '1px', left: '10px', backgroundColor: 'grey', borderRadius: '100px', height: '30px', width: '30px' }} className=''>
                </div>

                <img style={{ position: 'absolute', border: '1px', left: '15px', borderRadius: '100px', height: '30px', width: '30px' }} src={url.server + profile} alt={name} />

                <h5 className='text-[15px] relative ml-[55px] text-white' >
                    {totalmembers} 
                </h5>
            </div>
            <div>
                <IoIosSettings className='opacity-60 cursor-pointer text-white hover:text-gray-800 hover:opacity-10 ' />
            </div>
        </div>
    );
}

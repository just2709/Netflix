import React from 'react'

import { BiArrowToTop } from "react-icons/bi";


export const ScrollToTop = () => {
    function toTop(){
        window.scrollTo(0, 0)
    }
    return (
        <div className='fixed bottom-[10%] right-[10%] text-3xl bg-red-500 p-5 text-white rounded-full bg-opacity-70 z-20' onClick={toTop}> 
            <BiArrowToTop/>
        </div>
    )
}


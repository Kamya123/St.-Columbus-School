// src/components/HeaderPage.jsx

import React from 'react'

const HeaderPage = ({ headerTitle }) => {
  return (
    <div className='h-[17rem] bg-customRed1 text-white text-center content-center'>
        <h1 className='text-[5rem] font-georgia'>{headerTitle}</h1>
    </div>
  )
}

export default HeaderPage
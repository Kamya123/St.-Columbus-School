// src/components/HeaderPage.jsx

import React from 'react'

const HeaderPage = ({ headerTitle }) => {
  return (
    <div className='py-16 lg:py-20 px-10 bg-customRed1 text-white text-center content-center'>
        <h1 className='max-[544px]:text-4xl text-6xl font-georgia leading-[1.4em] min-[920px]:text-[5rem]'>{headerTitle}</h1>
    </div>
  )
}

export default HeaderPage
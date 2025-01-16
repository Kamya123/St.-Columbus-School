// src/pages/About.jsx

import React from 'react'
import HeaderPage from '../components/HeaderPage'
import AboutHero from '../layouts/about/AboutHero'

const About = ({ headerTitle }) => {
  return (
    <div className=''>
      <HeaderPage headerTitle={headerTitle} />
      <AboutHero />
    </div>
  )
}

export default About
// src/pages/Academics.jsx

import React from 'react'
import HeaderPage from '../components/HeaderPage'
import AcademicsContent from '../layouts/academics/AcademicsContent'

const Academics = ({ headerTitle }) => {
  return (
    <div>
      <HeaderPage headerTitle={ headerTitle } />
      <AcademicsContent />
    </div>
  )
}

export default Academics
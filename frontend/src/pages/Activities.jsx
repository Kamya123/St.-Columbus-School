// src/pages/Activities

import React from 'react'
import HeaderPage from '../components/HeaderPage'
import ActivitiesContent from '../layouts/activities/ActivitiesContent'

const Activities = ({ headerTitle }) => {
  return (
    <div>
      <HeaderPage headerTitle={ headerTitle } />
      <ActivitiesContent />
    </div>
  )
}

export default Activities
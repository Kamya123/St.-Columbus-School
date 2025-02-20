import React from 'react'
import HeaderPage from '../components/HeaderPage'
import GalleryComps from '../layouts/admin/GalleryComps'

const GalleryPage = ({ headerTitle }) => {
  return (
    <div>
      <HeaderPage headerTitle={ headerTitle } />
      <GalleryComps />
    </div>
  )
}

export default GalleryPage
import React from 'react'
import HeaderPage from '../components/HeaderPage'
import AdmissionForm from '../components/AdmissionForm'

const Admission = ({ headerTitle }) => {
  return (
    <div>
      <HeaderPage headerTitle={ headerTitle } />
      <AdmissionForm />
    </div>
  )
}

export default Admission
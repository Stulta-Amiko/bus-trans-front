'use client'
import { useEffect } from 'react'

const BootStrapClient = () => {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])
  return null
}

export default BootStrapClient

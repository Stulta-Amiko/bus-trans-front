import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootStrapClient from '../components/BootstrapClient'
import SearchCard from '../components/SearchCard'

const App = () => {
  return (
    <div style={{ backgroundColor: '#ebecff' }}>
      <BootStrapClient />
      <SearchCard />
    </div>
  )
}

export default App

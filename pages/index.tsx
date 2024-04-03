import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootStrapClient from '../components/BootstrapClient'
import Nav from '../components/Nav'
import SearchCard from '../components/SearchCard'

const App = () => {
  return (
    <>
      <BootStrapClient />
      <Nav />
      <SearchCard />
    </>
  )
}

export default App

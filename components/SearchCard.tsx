import './SearchCard.css'
import Card from 'react-bootstrap/Card'
import SearchCapsule from './SearchCapsule'
import Image from 'next/image'

function SearchCard() {
  return (
    <div className='CardContainer' style={{ backgroundColor: '#ebecff' }}>
      <div style={{ zIndex: 0, position: 'absolute' }}>
        <div className='CapsuleDiv'>
          <SearchCapsule />
        </div>
        <Card className='ImageContainer'>
          <div className='ImageDiv'>
            <Image width={500} height={320} alt='bus' src='/bus.png' />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SearchCard

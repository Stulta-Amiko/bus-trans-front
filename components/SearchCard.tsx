import Card from 'react-bootstrap/Card'
import SearchCapsule from './SearchCapsule'
import Image from 'next/image'

function SearchCard() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#ebecff',
        position: 'relative',
      }}
    >
      <div style={{ zIndex: 0, position: 'absolute' }}>
        <div style={{ zIndex: 1, position: 'absolute' }}>
          <SearchCapsule />
        </div>
        <Card
          style={{
            flexDirection: 'row',
            width: '65rem',
            height: '35rem',
            borderWidth: '0',
            borderRadius: '10px',
            display: 'flex',
            backgroundColor: '#FFFFFF',
            boxShadow: '10px 10px 10px 10px rgba(210, 210, 250, 0.4)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '20px',
              zIndex: 0,
              flexGrow: 1,
              marginTop: '10rem',
            }}
          >
            <Image width={500} height={320} alt='bus' src='/bus.png' />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SearchCard

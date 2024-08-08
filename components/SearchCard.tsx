import Card from 'react-bootstrap/Card'
import SearchCapsule from './SearchCapsule'
import Image from 'next/image'

import SearchRecordCard from './SearchRecordCard'

function SearchCard() {
  return (
    <>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          <Card
            style={{
              flexDirection: 'row',
              width: '60rem',
              height: '25rem',
              zIndex: 0,
              borderWidth: '3px',
              borderColor: '#0195fa',
              borderRadius: '10px',
              backgroundColor: '#e8efff',
            }}
          >
            <Card.Body
              style={{
                color: '#0195fa',
                fontWeight: 'bold',
                fontSize: '75px',
                marginTop: '1rem',
                marginLeft: '5rem',
                lineHeight: '6rem',
              }}
            >
              <div style={{ marginBottom: '1px', marginTop: '1px' }}>
                어디서나
              </div>
              <div>빠르고</div>
              <div>정확하게</div>
            </Card.Body>
            <div
              style={{
                zIndex: 0,
                marginTop: '4.3rem',
              }}
            >
              <Image width={535} height={270} alt='bus' src='/bus.png' />
            </div>
          </Card>
        </div>
        <div>
          <SearchCapsule />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '20px',
            marginLeft: '-60rem',
            marginTop: '-18rem',
            color: '#0195fa',
            fontWeight: 'bold',
          }}
        >
          검색기록
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '0rem 1rem',
          }}
        >
          <SearchRecordCard />
          <SearchRecordCard />
          <SearchRecordCard />
        </div>
      </div>
    </>
  )
}

export default SearchCard

import BusForm from './BusForm'

const SearchCard = () => {
  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        display: 'flex',
      }}
    >
      <div className='card text-center' style={{ width: '32rem' }}>
        <div className='card-body'>
          <h5 className='card-title'>조회</h5>
          <BusForm />
        </div>
      </div>
    </div>
  )
}

export default SearchCard

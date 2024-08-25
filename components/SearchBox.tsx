import Card from 'react-bootstrap/Card'

function SearchBox() {
  return (
    <Card
      style={{
        flexDirection: 'row',
        width: '60rem',
        height: '30rem',
        zIndex: 2,
        borderWidth: '0',
        borderRadius: '10px',
        backgroundColor: '#7E7EFE',
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
      ></Card.Body>
    </Card>
  )
}

export default SearchBox

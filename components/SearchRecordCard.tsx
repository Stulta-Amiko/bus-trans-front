import { Button, Modal, Spinner, Form } from 'react-bootstrap'
import axios from 'axios'
import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { BsGeoAlt, BsClock } from 'react-icons/bs'
import ResultCarousel from './ResultCarousel'

const SearchRecordCard = () => {
  let reqResult

  const [values, setValues] = useState({
    departTmn: '',
    arriveTmn: '',
    departTime: '',
  })
  const [modalShow, setModalShow] = useState(false)
  const [loadedData, setLoadedData] = useState()
  const [loading, setLoading] = useState(false)

  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      let departHour = values.departTime.split(':')[0]
      let departMin = values.departTime.split(':')[1]
      const back = process.env.BACKEND_ADDRESS
      /* axios로 get요청해서 받아오기 */
      reqResult = await axios
        .get(
          `${back}/bustrans/bus?depTmn=${values.departTmn}&arrTmn=${values.arriveTmn}&depHour=${departHour}&depMin=${departMin}`
        )
        .then((res) => {
          setLoadedData(res.data)
          setLoading(false)
        })
        .catch((e) => {
          return e
        })
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={submitHandler}>
      <Card
        style={{
          width: '20rem',
          height: '15rem',
          margin: '0rem 1rem',
          borderWidth: '0px 0.1px 0.1px 0px',
          borderColor: 'rgba(220,220,220,0.6)',
          borderRadius: '10px',
          backgroundColor: '#e8efff',
          boxShadow: '10px 10px 10px 10px #F2F2F2',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '1rem',
          }}
        >
          <BsGeoAlt
            style={{
              margin: '0rem 0.5rem',
              fontSize: '25px',
              color: '#0195fa',
            }}
          />
          출발터미널
        </div>
        <div
          style={{
            fontSize: '19px',
            margin: '0.1rem 2rem',
          }}
        >
          수원터미널
        </div>
        <div
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          <BsGeoAlt
            style={{
              margin: '0rem 0.5rem',
              fontSize: '25px',
              color: '#0195fa',
            }}
          />
          도착터미널
        </div>
        <div
          style={{
            fontSize: '19px',
            margin: '0.1rem 2rem',
          }}
        >
          수원터미널
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '18px',
            margin: '0.5rem 0rem',
          }}
        >
          오전 11시 40분 출발
        </div>
        <Modal
          show={modalShow}
          onHide={() => {
            setModalShow(false)
          }}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Body>
            {loading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  margin: '8rem 0rem',
                  border: '10rem',
                  color: '#d8dfff',
                }}
              >
                <Spinner
                  animation='border'
                  role='status'
                  style={{ width: '5rem', height: '5rem' }}
                >
                  <span className='visually-hidden'>Loading...</span>
                </Spinner>
              </div>
            ) : (
              <ResultCarousel items={loadedData} />
            )}

            <span style={{ margin: '0 2rem', textAlign: 'left' }}>
              교통상황에 따라 도착시간은 달라질 수 있습니다.
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={() => {
                setModalShow(false)
              }}
            >
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
        <Button
          style={{
            margin: '1rem 1rem',
            backgroundColor: '#0195fa',
            border: '0',
            borderRadius: '10px',
            fontSize: '16px',
          }}
          type='submit'
          onClick={() => {
            setLoading(true)
            setModalShow(true)
          }}
        >
          다시보기
        </Button>
      </Card>
    </Form>
  )
}

export default SearchRecordCard

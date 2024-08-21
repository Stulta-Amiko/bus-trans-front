import { BsArrowRepeat } from 'react-icons/bs'
import './SearchCapsule.css'
import ResultCarousel from './ResultCarousel'
import SelectModal from './SelectModal'
import axios from 'axios'
import 'dotenv/config'
import React, { FormEventHandler, useState } from 'react'
import { Form, Button, Card, Modal, Spinner } from 'react-bootstrap'
import TimePickerModal from './TimePickerModal'

const SearchCapsule = () => {
  const now = new Date()

  const back = process.env.NEXT_PUBLIC_BACKEND_ADDRESS
  let hours = now.getHours()
  let min = now.getMinutes()

  let reqResult

  const timeStr = `${hours}:${min}`

  const [values, setValues] = useState({
    departTmn: '',
    arriveTmn: '',
    departTime: timeStr,
  })
  const [displayTime, setDisplayTime] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const [loadedData, setLoadedData] = useState()
  const [loading, setLoading] = useState(false)

  const handleChange = (value: string, name: string) => {
    setValues((values) => ({ ...values, [name]: value }))
    if (name === 'departTime') {
      setDisplayTime(value)
    }
  }

  const departValueChange = (value: string) => {
    setValues((values) => ({
      ...values,
      departTmn: value,
    }))
  }

  const arriveValueChange = (value: string) => {
    setValues((values) => ({
      ...values,
      arriveTmn: value,
    }))
  }

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      let departHour = values.departTime.split(':')[0]
      let departMin = values.departTime.split(':')[1]
      console.log(back)

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
      <Card className='CardContainer'>
        <SelectModal
          onValueChange={departValueChange}
          displayText={values.departTmn}
        />
        <Button
          className='ChangeButton'
          onClick={() => {
            let temp = values.departTmn
            departValueChange(values.arriveTmn)
            arriveValueChange(temp)
          }}
        >
          <BsArrowRepeat />
        </Button>
        <SelectModal
          onValueChange={arriveValueChange}
          displayText={values.arriveTmn}
        />
        <TimePickerModal onValueChange={handleChange} />
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
          className='SubmitButton'
          type='submit'
          disabled={values.arriveTmn === '' || values.departTmn === ''}
          onClick={() => {
            setLoading(true)
            setModalShow(true)
          }}
        >
          경로 조회
        </Button>
      </Card>
    </Form>
  )
}

export default SearchCapsule

import './SearchCapsule.css'
import ResultCarousel from './ResultCarousel'
import SelectModal from './SelectModal'
import axios from 'axios'
import 'dotenv/config'
import React, { useState } from 'react'
import { Form, Button, Card, Modal, Spinner } from 'react-bootstrap'
import { FaExchangeAlt } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import TimePickerModal from './TimePickerModal'
import MadeInfo from './MadeInfo'

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
      <Card className='CapsuleContainer'>
        <div className='title'>
          IaaS를 이용한 시간표기반
          <br />
          시외고속버스 경로조회 서비스
        </div>
        <div className='EllipseUnder' />
        <div className='EllipseUpper' />
        <MadeInfo />
        <Card className='SelectContainer'>
          <SelectModal
            onValueChange={departValueChange}
            displayText={values.departTmn}
            flagType={false}
          />

          <FaExchangeAlt
            className='ChangeButton'
            onClick={() => {
              let temp = values.departTmn
              departValueChange(values.arriveTmn)
              arriveValueChange(temp)
            }}
          />
          <SelectModal
            onValueChange={arriveValueChange}
            displayText={values.arriveTmn}
            flagType
          />
        </Card>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '1rem 0',
            zIndex: 2,
          }}
        >
          <TimePickerModal onValueChange={handleChange} />
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              margin: '1rem 0rem',
            }}
          >
            <FaXmark
              onClick={() => {
                setModalShow(false)
              }}
              className='CloseIcon'
            />
          </div>
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

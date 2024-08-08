import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import 'dotenv/config'
import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Row, Col, Modal, Spinner } from 'react-bootstrap'
import FormContext from 'react-bootstrap/cjs/FormContext'
import ResultCarousel from './ResultCarousel'
import SelectModal from './SelectModal'

const ValidatedFormControl = ({ value, onChange, ...props }) => {
  const [message, setMessage] = useState()
  const { controlId } = useContext(FormContext)

  return (
    <>
      <Form.Control
        {...props}
        value={value}
        onChange={(event) => {
          onChange(event.target.value, event.target.name || controlId)
          event.target.checkValidity()
        }}
        onInvalid={(event) => setMessage(event.target.validationMessage)}
      />
      <Form.Control.Feedback type='invalid'>{message}</Form.Control.Feedback>
    </>
  )
}

const BusForm = () => {
  const now = new Date()

  let hours = now.getHours()
  let min = now.getMinutes()

  let reqResult

  const timeStr = `${hours}:${min}`
  let timeFormat = timeStr.split(':')
  if (parseInt(timeFormat[0]) < 10) {
    timeFormat[0] = '0' + timeFormat[0]
  }
  if (parseInt(timeFormat[1]) < 10) {
    timeFormat[1] = '0' + timeFormat[1]
  }
  useEffect(() => {
    setDisplayTime(`${timeFormat[0]}:${timeFormat[1]}`)
  }, [])

  const [values, setValues] = useState({
    departTmn: '',
    arriveTmn: '',
    departTime: timeStr,
  })
  const [displayTime, setDisplayTime] = useState('')
  const [submitted, setSubmitted] = useState({})
  const [validated, setValidated] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [loadedData, setLoadedData] = useState()
  const [loading, setLoading] = useState(false)

  const handleChange = (value, name) => {
    setValues((values) => ({ ...values, [name]: value }))
    if (name === 'departTime') {
      setDisplayTime(value)
    }
  }

  const nowTimeSet = () => {
    setValues((values) => ({
      ...values,
      departTime: timeStr,
    }))
    let timeFormat = timeStr.split(':')
    if (parseInt(timeFormat[0]) < 10) {
      timeFormat[0] = '0' + timeFormat[0]
    }
    if (parseInt(timeFormat[1]) < 10) {
      timeFormat[1] = '0' + timeFormat[1]
    }
    setDisplayTime(`${timeFormat[0]}:${timeFormat[1]}`)
  }

  const departValueChange = (value) => {
    setValues((values) => ({
      ...values,
      departTmn: value,
    }))
    console.log(value)
  }

  const arriveValueChange = (value) => {
    setValues((values) => ({
      ...values,
      arriveTmn: value,
    }))
    console.log(value)
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      let departHour = values.departTime.split(':')[0]
      let departMin = values.departTime.split(':')[1]
      const back = process.env.BACKEND_ADDRESS
      /* axios로 get요청해서 받아오기 */
      reqResult = await axios
        .get(
          `http://localhost:3000/bustrans/bus?depTmn=${values.departTmn}&arrTmn=${values.arriveTmn}&depHour=${departHour}&depMin=${departMin}`
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
    <Form onSubmit={submitHandler} noValidate validated={validated}>
      <Form.Group as={Row} className='mb-3' controlId='departTmn'>
        <Form.Label column sm='3'>
          출발터미널
        </Form.Label>
        <Col>
          <ValidatedFormControl
            onChange={handleChange}
            value={values.departTmn}
            name='departTmn'
            readOnly={true}
            type='text'
            required
          />
        </Col>
        <Col>
          <SelectModal onValueChange={departValueChange} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className='mb-3' controlId='arriveTmn'>
        <Form.Label column sm='3'>
          도착터미널
        </Form.Label>
        <Col>
          <ValidatedFormControl
            onChange={handleChange}
            value={values.arriveTmn}
            readOnly={true}
            name='arriveTmn'
            type='text'
            required
          />
        </Col>
        <Col>
          <SelectModal onValueChange={arriveValueChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className='mb-3' controlId='departMin'>
        <Form.Label column sm='3'>
          출발 시간
        </Form.Label>
        <Col>
          <ValidatedFormControl
            onChange={handleChange}
            value={displayTime}
            name='departTime'
            type='time'
            required
          />
        </Col>
        <Col>
          <Button variant='primary' onClick={nowTimeSet}>
            현재시간
          </Button>
        </Col>
      </Form.Group>
      <Modal
        show={modalShow}
        onHide={() => {
          setModalShow(false)
        }}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            경로탐색 결과
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
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
        type='submit'
        disabled={values.arriveTmn === '' || values.departTmn === ''}
        onClick={() => {
          setLoading(true)
          setModalShow(true)
        }}
      >
        최적경로 찾기
      </Button>
    </Form>
  )
}

export default BusForm

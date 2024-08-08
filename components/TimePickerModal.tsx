import { Card, Modal, Form, Button } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react'
import FormContext from 'react-bootstrap/cjs/FormContext'

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

const TimePickerModal = ({ onValueChange }) => {
  const now = new Date()

  let hours = now.getHours()
  let min = now.getMinutes()

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

  const nowTimeSet = () => {
    onValueChange((values) => ({
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

  const [displayTime, setDisplayTime] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const [values, setValues] = useState({
    departTime: timeStr,
  })

  const handleChange = (value, name) => {
    setValues((values) => ({ ...values, [name]: value }))
    if (name === 'departTime') {
      setDisplayTime(value)
    }
  }

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  return (
    <>
      <Card className='CardTime' onClick={handleShow}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          {parseInt(displayTime.split(':')[0]) > 12 ? `오후` : `오전`}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '19px',
            fontWeight: 'bold',
          }}
        >
          {parseInt(displayTime.split(':')[0]) > 12
            ? `${parseInt(displayTime.split(':')[0]) - 12}:${
                displayTime.split(':')[1]
              }`
            : `${displayTime.split(':')[0]}:${displayTime.split(':')[1]}`}
        </div>
      </Card>
      <Modal show={modalShow}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ display: 'flex', justifyContent: 'center' }}>
          <ValidatedFormControl
            onChange={handleChange}
            value={displayTime}
            name='departTime'
            type='time'
            style={{
              width: '10rem',
              fontSize: '20px',
              backgroundColor: '#e8efff',
              border: '0',
            }}
            required
          />
          <Button style={{ margin: '0rem 1rem' }} onClick={nowTimeSet}>
            현재시간
          </Button>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={() => {
              onValueChange(values.departTime, 'departTime')
              handleClose()
            }}
          >
            확인
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TimePickerModal

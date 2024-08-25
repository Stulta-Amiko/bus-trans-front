import React, { useEffect, useState, useContext } from 'react'
import FormContext from 'react-bootstrap/cjs/FormContext'
import { FaAngleUp, FaAngleDown, FaXmark } from 'react-icons/fa6'

import './TimePickerModal.css'
import { Card, Modal, Form, Button } from 'react-bootstrap'

interface FormGroupProps extends React.ComponentPropsWithoutRef<any> {
  value: string
  onChange: (value: string, name: string) => void
}

const ValidatedFormControl = ({
  value,
  onChange,
  ...props
}: FormGroupProps) => {
  const [message, setMessage] = useState()
  const { controlId } = useContext(FormContext)
  return (
    <>
      <Form.Control
        {...props}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value, event.target.name || controlId)
          event.target.checkValidity()
        }}
        onInvalid={(event: any) => setMessage(event.target.validationMessage)}
      />
      <Form.Control.Feedback type='invalid'>{message}</Form.Control.Feedback>
    </>
  )
}

const TimePickerModal = ({
  onValueChange,
}: {
  onValueChange: (value: string, name: string) => void
}) => {
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
    let timeFormat = timeStr.split(':')
    if (parseInt(timeFormat[0]) < 10) {
      timeFormat[0] = '0' + timeFormat[0]
    }
    if (parseInt(timeFormat[1]) < 10) {
      timeFormat[1] = '0' + timeFormat[1]
    }
    onValueChange(`${timeFormat[0]}:${timeFormat[1]}`, 'departTime')
    handleChange(`${timeFormat[0]}:${timeFormat[1]}`, 'departTime')
    setDisplayTime(`${timeFormat[0]}:${timeFormat[1]}`)
  }

  const [displayTime, setDisplayTime] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const [values, setValues] = useState({
    departTime: timeStr,
  })

  const handleChange = (value: string, name: string) => {
    setValues((values) => ({ ...values, [name]: value }))
    if (name === 'departTime') {
      setDisplayTime(value)
    }
  }

  const timeButton = (type: string) => {
    let hour = values.departTime.split(':')[0]
    let min = values.departTime.split(':')[1]
    switch (type) {
      case 'houradd':
        hour = (parseInt(hour) + 1).toString()
        if (parseInt(hour) === 24) {
          hour = '0'
        }
        break
      case 'hoursub':
        hour = (parseInt(hour) - 1).toString()
        if (parseInt(hour) === -1) {
          hour = '23'
        }
        break
      case 'minadd':
        min = (parseInt(min) + 1).toString()
        if (parseInt(min) === 60) {
          min = '0'
        }
        break
      case 'minsub':
        min = (parseInt(min) - 1).toString()
        if (parseInt(min) === -1) {
          min = '59'
        }
        break
      default:
    }

    if (hour.length < 2) {
      hour = '0' + hour
    }
    if (min.length < 2) {
      min = '0' + min
    }

    onValueChange(hour.concat(':', min), 'departTime')
    handleChange(hour.concat(':', min), 'departTime')
    setDisplayTime(hour.concat(':', min))
  }

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  return (
    <>
      <Card className='CardTime' onClick={handleShow}>
        <span className='AmPmSpan'>
          {parseInt(displayTime.split(':')[0]) > 11 ? `오후` : `오전`}
        </span>
        <span className='AmPmSpan'>
          {parseInt(displayTime.split(':')[0]) > 12
            ? `${parseInt(displayTime.split(':')[0]) - 12}:${
                displayTime.split(':')[1]
              }`
            : `${displayTime.split(':')[0]}:${displayTime.split(':')[1]}`}
        </span>
      </Card>

      <Button className='NowtimeButton' onClick={nowTimeSet}>
        현재 시간으로 설정
      </Button>
      <Modal centered show={modalShow} onHide={handleClose}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            margin: '1rem 0rem',
          }}
        >
          <Modal.Title style={{ flexGrow: 1, position: 'relative', zIndex: 0 }}>
            시간 설정
          </Modal.Title>
          <FaXmark onClick={handleClose} className='CloseIcon' />
        </div>
        <Modal.Body
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <FaAngleUp
                  className='Arrow'
                  onClick={() => {
                    timeButton('houradd')
                  }}
                />
                <FaAngleUp
                  className='Arrow'
                  onClick={() => {
                    timeButton('minadd')
                  }}
                />
              </div>
              <ValidatedFormControl
                onChange={handleChange}
                value={displayTime}
                name='departTime'
                type='time'
                className='TimeForm'
                required
              />
              <div>
                <FaAngleDown
                  className='UnderArrow'
                  onClick={() => {
                    timeButton('hoursub')
                  }}
                />
                <FaAngleDown
                  className='UnderArrow'
                  onClick={() => {
                    timeButton('minsub')
                  }}
                />
              </div>
            </div>
            <Button
              className='CheckButton'
              onClick={() => {
                onValueChange(values.departTime, 'departTime')
                handleClose()
              }}
            >
              확인
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default TimePickerModal

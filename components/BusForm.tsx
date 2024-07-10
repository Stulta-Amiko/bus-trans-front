import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContext from 'react-bootstrap/cjs/FormContext'
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

  const timeStr = `${hours}:${min}`

  const [values, setValues] = useState({
    departTmn: '',
    arriveTmn: '',
    departTime: timeStr,
  })
  const [submitted, setSubmitted] = useState({})
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    console.log(event)
    event.preventDefault()

    if (event.currentTarget.checkValidity()) {
      setSubmitted(values)
    }

    setValidated(true)
  }

  const handleChange = (value, name) => {
    setValues((values) => ({ ...values, [name]: value }))
  }

  const nowTimeSet = () => {
    setValues((values) => ({
      ...values,
      departTime: timeStr,
    }))
  }

  return (
    <>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group as={Row} className='mb-3' controlId='departTmn'>
          <Form.Label column sm='3'>
            출발터미널
          </Form.Label>
          <Col>
            <ValidatedFormControl
              onChange={handleChange}
              value={values.departTmn}
              name='departTmn'
              type='text'
              required
            />
          </Col>
          <Col>
            <SelectModal />
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
              name='arriveTmn'
              type='text'
              required
            />
          </Col>
          <Col>
            <SelectModal />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' controlId='departMin'>
          <Form.Label column sm='3'>
            출발 시간
          </Form.Label>
          <Col>
            <ValidatedFormControl
              onChange={handleChange}
              value={values.departTime}
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
        <Button variant='primary' type='submit'>
          최적경로 조회
        </Button>
      </Form>
    </>
  )
}

export default BusForm

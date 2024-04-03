import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
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

const BusForm = () => {
  const [values, setValues] = useState({
    departTmn: '',
    arriveTmn: '',
    departHour: '',
    departMin: '',
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
        </Form.Group>
        <Form.Group as={Row} className='mb-3' controlId='departHour'>
          <Form.Label column sm='3'>
            출발시간
          </Form.Label>
          <Col>
            <ValidatedFormControl
              onChange={handleChange}
              value={values.departHour}
              name='departHour'
              type='number'
              required
              min={0}
              max={23}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3' controlId='departMin'>
          <Form.Label column sm='3'>
            출발 분
          </Form.Label>
          <Col>
            <ValidatedFormControl
              onChange={handleChange}
              value={values.departMin}
              name='departMin'
              type='number'
              required
              min={0}
              max={59}
            />
          </Col>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  )
}

export default BusForm

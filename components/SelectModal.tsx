import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'

const EXAMPLE_DATA: string[] = [
  '서울',
  '동서울',
  '남서울',
  '신사',
  '서울고속',
  '동서울',
  '남서울',
  '신사',
  '서울고속',
]

const SelectModal = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        터미널 찾기
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            터미널 이름 검색
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>터미널명</Form.Label>
              <Form.Control
                type='email'
                placeholder='터미널이름을 입력하세요.'
              />
            </Form.Group>
            <Card className='mb-3'>
              {EXAMPLE_DATA.map((item) => (
                <Card.Body className='mb-0'>{item}</Card.Body>
              ))}
            </Card>
            <Button variant='primary' type='submit'>
              검색
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
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

export default SelectModal

// 터미널 리스트를 가져오는 걸 구현해야하는데 어떻게 해야할지?
/*
  첫번째 안 프론트엔드단에 정적인형태로 기록한다음에 거기서 할지?
  두번쨰 안 백엔드단에다가 검색하는 api를 새로만들기? 근데 이건 백엔드로의 부하가 너무 심해지고 굳이 몇개도안되는 터미널리스트를 거기서 가져오는건..

  첫번째 안으로 한다고 해도 csv형태로 기록된 파일을 어떻게? json형태로 변환해서 저장한다음에 불러오던가 해야할듯?
  
  추후 구현사항으로는 
  검색했을때 출발지 결정하면 
  두번째 목적지 검색할떄는 출발지에서 갈수있는곳만 출력할수있도록? 구현해야함 
*/

import { useState } from 'react'
import { terminalName } from '../data/termData'
import { Button, Card, Modal, Form } from 'react-bootstrap'
import { BsGeoAlt } from 'react-icons/bs'
import './SelectModal.css'

// onValueChnage 타입수정
const SelectModal = ({
  onValueChange,
  displayText,
}: {
  onValueChange: (value: string) => void
  displayText: string
}) => {
  const [show, setShow] = useState(false)
  const [fixColor, setColorFix] = useState(false)
  const [searchMode, setSearchMode] = useState(false)
  const [cardSelect, setCardSelect] = useState('')
  const [selectItem, setSelectItem] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [searchArr, setSearchArr] = useState<string[]>([])

  let searchResult: string[] = []

  const clickChange = (event: string) => {
    onValueChange(event)
  }

  const inputValueVali = (inputValue: string) => {
    const regex = /[!@#$%^&*()_+={}|[\]\\';,.<>/?~]/g
    return inputValue.replace(regex, '')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = inputValueVali(event.target.value)
    setSearchValue(inputValue)
    if (inputValue === '') {
      setSearchArr([])
      setSearchMode(false)
    } else {
      setSearchMode(true)
    }
    terminalName.map((item) => {
      let regex = new RegExp(`${inputValue}`)
      if (regex.test(item)) {
        searchResult.push(item)
      }
    })
    searchResult = searchResult.sort()
    setSearchArr([...searchResult])
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Card className='CardSearch' onClick={handleShow}>
        <BsGeoAlt
          style={{
            margin: '1.5rem 1rem',
            fontSize: '30px',
            color: '#0195fa',
          }}
        />
        <div
          style={{
            margin: '1.5rem 0.5rem',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          {displayText}
        </div>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered={true}
      >
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control
                type='text'
                placeholder='터미널이름을 입력하세요.'
                defaultValue={''}
                value={searchValue}
                onChange={handleChange}
                style={{ fontSize: '20px' }}
              />
            </Form.Group>
            <Card className='InsideCard'>
              {searchMode
                ? searchArr.map((item) => (
                    <Card.Body
                      className={
                        selectItem === item ? 'CardItemFixed' : 'CardItem'
                      }
                      onClick={() => {
                        if (!fixColor) {
                          setColorFix(true)
                        } else {
                          setColorFix(false)
                        }
                        if (selectItem === item) {
                          setSelectItem('')
                        } else {
                          setSelectItem(item)
                        }
                      }}
                    >
                      {item}
                    </Card.Body>
                  ))
                : terminalName.map((item) => (
                    <Card.Body
                      className={
                        selectItem === item ? 'CardItemFixed' : 'CardItem'
                      }
                      onClick={() => {
                        if (!fixColor) {
                          setColorFix(true)
                        } else {
                          setColorFix(false)
                        }
                        if (selectItem === item) {
                          setSelectItem('')
                        } else {
                          setSelectItem(item)
                        }
                      }}
                    >
                      {item}
                    </Card.Body>
                  ))}
            </Card>
          </Form>
        </Modal.Body>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '1rem',
            flexDirection: 'column',
          }}
        >
          <Button
            onClick={() => {
              handleClose()
              setCardSelect(selectItem)
              clickChange(selectItem)
            }}
            style={{
              margin: '0.2rem 0rem',
              border: '3px solid',
              borderRadius: '10px',
              backgroundColor: '#0195fa',
              color: '#FFFFFF',
              fontSize: '20px',
              width: '10rem',
            }}
          >
            확인
          </Button>
          <Button
            onClick={handleClose}
            style={{
              margin: '0.2rem 0rem',
              border: '3px solid',
              borderRadius: '10px',
              color: '#FFFFFF',
              backgroundColor: '#999999',
              fontSize: '20px',
              width: '10rem',
            }}
          >
            닫기
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default SelectModal

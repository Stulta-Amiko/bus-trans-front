import { useState } from 'react'
import './SelectModal.css'
import { Button, Card, Modal, Form } from 'react-bootstrap'
import { FaRegFlag, FaFlagCheckered } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { terminalName } from '../data/termData'

// onValueChnage 타입수정
const SelectModal = ({
  onValueChange,
  displayText,
  flagType,
}: {
  onValueChange: (value: string) => void
  displayText: string
  flagType: boolean
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {flagType ? (
            <FaFlagCheckered className='FlagIcon' />
          ) : (
            <FaRegFlag className='FlagIcon' />
          )}
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            {displayText}
          </div>
        </div>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby='contained-modal-title-vcenter'
        centered={true}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            margin: '1rem 0rem',
          }}
        >
          <Modal.Title
            style={{
              flexGrow: 1,
              position: 'relative',
              zIndex: 0,
              fontWeight: '600',
            }}
          >
            터미널 선택
          </Modal.Title>
          <FaXmark onClick={handleClose} className='CloseIcon' />
        </div>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formBasicEmail' className='SearchForm'>
              <Form.Control
                className='SearchCard'
                type='text'
                placeholder='터미널이름을 입력하세요.'
                defaultValue={''}
                value={searchValue}
                onChange={handleChange}
              />
            </Form.Group>
            <Card className='InsideCardDum'>
              <div></div>
            </Card>
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
                      {selectItem === item ? (
                        <Button
                          onClick={() => {
                            handleClose()
                            setCardSelect(selectItem)
                            clickChange(selectItem)
                          }}
                          style={{
                            border: '0',
                            borderRadius: '20px',
                            backgroundColor: '#4747FE',
                            color: '#FFFFFF',
                            fontSize: '15px',
                            width: '4rem',
                            height: '2rem',
                            margin: '0',
                          }}
                        >
                          선택
                        </Button>
                      ) : (
                        <></>
                      )}
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
                      {selectItem === item ? (
                        <Button
                          onClick={() => {
                            handleClose()
                            setCardSelect(selectItem)
                            clickChange(selectItem)
                          }}
                          className='SelectButton'
                        >
                          선택
                        </Button>
                      ) : (
                        <></>
                      )}
                    </Card.Body>
                  ))}
            </Card>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SelectModal

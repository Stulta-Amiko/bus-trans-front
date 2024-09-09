import { useState } from 'react'
import './MadeInfo.css'
import { Button, Card, Modal, Form } from 'react-bootstrap'
import {
  FaXmark,
  FaCircleInfo,
  FaTriangleExclamation,
  FaWrench,
} from 'react-icons/fa6'

// onValueChnage 타입수정
const MadeInfo = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <FaCircleInfo onClick={handleShow} className='Icon' />
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
          <FaXmark onClick={handleClose} className='CloseIcon' />
        </div>
        <Modal.Body>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            <FaCircleInfo style={{ margin: '0rem 0.5rem', color: '#338be8' }} />
            사용방법
          </div>
          <div>- 출발 터미널과 도착 터미널을 선택해주세요</div>
          <div>
            - 시간을 설정해주세요 너무 늦은시간은 조회가 안될 수 있습니다.
          </div>
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            <FaTriangleExclamation
              style={{ margin: '0rem 0.5rem', color: '#ffc400' }}
            />
            주의사항
          </div>
          <div>
            - 시간표 데이터는 공공데이터포털과 구글에서 가져온 정보로
            제공되고있습니다.
          </div>
          <div>
            - 실제 시외/고속버스 운용데이터의 경우 티머니에서 제공을 못받고 있기
            때문에 정보가 정확하지 않다는점 주의바랍니다.
          </div>
          <div>- 항상 참고용으로만 이용해주시기 바랍니다.</div>
          <br />
          <div style={{ color: 'rgba(10,10,10,0.3)' }}>
            <FaWrench style={{ margin: '0rem 0.5rem', color: '#999999' }} />
            제작 <br />
            프론트엔드/데이터수집/api - 공주대학교 정보통신공학과 김희태
            <br />
            프론트엔드/UI/UX - 공주대학교 정보통신공학과 황재섭
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default MadeInfo

import { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const ResultCarousel = (props) => {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  return (
    <>
      {props.items.length === 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card
            style={{
              width: '34rem',
              margin: '2rem 0 2rem',
            }}
            data-bs-theme='light'
          >
            <Card.Body>
              <Card.Text style={{ textAlign: 'center', fontSize: '25px' }}>
                <div>지금시간 이후로는 버스를 조회할 수 없습니다.</div>
                <div>일정을 변경해주세요.</div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <Carousel data-bs-theme='dark'>
          {props.items.map((item) => (
            <Carousel.Item style={{ marginLeft: '0rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  style={{
                    width: '34rem',
                    margin: '2rem 0rem 4rem',
                  }}
                  data-bs-theme='light'
                >
                  <Card.Body>
                    <span style={{ fontSize: '30px', fontWeight: 'bold' }}>
                      {item[0].totalTime > 59
                        ? item[0].totalTime % 60 === 0
                          ? `${Math.floor(item[0].totalTime / 60)}시간`
                          : `${Math.floor(item[0].totalTime / 60)}시간 ${
                              item[0].totalTime % 60
                            }분`
                        : item[0].totalTime}
                    </span>
                    {item[0].transferCount === 0 ? (
                      <span
                        style={{
                          fontSize: '20px',
                          color: '#ff2003',
                          fontWeight: 'bold',
                        }}
                      >
                        {' '}
                        직통
                      </span>
                    ) : (
                      <>
                        <span
                          style={{
                            fontSize: '20px',
                            color: '#03a2ff',
                            fontWeight: 'bold',
                          }}
                        >{` 환승 ${item[0].transferCount}회`}</span>
                        <span
                          style={{ color: '#888888' }}
                        >{`  환승 대기시간 ${item[0].transferTime}분`}</span>
                      </>
                    )}
                    <hr
                      style={{
                        boxShadow: '0 10px 10px -10px #8a8a8a inset',
                        height: '10px',
                        border: '0',
                      }}
                    ></hr>
                    <Card.Text>
                      {item[1].route?.map((routeItem, idx) => (
                        <>
                          <div style={{ margin: '0.3rem 0 0' }}>
                            <span
                              style={{ fontSize: '20px', fontWeight: 'bold' }}
                            >
                              출발: {routeItem.depTmn}
                            </span>
                            <div>
                              {parseInt(routeItem.depHour) > 11
                                ? parseInt(routeItem.depHour) === 12
                                  ? `오후 12시 `
                                  : `오후 ${
                                      parseInt(routeItem.depHour) % 12
                                    }시 `
                                : parseInt(routeItem.depHour) === 0
                                ? `오전 12시 `
                                : `오전 ${routeItem.depHour}시 `}
                              {parseInt(routeItem.depMin) < 10
                                ? parseInt(routeItem.depMin) === 0
                                  ? `정각`
                                  : `0${routeItem.depMin}분`
                                : `${routeItem.depMin}분`}
                            </div>
                          </div>
                          <div style={{ margin: '0 0 0.5rem' }}>
                            <span
                              style={{ fontSize: '20px', fontWeight: 'bold' }}
                            >
                              도착: {routeItem.arrTmn}
                            </span>
                            <div>
                              {parseInt(routeItem.arrHour) > 11
                                ? parseInt(routeItem.arrHour) === 12
                                  ? `오후 12시 `
                                  : `오후 ${
                                      parseInt(routeItem.arrHour) % 12
                                    }시 `
                                : parseInt(routeItem.arrHour) === 0
                                ? `오전 12시 `
                                : `오전 ${routeItem.arrHour}시 `}
                              {parseInt(routeItem.arrMin) < 10
                                ? parseInt(routeItem.arrMin) === 0
                                  ? `정각`
                                  : `0${routeItem.arrMin}분`
                                : `${routeItem.arrMin}분`}
                            </div>
                          </div>
                          {idx === item[1].route.length - 1 ? (
                            <></>
                          ) : (
                            <hr
                              style={{
                                border: '0',
                                borderBottom: '2px dashed #eee',
                                background: '#999',
                              }}
                            ></hr>
                          )}
                        </>
                      ))}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  )
}

export default ResultCarousel

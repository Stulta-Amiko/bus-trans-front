import React, { useState } from 'react'
import { useRouter } from 'next/router'

const getBus: React.FC = () => {
  const [departTmn, setDepartTmn] = useState('')
  const [arriveTmn, setArriveTmn] = useState('')
  const [departTime, setDepartTime] = useState('')
  return (
    <div>
      <label>
        출발터미널
        <input
          value={departTmn}
          onChange={(e) => setDepartTmn(e.target.value)}
        />
      </label>
      <p></p>
      <label>
        도착터미널
        <input
          value={arriveTmn}
          onChange={(e) => setArriveTmn(e.target.value)}
        />
      </label>
      <p></p>
      <label>
        출발시간
        <input
          value={departTime}
          onChange={(e) => setDepartTime(e.target.value)}
        />
      </label>
      <p>
        <button type='button'>검색하기</button>
      </p>
    </div>
  )
}

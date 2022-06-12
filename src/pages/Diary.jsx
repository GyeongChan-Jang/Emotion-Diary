import React from 'react'
import { useParams } from 'react-router-dom'
// useParams는 일종의 custom hook
function Diary() {
  const { id } = useParams()
  console.log(id)

  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 상세페이지 입니다.</p>
    </div>
  )
}

export default Diary

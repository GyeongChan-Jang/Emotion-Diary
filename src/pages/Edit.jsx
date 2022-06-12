import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

function Edit() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const id = searchParams.get('id')
  console.log('id: ', id)

  const mode = searchParams.get('mode')
  console.log('mode: ', mode)

  return (
    <div>
      <h1>Edit</h1>
      <p>이것은 편집 페이지입니다.</p>
      <button onClick={() => setSearchParams({ who: 'GyeongChan' })}>QS 바꾸기</button>
      <button
        onClick={() => {
          navigate('/')
        }}
      >
        Go to Home
      </button>
      <button
        onClick={() => {
          navigate(-1)
        }}
      >
        뒤로가기
      </button>
    </div>
  )
}

export default Edit

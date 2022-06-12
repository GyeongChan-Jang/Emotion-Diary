import './App.css'
import React, { useReducer, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'

// COMPONENTS
import MyButton from './components/MyButton'
import MyHeader from './components/MyHeader'

// public 폴더 위치를 가리킴
// const env = process.env
// env.PUBLIC_URL = env.PUBLIC_URL || ''

const reducer = (state, action) => {
  let newState = []
  switch (action.type) {
    case 'INIT': {
      return action.data
    }
    case 'CREATE': {
      newState = [action.data, ...state]
      break
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId)
      break
    }
    case 'EDIT': {
      newState = state.map((it) =>
        it.id === action.data.id ? action.data : it
      )
      break
    }
    default:
      return state
  }
  return newState
}

export const DiaryStateContext = React.createContext()
export const DiaryDispatchContext = React.createContext()

const dummyData = [
  {
    id: 1,
    emotion: 1,
    contnet: '오늘의 일기 1번',
    date: 1654763428726
  },
  {
    id: 2,
    emotion: 2,
    content: '오늘의 일기 2번',
    date: 1654763428727
  },
  {
    id: 3,
    emotion: 4,
    content: '오늘의 일기 3번',
    date: 1654763428728
  },
  {
    id: 4,
    emotion: 2,
    content: '오늘의 일기 4번',
    date: 1654763428729
  },
  {
    id: 5,
    emotion: 3,
    content: '오늘의 일기 5번',
    date: 1654763428730
  },
  {
    id: 6,
    emotion: 5,
    contnet: '오늘의 일기 6번',
    date: 1754763428730
  }
]

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData)

  // CREATE
  const dataId = useRef(0)

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
    dataId.current += 1
  }
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: 'REMOVE',
      targetId
    })
  }

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={(onCreate, onRemove, onEdit)}>
        <BrowserRouter>
          <div className="App">
            {/* Routes 안에 있는 요소들만 변화함! */}
            <Routes>
              {/* Route 컴포넌트는 path 경로에 매핑되는 컴포넌트를 보여줌 */}
              <Route path="/" element={<Home />} />
              {/* 경로가 인덱스(/)일 때(아무것도 없는 경로) */}
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/diary" element={<Diary />} />
            </Routes>

            {/* 페이지를 이동시키는 요소 -> a 태그로 이동시키는 것은 MPA 방식*/}
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  )
}
export default App

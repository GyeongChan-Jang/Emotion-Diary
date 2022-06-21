import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'
import MyButton from './MyButton'

const optionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된순' }
]

const filterOptionList = [
  { value: 'all', name: '전부 다' },
  { value: 'bad', name: '안좋은 감정만' },
  { value: 'good', name: '좋은 감정' }
]

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  )
}

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate()
  const [sortType, setSortType] = useState('latest')
  const [filter, setFilter] = useState('all')

  const getProcessDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === 'good') {
        return parseInt(item.emotion) <= 3
      } else {
        return parseInt(item.emotion) > 3
      }
    }

    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date)
      } else {
        return parseInt(a.date) - parseInt(b.date)
      }
    }

    const copyList = JSON.parse(JSON.stringify(diaryList))

    const filteredList = filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it))

    const sortedList = filteredList.sort(compare)
    return sortedList
  }
  console.log(diaryList)
  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu value={sortType} onChange={setSortType} optionList={optionList} />
          <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
        </div>
        <div className="right_col">
          <MyButton type={'positive'} text={'새 일기 쓰기'} onClick={() => navigate('/new')} />
        </div>
      </div>
      {getProcessDiaryList().map((it) => (
        <div key={it.id}>
          {it.content} {it.emotion}
        </div>
      ))}
    </div>
  )

  // diaryList가 프롭으로 제대로 전달이 안될 경우 DEfault props 지정
  // 왜 재대로 전달이 안되는거지?
}

DiaryList.defaultProps = {
  diaryList: []
}

export default DiaryList

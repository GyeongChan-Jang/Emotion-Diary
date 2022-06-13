import React, { useState } from 'react'
import uuid from 'react-uuid'

const optionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된순' }
]

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <div>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {optionList.map((it, idx) => (
          <option key={idx} value={it.value}>
            {it.name}
          </option>
        ))}
      </select>
    </div>
  )
}

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState('latest')

  const getProcessDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date)
      } else {
        return parseInt(a.date) - parseInt(b.date)
      }
    }

    const copyList = JSON.parse(JSON.stringify(diaryList))
    const sortedList = copyList.sort(compare)
    return sortedList
  }

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={optionList}
      />
      {getProcessDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
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

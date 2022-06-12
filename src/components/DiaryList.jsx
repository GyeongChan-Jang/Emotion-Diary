import React from 'react'
import uuid from 'react-uuid'

const optionList = []

const ControlMenu = (value, onChange, optionList) => {
  return (
    <div>
      <select name="" id="">
        <option value=""></option>
      </select>
    </div>
  )
}

const DiaryList = ({ diaryList }) => {
  console.log(diaryList)
  return (
    <div>
      <ControlMenu />
      {diaryList.map((it) => (
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

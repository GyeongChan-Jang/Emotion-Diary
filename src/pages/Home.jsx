import React, { useState, useContext, useEffect } from 'react'
import { DiaryStateContext } from '../App'
import MyButton from '../components/MyButton'
import MyHeader from '../components/MyHeader'
import DiaryList from '../components/DiaryList'

function Home() {
  const diaryList = useContext(DiaryStateContext)

  const [data, setData] = useState()
  const [curDate, setCurDate] = useState(new Date())
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

  // 헤드에 나타나는 월에 맞는 데이터 필터링
  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime()

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime()

      setData(
        diaryList.filter((it) => firstDay <= it.date && lastDay > it.date)
      )
    }
  }, [diaryList, curDate])

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    )
  }
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    )
  }
  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
        rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  )
}

export default Home

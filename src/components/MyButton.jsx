import React from 'react'

function MyButton({ text, type, onClick }) {
  const btnType = ['positive', 'negative'].includes(type) ? type : 'default'

  return (
    <button
      className={['MyButton', `MyButton_${btnType}`].join(' ')}
      onClick={onClick}
      type={'btnType'}
    >
      {text}
    </button>
  )
}

export default MyButton

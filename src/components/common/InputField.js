import React from 'react'

const InputField = ({
  nameValue,
  idValue,
  typeValue,
  refInputValue,
  inputvalue,
  changeHandler,
  cls,
}) => {
  return (
    <div className={`input-field ${cls}`}>
      <label className='active' htmlFor={idValue}>
        {nameValue}
      </label>
      <input
        type={typeValue}
        id={idValue}
        ref={refInputValue}
        className='validate'
        value={inputvalue}
        onChange={changeHandler}
      />
    </div>
  )
}

export default InputField

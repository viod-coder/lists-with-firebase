import React, { useState } from 'react'

const SingleTour = ({ id, image, name, info, price, handleDelete }) => {
  const [readmore, SetReadmore] = useState(false)
  return (
    <article>
      <img src={image} alt={name} />
      <div className='details'>
        <div className='header'>
          <h4>{name}</h4>
          <h4 className='price'>${price}</h4>
        </div>
        <div>
          <p className='info'>
            {readmore ? info : info.substring(0, 200)}.....
            <button className='more' onClick={() => SetReadmore(!readmore)}>
              {!readmore ? 'Read more' : 'Read less'}
            </button>
          </p>
        </div>
        <button className='decline' onClick={handleDelete.bind(this, id)}>
          Not interested
        </button>
      </div>
    </article>
  )
}

export default SingleTour

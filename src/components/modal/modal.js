import React from 'react'
import './modal.css'

const Modal = () => {
  return (
    <>
      <div className='mymodal'>
        <div className='header'>
          <span>Title Modal</span>
          {/* <button className='modal-btn'>x</button> */}
          <div className='modal-btn'>
            <i class='material-icons '>clear</i>
          </div>
        </div>
        <div className='body'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          maiores repellendus dolorem impedit corporis blanditiis, aspernatur
          voluptates animi laudantium explicabo aperiam dolores tempora libero
          totam quia temporibus exercitationem ipsam delectus?
        </div>
      </div>
      <div className='overlay'></div>
    </>
  )
}

export default Modal

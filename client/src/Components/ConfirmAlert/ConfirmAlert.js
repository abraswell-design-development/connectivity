import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import './ConfirmAlert.css'



function addDialog({ onClose }){

  const handleClickedNo = () => {
    alert('clicked no')
    onClose()
  }
  const handleClickedYes = () => {
    alert('clicked yes')
    onClose()
  }


  return (
    <div className='add-dialog'>
      <h3>Add item to display</h3>
      <p>Are your sure?</p>
      <div className="add-dialog-buttons">
        <button onClick={handleClickedNo}>No</button>
        <button onClick={handleClickedYes}>Yes, add item</button>
      </div>
    </div>
  )

}      

confirmAlert({ customUI: addDialog })
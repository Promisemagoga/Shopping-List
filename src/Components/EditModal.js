import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import { db } from '../Config/Firebase';

function EditModal({ open, onClose, upItem }) {
  const [updatedData, setUpdatedData] = useState({
    item: "",
    price: "",
    quantity: "",
  })


  useEffect(() => {
console.log(upItem);
setUpdatedData({
        item: upItem.item,
        price: upItem.price,
        quantity: upItem.quantity,
      })

  }, []);

 

  function handleChange(event) {
    setUpdatedData({
      ...updatedData,
      [event.target.name]: event.target.value,
    })
  }

  const updateFunc = (async () => {
    const docRef = doc(db, "items", upItem.id);
    await updateDoc(docRef, updatedData)
      .then(() => {
        console.log('Data successfully updated!');
      })
      .catch((error) => {
        console.error('Error updating data: ', error);
      });

  })

  if (!open) return null

  return (
    <div className='modal'>
      <FaRegTimesCircle className='closeModal' onClick={onClose} />
      <div className='form '>

        <input type="text" name='item' placeholder='Enter item' onChange={handleChange} />
        <input type="number" name='quantity' placeholder='quantity' onChange={handleChange} />
        <input type="number" name='price' placeholder='Enter estimated price' onChange={handleChange} />
        <button onClick={updateFunc}>Save Changes</button>
      </div>

    </div>
  )
}

export default EditModal
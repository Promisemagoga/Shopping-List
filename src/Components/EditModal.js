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
    // fetchData()
  }, []);

  // const getItem = async () => {
  //   try {
  //     const querrySnapShot = await getDocs(collection(db, "items"));
  //     const data = querrySnapShot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setUpdatedData({
  //       itemId: data.id,
  //       item: data.item,
  //       price: data.price,
  //       quantity: data.quantity
  //     }

  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  //  const fetchData = async () => {
  //   const docRef = doc(db, "items", itemId);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     const document = {
  //       id: docSnap.id, ...docSnap.data()
  //     }
  //     setUpdatedData({
  //       item: document.item,
  //       price: document.price,
  //       quantity: document.quantity,
  //     })
  //     console.log(document);
  //   } else {
  //     console.log("No such document!");
  //   }
  // }

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
import React, { useState } from 'react'
import NavBar from './NavBar'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../Config/Firebase'
import { addItem } from '../Redux/Firestore'
import { useDispatch, useSelector } from 'react-redux'

function AddForm() {
    const [item, setItem] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const dispatch = useDispatch()

    const addItems = async () => {
        try {
            const docRef = await addDoc(collection(db, "items"), {item,quantity,price})
            dispatch(addItem({
                item: item,
                quantity: quantity,
                price: price
            }))
    
            alert("Item added successfully")
        }
        catch (error) {
            console.log(error);
        }
      
        
    }
    // const addItems = async() =>{
    //     dispatch(addItem({
    //         item: item,
    //         quantity: quantity,
    //         price: price
    //     }))
    // try {
    //     const docRef = await addDoc(collection(db, "items"),{
    //         item,
    //         quantity,
    //         price
    //     });
    //     alert("Added Successfully")
    // } catch (error) {
    //     console.log(error);
    //     alert("something went wrong")
    // }
//}
return (
    <div>
        <NavBar />
        <div className='form'>
            <input type="text" name='item' placeholder='Enter item' onChange={(event) => setItem(event.target.value)} />
            <input type="number" name='quantity' placeholder='quantity' onChange={(event) => setQuantity(event.target.value)} />
            <input type="number" name='price' placeholder='Enter estimated price' onChange={(event) => setPrice(event.target.value)} />
            <button onClick={addItems}>Add To List</button>
        </div>

    </div>
)
}

export default AddForm
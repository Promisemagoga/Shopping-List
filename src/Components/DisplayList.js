import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { FaArrowCircleRight, FaEdit, FaTrash } from "react-icons/fa";
import EditModal from './EditModal';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../Config/Firebase';

function DisplayList() {

    const [openModal, setOpenModal] = useState(false)
    const [item, setItem] = useState([])
    const [upItem, setUpItem] = useState("")
    const getItem = async () => {
        try {
            const querrySnapShot = await getDocs(collection(db, "items"));
            const data = querrySnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setItem(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getItem();
    }, []);


    const deleteFun = async (event, id) => {
        console.log(id);
        const docRef = doc(db, "items", id);
        deleteDoc(docRef)
            .then(() => {
                console.log('Document successfully deleted!');
            })
            .catch((error) => {
                console.error('Error removing document: ', error);
            })
    }

    function update(uItem) {
        setUpItem(uItem)
        setOpenModal(true);
    }


    return (
        <div>
            <NavBar />
            <div className='displayMainCard'>
                <h2>My List</h2>
                {item.map((data, index) => (
                    <div className='displayCard' key={index}>
                        <div className='itemDetails'>
                            <h3>{data.item}</h3>
                            <h3>R{data.price}</h3>
                            <h3>Qty:{data.quantity}</h3>
                        </div>
                        <div className='crudButtons'>
                            < FaTrash onClick={(event) => deleteFun(event, data.id)} />
                            <FaEdit onClick={(event) => update(data)} />
                        </div>
                    </div>
                ))}
                <h1 style={{ float: "right" }}>Total: R109</h1>
            </div>
            {upItem !== "" ? <EditModal open={openModal} onClose={() => setOpenModal(false)} upItem={upItem} /> : null}
        </div>
    )
}

export default DisplayList
import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/Firebase";

 const updateSlice = createSlice({
    name: "db",
    initialState: [{
        item: "",
        quantity: "",
        price: ""
    }],

    reducers: {
        updateItem:  (state, action,{upItem}) => {
            try {
                const docRef =  updateDoc(collection(db, "items",upItem.id), action.payload)
                alert("Item added successfully")
            }
            catch (error) {
                console.log(error);
            }

        
    }
    }
})

export const { updateItem } = updateSlice.actions;

export default updateSlice.reducer
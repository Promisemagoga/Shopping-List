import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Config/Firebase";

 const firestoreSlice = createSlice({
    name: "db",
    initialState: [{
        item: "",
        quantity: "",
        price: ""
    }],

    reducers: {
        addItem: async (state, action) => {

            try {
                const docRef = await addDoc(collection(db, "items"), action.payload)
                alert("Item added successfully")
            }
            catch (error) {
                console.log(error);
            }

        }
    }
})

export const { addItem } = firestoreSlice.actions;

export default firestoreSlice.reducer
import { configureStore } from "@reduxjs/toolkit";
import  firestoreSlice from "../Redux/Firestore";
export const store = configureStore({
   reducer:{
      firestore: firestoreSlice
   } 
})
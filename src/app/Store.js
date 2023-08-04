import { configureStore } from "@reduxjs/toolkit";
import  firestoreSlice from "../Redux/Firestore";
import dataSlice from "../Redux/data";
import updateSlice from "../Redux/update"
export const store = configureStore({
   reducer:{
      firestore: firestoreSlice,
      items : dataSlice,
      update: updateSlice
   } 
})
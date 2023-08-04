import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../Config/Firebase";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    error: null,
    items: []
}
const dataSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        fetchDataStart(state) {
            state.loading = true;
            state.error = null;

        },
        fetchDataSuccess(state, action) {
            state.loading = false;
            state.items = action.payload
        },
        fetchDataFailure(state, action) {
            state.loading = false;
            state.error = action.payload
        },
        deleteData : (state, action) =>{
            const index = state.data.findIndex((item) =>item.id === action.payload);
            if( index !== -1){
                state.data.splice(index, 1)
            }
        },


    }
});



export const fetchData =()=> async (dispatch) =>{
    dispatch(fetchDataStart())

    try {
        const querrySnapShot = await getDocs(collection(db, "items"))
        const data = querrySnapShot.docs.map((doc) =>({
            id: doc.id,
            ...doc.data()
        }))
        dispatch(fetchDataSuccess(data))
       console.log(data);
    } catch (error) {
        dispatch(fetchDataFailure(error))
    }
}

export const deleteItem = (id) => async(dispatch) =>{
    try {
      await deleteDoc(doc(db, "items",id ))  ;
      dispatch(deleteData(id))
      alert("Item deleted successfully")
    } catch (error) {
        console.log(error);
    }
}



export const {fetchDataStart,fetchDataFailure,fetchDataSuccess,deleteData} = dataSlice.actions;
export default dataSlice.reducer
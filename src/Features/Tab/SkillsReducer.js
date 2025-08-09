import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    id:null || localStorage.getItem('id')
}


const skillsSlice = createSlice({
    name:'skills',
    initialState,
    reducers:{
        setId:(state,action)=>{
            state.id = action.payload
            localStorage.setItem('id',action.payload)
        },

        removeId:(state)=>{
            state.id = null
            localStorage.removeItem('id')
        }
    }

})

export const {setId,removeId} = skillsSlice.actions
export default skillsSlice.reducer

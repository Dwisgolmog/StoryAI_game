import { configureStore, createSlice } from '@reduxjs/toolkit'

let isLogin = createSlice({
    name: 'isLogin',
    initialState : false,
    reducers :{
        changeLoginState(state,action){
            return action.payload
        }
    }
})

export let {changeLoginState} = isLogin.actions

export default configureStore({
  reducer: { 
    isLogin : isLogin.reducer
  }
})
import { configureStore } from '@reduxjs/toolkit'
import parkReducer from '../features/park/parkSlice'
import globalReducer from '../features/global/globalSlice'

const store = configureStore({
  reducer: {
    park: parkReducer,
    global: globalReducer
  }
})

export default store;
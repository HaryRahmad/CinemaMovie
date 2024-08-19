import { configureStore } from '@reduxjs/toolkit'
import movies from './movieSlice'

const store = configureStore({
    reducer :{
        movies,
    }
})

export default store
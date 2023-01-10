import {configureStore} from '@reduxjs/toolkit'

import userReducer from '../redux/reducer/userReducer'

export default configureStore({
    reducer:{
        user:userReducer,
    }
})
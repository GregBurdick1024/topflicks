import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/loginService'
import userService from '../services/userService'

const userSlice = createSlice({
    name: 'user',
initialState: {},
    reducers: {
        setFavourites(state, action){
            state.favourites = action.payload
        },
        setUser(state, action){
            state.details = action.payload
        }
    }
})

export const getUser = (values) => {
    return async dispatch => {
        const user = await loginService.login(values)
        dispatch(setUser(user))
        window.localStorage.setItem(
			'loggedAppUser', JSON.stringify(user)
			)
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(setUser())
    }
}

export const initialiseFavourites = (data) => {
    return async dispatch => {
        const favs = await userService.getFavourites(data)
        dispatch(setFavourites(favs))
    }
}

export const addFavourite = (id) => {
    return async dispatch => {
        const newFavs = await userService.addFavourite(id)
        dispatch(setFavourites(newFavs))
    }
}

export const { setFavourites, setUser } = userSlice.actions

export default userSlice.reducer
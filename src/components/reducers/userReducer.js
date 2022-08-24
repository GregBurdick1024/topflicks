import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/loginService'
import userService from '../services/userService'
import filmService from '../services/filmService'

const userSlice = createSlice({
    name: 'user',
initialState: {},
    reducers: {
        setFavourites(state, action){
            if(action.payload.length){
                state.favourites = action.payload.sort((a,b) => a.id - b.id)
            } else {
                state.favourites = null
            }
        },
        addFavourite(state, action){
            state.favourites ? state.favourites.push(action.payload) : state.favourites = [action.payload]
        },
        updateFavourite(state, action){
            state.favourites = state.favourites.map((fav) => fav.id === action.payload.id ? action.payload : fav)
        },
        setUser(state, action){
            state.details = action.payload
        }
    }
})

export const login = (values) => {
    return async dispatch => {
        const user = await loginService.login(values)
        dispatch(setUser(user))
        window.localStorage.setItem(
			'loggedAppUser', JSON.stringify(user)
			)
        userService.setToken(user.token)
    }
}

export const initialiseUser = (user) => {
    return async dispatch => {
        userService.setToken(user.token)
        const favs = await userService.getFavourites(user.id)
        dispatch(setFavourites(favs))
        dispatch(setUser(user))
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(setUser())
    }
}

export const deleteFavourite = (filmId, userId) => {
    return async dispatch => {
        await userService.removeFavourite(filmId)
        const favs = await userService.getFavourites(userId)
        dispatch(setFavourites(favs))
    }
}


export const postFavourite = (filmObj, id) => {
    return async dispatch => {
        const newFav = await userService.postFavourite(filmObj, id)
        dispatch(addFavourite(newFav))
    }
}

export const setRating = (id, rating) => {
    return async dispatch => {
        const newRating = await userService.putRating(id, rating)
        dispatch(updateFavourite(newRating))
    }
}

export const setWatched = (id) => {
    return async dispatch => {
        const newWatched = await userService.setWatched(id)
        dispatch(updateFavourite(newWatched))
    }
}

export const findAndPostFavourite = (id, userId) => {
    return async dispatch => {
        const f = await filmService.getFilm(id)
        dispatch(postFavourite({
            film_id: f.id,
                poster_path: f.poster_path,
                title: f.title,
                release_date: f.release_date,
                tagline: f.tagline,
                overview: f.overview,
                genres: f.genres,
                vote_average: f.vote_average,
                vote_count: f.vote_count,
                budget: f.budget,
                backdrop_path: f.backdrop_path
          }, userId))
    }
}

export const { setFavourites, setUser, addFavourite, addRating, updateFavourite } = userSlice.actions

export default userSlice.reducer


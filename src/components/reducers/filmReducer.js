import { createSlice } from '@reduxjs/toolkit'
import filmService from '../services/filmService'

const filmSlice = createSlice({
    name: 'films',
initialState: {},
    reducers: {
        setPopular(state, action){
            state.popular = action.payload
        },
        setUpcoming(state, action){
            state.upcoming = action.payload
        },
        setTopRated(state, action){
            state.topRated = action.payload
        },
        setFilm(state, action){
            state.data = action.payload
        },
        setDirector(state, action){
            state.data = {...state.data, director: action.payload}
        }


    }
})


export const initializeDirector = (id) => {
    return async dispatch => {
        const data = await filmService.getCredits(id)
        const director = data.crew.find(c => c.job === 'Director')
       dispatch(setDirector(director.name))
    }
}

export const clearFilm = () => {
    return dispatch => {
        dispatch(setFilm())
    }
}

export const initializeFilm = (id) => {
    return async dispatch => {
        const f = await filmService.getFilm(id)
        
        dispatch(setFilm({
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

          }))
    }
}

export const initializeUpcoming = () => {
    return async dispatch => {
        const data = await filmService.getUpcoming()
        dispatch(setUpcoming(data.results))
    }
}
export const initializePopular = () => {
    return async dispatch => {
        const data = await filmService.getPopular()
        dispatch(setPopular(data.results))
    }
}

export const { setPopular, setUpcoming, setTopRated, setFilm, setDirector } = filmSlice.actions

export default filmSlice.reducer
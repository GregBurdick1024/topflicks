import axios from 'axios'

const baseUrl = 'http://localhost:3010/api/films'


const getTopRated = async () => {
    const res = await axios.get(`${baseUrl}/toprated`)
    return res.data
}

const getPopular = async () => {
    const res = await axios.get(`${baseUrl}/popular`)
    return res.data
}

const getUpcoming = async () => {
    const res = await axios.get(`${baseUrl}/upcoming`)
    return res.data
}

const getNowPlaying = async () => {
    const res = await axios.get(`${baseUrl}/nowplaying`)
    return res.data
}

const searchFilm = async (search) => {
    const film = { search: search }
    const res = await axios.post(`${baseUrl}/search`, film)
    return res.data
}

const getFilm = async (id) => {
    const res = await axios.get(`${baseUrl}/film/${id}`)
    return res.data
}

const getCredits = async (id) => {
    const res = await axios.get(`${baseUrl}/credits/${id}`)
    return res.data
}


export default {
    getTopRated,
    getPopular,
    getUpcoming,
    getNowPlaying,
    searchFilm,
    getFilm,
    getCredits
}
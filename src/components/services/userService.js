import axios from 'axios'
const baseUrl = 'http://localhost:3010/api/users'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getFavorites = async (data) => {
	const config =
	{
		headers: { Authorization: token },
	}

	const id = data.id
	const username = data.username
	const res = await axios.get(`${baseUrl}/favourites/${id}${username}`, config)
	return res.data
}

// const getTopLists = async (details) => {
//   const config =
//   {
//     headers: { Authorization: token }
//   }

//   const id = details.id
//   const username = details.username
//   const res = await axios.get(`${baseUrl}/toplists/${id}${username}`, config)
//   return res.data
// }

const addFavorite = async (id, director) => {
  const config =
  {
    headers: { Authorization: token },
  }

  const filmObj =
  {
    md_id: id,
	director: director.name,
	watched: false
  }
  const res = await axios.post(`${baseUrl}/favorites`, filmObj, config)
  return res.data
}

const removeFavorite = async (id) => {
  const config =
  {
    headers: { Authorization: token },
  }

  const res = await axios.delete(`${baseUrl}/favorites/${id}`, config)
}

const rateFilm = async (id) => {
  const config =
  {
    headers: { Authorization: token },
  }
  const res = await axios.post(`${baseUrl}/favorites/update`, config)
}

// const addTopList = async (details) => {
//   const config =
//   {
//     headers: { Authorization: token },
//   }
//   const res = await axios.post(`${baseUrl}/toplists/`, config)
// }

// const removeTopList = async (id) => {
//   const config =
//   {
//     headers: { Authorization: token },
//   }
//   const res = await axios.delete(`${baseUrl}/toplists/`, config)
// }

// export default {
//   getFavorites,
//   addFavorite,
//   removeFavorite,
//   rateFilm,
//   getTopLists,
//   addTopList,
//   removeTopList,
//   setToken
// }

export default {
	getFavorites,
	setToken,
	addFavorite,
	removeFavorite,
	rateFilm
}
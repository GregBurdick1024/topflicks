import axios from 'axios'
const baseUrl = 'http://localhost:3010/api/user'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getFavourites = async (id) => {
	const config =
	{
		headers: { Authorization: token },
	}
	const res = await axios.get(`${baseUrl}/favourites/${id}`, config)
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

const postFavourite = async (film, user) => {
  const config =
  {
    headers: { Authorization: token },
  }

  const filmObj =
  {
    ...film,
	  watched: false,
    
  }
  const res = await axios.post(`${baseUrl}/favourites/${user}`, filmObj, config)
  return res.data
}

const removeFavourite = async (id) => {
  const config =
  {
    headers: { Authorization: token },
  }
  
  const res = await axios.delete(`${baseUrl}/favourites/${id}`, config)
  return res.data
}

const putRating = async (id, rating) => {
  const config =
  {
    headers: { Authorization: token },
  }

  const res = await axios.post(`${baseUrl}/update/rating`, {id, rating}, config)
  return res.data
}
const setWatched = async (id) => {
  const config =
  {
    headers: { Authorization: token },
  }
  const res = await axios.post(`${baseUrl}/update/watched`, {id}, config)
  return res.data
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
	getFavourites,
	setToken,
	postFavourite,
	removeFavourite,
	putRating,
  setWatched
}
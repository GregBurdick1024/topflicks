import axios from 'axios';

//developement url
//const baseUrl = "http://localhost:3010/api/login"

//prod url
const baseUrl = '/api/login';

const login = async (user) => {
	const res = await axios.post(`${baseUrl}`, user);
	return res.data;
};

export default { login };

import axios from 'axios';
import User from '@/models/User';

const BASE_URL = 'http://localhost:3000'; // NodeJs File Upload Base Url

export default {

	create(user: User){
		return axios.post(`${BASE_URL}/users`, user);
	},

	update(user: User){
		return axios.put(`${BASE_URL}/users`, user)
	},

	getUsers(){
		return axios.get(`${BASE_URL}/users`)
	},

	delete(userId: string){
		return axios.delete(`${BASE_URL}/users/${userId}`)
	}
};
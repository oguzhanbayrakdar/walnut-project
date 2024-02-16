import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // NodeJs File Upload Base Url

export default {
	uploadFile(file: any) {
		const formData = new FormData();
		formData.append('file', file);
		return axios.post(`${BASE_URL}/file/upload`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	},

	getFiles(){
		return axios.get(`${BASE_URL}/file/`);
	}
};

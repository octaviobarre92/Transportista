import axios from "axios"
//apply base url for axios
const API_URL = ""
// headers: {
//   "Content-Type": "application/json",
//   'Cache-Control': 'no-cache',
//   'Pragma': 'no-cache',
//   'Expires': '0',
// },
const axiosApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    },
})


export default class ApiService {
    async get(url, config = {}) {
        return await axiosApi
            .get(url, { ...config })
            .then(response => response.data)
    }
    async getSinData(url, config = {}) {
        return await axiosApi
            .get(url, { ...config })
            .then(response => response)
    }

    async post(url, data, config = {}) {
        return axiosApi
            .post(url, { ...data }, { ...config })
            .then(response => response.data)
    }

    async put(url, data, config = {}) {
        return axiosApi
            .put(url, { ...data }, { ...config })
            .then(response => response.data)
    }

    async del(url, data, config = {}) {
        return await axiosApi
            .delete(url, { data: data }, { ...config })
            .then(response => {
                return response
            })
    }
}




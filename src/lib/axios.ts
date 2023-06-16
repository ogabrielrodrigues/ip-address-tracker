import { Axios } from 'axios'

const api = new Axios({
  baseURL: 'https://geo.ipify.org/api/v2'
})

export { api }

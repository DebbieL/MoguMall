import axios from 'axios'

export function request(config, success, failure) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000',
    timeout: 50000
  })

  instance.interceptors.response.use(res => {
    // console.log(res);
    return res
  }, err => {
    // console.log(err);
  })

  return instance(config)
}


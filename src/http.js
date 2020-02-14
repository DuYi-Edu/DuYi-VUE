import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081/';

axios.interceptors.request.use(request => {
  request.url += '.json';
  return request;
})

axios.interceptors.response.use(response => {
  if(response.status === 200) {
    return response.data.data;
  }

  return response;
})

export default axios;
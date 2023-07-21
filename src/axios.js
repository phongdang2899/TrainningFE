import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // axios.defaults.headers.common['X-CSRF-TOKEN'] = "22|O3cuT1k8ZlslCsMJLKli5EBQGoxb0C3hpBKcEm94";
    config.headers = {
      authorization: `Bearer 43|04duXMuQyX5v1Yb2ebvKbkrfENnFNKaZQAWHyDO5`,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response.data;
  }
);

export default instance;
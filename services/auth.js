import { Message } from 'element-ui'
export default function ({ $axios, store }, inject) {
  // Create a custom axios instance
  const authApi = $axios.create({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
        store.state.auth.data != null ? store.state.auth.data.token : '',
    },
  })
  //   const baseURL =
  //     process.env.NODE_ENV === 'development'
  //       ? 'https://5f09ce0c5e512a00161c1183.mockapi.io/api/v1'
  //       : process.env.API_URL
  //   authApi.setBaseURL(baseURL)
  // Interceptors
  authApi.onRequest((config) => {
    if (process.env.NODE_ENV === 'development') {
      Message('DevOnly | Auth fetch successfully')
    }
  })
  authApi.onError((error) => {
    Message(error.response.message)
  })
  // Adds header: `Authorization: Bearer 123` to all requests
  //   $axios.setToken('123', 'Bearer')
  // Adds header: `Authorization: Bearer 123` to only post and delete requests
  //   $axios.setToken('123', 'Bearer', ['post', 'delete'])
  // Inject to context as $authApi
  inject('authApi', authApi)
}

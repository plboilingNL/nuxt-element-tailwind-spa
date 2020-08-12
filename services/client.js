import { Message } from 'element-ui'
export default function ({ $axios, app }, inject) {
  // Create a custom axios instance
  const clientApi = $axios.create({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  // const baseURL =
  //   process.env.NODE_ENV === 'development'
  //     ? 'https://5f09ce0c5e512a00161c1183.mockapi.io/api/v1'
  //     : process.env.API_URL

  // clientApi.setBaseURL(baseURL)
  // Interceptors
  clientApi.onRequest((config) => {
    if (process.env.NODE_ENV === 'development') {
      Message('DevOnly | Client fetch successfully')
    }
  })
  clientApi.onError((error) => {
    Message(error.response.message)
  })

  // Inject to context as $clientApi
  inject('clientApi', clientApi)
}

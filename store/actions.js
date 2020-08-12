import { rootMutations, authMutations } from '~/constants/vuex'
// const queryString = require('query-string')
export default {
  // Called manually in middleware in SPA mode
  async nuxtServerInit({ commit }) {
    let auth = null
    const authString = await localStorage.getItem('auth')
    auth = await JSON.parse(authString)
    commit(authMutations.SET.AUTH, auth)
    commit(rootMutations.SET.SERVER_STATE, true) // Server is ready
  },
}

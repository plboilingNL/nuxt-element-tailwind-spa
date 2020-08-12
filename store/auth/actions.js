import { authMutations } from '~/constants/vuex'
export default {
  async login({ commit }, form) {
    console.log(form)
    const auth = {
      currentUser: {
        name: 'Someone',
        avatar:
          'https://assets.codepen.io/t-1003/internal/avatars/teams/default.png?format=auto&height=256&version=1513627136&width=256',
      },
      accessToken: 'yourAccessTokenFromBackend',
    }
    await setTimeout(() => {
      // We simulate the async request with timeout.
      // Replace the whole thing with a nice axios request to obtain the auth instance as usual
      // This use a constain as an example
    }, 1000)
    localStorage.setItem('auth', JSON.stringify(auth))
    commit(authMutations.SET.AUTH, auth, { root: true }) // Mutating to store for client rendering
  },
  logout({ commit }) {
    localStorage.removeItem('auth')
    commit(authMutations.SET.AUTH, null, { root: true })
  },
}

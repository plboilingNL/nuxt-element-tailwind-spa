import qs from 'qs'
import { userMutations } from '~/constants/vuex'
export default {
  async fetchData({ state, commit }) {
    const response = await this.$clientApi.get(
      '/users?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(userMutations.SET.DATA, response.data, { root: true })
    // Fix total later
    commit(userMutations.SET.TOTAL, 50, { root: true })
    return response.data
  },
  async fetchMoreData() {
    const response = await this.$clientApi.get('/users')
    return response
  },
  async fetchSingle({ rootState }, id) {
    const response = await this.$clientApi.get('/users/' + id)
    return response
  },
  async submitSingle({ rootState }, form) {
    const response = await this.$clientApi.post('/users', form)
    return response
  },
  async updateSingle({ rootState }, data) {
    const response = await this.$clientApi.put('/users/' + data.id, data.form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$clientApi.delete('/users/' + id)
    return response
  },
}

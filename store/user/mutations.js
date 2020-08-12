export default {
  SET_DATA(state, data) {
    state.data = data
  },
  SET_TOTAL(state, total) {
    state.total = total
  },
  SET_QUERY(state, query) {
    state.query = { ...state.query, ...query }
  },
  CLEAR_QUERY(state) {
    state.query = {
      page: 1,
      limit: 10,
    }
  },
  INC_QUERY_PAGE(state) {
    state.query.page++
  },
  SUB_QUERY_PAGE(state) {
    state.query.page--
  },
}

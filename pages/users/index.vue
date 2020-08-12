<template>
  <el-main>
    <el-container class="p-3">
      <el-row class="w-full">
        <!-- Title -->
        <h1 class="text-xl font-bold text-light inline-block mr-3">
          {{ $t('users.title') }}
        </h1>
        <!-- Breadcrumb -->
        <div class="inline-block text-light select-none">
          <nuxt-link to="/">
            <fa :icon="['fas', 'home']" />
          </nuxt-link>
        </div>
        <nuxt-link to="/users/deleted">
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('users.deleted')"
            placement="bottom-start"
          >
            <el-button
              class="float-right select-none"
              type="danger"
              size="mini"
              icon="el-icon-delete"
              circle
            >
            </el-button>
          </el-tooltip>
        </nuxt-link>
        <nuxt-link to="/users/create">
          <el-button
            class="float-right mx-3 border-0 bg-theme-2-400 hover:bg-theme-2-500 text-white select-none"
            size="mini"
            round
          >
            {{ $t('users.add-new') }}
          </el-button>
        </nuxt-link>
      </el-row>
    </el-container>
    <el-container class="p-3">
      <!-- Start data table -->
      <DataTable
        v-loading="$fetchState.pending"
        :data="userData"
        :total="userTotal"
        :limit="userQuery.limit"
        :current-page="userQuery.page"
        @my-table-edit="onEdit"
        @my-table-delete="onDelete"
        @my-table-size-change="onSizeChange"
        @my-table-page-change="onPageChange"
        @my-table-page-prev="onPagePrev"
        @my-table-page-next="onPageNext"
        @my-table-selection-change="onSelectionChange"
        @my-table-sort-change="onSortChange"
        @my-table-search="onSearch"
        @my-table-limit-change="onLimitChange"
        @my-table-refresh="onRefresh"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <p>Email: {{ scope.row.email }}</p>
            <p>Address: {{ scope.row.address }}</p>
            <p>Note: {{ scope.row.note }}</p>
            <p>Join date: {{ scope.row.createAt }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Name" prop="name" sortable />
        <el-table-column label="Email" prop="email" sortable>
          <template slot-scope="scope">
            <p style="color: green;">
              {{ scope.row.email }}
            </p>
          </template>
        </el-table-column>
      </DataTable>
    </el-container>
  </el-main>
</template>
<script>
// Modify this DataTable component to suit your api
import qs from 'qs'
import { mapActions, mapState, mapMutations } from 'vuex'
import { DataTable } from '~/components/common'
import { userActions, userMutations } from '~/constants/vuex'
export default {
  components: {
    DataTable,
  },
  middleware({ store, query }) {
    if (qs.stringify(query) !== '') {
      Object.keys(query).forEach((key, index) => {
        if (!isNaN(query[key])) {
          query[key] = Number(query[key])
        }
      })
      store.commit(userMutations.SET.QUERY, query)
    }
  },
  fetch() {
    this.pushRouterQuery()
    this.fetchUsers()
  },
  computed: {
    ...mapState({
      userData: (state) => state.user.data,
      userQuery: (state) => state.user.query,
      userTotal: (state) => state.user.total,
    }),
  },
  methods: {
    ...mapActions({
      fetchUsers: userActions.FETCH.DATA,
      deleteUser: userActions.DELETE.SINGLE,
    }),
    ...mapMutations({
      setUserQuery: userMutations.SET.QUERY,
      clearUserQuery: userMutations.CLEAR.QUERY,
      incUserQueryPage: userMutations.INC.QUERY_PAGE,
      subUserQueryPage: userMutations.SUB.QUERY_PAGE,
    }),
    onEdit(payload) {
      this.$router.push(`/users/${payload.rowData.id}/edit`)
    },
    onDelete(payload) {
      this.deleteUser(payload.rowData.id)
      this.$fetch()
    },
    onSizeChange(total) {
      console.log('pagination changed to ' + total)
    },
    async onPageChange(currentPage) {
      await this.setUserQuery({
        page: currentPage,
      })
      this.$fetch()
    },
    async onPagePrev() {
      await this.subUserQueryPage()
      this.$fetch()
    },
    async onPageNext() {
      await this.incUserQueryPage()
      this.$fetch()
    },
    onSelectionChange(selected) {
      console.log(selected)
    },
    onSortChange(payload) {
      console.log(payload.order)
      console.log(payload.prop)
    },
    async onSearch(searchString) {
      await this.setUserQuery({
        page: 1,
        search: searchString,
      })
      this.$fetch()
    },
    async onLimitChange(limit) {
      await this.setUserQuery({
        page: 1,
        limit,
      })
      this.$fetch()
    },
    async onRefresh() {
      await this.clearUserQuery()
      this.$fetch()
    },
    pushRouterQuery() {
      // this.$router.push does change the $route.query,
      // but doesn't change the browser url from the 2nd time above (cache or something, i dunno)
      history.pushState(
        {},
        '',
        this.$route.path +
          '?' +
          qs.stringify(this.userQuery, { arrayFormat: 'repeat' })
      )
    },
  },
}
</script>

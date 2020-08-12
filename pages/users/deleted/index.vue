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
        <nuxt-link to="/users">
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('users.list')"
            placement="bottom-start"
          >
            <el-button
              class="float-right select-none"
              type="primary"
              size="mini"
              icon="el-icon-document"
              circle
            >
            </el-button>
          </el-tooltip>
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
<script src="./script.js"></script>
<style lang="scss" scoped src="./style-scoped.scss"></style>
<style lang="scss" src="./style.scss"></style>

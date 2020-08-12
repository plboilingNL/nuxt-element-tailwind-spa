<template>
  <el-card shadow="always" class="border-0 rounded-lg w-full">
    <div class="mb-5">
      <h3 class="font-bold text-gray-600 inline-block">
        {{ title }}
      </h3>
      <el-button
        size="mini"
        icon="el-icon-refresh"
        circle
        class="ml-1 select-none"
        @click="$emit('my-table-refresh')"
      >
      </el-button>
      <el-select
        v-model="limit"
        size="mini"
        class="float-right select-none"
        style="width: 80px;"
        @change="$emit('my-table-limit-change', limit)"
      >
        <el-option
          v-for="paginateLimit in [10, 25, 50]"
          :key="'paginate-limit-' + paginateLimit"
          :label="paginateLimit"
          :value="paginateLimit"
          class="select-none"
        >
        </el-option>
      </el-select>
      <el-input
        v-model="seachString"
        size="mini"
        class="float-right mx-3"
        style="width: 120px;"
        :placeholder="$t('components.table.data.search')"
        @keyup.enter.native="$emit('my-table-search', seachString)"
      ></el-input>
    </div>
    <hr />
    <el-table
      class="w-full"
      :height="height"
      :data="data"
      @selection-change="
        (selected) => {
          $emit('my-table-selection-change', selected)
        }
      "
      @sort-change="
        (payload) => {
          $emit('my-table-sort-change', payload)
        }
      "
    >
      <el-table-column
        v-if="multiple"
        type="selection"
        width="55"
        class="select-none"
      />
      <slot></slot>
      <el-table-column width="40" align="right">
        <template slot-scope="scope">
          <el-dropdown trigger="click" @command="handleActionCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-more-outline"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="action in actions"
                :key="`${action.name}:${scope.$index}`"
                :command="`${action.name}:${scope.$index}`"
              >
                {{ $t(action.label) }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      class="my-5 float-right select-none"
      :total="total"
      :current-page="currentPage"
      @size-change="
        (total) => {
          $emit('my-table-size-change', total)
        }
      "
      @current-change="
        (currentPage) => {
          $emit('my-table-page-change', currentPage)
        }
      "
      @prev-click="
        (currentPage) => {
          $emit('my-table-page-prev', currentPage)
        }
      "
      @next-click="
        (currentPage) => {
          $emit('my-table-page-next', currentPage)
        }
      "
    />
    <div></div>
  </el-card>
</template>
<script>
export default {
  props: {
    height: {
      type: Number,
      default: 400,
    },
    title: {
      type: String,
      default() {
        return this.$t('components.table.data.title')
      },
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    actions: {
      type: Array,
      default() {
        return [
          {
            name: 'edit',
            label: 'components.table.data.edit',
          },
          {
            name: 'delete',
            label: 'components.table.data.delete',
          },
        ]
      },
    },
    limit: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // limit: 10,
      seachString: '',
    }
  },
  // created() {
  //   this.page = this.currentPage
  // },
  methods: {
    handleActionCommand(command) {
      const actionHandler = command.split(':')
      this.$emit('my-table-' + actionHandler[0], {
        rowID: actionHandler[1],
        rowData: this.data[actionHandler[1]],
      })
    },
  },
}
</script>

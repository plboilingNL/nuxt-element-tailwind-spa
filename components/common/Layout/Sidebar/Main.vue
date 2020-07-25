<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo border-none"
    :background-color="backgroudColor"
    :text-color="textColor"
    :active-text-color="activeTextColor"
    :collapse="isCollapsed"
    :router="true"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="1" :route="{ name: '/' }">
      <slot name="header">
        Hello
      </slot>
    </el-menu-item>
    <component
      :is="child.children.length > 0 ? SubMenu : Item"
      v-for="(child, index) in sidebar"
      :key="child.title"
      :item="child"
      :count="index + 2 + ''"
    ></component>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
const sidebarTree = require('~/constants/base/sidebar.json')
export default {
  name: 'Sidebar',
  props: {
    backgroudColor: {
      type: String,
      default: '#212529',
    },
    textColor: {
      type: String,
      default: '#fff',
    },
    activeTextColor: {
      type: String,
      default: '#ffd04b',
    },
  },
  data() {
    return {
      sidebar: sidebarTree.data,
    }
  },
  computed: {
    ...mapState({
      isCollapsed: (state) => state.options.sidebarCollapsed,
    }),
    SubMenu() {
      return () => import('./SubMenu.vue')
    },
    Item() {
      return () => import('./Item.vue')
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
  },
}
</script>

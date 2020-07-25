<template>
  <el-menu-item :index="count" :route="{ name: item.to }">
    <i :class="item.icon"></i>
    <span>{{ $t(item.title) }}</span>
  </el-menu-item>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
    count: {
      type: String,
      default: '1',
    },
  },
}
</script>

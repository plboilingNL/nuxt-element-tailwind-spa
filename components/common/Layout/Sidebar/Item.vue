<template>
  <el-menu-item :index="count" @click="$router.push(item.to)">
    <i :class="item.icon" :style="{ color: item['icon-color'] }"></i>
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

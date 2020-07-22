<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#fff"
    :router="true"
    :default-active="activeIndex"
    @select="handleSelect"
  >
    <el-menu-item index="1" :route="{ name: 'index' }">
      Home
    </el-menu-item>
    <el-menu-item index="2" :route="{ name: 'introduction' }">
      Introduction
    </el-menu-item>
    <el-menu-item index="3" :route="{ name: 'secret' }">
      Secret page
    </el-menu-item>
    <client-only>
      <!-- Login button -->
      <el-menu-item
        v-if="$store.state.auth && $route.path != '/login'"
        class="mr-3"
        style="float: right;"
        :title="$t('navbar.logout')"
        @click="$store.dispatch('logout')"
      >
        {{ $t('navbar.logout') }}
      </el-menu-item>
      <el-menu-item
        v-if="!$store.state.auth && $route.path != '/login'"
        class="mr-3"
        style="float: right;"
        :title="$t('navbar.login')"
        @click="$root.$emit('showLoginDialog')"
      >
        {{ $t('navbar.login') }}
      </el-menu-item>
      <!-- i18n button -->
      <el-menu-item
        v-if="locale == 'en'"
        size="sm"
        style="float: right;"
        @click="changeLanguage('vi')"
      >
        Tiếng Việt
      </el-menu-item>
      <el-menu-item
        v-if="locale == 'vi'"
        size="sm"
        style="float: right;"
        @click="changeLanguage('en')"
      >
        English
      </el-menu-item>
    </client-only>
  </el-menu>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Navbar',
  data() {
    return {
      activeIndex: '1',
    }
  },
  computed: {
    ...mapState({
      locale: (state) => state.locale,
    }),
  },
  methods: {
    ...mapMutations({
      SET_LANG: 'SET_LANG',
    }),
    changeLanguage(locale) {
      this.SET_LANG(locale) // store in state and localStorage
      this.$i18n.locale = locale // live change on website
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

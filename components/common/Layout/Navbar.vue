<template>
  <el-header class="p-0">
    <!--  -->
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      :default-active="activeIndex"
      @select="handleSelect"
    >
      <el-menu-item index="1" @click="TOGGLE_SIDEBAR_COLLAPSE()">
        <fa :icon="['fas', 'bars']" />
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/')">
        {{ $t('navbar.dashboard') }}
      </el-menu-item>
      <!-- Login button -->
      <el-submenu style="float: right;" class="no-caret" index="3">
        <template slot="title">
          <el-avatar size="small" :src="avatar" class="bg-none"></el-avatar>
          <span class="ml-3">{{ username }}</span>
        </template>
        <el-menu-item
          v-if="$store.state.auth && $route.path != '/login'"
          index="3-1"
          :title="$t('navbar.logout')"
          @click="$store.dispatch('logout')"
        >
          {{ $t('navbar.logout') }}
        </el-menu-item>
        <el-menu-item
          v-if="!$store.state.auth && $route.path != '/login'"
          index="3-2"
          :title="$t('navbar.login')"
          @click="$root.$emit('showLoginDialog')"
        >
          {{ $t('navbar.login') }}
        </el-menu-item>
      </el-submenu>
      <!-- i18n button -->
      <el-menu-item
        v-if="locale == 'en'"
        size="sm"
        class="bg-red float-right"
        title="Đổi sang tiếng Việt"
        @click="changeLanguage('vi')"
      >
        <i class="el-icon-star-on text-yellow m-0"></i>
      </el-menu-item>
      <el-menu-item
        v-if="locale == 'vi'"
        size="sm"
        class="bg-blue float-right"
        title="Switch to English"
        @click="changeLanguage('en')"
      >
        <fa :icon="['fas', 'globe-americas']" class="mx-1" />
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Navbar',
  props: {
    backgroundColor: {
      type: String,
      default: '#343A40',
    },
    textColor: {
      type: String,
      default: '#FFFFFF',
    },
    activeTextColor: {
      type: String,
      default: '#FFFFFF',
    },
  },
  data() {
    return {
      activeIndex: '1',
    }
  },
  computed: {
    ...mapState({
      locale: (state) => state.locale,
      options: (state) => state.options,
      auth: (state) => state.auth,
    }),
    avatar() {
      if (this.auth) {
        return this.auth.currentUser.avatar
      } else {
        return require('~/assets/img/default-man.png')
      }
    },
    username() {
      if (this.auth) {
        return this.auth.currentUser.name
      } else {
        return 'Super admin'
      }
    },
  },
  methods: {
    ...mapMutations({
      SET_LANG: 'SET_LANG',
      TOGGLE_SIDEBAR_COLLAPSE: 'TOGGLE_SIDEBAR_COLLAPSE',
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

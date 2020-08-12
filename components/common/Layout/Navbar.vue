<template>
  <el-header class="p-0 shadow">
    <!--  -->
    <el-menu
      class="navbar border-none"
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
      <el-submenu class="no-caret float-right navbar-submenu" index="3">
        <template slot="title">
          <el-avatar size="small" :src="avatar" class="bg-none"></el-avatar>
          <span class="ml-3">{{ username }}</span>
        </template>
        <el-menu-item index="3-1" :title="$t('navbar.logout')" @click="logout">
          {{ $t('navbar.logout') }}
        </el-menu-item>
      </el-submenu>
      <!-- i18n button -->
      <el-tooltip
        class="item"
        effect="dark"
        content="Đổi sang tiếng Việt"
        placement="bottom-start"
      >
        <el-menu-item
          v-if="locale == 'en'"
          size="sm"
          class="bg-red float-right"
          @click="changeLanguage('vi')"
        >
          <i class="el-icon-star-on text-yellow m-0"></i>
        </el-menu-item>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="Switch to English"
        placement="bottom-start"
      >
        <el-menu-item
          v-if="locale == 'vi'"
          size="sm"
          class="bg-blue float-right"
          @click="changeLanguage('en')"
        >
          <fa :icon="['fas', 'globe-americas']" class="mx-1" />
        </el-menu-item>
      </el-tooltip>
    </el-menu>
  </el-header>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { rootActions, rootMutations } from '~/constants/vuex'
export default {
  name: 'Navbar',
  props: {
    backgroundColor: {
      type: String,
      default: 'var(--color-navbar-background)',
    },
    textColor: {
      type: String,
      default: 'var(--color-navbar-text)',
    },
    activeTextColor: {
      type: String,
      default: 'var(--color-navbar-text-active)',
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
      SET_LANG: rootMutations.SET.LANG,
      TOGGLE_SIDEBAR_COLLAPSE: rootMutations.TOGGLE.SIDEBAR_COLLAPSE,
    }),
    changeLanguage(locale) {
      this.SET_LANG(locale) // store in state and localStorage
      this.$i18n.locale = locale // live change on website
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    logout() {
      this.$store.dispatch(rootActions.LOGOUT)
      this.$router.push('/login')
    },
  },
}
</script>

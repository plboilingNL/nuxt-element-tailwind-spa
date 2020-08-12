<template>
  <el-container class="default-layout-container h-full-vh">
    <el-aside
      class="default-layout-aside"
      :width="sidebarCollapsed ? '65px' : '250px'"
    >
      <Sidebar>
        <template v-slot:header>
          <img
            src="~/assets/img/logo-md.png"
            style="width: 40px;"
            class="m-0 inline"
          />
          <span class="text-dark text-xl ml-3 tracking-wider font-ample">
            Nestsera Tech
          </span>
        </template>
      </Sidebar>
    </el-aside>
    <el-container class="flex-col">
      <!-- el-header -->
      <Navbar />
      <!-- el-main -->
      <div class="default-page-container h-full">
        <transition
          appear
          enter-active-class="animate__animated animate__fadeIn animate__fast"
          leave-active-class="animate__animated animate__fadeOut animate__fast"
          mode="out-in"
        >
          <nuxt class="relative" keep-alive />
        </transition>
      </div>
      <!-- el-dialog -->
      <Login />
      <!-- el-footer -->
      <Footer />
    </el-container>
  </el-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { rootMutations } from '~/constants/vuex'
import { Login, Navbar, Sidebar, Footer } from '~/components/common'
export default {
  middleware: ['authRequired'],
  components: {
    Login,
    Navbar,
    Footer,
    Sidebar,
  },
  computed: {
    ...mapState({
      sidebarCollapsed: (state) => state.options.sidebarCollapsed,
    }),
  },
  created() {
    // We store this configuration in localStorage because it lasts forever
    this.$i18n.locale = localStorage.getItem('locale')
    this.SET_LANG(localStorage.getItem('locale')) // store in state and localStorage
  },
  methods: {
    ...mapMutations({
      SET_LANG: rootMutations.SET.LANG,
    }),
  },
}
</script>
<style lang="scss" scoped>
.default-page-container {
  background-image: url(~assets/img/header-bg.svg);
  background-position: top;
  background-repeat: no-repeat;
  background-size: contain;
  background-attachment: local;
}
</style>

<template>
  <el-container class="default-layout-container h-full-vh">
    <el-aside class="default-layout-aside bg-primary-900" width="320px">
      <!-- el-main -->
      <nuxt class="relative" />
    </el-aside>
    <el-container class="flex-col unauth-bg relative">
      <div class="unauth-text-container">
        <h3
          class="text-light text-3xl unauth-text-subtitle animate__animated animate__lightSpeedInLeft animate__delay-2s"
        >
          IT software and design
        </h3>
        <h1 class="text-light text-6xl font-semibold unauth-text-title">
          <span class="animate__animated animate__flipInX">
            DREAM IT.
          </span>
          <span class="animate__animated animate__flipInX animate__delay-1s">
            DELIVER IT
          </span>
        </h1>
        <h3
          class="text-light text-3xl font-hairline unauth-text-description animate__animated animate__fadeIn animate__delay-3s"
        >
          Striving to create outstanding technology solution
        </h3>
      </div>
      <!-- el-footer -->
      <Footer
        :custom-style="{
          backgroundColor: 'var(--color-primary-800) !important',
        }"
      />
    </el-container>
  </el-container>
</template>

<script>
import { mapMutations } from 'vuex'
import { Footer } from '~/components/common'
import { rootMutations } from '~/constants/vuex'
export default {
  middleware: 'authNotRequired',
  components: {
    Footer,
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
@import '~assets/scss/base/utilities/mixins';
@include maxWidth(767.98px) {
  .default-layout-container {
    height: 200vh;
    flex-direction: column-reverse;
  }
  .default-layout-aside {
    width: 100% !important;
    height: 100vh;
  }
}
.unauth-bg {
  background-image: url(~assets/img/login/bg.jpg);
  background-size: cover;
  background-position: center;
}
.unauth-text-container {
  @include centerAbsolute('vertical');
  left: 50px;
}
</style>

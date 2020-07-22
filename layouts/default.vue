<template>
  <div class="p-0 w-full">
    <Navbar @signInDialogTrigger="dialogVisible = true" />
    <nuxt />
    <Login :visible="dialogVisible" @onClose="dialogVisible = false" />
    <Footer />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Login, Navbar, Footer } from '~/components/common'
export default {
  components: {
    Login,
    Navbar,
    Footer,
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  created() {
    // We store this configuration in localStorage because it lasts forever
    this.$i18n.locale = localStorage.getItem('locale')
    this.SET_LANG(localStorage.getItem('locale')) // store in state and localStorage
  },
  methods: {
    ...mapMutations({
      SET_LANG: 'SET_LANG',
    }),
  },
}
</script>

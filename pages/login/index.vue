<template>
  <el-main class="h-full">
    <div class="login-content-wrapper">
      <div>
        <img class="block mx-auto" src="~assets/img/logo.png" alt="" />
      </div>
      <div class="sy-5"></div>
      <div>
        <FormWrapper @my-form-submit="postLogin">
          <InputWrapper
            rules="required|email"
            :label="$t('login.email')"
            label-for="login-input-email"
            class="login-input-group"
          >
            <el-input
              id="login-input-email"
              v-model="form.email"
              type="email"
              :placeholder="$t('login.email') + '...'"
            ></el-input>
          </InputWrapper>
          <InputWrapper
            rules="required"
            :label="$t('login.password')"
            label-for="login-input-password"
            class="login-input-group"
          >
            <el-input
              id="login-input-password"
              v-model="form.password"
              type="password"
              :placeholder="$t('login.password') + '...'"
            ></el-input>
          </InputWrapper>
          <el-button native-type="submit" type="primary" class="mt-5">
            {{ $t('login.button') }}
          </el-button>
        </FormWrapper>
      </div>
    </div>
  </el-main>
</template>

<script>
import { FormWrapper, InputWrapper } from '~/components/common'
import { rootActions } from '~/constants/vuex'
export default {
  layout: 'unauth',
  // Back to home if you've already been authenticated
  components: {
    FormWrapper,
    InputWrapper,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async postLogin() {
      await this.$store.dispatch(rootActions.LOGIN, this.form)
      this.$router.push('/')
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/base/layout/grid';
@import '~assets/scss/base/utilities/mixins';
.login-content-wrapper {
  width: 250px;
  @include centerAbsolute('both');
  top: 40%;
}
</style>
<style lang="scss">
.login-content-wrapper {
  .login-input-group {
    .el-form-item {
      margin: 0;
      .el-form-item__label {
        color: white;
        font-weight: bold;
      }
      .el-input__inner {
        background: none !important;
        border: none !important;
        border-bottom: 1px solid white !important;
        border-radius: 0;
        color: white;
        padding: 0;
      }
    }
  }
}
</style>

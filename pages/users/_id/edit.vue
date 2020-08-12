<template>
  <el-main>
    <el-container class="p-3">
      <el-row class="w-full">
        <!-- Title -->
        <h1 class="text-xl font-bold text-light inline-block mr-3">
          {{ $t('users.title') }}
        </h1>
        <!-- Breadcrumb -->
        <div class="inline-block text-light select-none">
          <nuxt-link to="/">
            <fa :icon="['fas', 'home']" />
          </nuxt-link>
        </div>
        <nuxt-link to="/users">
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('users.list')"
            placement="bottom-start"
          >
            <el-button
              class="float-right select-none"
              type="primary"
              size="mini"
              icon="el-icon-document"
              circle
            >
            </el-button>
          </el-tooltip>
        </nuxt-link>
      </el-row>
    </el-container>
    <el-container class="p-3 mb-10">
      <el-row class="w-full">
        <el-col :span="16" class="mx-auto float-none">
          <el-card shadow="always" class="w-full">
            <h2 class="font-bold">
              {{ $t('users.edit.title') }}
            </h2>
            <hr class="my-5" />
            <FormWrapper @my-form-submit="submitUpdate">
              <el-row :gutter="20">
                <el-col :span="7" class="text-center">
                  <p class="text-center my-5 font-bold">
                    {{ $t('users.edit.avatar') }}
                  </p>
                  <InputWrapper>
                    <FileUploader />
                  </InputWrapper>
                  <el-button native-type="submit" type="primary">
                    {{ $t('users.edit.submit') }}
                  </el-button>
                </el-col>
                <el-col :span="17">
                  <InputWrapper
                    rules="required"
                    :label="$t('users.edit.name')"
                    label-for="users-input-name"
                  >
                    <el-input
                      id="users-input-name"
                      v-model="form.name"
                    ></el-input>
                  </InputWrapper>
                  <InputWrapper
                    rules="required|email"
                    :label="$t('users.edit.email')"
                    label-for="users-input-email"
                  >
                    <el-input
                      id="users-input-email"
                      v-model="form.email"
                    ></el-input>
                  </InputWrapper>
                  <InputWrapper
                    rules="required"
                    :label="$t('users.edit.password')"
                    label-for="users-input-password"
                  >
                    <el-input
                      id="users-input-password"
                      v-model="form.password"
                      show-password
                    ></el-input>
                  </InputWrapper>
                  <InputWrapper
                    :label="$t('users.edit.address')"
                    label-for="users-input-address"
                  >
                    <el-input
                      id="users-input-address"
                      v-model="form.address"
                    ></el-input>
                  </InputWrapper>
                  <InputWrapper
                    rules="required"
                    :label="$t('users.edit.role')"
                    label-for="users-input-role"
                  >
                    <el-select v-model="form.role">
                      <el-option
                        v-for="role in ['success', 'danger', 'pink']"
                        :key="role"
                        :label="role"
                        :value="role"
                      >
                      </el-option>
                    </el-select>
                  </InputWrapper>
                  <InputWrapper
                    :label="$t('users.edit.note')"
                    label-for="users-input-note"
                  >
                    <el-input v-model="form.note" type="textarea" :rows="2">
                    </el-input>
                  </InputWrapper>
                </el-col>
              </el-row>
            </FormWrapper>
          </el-card>
        </el-col>
      </el-row>
    </el-container>
  </el-main>
</template>
<script>
import { mapActions } from 'vuex'
import { FormWrapper, InputWrapper, FileUploader } from '~/components/common'
import { userActions } from '~/constants/vuex'
export default {
  components: { FormWrapper, InputWrapper, FileUploader },
  async fetch() {
    const response = await this.$store.dispatch(
      userActions.FETCH.SINGLE,
      this.$route.params.id
    )
    this.form = { ...this.form, ...response.data }
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        avatar: '',
        address: '',
        role: '',
        note: '',
      },
    }
  },
  methods: {
    ...mapActions({
      reFetchUsers: userActions.FETCH.DATA,
      updateSingleUser: userActions.UPDATE.SINGLE,
    }),
    async submitUpdate() {
      try {
        const response = await this.updateSingleUser({
          id: this.$route.params.id,
          form: this.form,
        })
        this.reFetchUsers()
        this.$router.push('/users')
        this.$message(response.statusText)
      } catch (err) {
        this.$message(err)
      }
    },
  },
}
</script>

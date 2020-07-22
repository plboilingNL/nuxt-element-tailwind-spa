<template>
  <ValidationObserver v-slot="{ passes }">
    <el-form @submit.native.prevent="passes(submitForm)">
      <slot></slot>
    </el-form>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
export default {
  name: 'FormWrapper',
  components: {
    ValidationObserver,
  },
  methods: {
    submitForm() {
      this.$emit('onSubmit')
    },
  },
}
</script>

<template>
  <div>
    <div class="text-h5 text-weight-medium text-primary">Reset Password</div>
    <q-form @submit="onSubmit" @keydown="error.clear($event.target.name)">
      <q-input
        :readonly="loading"
        v-model="auth.password"
        label="New Password"
        @keydown="error.reset()"
        :error="error.has('password')"
        :error-message="error.get('password')"
        filled
        name="password"
        type="password"
      />
      <q-input
        :readonly="loading"
        v-model="auth.password_confirmation"
        label="Retype New Password"
        @keydown="error.reset()"
        :error="error.has('password_confirmation')"
        :error-message="error.get('password_confirmation')"
        filled
        name="password_confirmation"
        type="password"
      />
      <q-btn
        :loading="loading"
        :disabled="
          !auth.password || !auth.password_confirmation || this.error.any()
        "
        label="Reset Password"
        color="primary"
        type="submit"
        class="full-width"
      />
    </q-form>
  </div>
</template>
<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  data() {
    return {
      loading: false,
      auth: {
        password: '',
        password_confirmation: '',
        token: this.$route.params.token,
        email: this.$route.params.email
      }
    }
  },
  methods: {
    async onSubmit() {
      if (this.loading) return
      this.loading = true
      try {
        await this.$store.dispatch('auth/reset', this.auth)
        this.$router.push({ name: 'sign-in' })
      } catch (error) {
        return
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

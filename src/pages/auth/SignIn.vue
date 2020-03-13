<template>
  <div>
    <div class="text-h3 text-weight-medium text-primary">HRIS</div>
    <q-form @keydown="error.clear($event.target.name)" @submit="onSubmit">
      <q-input
        :readonly="loading"
        v-model="auth.username"
        label="Username | Email"
        :error="error.has('username')"
        :error-message="error.get('username')"
        filled
        name="username"
        required
      />
      <q-input
        :readonly="loading"
        v-model="auth.password"
        label="Password"
        :error="error.has('password')"
        :error-message="error.get('password')"
        filled
        name="password"
        type="password"
        required
      />
      <q-btn
        :disable="error.any() || !auth.username || !auth.password"
        :loading="loading"
        label="Sign In"
        color="primary"
        type="submit"
        class="full-width q-mb-md"
      />
      <q-btn
        :disable="loading"
        label="Forgot Password"
        :to="{ name: 'password-forgot' }"
        color="secondary"
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
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      if (this.loading) return
      this.loading = true
      try {
        await this.$store.dispatch('auth/get_token', this.auth)
        this.$store.commit('component/drawer', false)
        this.$router.push({ name: 'home' })
      } catch (error) {
        return
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="text-h5 text-weight-medium text-primary">Forgot Password</div>
    <q-form
      @keydown="error.clear($event.target.name)"
      @submit.prevent="onSubmit"
    >
      <q-input
        :readonly="loading"
        v-model="email"
        label="Your Email *"
        :error="error.has('email')"
        :error-message="error.get('email')"
        filled
        type="email"
        name="email"
        required
      />
      <q-btn
        :loading="loading"
        :disable="!email || error.any()"
        type="submit"
        label="Send Reset Link"
        color="primary"
        class="full-width q-mb-md"
      />
      <q-btn
        :disable="loading"
        label="Oh I remember now"
        :to="{ name: 'sign-in' }"
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
      email: ''
    }
  },
  methods: {
    async onSubmit() {
      if (this.loading) return
      this.loading = true
      try {
        await this.$store.dispatch('auth/forgot', { email: this.email })
        this.$router.push({ name: 'success-reset' })
      } catch (error) {
        return
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

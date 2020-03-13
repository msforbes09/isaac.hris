<template>
  <registered>
    <router-view />
  </registered>
</template>

<script>
export default {
  components: {
    registered: () => import('layouts/Registered.vue')
  },
  methods: {
    async getUser() {
      this.$q.loading.show()
      try {
        await this.$store.dispatch('auth/getUser')
      } catch (error) {
        return
      } finally {
        this.$q.loading.hide()
      }
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>

<style></style>

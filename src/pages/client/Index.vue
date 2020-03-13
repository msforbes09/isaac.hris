<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.getCompanies()
  },
  methods: {
    async getCompanies() {
      try {
        await this.$store.dispatch('tools/getClientManagement')
      } catch (error) {
        return
      }
    }
  }
}
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.getApplicantManagement()
  },
  methods: {
    async getApplicantManagement() {
      await this.$store.dispatch('tools/getApplicantManagement')
    }
  }
}
</script>

<style></style>

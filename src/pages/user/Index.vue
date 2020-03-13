<template>
  <router-view />
</template>

<script>
export default {
  mounted() {
    this.getUserTools()
  },
  methods: {
    async getUserTools() {
      try {
        await this.$store.dispatch('tools/getUserTools')
      } catch (error) {
        return
      }
    }
  }
}
</script>

<style></style>

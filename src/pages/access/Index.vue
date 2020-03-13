<template>
  <router-view />
</template>

<script>
export default {
  mounted() {
    this.getAccessTools()
  },
  methods: {
    async getAccessTools() {
      try {
        await this.$store.dispatch('tools/getAccessTools')
      } catch (error) {
        return
      }
    }
  }
}
</script>

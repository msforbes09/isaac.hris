<template>
  <div id="q-app">
    <div class="fit fixed"></div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$q.notify.setDefaults({
      timeout: 3000,
      position: 'top-right',
      actions: [{ icon: 'close', color: 'white' }]
    })
  }
}
</script>

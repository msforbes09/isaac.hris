<template>
  <q-header class="bg-primary text-white">
    <q-toolbar class="no-padding">
      <q-btn
        class="hr-toggle-drawer q-ml-sm"
        dense
        flat
        icon="menu"
        @click="drawer = !drawer"
      />
      <div class="text-h5 q-ml-sm text-bold">HRIS</div>
      <q-space></q-space>
    </q-toolbar>
  </q-header>
</template>

<script>
let drawer = 'component/drawer'
export default {
  computed: {
    drawer: {
      get() {
        return this.$store.getters[drawer]
      },
      set(value) {
        this.$store.commit(drawer, value)
      }
    }
  }
}
</script>

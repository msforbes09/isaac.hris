<template>
  <div>
    <q-layout view="hHh lpr fff" class="bg-grey-4">
      <drawer />
      <headbar />
      <q-page-container>
        <div class="q-pa-xl">
          <slot />
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  components: {
    drawer: () => import('components/Drawer.vue'),
    headbar: () => import('components/HeadBar.vue')
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      try {
        await this.$store.dispatch('auth/getUser')
      } catch (error) {
        return
      }
    }
  }
}
</script>

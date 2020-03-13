<template>
  <visitors>
    <q-page-container class="row">
      <div class="col">
        <q-page class="column justify-center">
          <div class="col-4 self-center bg-white q-pa-lg rounded-borders">
            <router-view />
          </div>
        </q-page>
      </div>
    </q-page-container>
  </visitors>
</template>

<script>
export default {
  components: {
    visitors: () => import('layouts/Visitors.vue')
  }
}
</script>

<template>
  <visitors>
    <q-page-container class="row">
      <div class="col">
        <q-page class="column justify-center">
          <div class="self-center column">
            <h1 class="text-white">404</h1>
            <q-btn
              label="Go back"
              :to="{ name: 'home' }"
              color="green"
              class="self-center"
            />
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

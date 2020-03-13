<template>
  <div>
    <Table :table="table" />
  </div>
</template>
<script>
import Table from '../../components/Table'
export default {
  components: {
    Table
  },
  computed: {
    table: {
      get() {
        return this.$store.getters['client/table']
      },
      set(key) {
        this.$store.commit('client/table', key)
      }
    }
  }
}
</script>

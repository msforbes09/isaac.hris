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
        return this.$store.getters['access/table']
      },
      set(key) {
        this.$store.commit('access/table', key)
      }
    }
  }
}
</script>

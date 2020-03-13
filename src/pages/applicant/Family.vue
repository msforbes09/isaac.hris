<template>
  <div>
    <Table
      :table="table"
      label="Families"
      :dataId="paramsId"
      :dataWithParams="paramsId"
    />
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
        return this.$store.getters['family/table']
      },
      set(key) {
        this.$store.commit('family/table', key)
      }
    }
  },
  data() {
    return {
      paramsId: this.$route.params.id
    }
  }
}
</script>

<template>
  <div>
    <Table
      :table="table"
      label="Employment"
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
        return this.$store.getters['employment/table']
      },
      set(key) {
        this.$store.commit('employment/table', key)
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

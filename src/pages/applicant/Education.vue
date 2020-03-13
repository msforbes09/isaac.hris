<template>
  <div>
    <Table
      :table="table"
      label="Education"
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
        return this.$store.getters['education/table']
      },
      set(key) {
        this.$store.commit('education/table', key)
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

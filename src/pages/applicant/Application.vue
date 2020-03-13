<template>
  <div>
    <Table
      :user="user"
      :table="table"
      label="Application"
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
        return this.$store.getters['application/table']
      },
      set(key) {
        this.$store.commit('application/table', key)
      }
    },
    user() {
      return this.$store.getters['auth/user']
    }
  },
  data() {
    return {
      paramsId: this.$route.params.id
    }
  }
}
</script>

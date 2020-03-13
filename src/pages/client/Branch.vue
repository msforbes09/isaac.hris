<template>
  <div>
    <Table
      :table="table"
      :label="client.name + ' - Branch'"
      :dataId="client_id"
      :dataWithParams="client_id"
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
        return this.$store.getters['branch/table']
      },
      set(key) {
        this.$store.commit('branch/table', key)
      }
    },
    client() {
      return this.$store.getters['client/client']
    }
  },
  data() {
    return {
      client_id: this.$route.params.id
    }
  },
  mounted() {
    this.getClient()
  },
  methods: {
    async getClient() {
      await this.$store.dispatch('client/getClient', this.client_id)
    }
  }
}
</script>

<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h4 q-pl-xs text-grey-6">Keywords</div>
      </q-card-section>
      <q-separator />
      <q-splitter v-model="splitter">
        <template v-slot:before>
          <q-tabs v-model="active" vertical class="text-secondary">
            <q-tab
              :disable="loading || updating"
              v-for="(keyword, index) in keywords"
              :label="keyword.name.replace(/_/g, ' ')"
              :name="keyword.name"
              :icon="keyword.label"
              :key="index"
            />
          </q-tabs>
        </template>
        <template v-slot:after>
          <q-tab-panels
            v-model="active"
            transition-prev="jump-up"
            transition-next="jump-up"
            animated
          >
            <q-tab-panel
              v-for="(keyword, index) in keywords"
              :key="index"
              :name="keyword.name"
            >
              <Table
                :table="table"
                :data="keyword.keywords"
                :label="
                  keyword.name
                    .replace(/_/g, ' ')
                    .replace(/^\w/, c => c.toUpperCase())
                "
                :addLabel="
                  'Add ' +
                    keyword.name
                      .replace(/_/g, ' ')
                      .replace(/^\w/, c => c.toUpperCase())
                "
                :addFormLabel="
                  'Add ' +
                    keyword.name
                      .replace(/_/g, ' ')
                      .replace(/^\w/, c => c.toUpperCase())
                "
                :dataId="keyword.id"
              />
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </q-card>
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
        return this.$store.getters['keyword/table']
      },
      set(key) {
        this.$store.commit('keyword/table', key)
      }
    },
    keywords() {
      return this.$store.getters['keyword/keywords']
    },
    error() {
      return this.$store.getters.error
    }
  },
  data() {
    return {
      updating: false,
      active: '',
      newKeyword: '',
      selectedKeyword: '',
      savedKeyword: '',
      loading: false,
      splitter: 20
    }
  },
  async mounted() {
    await this.getKeywords()
    this.active = this.keywords[0] ? this.keywords[0].name : ''
  },
  methods: {
    confirm(key) {
      this.$q
        .dialog({
          title: key.title,
          message: key.message,
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          key.function()
        })
    },
    async getKeywords() {
      this.loading = true
      this.$q.loading.show()

      try {
        await this.$store.dispatch('keyword/getKeywords')
      } catch (error) {
        return
      } finally {
        this.loading = false
        this.$q.loading.hide()
      }
    }
  },
  watch: {
    active() {
      this.newKeyword = ''
      this.error.reset()
    }
  }
}
</script>

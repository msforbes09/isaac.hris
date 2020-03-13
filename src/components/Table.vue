<template>
  <div>
    <q-table
      :data="data || computedData.data || computedData"
      :loading="loading"
      :row-key="table.rowKey"
      :pagination.sync="pagination"
      :columns="table.columns"
      :rows-per-page-options="table.options"
      :binary-state-sort="table.binaryStateSort"
      :visible-columns="table.visibleColumns"
      @request="onRequest"
      :flat="table.flat"
      dense
    >
      <template v-slot:top-left>
        <div class="text-h4 text-grey-6">
          <q-btn
            v-if="table.back"
            icon="keyboard_arrow_left"
            class="q-mr-sm"
            color="grey-5"
            style="margin-top:-11px"
            :to="table.back.to"
            :disable="loading"
            dense
          />
          {{ label || table.label }}
        </div>
      </template>
      <template v-if="table.addForm" v-slot:top-right>
        <q-input
          v-if="table.search"
          :inactive="loading"
          v-model="filter"
          placeholder="Search"
          @keyup.enter="getData({ pagination: table.pagination })"
          class="q-mr-md"
          dense
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <div>
          <q-btn
            :label="addLabel || table.addLabel"
            color="primary"
            icon="add"
            @click="table.addForm.show = true"
          />
        </div>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            :key="column.name"
            :props="props"
            v-for="column in table.columns"
            :auto-width="column.autoWidth"
            :style="column.align == 'center' ? 'padding-right: 31px;' : ''"
          >
            <span v-if="column.type == 'edit'">
              <span v-if="column.additional">
                <span v-for="(addons, i) in column.additional" :key="i">
                  <q-btn
                    v-if="addons.type == 'button'"
                    :disable="loading"
                    :to="{
                      name: addons.params.toName,
                      params: {
                        id: props.row.id,
                        label: 'try'
                      }
                    }"
                    :icon="addons.params.icon"
                    :color="addons.params.color"
                    :label="addons.params.label"
                    :class="addons.params.class"
                    clickable
                    dense
                  >
                    <q-tooltip
                      content-class="bg-dark"
                      content-style="font-size:14px;padding-top:4px;"
                      :offset="[0, 3]"
                      v-if="addons.params.tooltip"
                    >
                      {{ addons.params.tooltip }}
                    </q-tooltip>
                  </q-btn>
                </span>
              </span>
              <q-btn
                :disable="loading"
                icon="edit"
                @click="
                  table.editForm.row = props.row
                  table.editForm.show = true
                "
                color="warning"
                clickable
                dense
              >
                <q-tooltip
                  content-class="bg-dark"
                  content-style="font-size:14px;padding-top:4px;"
                  :offset="[0, 3]"
                >
                  Edit
                </q-tooltip>
              </q-btn>
            </span>
            <span v-else-if="column.type == 'check'">
              <q-icon
                :name="props.row[column.key.check] ? 'check' : 'close'"
                :color="props.row[column.key.check] ? 'positive' : 'grey'"
                class="text-h5 text-weight-bold"
              />
            </span>
            <span v-else-if="column.type == 'tooled'">
              {{ toolGetter(column, props) }}
            </span>
            <span v-else-if="column.type == 'tooled-basis'">
              {{ getBasis(props, column) }}
            </span>
            <span v-else>
              {{
                {}.toString.call(column.field) === '[object Function]'
                  ? column.field(props.row)
                  : props.row[column.name]
              }}
            </span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <Dialog
      :user="user"
      v-if="table.addForm"
      :self="table"
      :dialog="table.addForm"
      :dataId="dataId"
      :addFormLabel="addFormLabel"
    >
      <template v-slot:topRights>
        <slot name="addFormTopRight"></slot>
      </template>
    </Dialog>
    <Dialog
      :user="user"
      v-if="table.editForm"
      :self="table"
      :dialog="table.editForm"
      :dataId="dataId"
      :dataWithParams="dataWithParams"
    />
  </div>
</template>
<script>
import { debounce } from 'quasar'
import Dialog from './Dialog'
export default {
  components: {
    Dialog
  },
  props: [
    'user',
    'table',
    'data',
    'label',
    'customClass',
    'addLabel',
    'addFormLabel',
    'dataId',
    'dataWithParams'
  ],
  computed: {
    computedData() {
      return this.$store.getters[this.table.computedData] || []
    }
  },
  data() {
    return {
      loading: false,
      filter: '',
      pagination: {
        sortBy: '',
        descending: 0,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      }
    }
  },
  async mounted() {
    if (this.table.sync) {
      this.getData = debounce(this.getData, 500)
      this.getData({
        pagination: this.pagination
      })
    } else {
      this.getData()
    }
  },
  methods: {
    onRequest(key) {
      if (this.table.sync) {
        this.pagination = key.pagination
        this.table.pagination = key.pagination
        this.getData({
          pagination: this.pagination
        })
      }
    },
    async getData(key) {
      this.loading = true
      try {
        if (this.table.sync) {
          key.pagination.descending = key.pagination.descending ? 1 : 0
          if (this.table.syncWithParams) {
            await this.$store.dispatch(this.table.getData, {
              id: this.dataWithParams,
              search: this.filter,
              ...key.pagination
            })
          } else {
            await this.$store.dispatch(this.table.getData, {
              search: this.filter,
              ...key.pagination
            })
          }
          this.pagination = key.pagination
          this.table.pagination = key.pagination
        } else if (this.table.getDataWithParams) {
          await this.$store.dispatch(this.table.getData, this.dataWithParams)
        } else {
          await this.$store.dispatch(this.table.getData)
        }
      } catch (error) {
        return
      } finally {
        this.loading = false
      }
    },
    toolGetter(column, props) {
      let find = this.$store.getters[column.tool.getter].find(
        tool => tool[column.tool.key] == props.row[column.field]
      )
      let tool = column.tool
      return tool ? (find ? find[tool.value] : '') : ''
    },
    getBasis(requirement, template) {
      var base = template.basing
      var reqBase = requirement.row[base.basis]
      var storeBase = this.$store.getters[base.getters]
      var based = reqBase
        ? storeBase
          ? storeBase.filter(key => key.id == reqBase)[0]
            ? storeBase
                .filter(key => key.id == reqBase)[0]
                [base.key].filter(
                  req => req[base.find] == requirement.row[template.field]
                )[0]
              ? storeBase
                  .filter(key => key.id == reqBase)[0]
                  [base.key].filter(
                    req => req[base.find] == requirement.row[template.field]
                  )[0][base.value]
              : ''
            : ''
          : ''
        : ''
      return based
    }
  },
  watch: {
    computedData() {
      if (this.table.sync) {
        let data = this.$store.getters[this.table.computedData]
        this.pagination.rowsNumber = data.total
      }
    }
  }
}
</script>

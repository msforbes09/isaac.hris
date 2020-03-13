<template>
  <div>
    <div v-if="dialog.type == 'toggle-groups'">
      <q-dialog
        persistent
        v-model="dialog.show"
        transition-show="fade"
        transition-hide="fade"
      >
        <q-card :style="dialog.style">
          <q-card-section>
            <div class="text-h6 text-grey" v-if="dialog.requirements[0]">
              {{ dialog.requirements[0].name }}
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section style="max-height:70vh" class="scroll">
            <form @submit.prevent="onSubmit" class="q-gutter-sm">
              <div
                class="q-mb-lg q-ml-md"
                v-for="(tool, i) in dialog.tool[0]"
                :key="i"
              >
                <div class="text-h6 text-grey-9">{{ tool.name }}</div>
                <span v-if="dialog.requirements[0]" class="row">
                  <q-toggle
                    :disable="loading"
                    v-model="dialog.requirements[0].module_actions"
                    v-for="(action, n) in tool.module_actions"
                    :key="n"
                    :val="action.id"
                    :label="action.name"
                    color="green"
                    class="q-mt-sm text-grey-9 col-12 "
                    dense
                  />
                </span>
              </div>
            </form>
          </q-card-section>
          <q-separator />
          <q-card-actions class="row">
            <div class="col-12">
              <q-btn
                :flat="action.flat"
                :disable="loading"
                :loading="loading && action.loading"
                :label="action.label"
                :color="action.color"
                :icon="action.icon"
                dense
                :class="action.class"
                v-for="(action, i) in dialog.actions"
                @click="actions(action)"
                :key="i"
              />
            </div>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div v-else>
      <q-dialog
        persistent
        v-model="dialog.show"
        transition-show="fade"
        transition-hide="fade"
      >
        <q-card :style="dialog.style">
          <q-card-section class="flex justify-between">
            <div class="text-h5 text-grey">
              {{ addFormLabel || dialog.label }}
            </div>
            <slot name="topRights"></slot>
          </q-card-section>
          <q-separator />
          <q-card-section style="max-height:70vh" class="scroll">
            <q-form
              @submit.prevent="onSubmit"
              class="q-gutter-xs"
              @keydown="error.clear($event.target.name)"
              :loading="loading"
            >
              <div
                v-for="(requirement, i) in dialog.requirements"
                :key="i"
                :class="dialog.requirementClass"
              >
                <div
                  v-for="(template, n) in dialog.template"
                  :key="n"
                  :class="template.class"
                >
                  <span v-if="template.variety == 'date'">
                    <q-input
                      :disable="loading"
                      v-model="requirement[template.model]"
                      :label="template.label"
                      :error-message="error.get(template.name)"
                      :error="error.has(template.name)"
                      :required="template.required"
                      :outlined="template.outlined"
                      :emit-value="template.emitValue"
                      :map-options="template.mapOptions"
                      :style="template.style"
                      @focus="error.clear(template.name)"
                      :mask="template.mask"
                      :filled="template.filled"
                      dense
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy>
                            <q-date
                              v-model="requirement[template.model]"
                              :default-year-month="template.defaultYearMonth"
                              :rules="['date']"
                              mask="YYYY-MM-DD"
                              lazy-rule
                            />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </span>
                  <span v-if="template.variety == 'text'">
                    <q-input
                      :disable="loading"
                      v-model="requirement[template.model]"
                      :label="template.label"
                      :error-message="error.get(template.name)"
                      :error="error.has(template.name)"
                      :name="template.name"
                      :type="template.type"
                      :filled="template.filled"
                      :required="template.required"
                      :outlined="template.outlined"
                      :emit-value="template.emitValue"
                      :map-options="template.mapOptions"
                      :style="template.style"
                      :mask="template.mask"
                      :fill-mask="template.mask ? '#' : ''"
                      :maxlength="template.max"
                      dense
                    />
                  </span>
                  <span v-if="template.variety == 'select'">
                    <q-select
                      :disable="loading"
                      v-model="requirement[template.model]"
                      :label="template.label"
                      :error-message="error.get(template.name)"
                      :error="error.has(template.name)"
                      :name="template.name"
                      :option-value="template.optionValue"
                      :option-label="template.optionLabel"
                      :options="$store.getters[template.options.getters]"
                      :required="template.required"
                      :filled="template.filled"
                      :outlined="template.outlined"
                      :emit-value="template.emitValue"
                      :map-options="template.mapOptions"
                      :style="template.style"
                      dense
                    />
                  </span>
                  <span v-if="template.variety == 'select-basis'">
                    <q-select
                      :disable="loading"
                      v-model="requirement[template.model]"
                      :label="template.label"
                      :error-message="error.get(template.name)"
                      :error="error.has(template.name)"
                      :name="template.name"
                      :option-value="template.optionValue"
                      :option-label="template.optionLabel"
                      :options="getBasis(requirement, template)"
                      :required="template.required"
                      :filled="template.filled"
                      :outlined="template.outlined"
                      :emit-value="template.emitValue"
                      :map-options="template.mapOptions"
                      :style="template.style"
                      dense
                    />
                  </span>
                  <span v-if="template.variety == 'input-select'">
                    <q-input
                      dense
                      v-model="requirement[template.input_model]"
                      :label="template.label"
                      @change="
                        error.clear(template.name)
                        requirement[template.model] = template.mask_model(
                          requirement,
                          template
                        )
                      "
                      @keydown="
                        error.clear(template.name)
                        requirement[template.model] = template.mask_model(
                          requirement,
                          template
                        )
                      "
                      :error="error.has(template.name)"
                      :error-message="error.get(template.name)"
                      :mask="template.mask"
                      :fill-mask="template.mask ? '#' : ''"
                      :disable="loading"
                      :filled="template.filled"
                    >
                      <template v-slot:append>
                        <q-select
                          dense
                          class="input-select"
                          :disable="loading"
                          v-model="requirement[template.select_model]"
                          :options="$store.getters[template.options.getters]"
                          :option-value="template.optionValue"
                          :option-label="template.optionLabel"
                          :emit-value="template.emitValue"
                          :map-options="template.mapOptions"
                          @blur="
                            requirement[template.model] = template.mask_model(
                              requirement,
                              template
                            )
                          "
                          @focus="
                            error.clear(template.name)
                            requirement[template.model] = template.mask_model(
                              requirement,
                              template
                            )
                          "
                        />
                      </template>
                    </q-input>
                  </span>
                  <span v-if="template.variety == 'toggle'">
                    <q-toggle
                      v-model="requirement[template.model]"
                      :style="template.style"
                      :true-value="1"
                      :false-value="0"
                      :label="template.label || 'Active'"
                      color="green"
                    />
                  </span>
                  <span v-if="template.variety == 'check'">
                    <q-checkbox
                      v-model="requirement[template.model]"
                      :true-value="1"
                      :false-value="0"
                      :style="template.style"
                      :label="template.label"
                      color="green"
                    />
                  </span>
                </div>
              </div>
            </q-form>
          </q-card-section>
          <q-separator />
          <q-card-actions class="row">
            <div class="col-12">
              <q-btn
                :flat="action.flat"
                :disable="loading"
                :label="action.label"
                :color="action.color"
                :icon="action.icon"
                dense
                v-for="(action, i) in dialog.actions"
                @click="actions(action)"
                :key="i"
                :class="action.class"
              />
            </div>
          </q-card-actions>
          <q-inner-loading :showing="loading">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {},
    dialog: { required: true },
    addFormLabel: {},
    dataWithParams: {},
    dataId: {},
    self: {}
  },
  computed: {
    show() {
      return this.dialog.show
    },
    error() {
      return this.$store.getters.error
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async runs(key, custom) {
      let go = 1
      if (key) {
        for (var i = 0; i < key.length; i++) {
          if (go) {
            go = await this[key[i].method](key[i].params, custom)
          }
        }
      }
    },
    closePopup() {
      this.error.reset()
      this.dialog.show = false
      return 1
    },
    actions(key) {
      this.runs(key.onClick)
      return 1
    },
    onSubmit() {
      let dialog = this.dialog
      for (var i = 0; i < dialog.requirements.length; i++) {
        for (var n = 0; n < dialog.template.length; n++) {
          if (dialog.template[n].setValueToTool) {
            dialog.requirements[i][
              dialog.template[n].model
            ] = this.toolGetterReverse(
              dialog.template[n],
              dialog.requirements[i]
            )
          }
        }
        this.runs(dialog.onSubmit, dialog.requirements[i])
      }
      return 1
    },
    onDelete() {
      for (var i = 0; i < this.dialog.requirements.length; i++) {
        this.runs(this.dialog.onDelete, this.dialog.requirements[i])
      }
      return 1
    },
    async dispatch(key, custom) {
      this.loading = true
      try {
        switch (key.type) {
          case 'custom':
            await this.$store.dispatch(key.dispatch, custom)
            break
          case 'target':
            if (this.dialog.withPagination) {
              await this.$store.dispatch(key.dispatch, {
                ...this.getTarget(key),
                ...this.self.pagination
              })
            } else {
              await this.$store.dispatch(key.dispatch, this.getTarget(key))
            }
            break
          default:
            await this.$store.dispatch(key.dispatch)
        }
        return 1
      } catch (error) {
        return
      } finally {
        this.loading = false
      }
    },
    keying(key) {
      var array = this.getTarget(key.target.array)
      var value = this.getTarget(key.value)
      if (key.single) {
        key.target.setValue({
          array,
          value
        })
      } else {
        for (var i = 0; i < array.length; i++) {
          key.target.setValue({
            array: array[i],
            value
          })
        }
      }
      return 1
    },
    getTarget(key) {
      let target = this
      for (var i = 0; i < key.target.length; i++) {
        target = target[key.target[i]]
      }
      return target
    },
    async clearOnTarget(key) {
      await this.getTarget(key).splice(0, this.getTarget(key).length)
      return 1
    },
    async pushStateToTarget(key) {
      if (this.dialog.template) {
        for (var i = 0; i < this.dialog.template.length; i++) {
          if (this.dialog.template[i].setValueToTool) {
            this.$store.getters[key.state][
              this.dialog.template[i].model
            ] = this.toolGetter(
              this.dialog.template[i],
              this.$store.getters[key.state]
            )
          }
        }
      }
      await this.getTarget(key).push(this.$store.getters[key.state])
      return 1
    },
    toolGetter(column, props) {
      let find = this.$store.getters[column.options.getters].find(
        tool => tool[column.optionValue] == props[column.model]
      )
      let options = column.options
      return options
        ? find
          ? find[column.optionLabel]
          : props[column.model]
        : props[column.model]
    },
    toolGetterReverse(column, props) {
      let find = this.$store.getters[column.options.getters].find(
        tool => tool[column.optionLabel] == props[column.model]
      )
      let options = column.options
      return options
        ? find
          ? find[column.optionValue]
          : props[column.model]
        : props[column.model]
    },
    getBasis(requirement, template) {
      let based = requirement[template.options.basis]
        ? this.$store.getters[template.options.getters].filter(
            key => key.id == requirement[template.options.basis]
          )[0][template.options.key]
        : []
      return based
    },
    createRequirement() {
      let requirement = {}
      for (var i = 0; i < this.dialog.template.length; i++) {
        requirement[this.dialog.template[i].model] =
          this.dialog.template[i].defaultValue !== undefined
            ? this.dialog.template[i].defaultValue
            : ''
      }
      this.dialog.requirements.push(requirement)
      return 1
    }
  },
  watch: {
    show() {
      if (this.show) {
        this.runs(this.dialog.onShow)
      }
    }
  }
}
</script>

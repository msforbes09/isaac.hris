<template>
  <div>
    <q-card class="q-pa-lg">
      <div class="text-h4 q-mb-md text-grey-6">
        <q-btn
          :disable="loading || error.any()"
          color="grey-5"
          :to="{ name: 'applicant' }"
          icon="keyboard_arrow_left"
          dense
          class="q-mr-sm"
          style="margin-top:-7px"
        />
        Edit Applicant
        <q-spinner color="grey" size="1em" class="self-center" v-if="loading" />
      </div>
      <q-stepper
        v-model="form.stepNavigation"
        ref="stepper"
        done-color="green"
        active-color="warning"
        inactive-color="grey-6"
        @transition="eventStepped"
        animated
        header-nav
      >
        <q-step
          :disable="loading"
          v-for="(step, index) in form.steps"
          :key="index"
          :name="step.number"
          :title="step.name"
          :icon="step.icon"
          :done="step.done"
          :error="checkStepError(step)"
        >
          <div v-if="!initLoading">
            <q-form
              v-for="(requirement, i) in step.requirements"
              :key="i"
              class="q-col-gutter-md row"
            >
              <div
                v-for="(template, n) in step.type.template"
                :key="n"
                :class="template.class"
                v-show="!template.hidden"
              >
                <span v-if="template.type == 'date'">
                  <q-input
                    v-model="requirement[template.model]"
                    :label="template.label"
                    :error="inputCheckError({ template, requirement, step })"
                    :error-message="error.get(template.name)"
                    @blur="checkAllRequiredDone"
                    @focus="error.clear(template.name)"
                    :disable="inputCheckDisable({ step, requirement })"
                    :mask="template.mask"
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

                <span v-else-if="template.type == 'boolean-checkbox'">
                  <q-checkbox
                    v-model="requirement[template.model]"
                    :label="template.label"
                    :true-value="1"
                    :false-value="0"
                    color="green"
                    class="q-mt-sm"
                  />
                </span>
                <span v-else-if="template.type == 'select'">
                  <q-select
                    :disable="inputCheckDisable({ step, requirement })"
                    v-model="requirement[template.model]"
                    :label="template.label"
                    @blur="
                      checkAllRequiredDone
                      error.clear(template.name)
                    "
                    @focus="error.clear(template.name)"
                    @input="checkSelect({ step, requirement, template })"
                    :error="inputCheckError({ template, requirement, step })"
                    :error-message="error.get(template.name)"
                    :options="getTools(template)"
                    :option-value="
                      template.option ? template.option.value : null
                    "
                    :option-label="
                      template.option ? template.option.label : null
                    "
                    emit-value
                    map-options
                  />
                </span>
                <span v-else-if="template.type == 'input-select'">
                  <q-input
                    v-model="requirement[template.input_model]"
                    :label="template.label"
                    @blur="checkAllRequiredDone"
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
                    :error="inputCheckError({ template, requirement, step })"
                    :error-message="error.get(template.name)"
                    :mask="template.mask"
                    :fill-mask="template.mask ? '#' : ''"
                    :disable="
                      inputCheckDisable({
                        step,
                        requirement
                      })
                    "
                  >
                    <template v-slot:append>
                      <q-select
                        :disable="inputCheckDisable({ step, requirement })"
                        v-model="requirement[template.select_model]"
                        :options="getTools(template)"
                        @blur="
                          checkAllRequiredDone
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
                <span v-else>
                  <q-input
                    :disable="
                      inputCheckDisable({ step, requirement }) ||
                        loading ||
                        template.disabled
                    "
                    v-model="requirement[template.model]"
                    :label="template.label"
                    @blur="checkAllRequiredDone"
                    @change="error.clear(template.name)"
                    @keydown="error.clear(template.name)"
                    :error="inputCheckError({ template, requirement, step })"
                    :error-message="error.get(template.name)"
                    :mask="template.mask"
                    :fill-mask="template.mask ? '#' : ''"
                    :maxlength="template.max"
                  />
                </span>
              </div>
              <div class="col-12 q-mb-xl">
                <q-btn
                  :disable="error.any()"
                  label="Save"
                  @click="save(step.form, requirement.id)"
                  icon="save"
                  color="positive"
                />
                <q-btn
                  :disable="error.any()"
                  v-if="!step.noDelete && requirement.id != -1"
                  label="Delete"
                  @click="removeForm(step.form, requirement.id)"
                  icon="delete"
                  color="negative"
                  class="q-ml-md"
                />
              </div>
            </q-form>
          </div>
          <q-stepper-navigation>
            <q-btn
              :disable="error.any() || loading || form.stepNavigation == 1"
              label="Back"
              @click="form.stepNavigation = form.stepNavigation - 1"
              icon="arrow_back_ios"
              color="grey-7"
            />
            <q-btn
              :disable="
                error.any() ||
                  loading ||
                  form.stepNavigation == form.steps.length
              "
              icon="arrow_forward_ios"
              label="Next"
              @click="form.stepNavigation = form.stepNavigation + 1"
              color="grey-7"
              class="q-ml-sm"
            />
            <q-btn
              :disable="loading"
              label="Delete Applicant"
              @click="remove"
              icon="delete"
              color="negative"
              class="q-ml-sm float-right"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </q-card>
    <q-btn @click="toolParenting()" />
  </div>
</template>

<script>
export default {
  computed: {
    form() {
      return this.$store.getters['applicant/form']
    },
    error() {
      return this.$store.getters.error
    },
    tools() {
      return this.$store.getters['tools/applicants'] || []
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      initLoading: false,
      loading: false
    }
  },
  async mounted() {
    this.form.stepNavigation = 1
    this.form.steps = await this.$store.dispatch(
      'applicant/clearForm',
      this.form.steps
    )
    this.initLoading = true
    this.getApplicant()
  },
  methods: {
    inputCheckError(key) {
      let error = this.error
      return (
        error.has(key.template.name) &&
        (error.requestName == key.requirement.id ||
          error.requestName == key.step.form) &&
        this.form.focusId == key.requirement.id
      )
    },
    inputCheckDisable(key) {
      let error = this.error

      return (
        this.loading ||
        (error.any() &&
          (key.requirement.id == -1
            ? error.requestName != key.step.form
            : this.form.focusId != key.requirement.id))
      )
    },
    confirm(key) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: key.message,
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          key.function()
        })
    },
    remove() {
      this.confirm({
        message: 'Are you sure you want to delete Applicant?',
        function: async () => {
          if (this.loading) return
          this.loading = true
          try {
            await this.$store.dispatch('applicant/remove', this.id)
            this.$router.push({ name: 'applicant' })
            return
          } catch (error) {
            return
          } finally {
            this.loading = false
          }
        }
      })
    },
    checkStepError(key) {
      let countError = 0
      for (var n = 0; n < key.requirements.length; n++) {
        for (var x = 0; x < key.type.template.length; x++) {
          let template = key.type.template
          countError +=
            template.length > 0 &&
            this.error.has(key.requirements[n][template.name])
              ? 1
              : 0
        }
      }
      return countError > 0
    },
    toolParenting() {
      console.log('this.form.steps[4].requirements')
      console.log(this.form.steps[4].requirements)
      // this.getFormValue('client_id')
    },
    getFormValue(key) {
      let treturn = 0
      this.form.steps.forEach(step => {
        step.requirements.forEach(req => {
          if (req[key]) {
            treturn = req[key]
          }
        })
      })
      return treturn
    },
    selectClearChildren(key) {
      var ktemp = key.template
      var steps = this.form.steps
      for (var i = 0; i < steps.length; i++) {
        var step = steps[i]
        var temps = step.type.template
        var reqs = step.requirements
        for (var n = 0; n < reqs.length; n++) {
          var req = reqs[n]
          for (var x = 0; x < temps.length; x++) {
            var temp = temps[x]
            if (
              step.id == key.step.id &&
              req.id == key.requirement.id &&
              ktemp.model == temp.model
            ) {
              let ktool = ktemp.tools
              for (var y = 0; y < temps.length; y++) {
                var tool = temps[y].tools
                var model = temps[y].model
                if (tool) {
                  if (tool.parent) {
                    var childrenFound = tool.parent.find(
                      key => key.name == ktool.name && key.ref == ktool.ref
                    )
                    if (childrenFound) {
                      this.form.steps[i].requirements[n][model] = ''
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    checkSelect(key) {
      if (key.template.tools) {
        this.selectClearChildren(key)
      }
    },
    getTools(template) {
      let treturn = []
      if (this.tools) {
        if (template.tools) {
          let tools = template.tools
          if (tools.parent) {
            // if child or child parent
            var tobj = this.tools
            tools.parent.forEach(key => {
              if (tobj[key.name]) {
                if (this.getFormValue(key.id)) {
                  let res = tobj[key.name].find(
                    keyid => keyid.id == this.getFormValue(key.id)
                  )
                  if (res[tools.name]) {
                    let tool = res[tools.name]
                    treturn = tool.map(key =>
                      template.option ? key : key.name
                    )
                  }
                }
              }
            })
          } else {
            //if grand parent
            if (this.tools[tools.name]) {
              let tool = this.tools[tools.name]
              treturn = tool.map(key => (template.option ? key : key.name))
            }
          }
        } else {
          if (this.tools.keys.length > 0) {
            treturn = this.tools.keys
              .find(key => key.name == template.select_name)
              .keywords.map(key => key.value)
          }
        }
      }
      return treturn
    },
    getInputSelects(key) {
      return key.type.template.filter(temp => temp.type == 'input-select')
    },
    checkAutoFills(key) {
      let autoFill = key.autoFill
      var property = ''
      if (autoFill) {
        property = this.$store.getters[autoFill.getters]
        for (var y = 0; y < autoFill.property.length; y++) {
          property = property[autoFill.property[y]]
        }
      } else if (key.defaultValue > -1) {
        property = key.defaultValue
      } else {
        property = ''
      }
      return property
    },
    noObject(key) {
      return key.step.returnType == 'object' ? [key.res] : key.res
    },
    async getApplicant() {
      if (this.loading) return
      this.loading = true
      try {
        let steps = this.form.steps
        for (var i = 0; i < steps.length; i++) {
          let step = steps[i]
          var res = await this.$store.dispatch('applicant/getApplicant', {
            url: step.url_get,
            form: step.form,
            id: this.id
          })

          res = this.noObject({ step, res })
          step.requirements = []
          if (res.length > 0) {
            for (var n = 0; n < res.length; n++) {
              let inputSelects = this.getInputSelects(step)
              inputSelects.forEach(inputSelect => {
                if (Object.keys(res[n]).includes(inputSelect.model)) {
                  let tarr = res[n][inputSelect.model].split(' ')
                  res[n][inputSelect.select_model] = tarr[tarr.length - 1]
                  res[n][inputSelect.input_model] = tarr.shift()
                }
              })
              step.requirements.push(res[n])
            }
          } else {
            let createDummy = {}
            for (var x = 0; x < step.type.template.length; x++) {
              var temp = step.type.template[x]
              createDummy[temp.model] = this.checkAutoFills(temp)
            }
            step.requirements.push({ ...createDummy, id: -1 })
          }
          this.addForm(step)
        }
      } catch (error) {
        return
      } finally {
        this.loading = false
        this.initLoading = false
      }
    },
    async save(key, id) {
      if (this.loading) return
      this.loading = true
      try {
        this.form.focusId = id
        for (var z = 0; z < this.form.steps.length; z++) {
          let step = this.form.steps[z]
          let req = step.requirements
          if (step.form == key) {
            for (var b = 0; b < req.length; b++) {
              let checkHasValue = 0
              for (var c = 0; c < step.type.template.length; c++) {
                let temp = step.type.template[c]
                checkHasValue += req[b][temp.model] ? 1 : 0
              }
              if (req[b].id == id) {
                if (req[b].id == -1 || typeof req[b].id === 'undefined') {
                  // if no id, this is new, this needs to be store, not updated
                  if (checkHasValue > 0) {
                    try {
                      let res = await this.$store.dispatch('applicant/store', {
                        url: step.url_store,
                        submit: req[b],
                        form: step.form,
                        id: this.id
                      })
                      this.form.steps[z].requirements.splice(b, 1)
                      this.form.steps[z].requirements.push(
                        res[step.apiResponse]
                      )
                      this.addForm(this.form.steps[z])
                    } catch (error) {
                      return
                    }
                  }
                } else {
                  // if has id, just update
                  // save only the item with specific id, not all requirements
                  if (checkHasValue > 0) {
                    await this.$store.dispatch('applicant/update', {
                      url: step.url_update,
                      submit: req[b],
                      form: step.form,
                      id: this.id
                    })
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        return
      } finally {
        this.loading = false
      }
    },
    async removeForm(key, id) {
      this.confirm({
        message: 'Are you sure you want to delete this item?',
        function: async () => {
          if (this.loading) return
          this.loading = true
          try {
            this.form.focusId = id
            for (var z = 0; z < this.form.steps.length; z++) {
              let step = this.form.steps[z]
              let req = step.requirements
              if (step.form == key) {
                for (var b = 0; b < req.length; b++) {
                  if (req[b].id == id) {
                    await this.$store.dispatch('applicant/removeForm', {
                      ...req[b],
                      form: step.form
                    })
                    this.form.steps[z].requirements.splice(b, 1)
                  }
                }
              }
            }
          } catch (error) {
            return
          } finally {
            this.loading = false
          }
        }
      })
    },
    checkAllRequiredDone() {
      let notDone = 0
      for (var n = 0; n < this.form.steps.length; n++) {
        let req = this.form.steps[n].requirements
        for (var i = 0; i < req.length; i++) {
          if (req[i].required) {
            notDone += req[i].model.length ? 0 : 1
          }
        }
      }
      this.form.requiredDone = notDone == 0
    },
    checkAllDone() {
      for (var n = 0; n < this.form.steps.length; n++) {
        let type = this.form.steps[n].type
        let notDone = 0
        let req = this.form.steps[n].requirements
        for (var x = 0; x < req.length; x++) {
          for (var y = 0; y < type.template.length; y++) {
            let model = req[x][type.template[y].model]
            model = model === null ? '' : model
            notDone += model.length || Number.isInteger(model) ? 0 : 1
          }
        }
        this.form.steps[n].done = notDone == 0
      }
    },
    eventStepped() {
      this.checkAllDone()
      this.checkAllRequiredDone()
    },
    checkStepDone(key) {
      let notDone = 0
      for (var i = 0; i < key.length; i++) {
        notDone += key[i].model.length ? 0 : 1
      }
      return notDone == 0
    },
    addForm(key) {
      if (
        key.extendable &&
        key.requirements[key.requirements.length - 1].id != -1
      ) {
        let object = {}
        for (var i = 0; i < key.type.template.length; i++) {
          let temp = key.type.template[i]
          object[temp.model] = this.checkAutoFills(temp)
        }
        key.requirements.push({ ...object, id: -1 })
      }
    }
  }
}
</script>

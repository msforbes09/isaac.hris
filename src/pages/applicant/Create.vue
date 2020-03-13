<template>
  <div>
    <q-card class="q-pa-lg">
      <div class="text-h4 q-mb-md text-grey-6">
        <q-btn
          icon="keyboard_arrow_left"
          class="q-mr-sm"
          color="grey-5"
          style="margin-top:-7px"
          :to="{ name: 'applicant' }"
          :disable="loading"
          dense
        />
        Add Applicant
      </div>
      <q-stepper
        v-model="form.stepNavigation"
        ref="stepper"
        done-color="primary"
        active-color="grey"
        inactive-color="grey-6"
        @transition="eventStepped"
        animated
      >
        <q-step
          v-for="(step, index) in [form.steps[0]]"
          :key="index"
          :name="step.number"
          :title="step.name"
          :icon="step.icon"
          :done="step.done"
          :error="checkStepError(step)"
        >
          <q-form
            v-for="(requirement, i) in step.requirements"
            :key="i"
            class="q-col-gutter-md row"
          >
            <div
              v-for="(template, n) in step.type.template"
              :key="n"
              :class="template.class"
            >
              <span v-if="template.type == 'date'">
                <q-input
                  v-model="requirement[template.model]"
                  :label="template.label"
                  :error="error.has(template.name)"
                  :error-message="error.get(template.name)"
                  @blur="checkAllRequiredDone"
                  @focus="error.clear(template.name)"
                  :mask="template.mask"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy>
                        <q-date
                          v-model="requirement[template.model]"
                          :default-year-month="template.defaultYearMonth"
                          mask="YYYY-MM-DD"
                          lazy-rule
                          :rules="['date']"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </span>
              <span v-else-if="template.type == 'select'">
                <q-select
                  v-model="requirement[template.model]"
                  :options="
                    getTools(template.select_name, template.select_type)
                  "
                  :label="template.label"
                  :error="error.has(template.name)"
                  :error-message="error.get(template.name)"
                  @blur="checkAllRequiredDone"
                  @change="error.clear(template.name)"
                />
              </span>
              <span v-else>
                <q-input
                  :disable="loading || template.disabled"
                  v-model="requirement[template.model]"
                  :label="template.label"
                  @blur="checkAllRequiredDone"
                  @change="error.clear(template.name)"
                  :error="error.has(template.name)"
                  :error-message="error.get(template.name)"
                  :mask="template.mask"
                  :fill-mask="template.mask ? '#' : ''"
                  unmasked-value
                />
              </span>
            </div>
            <div
              class="col-12 q-mb-lg q-mt-sm q-pa-xl"
              v-if="step.extendable && step.requirements.length - 1 != i"
            >
              <q-separator style="width:250px;margin:0px auto;"></q-separator>
            </div>
          </q-form>
          <div class="col-12 q-my-xl column" v-if="step.extendable">
            <q-btn
              color="secondary"
              :label="step.addFormLabel"
              @click="addForm(step)"
              icon="add"
              class="self-center"
            />
          </div>
          <q-stepper-navigation>
            <q-btn
              :disable="loading || form.stepNavigation == 1"
              label="Back"
              @click="form.stepNavigation = form.stepNavigation - 1"
              icon="arrow_back_ios"
              color="grey-7"
            />
            <q-btn
              :disable="loading || form.stepNavigation == 1"
              icon="arrow_forward_ios"
              label="Next"
              @click="form.stepNavigation = form.stepNavigation + 1"
              color="grey-7"
              class="q-ml-sm"
            />
            <q-btn
              :disable="!form.requiredDone || loading"
              label="Save Applicant"
              @click="store"
              icon="save"
              color="green"
              class="q-ml-sm"
            />
            <q-btn
              :disable="loading"
              label="Cancel Applicant"
              @click="cancel"
              icon="delete"
              color="grey-5"
              class="q-ml-sm float-right"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </q-card>
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
    keys() {
      let applicants = this.$store.getters['tools/applicants'] || []
      return applicants.keys
    }
  },
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    this.form.stepNavigation = 1
    this.clearForm()
  },
  methods: {
    async clearForm() {
      this.form.steps = await this.$store.dispatch(
        'applicant/clearForm',
        this.form.steps
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
    cancel() {
      this.confirm({
        message: 'Are you sure you want to cancel Adding Applicant?',
        function: () => {
          this.$router.push({ name: 'applicant' })
        }
      })
    },
    getTools(name, type) {
      if (type == 'select_tree') {
        if (this.keys.length > 0) {
          return this.keys
            .find(key => key.name == name)
            .keywords.map(key => key.value)
        }
      } else {
        if (this.keys.length > 0) {
          return this.keys
            .find(key => key.name == name)
            .keywords.map(key => key.value)
        }
      }
    },
    async store() {
      if (this.loading) return
      this.loading = true
      try {
        let id = -1
        let steps = [this.form.steps[0]]
        for (var z = 0; z < steps.length; z++) {
          let step = steps[z]
          let req = step.requirements
          for (var b = 0; b < req.length; b++) {
            let checkHasValue = 0
            let ttemp = step.type.template
            for (var c = 0; c < ttemp.length; c++) {
              let temp = ttemp[c]
              checkHasValue += req[b][temp.model] ? 1 : 0
            }
            if (checkHasValue > 0) {
              let res = await this.$store.dispatch('applicant/store', {
                url: step.url_store,
                submit: req[b],
                form: step.form,
                id: id
              })
              id = step.init ? res.applicant.id : id
            }
            this.addForm(step)
          }
        }
        // this.clearForm()

        this.$router.push({
          name: 'applicant-edit',
          params: { id: id }
        })
      } catch (error) {
        return
      } finally {
        this.loading = false
      }
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
      let done = false
      for (var i = 0; i < key.length; i++) {
        done += key[i].model.length ? 1 : 0
      }
      return done == key.length
    },
    checkStepError(key) {
      let countError = 0
      for (var n = 0; n < key.requirements.length; n++) {
        countError += this.error.has(key.requirements[n].name) ? 1 : 0
      }
      return countError > 0
    },
    addForm(key) {
      if (
        key.extendable &&
        key.requirements[key.requirements.length - 1].id != -1
      ) {
        let object = {}
        for (var i = 0; i < key.type.template.length; i++) {
          object[key.type.template[i].model] = ''
        }
        key.requirements.push({ ...object, id: -1 })
      }
    }
  }
}
</script>

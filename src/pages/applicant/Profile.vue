<template>
  <div class="q-pa-xl">
    <q-card class="q-pa-lg">
      <div class="text-h4 q-mb-lg text-grey-6">
        <q-btn
          icon="keyboard_arrow_left"
          class="q-mr-sm"
          color="grey-5"
          style="margin-top:-7px"
          :to="{ name: 'applicants' }"
          :disable="loading"
          dense
        />
        Profile
      </div>
      <div class="row q-col-gutter-lg">
        <div class="col-md-9">
          <div class="row q-col-gutter-lg">
            <div class="col-md-3">
              <q-input label="Last Name">
                <template v-slot:append>
                  <span>,</span>
                </template>
              </q-input>
            </div>
            <div class="col-md-3">
              <q-input label="First Name" />
            </div>
            <div class="col-md-3">
              <q-input label="Middle Name" />
            </div>
            <div class="col-md-3">
              <q-input label="Nick Name" />
            </div>
            <div class="col-md-12">
              <q-input label="Current Address" />
            </div>
            <div class="col-md-12">
              <q-input label="Permanent Address" />
            </div>
          </div>
        </div>
        <div class="col-md-3 column">
          <div
            class="self-center"
            style="background-image:url(statics/default-profile.jpg);height: 200px; width: 200px"
          ></div>
        </div>
        <div class="col-md-12">
          <div class="row q-col-gutter-lg">
            <div class="col-md-3">
              <q-input label="Contact No." />
            </div>
            <div class="col-md-3">
              <q-input label="Email" type="email" />
            </div>
            <div class="col-md-2">
              <q-input label="Birth Date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy>
                      <q-date
                        default-year-month="1964/01/01"
                        mask="YYYY-MM-DD"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-md-2">
              <q-input label="Birth Place" />
            </div>
            <div class="col-md-2">
              <q-select
                :options="['Option 1', 'Option 2']"
                label="Civil Status"
              />
            </div>
            <div class="col-md-2">
              <q-select :options="['Option 1', 'Option 2']" label="Gender" />
            </div>
            <div class="col-md-2">
              <q-input label="Height" />
            </div>
            <div class="col-md-2">
              <q-input label="Weight" />
            </div>
            <div class="col-md-2">
              <q-select
                :options="['Option 1', 'Option 2']"
                label="Citizenship"
              />
            </div>
            <div class="col-md-2">
              <q-select :options="['Option 1', 'Option 2']" label="Religion" />
            </div>
            <div class="col-md-2">
              <q-select :options="['Option 1', 'Option 2']" label="Tax Code" />
            </div>
            <div class="col-md-2">
              <q-input
                label="CRN"
                mask="####-#######-#"
                fill-mask="####-#######-#"
                unmasked-value
              />
            </div>
            <div class="col-md-2">
              <q-input
                label="SSS"
                mask="##-#######-#"
                fill-mask="##-#######-#"
                unmasked-value
              />
            </div>
            <div class="col-md-2">
              <q-input label="TIN" />
            </div>
            <div class="col-md-2">
              <q-input
                label="Philhealth"
                mask="##-#########-#"
                fill-mask="##-#########-#"
                unmasked-value
              />
            </div>
            <div class="col-md-2">
              <q-input
                label="PAG-IBIG"
                mask="####-####-####"
                fill-mask="####-####-####"
                unmasked-value
              />
            </div>
            <div class="col-md-2">
              <q-input label="PAG-IBIG Tracking" />
            </div>
          </div>
        </div>
      </div>
      <div class="row q-mt-xl">
        <div class="col">
          <q-btn
            :disable="loading"
            label="Save Applicant"
            @click="update"
            icon="save"
            color="primary"
          />
          <q-btn
            :disable="loading"
            label="Delete Applicant"
            @click="remove"
            icon="delete"
            color="red"
            class="float-right"
          />
        </div>
      </div>
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
      id: this.$route.params.id,
      loading: false
    }
  },
  mounted() {
    this.getApplicant()
  },
  methods: {
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
        message: 'Are you sure you want to delete Saved Applicant?',
        function: async () => {
          console.log(this)
          await this.$store.dispatch('applicant/remove', this.id)
          this.$router.push({ name: 'applicant' })
        }
      })
    },
    checkStepError(key) {
      let countError = 0
      for (var n = 0; n < key.requirements.length; n++) {
        countError += this.error.has(key.requirements[n].name) ? 1 : 0
      }
      return countError > 0
    },
    getKey(name) {
      if (this.keys.length > 0) {
        return this.keys
          .find(key => key.name == name)
          .keywords.map(key => key.value)
      }
    },
    async getApplicant() {
      const res = await this.$store.dispatch('applicant/getApplicant', this.id)
      for (var i = 0; i < this.form.steps.length; i++) {
        for (var n = 0; n < this.form.steps[i].requirements.length; n++) {
          let name = res[this.form.steps[i].requirements[n].name]
          this.form.steps[i].requirements[n].model = name ? name : ''
        }
      }
      this.eventStepped()
    },
    async update() {
      if (this.loading) return
      this.loading = true
      try {
        let submit = {}
        for (var i = 0; i < this.form.steps.length; i++) {
          let req = this.form.steps[i].requirements
          for (var n = 0; n < req.length; n++) {
            submit[req[n].name] = req[n].model
          }
        }
        await this.$store.dispatch('applicant/update', {
          submit,
          id: this.id
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
        let notDone = 0
        let req = this.form.steps[n].requirements
        for (var i = 0; i < req.length; i++) {
          notDone += req[i].model.length ? 0 : 1
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
    }
  }
}
</script>

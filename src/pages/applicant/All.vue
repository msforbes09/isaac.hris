<template>
  <div>
    <Table :table="table">
      <template v-slot:addFormTopRight>
        <div>
          <q-btn
            @click="checkApplicant"
            color="primary"
            label="Check Applicant If Exist"
          />
          <q-dialog
            v-model="show"
            transition-show="fade"
            transition-hide="fade"
            persistent
          >
            <q-card style="width:50vw">
              <q-card-section>
                <div class="row">
                  <div class="text-h5 text-grey-6">
                    Check Applicant If Exist
                  </div>
                </div>
                <div class="row q-col-gutter-md">
                  <div class="col-md-4">
                    <q-input v-model="applicant.last_name" label="Last Name" />
                  </div>
                  <div class="col-md-4">
                    <q-input
                      v-model="applicant.first_name"
                      label="First Name"
                    />
                  </div>
                  <div class="col-md-4">
                    <q-input
                      v-model="applicant.middle_name"
                      label="Middle Name"
                    />
                  </div>
                </div>
                <div v-if="result">
                  <q-card dark class="q-pa-sm q-mt-md">
                    <div
                      v-if="!result.exactMatch && !result.otherMatches"
                      class="q-pl-sm"
                    >
                      No Applicant Found.
                    </div>
                    <div v-if="result.exactMatch">
                      <div>
                        <q-card
                          class="q-ma-sm q-pa-sm q-pl-md bg-white text-dark"
                        >
                          <div class="text-bold">
                            {{
                              result.exactMatch.last_name +
                                ', ' +
                                result.exactMatch.first_name +
                                ' ' +
                                result.exactMatch.middle_name
                            }}
                          </div>
                          <div>
                            <span class="text-bold">
                              Birth Date:
                            </span>
                            {{ result.exactMatch.birth_date }}
                          </div>
                          <div>
                            <span class="text-bold">
                              Current Address:
                            </span>
                            {{ result.exactMatch.current_address }}
                          </div>
                          <div>
                            <span class="text-bold">
                              Permanent Address:
                            </span>
                            {{ result.exactMatch.permanent_address }}
                          </div>
                        </q-card>
                      </div>
                    </div>
                    <div v-if="result.otherMatches">
                      <div>
                        <span v-if="!result.exactMatch">
                          No exact, but<br />
                          {{ result.otherMatches.length }} close match(es)
                          found.
                        </span>
                        <div v-for="(match, i) in result.otherMatches" :key="i">
                          <q-card
                            class="q-ma-sm q-pa-sm q-pl-md bg-white text-dark"
                            v-if="match"
                          >
                            <div class="text-bold">
                              {{
                                (match.last_name || '') +
                                  ', ' +
                                  (match.first_name || '') +
                                  ' ' +
                                  (match.middle_name || '')
                              }}
                            </div>
                            <div>
                              <span class="text-bold">
                                Birth Date:
                              </span>
                              {{ match.birth_date || '' }}
                            </div>
                            <div>
                              <span class="text-bold">
                                Current Address:
                              </span>
                              {{ match.current_address || '' }}
                            </div>
                            <div>
                              <span class="text-bold">
                                Permanent Address:
                              </span>
                              {{ match.permanent_address || '' }}
                            </div>
                          </q-card>
                        </div>
                      </div>
                    </div>
                  </q-card>
                </div>
              </q-card-section>
              <q-card-actions class="row">
                <div class="col-12">
                  <q-btn
                    label="Check Applicant"
                    class="float-right"
                    color="primary"
                    icon="search"
                    @click="submitCheckApplicant"
                  />
                  <q-btn
                    label="Close"
                    @click="cancelCheckApplicant"
                    class="float-right q-mr-sm"
                    color="grey"
                    flat
                  />
                </div>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </template>
    </Table>
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
        return this.$store.getters['applicant/table']
      },
      set(key) {
        this.$store.commit('applicant/table', key)
      }
    }
  },
  data() {
    return {
      show: false,
      result: '',
      test: {
        message: 'Applicant record found.',
        exactMatch: {
          id: 100,
          last_name: 'Tamara',
          first_name: 'Renner',
          middle_name: 'Runolfsson',
          nick_name: 'Osvaldo',
          current_address:
            '25515 Deangelo View Apt. 248\nNorth Leslie, CT 23836',
          permanent_address: '97362 Yundt Alley\nSouth Veronica, MI 42321-5892',
          birth_date: '1980-04-24',
          birth_place: 'Mississippi',
          gender: 'male',
          height: '104 cm',
          weight: '73 kg',
          civil_status: null,
          tax_code: null,
          citizenship: null,
          religion: null,
          contact_no: '639568030931',
          email: 'marguerite49@gmail.com',
          crn: null,
          sss: null,
          tin: null,
          philhealth: null,
          pagibig: null,
          pagibig_tracking: null,
          created_at: '2020-03-05 11:42:47',
          updated_at: '2020-03-05 11:42:47',
          match_diff: 0
        },
        otherMatches: []
      },
      applicant: {
        last_name: '',
        first_name: '',
        middle_name: ''
      }
    }
  },
  methods: {
    checkApplicant() {
      this.show = !this.show
    },
    cancelCheckApplicant() {
      this.applicant = {
        last_name: '',
        first_name: '',
        middle_name: ''
      }
      this.result = ''
      this.show = false
    },
    async submitCheckApplicant() {
      this.result = ''
      try {
        const res = await this.$store.dispatch(
          'applicant/checkExists',
          this.applicant
        )
        this.result = res
      } catch (error) {
        return
      }
    }
  }
}
</script>

export default {
  table: {
    getData: 'applicant/getApplicants',
    computedData: 'applicant/applicants',
    label: 'Applicants',
    addLabel: 'Add Applicant',
    options: [10, 20, 50],
    rowKey: 'id',
    search: true,
    sync: true,
    pagination: {
      sortBy: 'last_name',
      descending: 0,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    },
    columns: [
      {
        type: 'edit',
        name: 'editButton',
        key: { id: 'id' },
        field: 'edit',
        align: 'left',
        additional: [
          {
            type: 'button',
            params: {
              class: 'q-mr-sm q-px-sm',
              color: 'secondary',
              toName: 'family',
              tooltip: 'Family Background',
              icon: 'house'
            }
          },
          {
            type: 'button',
            params: {
              class: 'q-mr-sm q-px-sm',
              color: 'secondary',
              toName: 'education',
              tooltip: 'Educational Background',
              icon: 'school'
            }
          },
          {
            type: 'button',
            params: {
              class: 'q-mr-sm q-px-sm',
              color: 'secondary',
              toName: 'employment',
              tooltip: 'Employment History',
              icon: 'home_work'
            }
          },
          {
            type: 'button',
            params: {
              class: 'q-mr-sm q-px-sm',
              color: 'secondary',
              toName: 'application',
              tooltip: 'Applications',
              icon: 'assignment'
            }
          }
        ]
      },
      {
        name: 'last_name',
        field: 'last_name',
        label: 'Last Name',
        align: 'left',
        sortable: true
      },
      {
        name: 'first_name',
        field: 'first_name',
        label: 'First Name',
        align: 'left',
        sortable: true
      },
      {
        name: 'birth_date',
        align: 'left',
        label: 'Birth Date',
        field: 'birth_date',
        sortable: true
      },
      {
        name: 'gender',
        align: 'left',
        label: 'Gender',
        field: 'gender',
        sortable: true
      }
    ],
    addForm: {
      show: false,
      style: 'width:70vw;max-width:70vw;min-width:70vw',
      label: 'Add Applicant',
      sideAction: {
        label: 'Check Applicant If Exist',
        color: 'primary',
        actions: []
      },
      onShow: [
        {
          method: 'clearOnTarget',
          params: {
            target: ['dialog', 'requirements']
          }
        },
        {
          method: 'createRequirement',
          params: {}
        }
      ],
      onSubmit: [
        {
          method: 'dispatch',
          params: {
            type: 'custom',
            dispatch: 'applicant/store'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            dispatch: 'applicant/getApplicants'
          }
        }
      ],
      actions: [
        {
          class: 'float-right',
          color: 'positive',
          label: 'Create',
          disable: true,
          icon: 'save',
          onClick: [{ method: 'onSubmit' }]
        },
        {
          class: 'float-right',
          color: 'grey',
          label: 'Cancel',
          disable: true,
          flat: true,
          onClick: [{ method: 'closePopup' }]
        }
      ],
      template: [
        {
          variety: 'text',
          class: 'col-md-3',
          name: 'last_name',
          label: 'Last Name',
          model: 'last_name',
          required: true
        },
        {
          variety: 'text',
          class: 'col-md-3',
          name: 'first_name',
          label: 'First Name',
          model: 'first_name',
          required: true
        },
        {
          variety: 'text',
          class: 'col-md-3',
          name: 'middle_name',
          label: 'Middle Name',
          model: 'middle_name'
        },
        {
          variety: 'text',
          class: 'col-md-3',
          name: 'nick_name',
          label: 'Nick Name',
          model: 'nick_name'
        },
        {
          variety: 'text',
          class: 'col-md-12',
          name: 'current_address',
          label: 'Current Address',
          model: 'current_address'
        },
        {
          variety: 'text',
          class: 'col-md-12',
          label: 'Permanent Address',
          name: 'permanent_address',
          model: 'permanent_address'
        },
        {
          variety: 'date',
          class: 'col-md-3',
          label: 'Birth Date',
          name: 'birth_date',
          model: 'birth_date',
          defaultYearMonth: '1964/08',
          mask: '####-##-##'
        },
        {
          variety: 'text',
          class: 'col-md-3',
          label: 'Birth Place',
          name: 'birth_place',
          model: 'birth_place'
        },
        {
          variety: 'select',
          class: 'col-md-2',
          name: 'gender',
          label: 'Gender',
          model: 'gender',
          optionValue: 'value',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysGender'
          },
          required: true
        },
        {
          variety: 'input-select',
          class: 'col-md-2',
          name: 'height',
          label: 'Height',
          model: 'height',
          optionValue: 'id',
          optionLabel: 'value',
          input_model: 'height_value',
          select_model: 'height_units',
          outlined: true,
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysHeight'
          },
          mask_model: (input, select) => input + ' ' + select,
          required: true
        },
        {
          variety: 'input-select',
          class: 'col-md-2',
          name: 'weight',
          label: 'Weight',
          model: 'weight',
          optionValue: 'id',
          optionLabel: 'value',
          input_model: 'weight_value',
          select_model: 'weight_units',
          outlined: true,
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysWeight'
          },
          mask_model: (input, select) => input + ' ' + select,
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'civil_status',
          label: 'Civil Status',
          model: 'civil_status',
          optionValue: 'id',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysCivilStatus'
          },
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'citizenship',
          label: 'Citizenship',
          model: 'citizenship',
          optionValue: 'id',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysCitizenship'
          },
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'religion',
          label: 'Religion',
          model: 'religion',
          optionValue: 'id',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysReligion'
          },
          required: true
        },
        {
          variety: 'text',
          class: 'col-md-3',
          label: 'Contact No.',
          name: 'contact_no',
          model: 'contact_no'
        },
        {
          variety: 'select',
          class: 'col-md-2',
          name: 'tax_code',
          label: 'Tax Code',
          model: 'tax_code',
          optionValue: 'id',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysTaxCode'
          },
          required: true
        },
        {
          variety: 'text',
          class: 'col-md-2',
          label: 'SSS',
          name: 'sss',
          mask: '##-#######-#',
          model: 'sss'
        },
        {
          variety: 'text',
          class: 'col-md-2',
          label: 'TIN',
          name: 'tin',
          mask: '###-###-###',
          model: 'tin'
        },
        {
          variety: 'text',
          class: 'col-md-3',
          label: 'Philhealth',
          name: 'philhealth',
          mask: '##-#########-#',
          model: 'philhealth'
        },
        {
          variety: 'text',
          class: 'col-md-3',
          label: 'PAGIBIG',
          name: 'pagibig',
          mask: '####-####-####',
          model: 'pagibig'
        },
        {
          variety: 'text',
          class: 'col-md-5',
          label: 'Email',
          name: 'email',
          model: 'email'
        },
        {
          variety: 'text',
          class: 'offset-md-1 col-md-3',
          label: 'PAGIBIG Tracking',
          name: 'pagibig_tracking',
          model: 'pagibig_tracking',
          mask: '############'
        },
        {
          variety: 'text',
          class: 'col-md-3',
          label: 'CRN',
          name: 'crn',
          mask: '####-#######-#',
          model: 'crn'
        }
      ],
      requirementClass: 'row q-col-gutter-sm',
      requirements: []
    },
    editForm: {
      show: false,
      style: 'width:70vw;max-width:70vw;min-width:70vw',
      label: 'Edit Applicant',
      onShow: [
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'applicant/getApplicant',
            target: ['dialog', 'row', 'id']
          }
        },
        {
          method: 'clearOnTarget',
          params: {
            target: ['dialog', 'requirements']
          }
        },
        {
          method: 'pushStateToTarget',
          params: {
            state: 'applicant/applicant',
            target: ['dialog', 'requirements']
          }
        }
      ],
      onDelete: [
        {
          method: 'dispatch',
          params: {
            type: 'custom',
            dispatch: 'applicant/remove'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'applicant/getApplicants',
            target: ['self', 'pagination']
          }
        }
      ],
      onSubmit: [
        {
          method: 'dispatch',
          params: {
            type: 'custom',
            dispatch: 'applicant/update'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'applicant/getApplicants',
            target: ['self', 'pagination']
          }
        }
      ],
      actions: [
        {
          class: 'float-left',
          color: 'negative',
          label: 'Remove',
          disable: true,
          icon: 'delete',
          onClick: [{ method: 'onDelete' }]
        },
        {
          class: 'float-right',
          color: 'positive',
          label: 'Save',
          disable: true,
          icon: 'save',
          onClick: [{ method: 'onSubmit' }]
        },
        {
          class: 'float-right',
          color: 'grey',
          label: 'Cancel',
          disable: true,
          flat: true,
          onClick: [{ method: 'closePopup' }]
        }
      ],
      template: [
        {
          variety: 'text',
          class: 'col-md-3',
          name: 'last_name',
          label: 'Last Name',
          model: 'last_name',
          required: true
        },
        {
          variety: 'text',
          class: 'col-md-3',
          name: 'first_name',
          label: 'First Name',
          model: 'first_name',
          required: true
        },
        {
          variety: 'text',
          class: 'col-md-3',
          name: 'middle_name',
          label: 'Middle Name',
          model: 'middle_name'
        },
        {
          variety: 'text',
          class: 'col-md-3',
          name: 'nick_name',
          label: 'Nick Name',
          model: 'nick_name'
        },
        {
          variety: 'text',
          class: 'col-md-12',
          name: 'current_address',
          label: 'Current Address',
          model: 'current_address'
        },
        {
          variety: 'text',
          class: 'col-md-12',
          label: 'Permanent Address',
          name: 'permanent_address',
          model: 'permanent_address'
        },
        {
          variety: 'date',
          class: 'col-md-3',
          label: 'Birth Date',
          name: 'birth_date',
          model: 'birth_date',
          defaultYearMonth: '1964/08',
          mask: '####-##-##'
        },
        {
          variety: 'text',
          class: 'col-md-3',
          label: 'Birth Place',
          name: 'birth_place',
          model: 'birth_place'
        },
        {
          variety: 'select',
          class: 'col-md-2',
          name: 'gender',
          label: 'Gender',
          model: 'gender',
          optionValue: 'value',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysGender'
          },
          required: true
        },
        {
          variety: 'input-select',
          class: 'col-md-2',
          name: 'height',
          label: 'Height',
          model: 'height',
          optionValue: 'id',
          optionLabel: 'value',
          input_model: 'height_value',
          select_model: 'height_units',
          outlined: true,
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysHeight'
          },
          mask_model: (input, select) => input + ' ' + select,
          required: true
        },
        {
          variety: 'input-select',
          class: 'col-md-2',
          name: 'weight',
          label: 'Weight',
          model: 'weight',
          optionValue: 'id',
          optionLabel: 'value',
          input_model: 'weight_value',
          select_model: 'weight_units',
          outlined: true,
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysWeight'
          },
          mask_model: (input, select) => input + ' ' + select,
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'civil_status',
          label: 'Civil Status',
          model: 'civil_status',
          optionValue: 'id',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysCivilStatus'
          },
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'citizenship',
          label: 'Citizenship',
          model: 'citizenship',
          optionValue: 'id',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysCitizenship'
          },
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'religion',
          label: 'Religion',
          model: 'religion',
          optionValue: 'id',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysReligion'
          },
          required: true
        },
        {
          variety: 'text',
          class: 'col-md-3',
          label: 'Contact No.',
          name: 'contact_no',
          model: 'contact_no'
        },
        {
          variety: 'select',
          class: 'col-md-2',
          name: 'tax_code',
          label: 'Tax Code',
          model: 'tax_code',
          optionValue: 'id',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysTaxCode'
          },
          required: true
        },
        {
          variety: 'text',
          class: 'col-md-2',
          label: 'SSS',
          name: 'sss',
          mask: '##-#######-#',
          model: 'sss'
        },
        {
          variety: 'text',
          class: 'col-md-2',
          label: 'TIN',
          name: 'tin',
          mask: '###-###-###',
          model: 'tin'
        },
        {
          variety: 'text',
          class: 'col-md-3',
          label: 'Philhealth',
          name: 'philhealth',
          mask: '##-#########-#',
          model: 'philhealth'
        },
        {
          variety: 'text',
          class: 'col-md-3',
          label: 'PAGIBIG',
          name: 'pagibig',
          mask: '####-####-####',
          model: 'pagibig'
        },
        {
          variety: 'text',
          class: 'col-md-5',
          label: 'Email',
          name: 'email',
          model: 'email'
        },
        {
          variety: 'text',
          class: 'offset-md-1 col-md-3',
          label: 'PAGIBIG Tracking',
          name: 'pagibig_tracking',
          model: 'pagibig_tracking',
          mask: '############'
        },
        {
          variety: 'text',
          class: 'col-md-3',
          label: 'CRN',
          name: 'crn',
          mask: '####-#######-#',
          model: 'crn'
        }
      ],
      requirementClass: 'row q-col-gutter-sm',
      requirements: []
    }
  },
  applicant: {},
  applicants: [],
  focusApplicant: {},
  focusApplicantFamilies: [],
  filter: '',
  pagination: {
    sortBy: 'first_name',
    descending: true,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 10
  }
}

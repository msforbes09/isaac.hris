export default {
  application: [],
  applications: [],
  table: {
    getData: 'application/getApplications',
    getDataWithParams: true,
    sync: true,
    syncWithParams: true,
    computedData: 'application/applications',
    visibleColumns: [
      'editButton',
      'date',
      'code',
      'client_id',
      'client_branch_id',
      'client_position_id',
      'interview_date',
      'interview_stat',
      'interview_remarks',
      'exam_date',
      'exam_stat',
      'exam_remarks',
      'medical_stat',
      'medical_remarks',
      'requirement_stat',
      'requirement_remarks',
      'status'
    ],
    back: {
      to: { name: 'applicant' }
    },
    label: 'Application',
    addLabel: 'Add Application',
    options: [10, 20, 50],
    rowKey: 'id',
    pagination: {
      sortBy: '',
      descending: 0,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    },
    columns: [
      {
        style: 'width:67px',
        type: 'edit',
        name: 'editButton',
        key: { id: 'id' },
        label: '',
        field: 'edit',
        align: 'left'
      },
      {
        name: 'date',
        label: 'Date',
        field: 'date',
        align: 'left',
        sortable: true
      },
      {
        name: 'code',
        label: 'Code',
        field: 'code',
        align: 'left',
        sortable: true
      },
      {
        name: 'branch_id',
        label: 'Branch',
        field: 'branch_id',
        align: 'left',
        sortable: true
      },
      {
        name: 'applicant_id',
        label: 'Applicant',
        field: 'applicant_id',
        align: 'left',
        sortable: true
      },
      {
        type: 'tooled',
        tool: {
          getter: 'tools/applicantsClients',
          key: 'id',
          value: 'name'
        },
        name: 'client_id',
        label: 'Client',
        field: 'client_id',
        align: 'left',
        sortable: true
      },
      {
        type: 'tooled-basis',
        basing: {
          getters: 'tools/applicantsClients',
          basis: 'client_id',
          key: 'branches',
          find: 'id',
          value: 'name'
        },
        name: 'client_branch_id',
        label: 'Client Branch',
        field: 'client_branch_id',
        align: 'left',
        sortable: true
      },
      {
        type: 'tooled-basis',
        basing: {
          getters: 'tools/applicantsClients',
          basis: 'client_id',
          key: 'positions',
          find: 'id',
          value: 'name'
        },
        name: 'client_position_id',
        label: 'Client Position',
        field: 'client_position_id',
        align: 'left',
        sortable: true
      },
      {
        name: 'interview_date',
        label: 'Interview Date',
        field: 'interview_date',
        align: 'left',
        sortable: true
      },
      {
        name: 'interview_stat',
        label: 'Interview Status',
        field: 'interview_stat',
        align: 'left',
        sortable: true
      },
      {
        name: 'interview_remarks',
        label: 'Interview Remarks',
        field: 'interview_remarks',
        align: 'left',
        sortable: true
      },
      {
        name: 'exam_date',
        label: 'Exam Date',
        field: 'exam_date',
        align: 'left',
        sortable: true
      },
      {
        name: 'exam_stat',
        label: 'Exam Status',
        field: 'exam_stat',
        align: 'left',
        sortable: true
      },
      {
        name: 'exam_remarks',
        label: 'Exam Remarks',
        field: 'exam_remarks',
        align: 'left',
        sortable: true
      },
      {
        name: 'medical_stat',
        label: 'Medical Status',
        field: 'medical_stat',
        align: 'left',
        sortable: true
      },
      {
        name: 'medical_remarks',
        label: 'Medical Remarks',
        field: 'medical_remarks',
        align: 'left',
        sortable: true
      },
      {
        name: 'requirement_stat',
        label: 'Requirement Status',
        field: 'requirement_stat',
        align: 'left',
        sortable: true
      },
      {
        name: 'requirement_remarks',
        label: 'Requirement Remarks',
        field: 'requirement_remarks',
        align: 'left',
        sortable: true
      },
      {
        name: 'status',
        label: 'Status',
        field: 'status',
        align: 'left',
        sortable: true
      }
    ],
    addForm: {
      show: false,
      style: 'width:30vw',
      label: 'Add Application',
      withPagination: true,
      key: {
        applicant_id: '',
        id: ''
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
        },
        {
          method: 'keying',
          params: {
            value: { target: ['user', 'branch_id'] },
            target: {
              array: { target: ['dialog', 'requirements'] },
              setValue: key => {
                key.array['branch_id'] = key.value
              }
            }
          }
        }
      ],
      onSubmit: [
        {
          method: 'keying',
          params: {
            value: { target: ['dataId'] },
            target: {
              array: { target: ['dialog', 'requirements'] },
              setValue: key => {
                key.array['id'] = key.value
              }
            }
          }
        },
        {
          method: 'dispatch',
          params: {
            type: 'custom',
            dispatch: 'application/store'
          }
        },
        {
          method: 'keying',
          params: {
            single: true,
            value: {
              target: ['dataId']
            },
            target: {
              array: {
                target: ['dialog', 'key']
              },
              setValue: key => {
                key.array['id'] = key.value
              }
            }
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'application/getApplications',
            target: ['dialog', 'key']
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
          variety: 'date',
          name: 'date',
          label: 'Date',
          model: 'date',
          defaultYearMonth: '2020/01',
          mask: '####-##-##',
          required: true
        },
        {
          variety: 'text',
          name: 'branch_id',
          label: 'Branch',
          model: 'branch_id',
          style: 'display:none',
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'client_id',
          label: 'Client',
          model: 'client_id',
          optionValue: 'id',
          optionLabel: 'name',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsClients'
          },
          required: true
        },
        {
          variety: 'select-basis',
          class: 'col-md-3',
          name: 'client_branch_id',
          label: 'Client Branch',
          model: 'client_branch_id',
          optionValue: 'id',
          optionLabel: 'name',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsClients',
            basis: 'client_id',
            key: 'branches'
          },
          required: true
        },
        {
          variety: 'select-basis',
          class: 'col-md-3',
          name: 'client_position_id',
          label: 'Client Position',
          model: 'client_position_id',
          optionValue: 'id',
          optionLabel: 'name',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsClients',
            basis: 'client_id',
            key: 'positions'
          },
          required: true
        },
        {
          variety: 'date',
          name: 'interview_date',
          label: 'Interview Date',
          model: 'interview_date',
          defaultYearMonth: '2020/01',
          mask: '####-##-##',
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'interview_stat',
          label: 'Interview Status',
          model: 'interview_stat',
          optionValue: 'value',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysInterviewStat'
          },
          required: true
        },
        {
          variety: 'text',
          name: 'interview_remarks',
          label: 'Interview Remarks',
          model: 'interview_remarks',
          required: true
        },
        {
          variety: 'date',
          name: 'exam_date',
          label: 'Exam Date',
          model: 'exam_date',
          defaultYearMonth: '2020/01',
          mask: '####-##-##',
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'exam_stat',
          label: 'Exam Status',
          model: 'exam_stat',
          optionValue: 'value',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysExamStat'
          },
          required: true
        },
        {
          variety: 'text',
          name: 'exam_remarks',
          label: 'Exam Remarks',
          model: 'exam_remarks',
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'medical_stat',
          label: 'Medical Status',
          model: 'medical_stat',
          optionValue: 'value',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysMedicalStat'
          },
          required: true
        },
        {
          variety: 'text',
          name: 'medical_remarks',
          label: 'Medical Remarks',
          model: 'medical_remarks',
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'requirement_stat',
          label: 'Requirement Status',
          model: 'requirement_stat',
          optionValue: 'value',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysRequirementStat'
          },
          required: true
        },
        {
          variety: 'text',
          name: 'requirement_remarks',
          label: 'Requirement Remarks',
          model: 'requirement_remarks',
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'status',
          label: 'Status',
          model: 'status',
          optionValue: 'value',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysApplicationStat'
          },
          required: true
        }
      ],
      requirements: []
    },
    editForm: {
      show: false,
      withPagination: true,
      key: {
        applicant_id: '',
        id: ''
      },
      style: 'width:30vw',
      label: 'Edit Application',
      onShow: [
        {
          method: 'keying',
          params: {
            single: true,
            value: {
              target: ['dataId']
            },
            target: {
              array: {
                target: ['dialog', 'key']
              },
              setValue: key => {
                key.array['applicant_id'] = key.value
              }
            }
          }
        },
        {
          method: 'keying',
          params: {
            single: true,
            value: {
              target: ['dialog', 'row', 'id']
            },
            target: {
              array: {
                target: ['dialog', 'key']
              },
              setValue: key => {
                key.array['id'] = key.value
              }
            }
          }
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'application/getApplication',
            target: ['dialog', 'key']
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
            state: 'application/application',
            target: ['dialog', 'requirements']
          }
        },
        {
          method: 'keying',
          params: {
            value: { target: ['user', 'branch_id'] },
            target: {
              array: { target: ['dialog', 'requirements'] },
              setValue: key => {
                key.array['branch_id'] = key.value
              }
            }
          }
        }
      ],
      onDelete: [
        {
          method: 'keying',
          params: {
            single: true,
            value: {
              target: ['dialog', 'row', 'applicant_id']
            },
            target: {
              array: {
                target: ['dialog', 'key']
              },
              setValue: key => {
                key.array['id'] = key.value
              }
            }
          }
        },
        {
          method: 'dispatch',
          params: {
            type: 'custom',
            dispatch: 'application/remove'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'application/getApplications',
            target: ['dialog', 'key']
          }
        }
      ],
      onSubmit: [
        {
          method: 'keying',
          params: {
            single: true,
            value: {
              target: ['dialog', 'row', 'applicant_id']
            },
            target: {
              array: {
                target: ['dialog', 'key']
              },
              setValue: key => {
                key.array['id'] = key.value
              }
            }
          }
        },
        {
          method: 'dispatch',
          params: {
            type: 'custom',
            dispatch: 'application/update'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'application/getApplications',
            target: ['dialog', 'key']
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
          variety: 'date',
          name: 'date',
          label: 'Date',
          model: 'date',
          defaultYearMonth: '2020/01',
          mask: '####-##-##',
          required: true
        },
        {
          variety: 'text',
          name: 'branch_id',
          label: 'Branch',
          model: 'branch_id',
          style: 'display:none',
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'client_id',
          label: 'Client',
          model: 'client_id',
          optionValue: 'id',
          optionLabel: 'name',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsClients'
          },
          required: true
        },
        {
          variety: 'select-basis',
          class: 'col-md-3',
          name: 'client_branch_id',
          label: 'Client Branch',
          model: 'client_branch_id',
          optionValue: 'id',
          optionLabel: 'name',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsClients',
            basis: 'client_id',
            key: 'branches'
          },
          required: true
        },
        {
          variety: 'select-basis',
          class: 'col-md-3',
          name: 'client_position_id',
          label: 'Client Position',
          model: 'client_position_id',
          optionValue: 'id',
          optionLabel: 'name',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsClients',
            basis: 'client_id',
            key: 'positions'
          },
          required: true
        },
        {
          variety: 'date',
          name: 'interview_date',
          label: 'Interview Date',
          model: 'interview_date',
          defaultYearMonth: '2020/01',
          mask: '####-##-##',
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'interview_stat',
          label: 'Interview Status',
          model: 'interview_stat',
          optionValue: 'value',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysInterviewStat'
          },
          required: true
        },
        {
          variety: 'text',
          name: 'interview_remarks',
          label: 'Interview Remarks',
          model: 'interview_remarks',
          required: true
        },
        {
          variety: 'date',
          name: 'exam_date',
          label: 'Exam Date',
          model: 'exam_date',
          defaultYearMonth: '2020/01',
          mask: '####-##-##',
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'exam_stat',
          label: 'Exam Status',
          model: 'exam_stat',
          optionValue: 'value',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysExamStat'
          },
          required: true
        },
        {
          variety: 'text',
          name: 'exam_remarks',
          label: 'Exam Remarks',
          model: 'exam_remarks',
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'medical_stat',
          label: 'Medical Status',
          model: 'medical_stat',
          optionValue: 'value',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysMedicalStat'
          },
          required: true
        },
        {
          variety: 'text',
          name: 'medical_remarks',
          label: 'Medical Remarks',
          model: 'medical_remarks',
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'requirement_stat',
          label: 'Requirement Status',
          model: 'requirement_stat',
          optionValue: 'value',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysRequirementStat'
          },
          required: true
        },
        {
          variety: 'text',
          name: 'requirement_remarks',
          label: 'Requirement Remarks',
          model: 'requirement_remarks',
          required: true
        },
        {
          variety: 'select',
          class: 'col-md-3',
          name: 'status',
          label: 'Status',
          model: 'status',
          optionValue: 'value',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysApplicationStat'
          },
          required: true
        }
      ],
      requirements: []
    }
  }
}

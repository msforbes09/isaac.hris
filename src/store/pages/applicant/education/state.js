export default {
  education: [],
  educations: [],
  table: {
    getData: 'education/getEducations',
    getDataWithParams: true,
    sync: true,
    syncWithParams: true,
    computedData: 'education/educations',
    back: {
      to: { name: 'applicant' }
    },
    label: 'Education',
    addLabel: 'Add Education',
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
        type: 'tooled',
        tool: {
          getter: 'tools/applicantsKeysEducationLevel',
          key: 'id',
          value: 'value'
        },
        name: 'level',
        label: 'Level',
        field: 'level',
        align: 'left',
        sortable: true
      },
      {
        name: 'school',
        label: 'School',
        field: 'school',
        align: 'left',
        sortable: true
      },
      {
        name: 'year_from',
        label: 'Year From',
        field: 'year_from',
        align: 'left',
        sortable: true
      },
      {
        name: 'year_to',
        label: 'Year To',
        field: 'year_to',
        align: 'left',
        sortable: true
      },
      {
        name: 'details',
        label: 'Details',
        field: 'details',
        align: 'left',
        sortable: true
      }
    ],
    addForm: {
      show: false,
      style: 'width:30vw',
      label: 'Add Education',
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
            dispatch: 'education/store'
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
            dispatch: 'education/getEducations',
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
          variety: 'select',
          class: 'col-md-3',
          name: 'level',
          label: 'Level',
          model: 'level',
          optionValue: 'id',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysEducationLevel'
          },
          required: true
        },
        {
          variety: 'text',
          name: 'school',
          label: 'School',
          model: 'school',
          required: true
        },
        {
          variety: 'text',
          name: 'year_from',
          label: 'Year From',
          model: 'year_from',
          required: true
        },
        {
          variety: 'text',
          name: 'year_to',
          label: 'Year To',
          model: 'year_to',
          required: true
        },
        {
          variety: 'text',
          name: 'details',
          label: 'Details',
          model: 'details',
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
      label: 'Edit Education',
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
            dispatch: 'education/getEducation',
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
            state: 'education/education',
            target: ['dialog', 'requirements']
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
            dispatch: 'education/remove'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'education/getEducations',
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
            dispatch: 'education/update'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'education/getEducations',
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
          variety: 'select',
          class: 'col-md-3',
          name: 'level',
          label: 'Level',
          model: 'level',
          optionValue: 'id',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysEducationLevel'
          },
          setValueToTool: true,
          required: true
        },
        {
          variety: 'text',
          name: 'school',
          label: 'School',
          model: 'school',
          required: true
        },
        {
          variety: 'text',
          name: 'year_from',
          label: 'Year From',
          model: 'year_from',
          required: true
        },
        {
          variety: 'text',
          name: 'year_to',
          label: 'Year To',
          model: 'year_to',
          required: true
        },
        {
          variety: 'text',
          name: 'details',
          label: 'Details',
          model: 'details',
          required: true
        }
      ],
      requirements: []
    }
  }
}

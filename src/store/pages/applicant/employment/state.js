export default {
  employment: [],
  employments: [],
  table: {
    getData: 'employment/getEmployments',
    getDataWithParams: true,
    sync: true,
    syncWithParams: true,
    computedData: 'employment/employments',
    visibleColumns: [
      'editButton',
      'company',
      'date_from',
      'date_to',
      'position',
      'salary',
      'leaving_reason'
    ],
    back: {
      to: { name: 'applicant' }
    },
    label: 'Employment',
    addLabel: 'Add Employment',
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
        name: 'company',
        label: 'Company',
        field: 'company',
        align: 'left',
        sortable: true
      },
      {
        name: 'address',
        label: 'Address',
        field: 'address',
        align: 'left',
        sortable: true
      },
      {
        name: 'date_from',
        label: 'Date From',
        field: 'date_from',
        align: 'left',
        sortable: true
      },
      {
        name: 'date_to',
        label: 'Date To',
        field: 'date_to',
        align: 'left',
        sortable: true
      },
      {
        name: 'position',
        label: 'Position',
        field: 'position',
        align: 'left',
        sortable: true
      },
      {
        name: 'salary',
        label: 'Salary',
        field: 'salary',
        align: 'left',
        sortable: true
      },
      {
        name: 'leaving_reason',
        label: 'Leaving Reason',
        field: 'leaving_reason',
        align: 'left',
        sortable: true
      }
    ],
    addForm: {
      show: false,
      style: 'width:30vw',
      label: 'Add Employment',
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
            dispatch: 'employment/store'
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
            dispatch: 'employment/getEmployments',
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
          variety: 'text',
          name: 'company',
          label: 'Company',
          model: 'company',
          required: true
        },
        {
          variety: 'text',
          name: 'address',
          label: 'Address',
          model: 'address',
          required: true
        },
        {
          variety: 'text',
          class: 'col-md-6',
          name: 'date_from',
          label: 'Date From',
          model: 'date_from',
          required: true
        },
        {
          variety: 'text',
          class: 'col-md-6',
          name: 'date_to',
          label: 'Date To',
          model: 'date_to',
          required: true
        },
        {
          variety: 'text',
          name: 'position',
          label: 'Position',
          model: 'position',
          required: true
        },
        {
          variety: 'text',
          name: 'salary',
          label: 'Salary',
          model: 'salary',
          required: true
        },
        {
          variety: 'text',
          name: 'leaving_reason',
          label: 'Leaving Reason',
          model: 'leaving_reason',
          required: true
        }
      ],
      requirements: []
    },
    editForm: {
      show: false,
      key: {
        applicant_id: '',
        id: ''
      },
      style: 'width:30vw',
      label: 'Edit Employment',
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
            dispatch: 'employment/getEmployment',
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
            state: 'employment/employment',
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
            dispatch: 'employment/remove'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'employment/getEmployments',
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
            dispatch: 'employment/update'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'employment/getEmployments',
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
          variety: 'text',
          name: 'company',
          label: 'Company',
          model: 'company',
          required: true
        },
        {
          variety: 'text',
          name: 'address',
          label: 'Address',
          model: 'address',
          required: true
        },
        {
          variety: 'text',
          class: 'col-md-6',
          name: 'date_from',
          label: 'Date From',
          model: 'date_from',
          required: true
        },
        {
          variety: 'text',
          class: 'col-md-6',
          name: 'date_to',
          label: 'Date To',
          model: 'date_to',
          required: true
        },
        {
          variety: 'text',
          name: 'position',
          label: 'Position',
          model: 'position',
          required: true
        },
        {
          variety: 'text',
          name: 'salary',
          label: 'Salary',
          model: 'salary',
          required: true
        },
        {
          variety: 'text',
          name: 'leaving_reason',
          label: 'Leaving Reason',
          model: 'leaving_reason',
          required: true
        }
      ],
      requirements: []
    }
  }
}

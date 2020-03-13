export default {
  branch: [],
  branches: [],
  table: {
    getData: 'branch/getBranches',
    getDataWithParams: true,
    computedData: 'branch/branches',
    back: {
      to: { name: 'client' }
    },
    sync: true,
    syncWithParams: true,
    pagination: {
      sortBy: '',
      descending: 0,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    },
    label: 'Branch',
    addLabel: 'Add Branch',
    options: [10, 20, 50],
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
        name: 'name',
        key: { check: 'active' },
        label: 'Branch',
        field: 'name',
        align: 'left',
        sortable: true
      },
      {
        style: 'width:70%',
        name: 'code',
        align: 'left',
        label: 'Code',
        field: 'code',
        sortable: true
      }
    ],
    addForm: {
      show: false,
      style: 'width:30vw',
      withPagination: true,
      key: {
        client_id: '',
        id: ''
      },
      label: 'Add Branch',
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
            dispatch: 'branch/store'
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
            dispatch: 'branch/getBranches',
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
          name: 'name',
          label: 'Branch',
          model: 'name',
          required: true
        },
        {
          variety: 'text',
          name: 'code',
          label: 'Code',
          model: 'code',
          required: true
        }
      ],
      requirements: []
    },
    editForm: {
      show: false,
      key: {
        client_id: '',
        id: ''
      },
      withPagination: true,
      style: 'width:30vw',
      label: 'Edit Branch',
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
                key.array['client_id'] = key.value
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
            dispatch: 'branch/getBranch',
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
            state: 'branch/branch',
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
              target: ['dialog', 'row', 'client_id']
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
            dispatch: 'branch/remove'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'branch/getBranches',
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
              target: ['dialog', 'row', 'client_id']
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
            dispatch: 'branch/update'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'branch/getBranches',
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
          name: 'name',
          label: 'Branch',
          model: 'name',
          required: true
        },
        {
          variety: 'text',
          name: 'code',
          label: 'Code',
          model: 'code',
          required: true
        }
      ],
      requirements: []
    }
  }
}

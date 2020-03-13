export default {
  position: [],
  positions: [],
  table: {
    getData: 'position/getPositions',
    getDataWithParams: true,
    computedData: 'position/positions',
    back: {
      to: { name: 'client' }
    },
    label: 'Position',
    addLabel: 'Add Position',
    sync: true,
    syncWithParams: true,
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
        name: 'name',
        key: { check: 'active' },
        label: 'Position',
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
      label: 'Add Position',
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
            dispatch: 'position/store'
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
            dispatch: 'position/getPositions',
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
          label: 'Position',
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
      style: 'width:30vw',
      withPagination: true,
      label: 'Edit Position',
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
            dispatch: 'position/getPosition',
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
            state: 'position/position',
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
            dispatch: 'position/remove'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'position/getPositions',
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
            dispatch: 'position/update'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'position/getPositions',
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
          label: 'Position',
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

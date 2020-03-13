export default {
  table: {
    getData: 'keyword/getKeywords',
    computedData: 'keyword/keywords',
    label: 'Keywords',
    addLabel: 'Add Keyword',
    options: [10, 20, 50],
    flat: true,
    columns: [
      {
        style: 'width:70px',
        type: 'edit',
        name: 'editButton',
        key: { id: 'id' },
        field: 'edit',
        label: 'Edit',
        align: 'left'
      },
      {
        name: 'value',
        align: 'left',
        field: 'value',
        label: 'Keyword',
        sortable: true
      }
    ],
    pagination: {
      rowsPerPage: 10
    },
    addForm: {
      show: false,
      style: 'width:30vw',
      label: 'Add Keywords',
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
                key.array['key'] = key.value
              }
            }
          }
        },
        {
          method: 'dispatch',
          params: {
            type: 'custom',
            dispatch: 'keyword/create'
          }
        },
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
          method: 'dispatch',
          params: {
            dispatch: 'keyword/getKeywords'
          }
        },
        {
          method: 'closePopup'
        }
      ],
      actions: [
        {
          class: 'float-right',
          color: 'positive',
          label: 'Create',
          disable: true,
          loading: true,
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
          name: 'value',
          label: 'Keyword',
          model: 'value',
          required: true
        }
      ],
      requirements: [
        {
          value: '',
          key: ''
        }
      ]
    },
    editForm: {
      show: false,
      style: 'width:30vw',
      label: 'Edit Keywords',
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
            value: { target: ['dialog', 'row', 'value'] },
            target: {
              array: { target: ['dialog', 'requirements'] },
              setValue: key => {
                key.array['value'] = key.value
              }
            }
          }
        },
        {
          method: 'keying',
          params: {
            value: { target: ['dialog', 'row', 'id'] },
            target: {
              array: { target: ['dialog', 'requirements'] },
              setValue: key => {
                key.array['id'] = key.value
              }
            }
          }
        },
        {
          method: 'keying',
          params: {
            value: { target: ['dialog', 'row', 'key_id'] },
            target: {
              array: { target: ['dialog', 'requirements'] },
              setValue: key => {
                key.array['key'] = key.value
              }
            }
          }
        }
      ],
      onDelete: [
        {
          method: 'dispatch',
          params: {
            type: 'custom',
            dispatch: 'keyword/destroy'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            dispatch: 'keyword/getKeywords'
          }
        }
      ],
      onSubmit: [
        {
          method: 'dispatch',
          params: {
            type: 'custom',
            dispatch: 'keyword/update'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            dispatch: 'keyword/getKeywords'
          }
        }
      ],
      actions: [
        {
          class: 'float-left',
          color: 'negative',
          icon: 'delete',
          label: 'Remove',
          disable: true,
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
          name: 'value',
          label: 'Keyword',
          model: 'value',
          required: true
        }
      ],
      requirements: []
    }
  },
  keywords: []
}

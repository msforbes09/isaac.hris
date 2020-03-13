export default {
  client: {},
  clients: [],
  table: {
    getData: 'client/getClients',
    computedData: 'client/clients',
    label: 'Clients',
    addLabel: 'Add Client',
    options: [10, 20, 50],
    sync: true,
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
        style: 'width:243px',
        type: 'edit',
        name: 'editButton',
        key: { id: 'id' },
        label: '',
        field: 'edit',
        align: 'left',
        additional: [
          {
            type: 'button',
            params: {
              class: 'q-mr-sm q-px-sm',
              color: 'secondary',
              toName: 'client-branch',
              label: 'Branch'
            }
          },
          {
            type: 'button',
            params: {
              class: 'q-mr-sm q-px-sm',
              color: 'secondary',
              toName: 'client-position',
              label: 'Position'
            }
          }
        ]
      },
      {
        name: 'name',
        key: { check: 'active' },
        label: 'Client',
        field: 'name',
        align: 'left',
        sortable: true
      },
      {
        name: 'company',
        align: 'left',
        label: 'Company',
        field: row => row.company.name,
        sortable: true
      },
      {
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
      label: 'Add Client',
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
            dispatch: 'client/store'
          }
        },
        {
          method: 'closePopup'
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
            type: 'target',
            dispatch: 'client/getClients',
            target: ['self', 'pagination']
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
          label: 'Client',
          model: 'name',
          required: true
        },
        {
          variety: 'text',
          name: 'code',
          label: 'Code',
          model: 'code',
          required: true
        },
        {
          variety: 'select',
          name: 'company_id',
          label: 'Company',
          model: 'company_id',
          optionValue: 'id',
          optionLabel: 'name',
          outlined: true,
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/companies'
          },
          required: true
        }
      ],
      requirements: []
    },
    editForm: {
      show: false,
      style: 'width:30vw',
      label: 'Edit Client',
      onShow: [
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'client/getClient',
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
            state: 'client/client',
            target: ['dialog', 'requirements']
          }
        }
      ],
      onDelete: [
        {
          method: 'dispatch',
          params: {
            type: 'custom',
            dispatch: 'client/remove'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'client/getClients',
            target: ['self', 'pagination']
          }
        }
      ],
      onSubmit: [
        {
          method: 'dispatch',
          params: {
            type: 'custom',
            dispatch: 'client/update'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'client/getClients',
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
          name: 'name',
          label: 'Client',
          model: 'name',
          required: true
        },
        {
          variety: 'text',
          name: 'code',
          label: 'Code',
          model: 'code',
          required: true
        },
        {
          variety: 'select',
          name: 'company_id',
          label: 'Company',
          model: 'company_id',
          optionValue: 'id',
          optionLabel: 'name',
          outlined: true,
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/companies'
          },
          required: true
        }
      ],
      requirements: []
    }
  }
}

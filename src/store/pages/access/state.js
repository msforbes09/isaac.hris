export default {
  table: {
    getData: 'access/getAccesses',
    computedData: 'access/accesses',
    label: 'Access Types',
    options: [10, 20, 50],
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
        name: 'name',
        align: 'left',
        field: 'name',
        label: 'Name',
        sortable: true
      }
    ],
    pagination: {
      rowsPerPage: 10
    },
    editForm: {
      show: false,
      style: 'width:30vw',
      label: 'Edit Access',
      type: 'toggle-groups',
      tool: [],
      onShow: [
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'access/getAccess',
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
            state: 'tools/modules',
            target: ['dialog', 'tool']
          }
        },
        {
          method: 'pushStateToTarget',
          params: {
            state: 'access/access',
            target: ['dialog', 'requirements']
          }
        }
      ],
      onSubmit: [
        {
          method: 'dispatch',
          params: {
            type: 'custom',
            dispatch: 'access/update'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            dispatch: 'access/getAccesses'
          }
        }
      ],
      actions: [
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
      requirements: []
    }
  },
  accesses: [],
  access: {},
  actions: []
}

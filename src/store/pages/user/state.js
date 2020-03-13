export default {
  table: {
    getData: 'user/getUsers',
    computedData: 'user/users',
    label: 'Users',
    addLabel: 'Add User',
    options: [10, 20, 50],
    columns: [
      {
        type: 'edit',
        name: 'editButton',
        key: { id: 'id', name: 'user-edit' },
        field: 'edit',
        label: 'Edit',
        align: 'left'
      },
      {
        type: 'check',
        name: 'checkActive',
        key: { check: 'active' },
        field: 'active',
        label: 'Active',
        align: 'left',
        sortable: true
      },
      {
        name: 'name',
        align: 'left',
        field: 'name',
        label: 'Name',
        sortable: true
      },
      {
        align: 'left',
        sortable: true,
        name: 'user_type',
        label: 'User Type',
        field: row => row.user_type.name
      },
      {
        align: 'left',
        sortable: true,
        name: 'branch',
        label: 'Branch',
        field: row => row.branch.name
      },
      {
        align: 'left',
        name: 'username',
        field: 'username',
        label: 'Username',
        sortable: true
      },
      {
        name: 'email',
        align: 'left',
        field: 'email',
        label: 'Email',
        sortable: true
      }
    ],
    pagination: {
      rowsPerPage: 10
    },
    addForm: {
      show: false,
      style: 'width:30vw',
      label: 'Add User',
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
            dispatch: 'user/create'
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
            dispatch: 'user/getUsers'
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
          label: 'Name',
          model: 'name',
          required: true
        },
        {
          variety: 'text',
          name: 'username',
          label: 'Username',
          model: 'username',
          required: true
        },
        {
          variety: 'text',
          name: 'email',
          label: 'Email',
          model: 'email',
          type: 'email',
          required: true
        },
        {
          variety: 'select',
          name: 'user_type_id',
          label: 'User Type',
          model: 'user_type_id',
          optionValue: 'id',
          optionLabel: 'name',
          outlined: true,
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/userTypes'
          },
          required: true
        },
        {
          variety: 'select',
          name: 'branch_id',
          label: 'Branch',
          model: 'branch_id',
          optionValue: 'id',
          optionLabel: 'name',
          outlined: true,
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/branches'
          },
          required: true
        }
      ],
      requirements: [
        {
          name: '',
          username: '',
          email: '',
          user_type_id: '',
          branch_id: ''
        }
      ]
    },
    editForm: {
      show: false,
      style: 'width:30vw',
      label: 'Edit User',
      onShow: [
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'user/getUser',
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
            state: 'user/user',
            target: ['dialog', 'requirements']
          }
        }
      ],
      onSubmit: [
        {
          method: 'dispatch',
          params: {
            type: 'custom',
            dispatch: 'user/update'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            dispatch: 'user/getUsers'
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
      template: [
        {
          variety: 'text',
          name: 'name',
          label: 'Name',
          model: 'name',
          required: true
        },
        {
          variety: 'text',
          name: 'username',
          label: 'Username',
          model: 'username',
          required: true
        },
        {
          variety: 'text',
          name: 'email',
          label: 'Email',
          model: 'email',
          type: 'email',
          required: true
        },
        {
          variety: 'select',
          name: 'user_type_id',
          label: 'User Type',
          model: 'user_type_id',
          optionValue: 'id',
          optionLabel: 'name',
          outlined: true,
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/userTypes'
          },
          required: true
        },
        {
          variety: 'select',
          name: 'branch_id',
          label: 'Branch',
          model: 'branch_id',
          optionValue: 'id',
          optionLabel: 'name',
          outlined: true,
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/branches'
          },
          required: true
        },
        {
          variety: 'toggle',
          label: 'Active',
          model: 'active',
          color: 'green'
        }
      ],
      requirements: [
        {
          name: '',
          username: '',
          email: '',
          user_type_id: '',
          branch_id: '',
          active: ''
        }
      ]
    }
  },
  users: [],
  user: {}
}

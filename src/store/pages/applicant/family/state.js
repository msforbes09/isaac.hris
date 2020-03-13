export default {
  family: [],
  families: [],
  table: {
    getData: 'family/getFamilies',
    getDataWithParams: true,
    sync: true,
    syncWithParams: true,
    computedData: 'family/families',
    visibleColumns: [
      'editButton',
      'relationship',
      'name',
      'address',
      'contact_no',
      'emergency_contact'
    ],
    back: {
      to: { name: 'applicant' }
    },
    label: 'Family',
    addLabel: 'Add Family',
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
          getter: 'tools/applicantsKeysRelationship',
          key: 'id',
          value: 'value'
        },
        name: 'relationship',
        label: 'Relationship',
        field: 'relationship',
        align: 'left',
        sortable: true
      },
      {
        name: 'name',
        label: 'Family',
        field: 'name',
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
        name: 'occupation',
        label: 'Occupation',
        field: 'occupation',
        align: 'left',
        sortable: true
      },
      {
        name: 'birth_date',
        label: 'Birth Date',
        field: 'birth_date',
        align: 'left',
        sortable: true
      },
      {
        name: 'contact_no',
        label: 'Contact No.',
        field: 'contact_no',
        align: 'left',
        sortable: true
      },
      {
        type: 'check',
        key: { check: 'living' },
        name: 'living',
        label: 'Living',
        field: 'living',
        align: 'left',
        sortable: true
      },
      {
        type: 'check',
        key: { check: 'emergency_contact' },
        name: 'emergency_contact',
        label: 'Emergency Contact',
        field: 'emergency_contact',
        align: 'center',
        sortable: true
      }
    ],
    addForm: {
      show: false,
      style: 'width:30vw',
      label: 'Add Family',
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
            dispatch: 'family/store'
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
            dispatch: 'family/getFamilies',
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
          name: 'relationship',
          label: 'Relationship',
          model: 'relationship',
          optionValue: 'id',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysRelationship'
          },
          required: true
        },
        {
          variety: 'text',
          name: 'name',
          label: 'Name',
          model: 'name',
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
          name: 'oocupation',
          label: 'Occupation',
          model: 'occupation',
          required: true
        },
        {
          variety: 'date',
          name: 'birth_date',
          label: 'Birth Date',
          model: 'birth_date',
          defaultYearMonth: '1964/08',
          mask: '####-##-##',
          required: true
        },
        {
          variety: 'text',
          name: 'contact_no',
          label: 'Contact No.',
          model: 'contact_no',
          required: true
        },
        {
          variety: 'check',
          name: 'living',
          label: 'Living',
          model: 'living',
          defaultValue: 0,
          required: true
        },
        {
          variety: 'check',
          name: 'emergency_contact',
          label: 'Emergency Contact',
          model: 'emergency_contact',
          defaultValue: 0,
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
      label: 'Edit Family',
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
            dispatch: 'family/getFamily',
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
            state: 'family/family',
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
            dispatch: 'family/remove'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'family/getFamilies',
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
            dispatch: 'family/update'
          }
        },
        {
          method: 'closePopup'
        },
        {
          method: 'dispatch',
          params: {
            type: 'target',
            dispatch: 'family/getFamilies',
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
          name: 'relationship',
          label: 'Relationship',
          model: 'relationship',
          optionValue: 'id',
          optionLabel: 'value',
          emitValue: true,
          mapOptions: true,
          options: {
            getters: 'tools/applicantsKeysRelationship'
          },
          setValueToTool: true,
          required: true
        },
        {
          variety: 'text',
          name: 'name',
          label: 'Name',
          model: 'name',
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
          name: 'oocupation',
          label: 'Occupation',
          model: 'occupation',
          required: true
        },
        {
          variety: 'date',
          name: 'birth_date',
          label: 'Birth Date',
          model: 'birth_date',
          defaultYearMonth: '1964/08',
          mask: '####-##-##',
          required: true
        },
        {
          variety: 'text',
          name: 'contact_no',
          label: 'Contact No.',
          model: 'contact_no',
          required: true
        },
        {
          variety: 'check',
          name: 'living',
          label: 'Living',
          model: 'living',
          defaultValue: 0,
          required: true
        },
        {
          variety: 'check',
          name: 'emergency_contact',
          label: 'Emergency Contact',
          model: 'emergency_contact',
          defaultValue: 0,
          required: true
        }
      ],
      requirements: []
    }
  }
}

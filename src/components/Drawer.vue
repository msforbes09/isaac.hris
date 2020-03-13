<template>
  <q-drawer
    v-model="show"
    :breakpoint="0"
    side="left"
    bordered
    :width="190"
    dark
  >
    <q-list>
      <q-item
        dense
        :disable="loading"
        tag="label"
        @click="logout"
        v-ripple
        loading
      >
        <q-item-section avatar>
          <q-icon name="exit_to_app" color="grey-4" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-grey-4">Logout</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item
        dense
        v-for="(route, i) in routes"
        :key="i"
        v-ripple
        tag="label"
        :to="{ name: route.path }"
      >
        <q-item-section avatar>
          <q-icon :name="route.icon" color="grey-4" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-grey-4">
            {{ route.label }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
let drawer = 'component/drawer'
export default {
  data() {
    return {
      loading: false,
      routes: [
        {
          path: 'home',
          label: 'Home',
          icon: 'home'
        },
        {
          path: 'user',
          label: 'User Management',
          icon: 'people_outline'
        },
        {
          path: 'access',
          label: 'Access Management',
          icon: 'lock_open'
        },
        {
          path: 'keyword',
          label: 'Keyword',
          icon: 'label'
        },
        {
          path: 'client',
          label: 'Client',
          icon: 'account_balance'
        },
        {
          path: 'applicant',
          label: 'Applicant',
          icon: 'people'
        }
      ]
    }
  },
  computed: {
    show: {
      get() {
        return this.$store.getters[drawer]
      },
      set(value) {
        this.$store.commit(drawer, value)
      }
    }
  },
  methods: {
    async logout() {
      this.$q.loading.show()
      try {
        await this.$store.dispatch('auth/remove_token')
        this.$router.push({ name: 'sign-in' })
      } catch (error) {
        return
      } finally {
        this.$q.loading.hide()
      }
    }
  }
}
</script>

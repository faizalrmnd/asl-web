<template>
  <div id="app">
    <div v-if="!loggedIn">
      <router-view/>
    </div>
    <div v-else>
      <div class="pure-g">
        <div class="pure-u-1-3">
          <NavMenu/>
        </div>
        <div class="pure-u-2-3">
          <router-view/>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import NavMenu from './components/NavMenu'

export default {
  components: {
    NavMenu
  },

  computed: {
    loggedIn () {
      return this.$store.state.admin.loggedIn
    }
  },

  beforeCreate () {
    if (localStorage.getItem('adminToken')) {
      this.$store.dispatch('admin/verifyToken')
      .catch(err => {
        localStorage.removeItem('adminToken')
        alert('Tolong log in ulang')
        this.$router.push('/register')
      })
    } else {
      this.$router.push('/register')
    }
  }
}
</script>


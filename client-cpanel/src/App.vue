<template>
  <div id="app">
    <div v-if="!loggedIn">
      <router-view/>
    </div>
    <div v-else>
      <div class="row">
        <TopNav/>
        <transition 
        name="custom-classes-transition"
        enter-active-class="animated slideInLeft"
        leave-active-class="animated slideOutLeft">
          <NavMenu v-if="sidebarOpened"/>
        </transition>
        <div class="content-side" v-bind:class="{ 'col-md-10 offset-md-2': sidebarOpened, 'col-md-12': !sidebarOpened }" >
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from './components/NavMenu'
import TopNav from './components/TopNav'
import { mapGetters } from 'vuex'

export default {
  components: {
    NavMenu,
    TopNav
  },

  computed: {
    loggedIn () {
      return this.$store.state.admin.loggedIn
    },
    ...mapGetters({
      sidebarOpened: 'sidenav/sidebarOpened',
      isLoading: 'admin/isLoading'
    })
  },

  mounted () {
    if (this.$mq == 'mobile') {
        this.$store.dispatch('sidenav/changeSidebarOpened', false)
    }
  },

  beforeCreate () {
    // Buat verify token, ini token buatan kita atau orang lain
    // kalau buatan kita, nanti simpan data user di store
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


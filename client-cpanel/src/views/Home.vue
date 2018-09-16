<template>
  <div>
    <h1>HOME</h1>
    <button class="btn btn-primary" @click="logOut">Log Out</button>
  </div>
</template>

<script>

export default {
  methods: {
    logOut () {
      localStorage.removeItem('adminToken')
      this.$store.commit('admin/changeLoggedInStatus')
      this.$router.push('/register')
    }
  }
}
</script>

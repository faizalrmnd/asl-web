<template>
  <div class="about">
    <div class="route-header">
      <h1 class="title animated fadeIn">About</h1>
    </div>
    <div class="container">
      <div class="row">
        <div class="about-text" v-html="about"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    about () {
      return this.$store.state.about.about.template
    }
  },
  beforeCreate () {
    this.$store.dispatch('about/getAbout')
      .catch(message => {
        alert(message)
      })
  }
}
</script>

<style scoped>
  .about-text {
    text-align: left
  }
</style>

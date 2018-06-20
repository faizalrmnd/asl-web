<template>
  <div class="about">
    <h1>This is an about page</h1>
    <span v-html="about"></span>
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

<style>

</style>

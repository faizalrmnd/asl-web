<template>
  <div>
    <h1>Ini Article detail</h1>
    {{ article }}
  </div>
</template>

<script>
export default {
  computed: {
    article () {
      return this.$store.state.article.selectedArticle
    }
  },
  beforeCreate () {
    this.$store.dispatch('article/getArticle', this.$route.params.id)
      .catch(message => {
        alert(message)
      })
  }
}
</script>

<style>

</style>

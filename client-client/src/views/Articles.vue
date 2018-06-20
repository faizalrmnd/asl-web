<template>
  <div>
    <h1>This is articles page</h1>
    {{ articles }}
  </div>
</template>

<script>
export default {
  computed: {
    articles () {
      return this.$store.state.article.articles
    }
  },
  beforeCreate () {
    this.$store.dispatch('article/getAllArticles')
      .catch(message => {
        alert(message)
      })
  }
}
</script>

<style>

</style>

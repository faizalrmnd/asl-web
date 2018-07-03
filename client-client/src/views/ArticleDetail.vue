<template>
  <div>
    <div class="route-header single-article" v-bind:style="{ 'background-image': 'url(' + article.image + ')' }">
      <h1 class="title animated fadeIn">{{ article.title }}</h1>
    </div>
    <div class="article-content container" v-html="article.template"></div>
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
      .then(() => {
        window.document.title = this.article.title
      })
      .catch(message => {
        alert(message)
      })
  }
}
</script>

<style scoped>
</style>

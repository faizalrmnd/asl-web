<template>
  <div>
    <div class="route-header single-article" v-bind:style="{ 'background-image': 'url(' + article.image + ')' }">
      <h1 class="title">{{ article.title }}</h1>
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
      .catch(message => {
        alert(message)
      })
  }
}
</script>

<style scoped>
.single-article .title {
  margin: 0;
  background-color: rgba(0,0,0,0.8);
}
.article-content {
  text-align: left;
}
</style>

<template>
  <div class="cards container">
    <div class="row">
      <div class="card col-md-4 no-padding" v-for="(article, index) in articles" v-bind:key='index'>
        <img class="card-img-top" :src="article.image" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{ article.title }}</h5>
          <!-- <p class="card-text">author: {{ article.author.name }}</p> -->
          <p class="card-text" v-html="$options.filters.truncate(article.template, 300)"></p>
          <router-link class="btn btn-primary" :to="{ name: 'article-detail', params: { id: article._id } }">See Detail</router-link>
          <!-- <router-link :to="{ name: 'article-detail', params: { id: article._id } }"></router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  data () {
    return {

    }
  },
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

<style scoped>
  .cards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .card {
    margin: 5px;
  }
  .card-body {
    text-align: left;
    padding: 35px;
  }
  .card-title {
    font-weight: 900;
  }
</style>

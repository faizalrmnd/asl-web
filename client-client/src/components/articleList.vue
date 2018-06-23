<template>
  <div class="cards container">
    <div class="row">
      <div class="card col-md-4 no-padding" v-for="(article, index) in articles" v-bind:key='index'>
        <img class="card-img-top" :src="article.image" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{ article.title }}</h5>
          <p class="card-text article-date"><img src="../assets/img/clock.svg" alt="">{{article.createdAt | moment("from")}}</p>
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
  p.card-text.article-date>img {
    display: inline-block !important;
    width: 17px;
    margin-top: -5px;
    margin-right: 8px;
  }
  p.card-text.article-date {
    display: block !important;
    text-align: right!important;
    font-size: 13px !important;
    opacity: 0.8;
    font-style: italic;
    font-weight:700 !important;
    margin: 15px 0;
  }
  .card-title {
    font-weight: 900;
  }
</style>

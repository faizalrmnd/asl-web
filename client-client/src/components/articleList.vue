<template>
  <div class="cards container">
    <div class="row home no-padding col-md-12" v-if="path == '/'">
      <div class="col-md-8 card-wrapper mb-1" v-if="articles[0]" v-scroll-reveal>
        <div class="card article col-md-12 no-padding">
          <div class="featured-image col-md-12 no-padding" v-bind:style="{ 'background-image': 'url(' + articles[0].image + ')' }">
            <!-- <div class="featured-image-overlay"></div> -->
            <div class="card-body">
              <router-link class="card-title" :to="{ name: 'article-detail', params: { id: articles[0]._id } }">{{ articles[0].title }}</router-link>
              <p class="card-text article-date"><img src="../assets/img/clock-white.svg" alt="">{{articles[0].createdAt | moment("from")}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 card-wrapper mb-1" v-if="articles[1]" v-scroll-reveal="{duration: 100}">
        <div class="card article col-md-12 no-padding">
          <div class="featured-image col-md-12 no-padding" v-bind:style="{ 'background-image': 'url(' + articles[1].image + ')' }">
            <!-- <div class="featured-image-overlay"></div> -->
            <div class="card-body">
              <router-link class="card-title" :to="{ name: 'article-detail', params: { id: articles[1]._id } }">{{ articles[1].title }}</router-link>
              <p class="card-text article-date"><img src="../assets/img/clock-white.svg" alt="">{{articles[1].createdAt | moment("from")}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 card-wrapper" v-if="articles[2]" v-scroll-reveal="{duration: 200}">
        <div class="card article col-md-12 no-padding">
          <div class="featured-image col-md-12 no-padding" v-bind:style="{ 'background-image': 'url(' + articles[2].image + ')' }">
            <!-- <div class="featured-image-overlay"></div> -->
            <div class="card-body">
              <router-link class="card-title" :to="{ name: 'article-detail', params: { id: articles[2]._id } }">{{ articles[2].title }}</router-link>
              <p class="card-text article-date"><img src="../assets/img/clock-white.svg" alt="">{{articles[2].createdAt | moment("from")}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 card-wrapper" v-if="articles[3]" v-scroll-reveal="{duration: 300}">
        <div class="card article col-md-12 no-padding">
          <div class="featured-image col-md-12 no-padding" v-bind:style="{ 'background-image': 'url(' + articles[3].image + ')' }">
            <!-- <div class="featured-image-overlay"></div> -->
            <div class="card-body">
              <router-link class="card-title" :to="{ name: 'article-detail', params: { id: articles[3]._id } }">{{ articles[3].title }}</router-link>
              <p class="card-text article-date"><img src="../assets/img/clock-white.svg" alt="">{{articles[3].createdAt | moment("from")}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <paginate
      name="articles"
      :list="articles"
      :per="6"
      tag="div"
      class="row"
      v-else
    >
      <div class="col-md-6 card-wrapper" v-for="(article, index) in paginated('articles')" v-bind:key='index'>
        <div class="card article col-md-12 no-padding">
          <div class="featured-image col-md-12 no-padding" v-bind:style="{ 'background-image': 'url(' + article.image + ')' }">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <p class="card-text article-date"><img src="../assets/img/clock.svg" alt="">{{article.createdAt | moment("from")}}</p>
            <!-- <p class="card-text">author: {{ article.author.name }}</p> -->
            <p class="card-text" v-html="$options.filters.truncate(article.template, 180)"></p>
            <router-link class="btn btn-primary" :to="{ name: 'article-detail', params: { id: article._id } }">See Detail</router-link>
            <!-- <router-link :to="{ name: 'article-detail', params: { id: article._id } }"></router-link> -->
          </div>
        </div>
      </div>
    </paginate>
    <br>
    <paginate-links
      :async="true"
      for="articles"
      :show-step-links="true"
      :step-links="{
        next: 'Next >',
        prev: '< Prev'
      }"
      :hide-single-page="true"></paginate-links>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  data () {
    return {
      paginate: ['articles']
    }
  },
  computed: {
    path () {
      return this.$route.path
    },
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

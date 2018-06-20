<template>
  <div>
    <h1>This is service page</h1>
    <div class="cards">
      <div class="card" v-for="(service, index) in services" v-bind:key='index' style="width: 18rem;">
        <img class="card-img-top" :src="service.image" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{ service.name }}</h5>
          <p class="card-text">{{ service.description }}</p>
          <!-- <router-link class="btn btn-primary" :to="{ name: 'article-detail', params: { id: article._id } }">Primary</router-link> -->
          <!-- <router-link :to="{ name: 'article-detail', params: { id: article._id } }"></router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    services () {
      return this.$store.state.service.services
    }
  },
  beforeCreate () {
    this.$store.dispatch('service/getAllService')
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
</style>

<template>
  <div>
    <h1>This is Merchandise page</h1>
    <div class="cards">
      <div class="card" v-for="(merch, index) in merchandises" v-bind:key='index' style="width: 18rem;">
        <img class="card-img-top" :src="merch.image" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{ merch.name }}</h5>
          <p class="card-text">{{ merch.description }}</p>
          <p class="card-text">price: {{ merch.price }}</p>
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
    merchandises () {
      return this.$store.state.merchandise.merchandises
    }
  },
  beforeCreate () {
    this.$store.dispatch('merchandise/getAllMerchandise')
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

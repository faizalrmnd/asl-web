<template>
  <div>
    <div class="route-header">
      <h1 class="title animated fadeIn">Merchandise</h1>
    </div>
    <div class="cards container">
      <div class="row">
        <div class="card col-md-4 no-padding" v-for="(merch, index) in merchandises" v-bind:key='index'>
          <img class="card-img-top" :src="merch.image" alt="Card image cap">
          <div class="card-body">
            <h2 class="card-title">{{ merch.name }}</h2>
            <p class="card-text">{{ merch.description }}</p>
            <p class="card-text price">{{ merch.price | currency }}</p>
          </div>
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
  .card-title {
    font-weight: 900
  }
  .card-body {
    text-align: left;
    padding: 35px 35px 100px;
  }
  .card-text.price {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center !important;
    padding: 20px;
    background-color: #1e1e1e;
    border-radius: 0px 0px 10px 10px;
    color: #fbd233;
    font-weight: 900 !important;
  }
</style>

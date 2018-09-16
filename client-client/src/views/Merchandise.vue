<template>
  <div>
    <div class="route-header">
      <h1 class="title animated fadeIn">Merchandise</h1>
    </div>
    <div class="cards merchandise container">
      <div class="row">
        <div class="col-md-4 card-wrapper" v-for="(merch, index) in merchandises" v-bind:key='index'>
          <div class="card col-md-12 no-padding">
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
</style>

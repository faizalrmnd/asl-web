<template>
  <div>
    <div class="route-header">
      <h1 class="title animated fadeIn">Services</h1>
    </div>
    <div class="container ">
      <div class="row services flex-wrapper" v-for="(service, index) in services" v-bind:key="index">
        <div class="col-md-4 service-image" :style="{ backgroundImage: 'url(\'' + service.image + '\')' }">
          <img :src="service.image" alt="">
        </div>
        <div class="col-md-8 service-text">
          <h2>{{service.name}}</h2>
          <p>{{service.description}}</p>
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
</style>

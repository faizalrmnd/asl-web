<template>
  <div>
    <div class="route-header">
      <h1 class="title animated slideInDown">Services</h1>
    </div>
    <div class="container ">
      <div class="row services" v-for="(service, index) in services" v-bind:key="index">
        <div class="col-md-4 service-image" v-bind:style="{ 'background-image': 'url(' + service.image + ')' }">
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
  .services {
    text-align: left;
    width: 100%;
  }
  .service-image {
    min-height: 200px;
    background-size: cover;
    background-position: center;
    padding: 0;
  }
  .service-image img {
    width: 100%;
  }
  .service-text {
    padding: 40px;
    background-color: white;
    margin-bottom: 90px;
    border: 2px solid #e8e8e8;
    border-left: 0px solid;
    border-radius: 0px 5px 5px 0px;
  }
  h2 {
    font-weight: 900;
  }
</style>

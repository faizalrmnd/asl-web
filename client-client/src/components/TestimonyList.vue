<template>
  <div class="container" v-scroll-reveal>
    <carousel
    :per-page="1"
    :navigationEnabled="true"
    :loop="true">
      <slide
        v-for="(testimony, index) in testimonies"
        :key="index">
        <div class="testimoner-image mb-5" :style="{ backgroundImage: 'url(\'' + testimony.image + '\')' }"></div>
        <h1 class="col-md-4 offset-md-4 mb-4 text-center testimoner-name">{{testimony.testimoner}}</h1>
        <p class="col-md-8 offset-md-2 testimony-desc" >
          {{testimony.testimony}}
        </p>
      </slide>
    </carousel>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'TestimonyList',
  computed: {
    ...mapGetters({
      testimonies: 'testimony/getAllTestimonies'
    })
  },
  beforeCreate () {
    this.$store.dispatch('testimony/getAllTestimonies')
      .catch(message => {
        alert(message)
      })
  }
}
</script>

<style>

</style>

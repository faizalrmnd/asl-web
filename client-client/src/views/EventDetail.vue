<template>
  <div>
    <div class="route-header single-article" v-bind:style="{ 'background-image': 'url(' + event.image + ')' }">
      <h1 class="title animated fadeIn">{{ event.name }}</h1>
    </div>
    <div class="article-content container">
      <div class="row">
        <div class="col-md-8 pr-5">
          <h1 class="mb-4">Deskripsi Event</h1>
          <p>{{event.description}}</p>
        </div>
        <div class="col-md-4 time-location-detail">
          <div class="date">
            <h4><img src="../assets/img/date-icon.svg" class="icon" alt=""></h4>
            <hr>
            <p>{{event.date | moment("dddd, MMMM YYYY")}}</p>
          </div>
          <div class="time mt-5">
            <h4><img src="../assets/img/time-icon.svg" class="icon" alt=""></h4>
            <hr>
            <p>{{event.date | moment("h:mma") }}</p>
          </div>
          <div class="location mt-5">
            <h4><img src="../assets/img/location-icon.svg" class="icon" alt=""></h4>
            <hr>
            <p>{{event.address}}</p>
          </div>
        </div>
        <!-- <div class="col-md-12 mt-5 mb-5">
          <googlemap name="example" :latitude="event.latitude" :longitude="event.longitude"></googlemap>
        </div> -->
        <div class="google-map col-md-12 no-padding">
        </div>
        <div class="col-md-6 offset-md-3 mt-5">
          <ApplicantForm/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ApplicantForm from '../components/FormApplicant.vue'

export default {
  components: {
    ApplicantForm
  },
  computed: {
    ...mapGetters({
      event: 'event/getEvent'
    })
  },
  beforeCreate () {
    this.$store.dispatch('event/getEvent', this.$route.params.id)
      .catch(message => {
        alert(message)
      })
  }
}
</script>

<style>
.google-map {
  background-image: url('../assets/img/gmap-placeholder.jpg');
  height:350px;
  background-size: cover;
  background-position: center;
  margin-top: 50px;
}
</style>

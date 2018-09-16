<template>
  <div class="container">
    <!-- {{events}}
    <h1>Event list</h1> -->
    <paginate
      name="events"
      :list="events"
      :per="6"
      tag="div"
      class="row"
    >
      <div class="col-md-6 card-wrapper" v-for="(event, index) in paginated('events')" :key="index">
        <div class="card event col-md-12 no-padding">
          <div class="featured-image col-md-12 no-padding" v-bind:style="{ 'background-image': 'url(' + event.image + ')' }">
          </div>
          <div class="row event-details-wrapper">
            <div class="date-details col-md-3">
              <p class="date">{{event.date | moment("D")}}</p>
              <p class="month">{{event.date | moment("MMM")}}</p>
            </div>
            <div class="event-brief-details col-md-9">
              <p>{{event.description | truncate(80) }}</p>
              <router-link class="btn btn-primary" :to="{ name: 'event-detail', params: { id: event._id } }">See Detail</router-link>
            </div>
          </div>
        </div>
      </div>
    </paginate>
    <br>
    <paginate-links
      :async="true"
      for="events"
      :show-step-links="true"
      :step-links="{
        next: 'Next >',
        prev: '< Prev'
      }"
      :hide-single-page="true"></paginate-links>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'EventList',
  data () {
    return {
      paginate: ['events']
    }
  },
  computed: {
    ...mapGetters({
      events: 'event/getAllEvent'
    })
  },
  beforeCreate () {
    this.$store.dispatch('event/getAllEvent')
      .catch(message => {
        alert(message)
      })
  }
}
</script>

<style>
</style>

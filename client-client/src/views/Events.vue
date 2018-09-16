<template>
  <div>
    <div class="route-header">
      <h1 class="title animated fadeIn">Events</h1>
    </div>
    <EventList />
  </div>
</template>

<script>
import EventList from '../components/EventList.vue'

export default {
  components: {
    EventList
  }
}
</script>

<style>

</style>

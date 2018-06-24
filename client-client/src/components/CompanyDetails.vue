<template>
  <section class="container-fluid company-details no-padding">
    <div class="row">
      <div class="col-md-5 merchandise" v-scroll-reveal>
        <h5 class="sub-title">Merchandise</h5>
        <p>Lorem ipsum dolor sit amet, nec ligula sunt ac dis, eget est dolor suspendisse ut eros, donec elementum aliquam
          tristique, integer sed lobortis,</p>
        <router-link to="/merchandise" class="navbar-brand">
          <button class="btn btn-outline-light">See merchandise</button>
        </router-link>
      </div>
      <div class="col-md-7 event" v-scroll-reveal="{duration: 200}">
        <h5 class="sub-title">Events</h5>
        <p>Donec est urna vivamus nullam taciti. Quidem hendrerit, pharetra donec potenti dolor ullamcorper donec quam.</p>
        <router-link to="/events" class="navbar-brand">
          <button class="btn btn-outline-light">See events</button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style scoped>
</style>

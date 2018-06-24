<template>
  <section class="container what-we-do" id="what-we-do">
    <div class="row">
      <div class="col-md-12">
        <h2 class="title">What we do</h2>
      </div>
      <div class="col-md-4 slideInLeft" v-scroll-reveal>
        <img src="../assets/img/first-wwd.svg" alt="">
        <h5 class="sub-title">First</h5>
        <p>Lorem ipsum dolor sit amet, nec ligula sunt ac dis, eget est dolor suspendisse ut eros, donec elementum aliquam
          tristique, integer sed lobortis,</p>
      </div>
      <div class="col-md-4" v-scroll-reveal="{delay: 150}">
        <img src="../assets/img/second-wwd.svg" alt="">
        <h5 class="sub-title">Second</h5>
        <p>Mauris turpis nullam, quam condimentum enim nec sed suscipit, viverra pharetra faucibus felis,</p>
      </div>
      <div class="col-md-4" v-scroll-reveal="{delay: 300}">
        <img src="../assets/img/third-wwd.svg" alt="">
        <h5 class="sub-title">Third</h5>
        <p>Donec est urna vivamus nullam taciti. Quidem hendrerit, pharetra donec potenti dolor ullamcorper donec quam.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style>
.animate {
  transition-delay: .1s;
  transition-duration: .25s;
  transition-timing-function: ease-in;
}

.slide-up {
  transform: translateY(0)
}

.slide-up.animate-active {
  transform: translateY(-100px)
}
</style>

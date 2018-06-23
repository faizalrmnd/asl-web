<template>
  <nav class="navbar abs-center-x navbar-expand-lg fixed-top navbar-dark bg-dark" v-bind:class="{ 'scrolled': isScrolled }">
    <router-link to="/" class="navbar-brand" tag="a">
      <img src="../assets/img/logo.png" alt="" class="navbar-logo">
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <img src="../assets/img/menu.svg" class="navbar-toggler-icon">
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto ml-auto">
        <router-link to="/" class="nav-item" tag="li" exact>
          <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Home</a>
        </router-link>
        <router-link to="/about" class="nav-item" tag="li">
          <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">About</a>
        </router-link>
        <router-link to="/articles" class="nav-item" tag="li">
          <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Articles</a>
        </router-link>
        <router-link to="/services" class="nav-item" tag="li">
          <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Services</a>
        </router-link>
        <router-link to="/merchandise" class="nav-item" tag="li">
          <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Merchandise</a>
        </router-link>
        <router-link to="/events" class="nav-item" tag="li">
          <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Events</a>
        </router-link>
        <router-link to="/contactus" class="nav-item" tag="li">
          <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Contact Us</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isScrolled: false
    }
  },
  created () {
    window.onscroll = (event) => {
      if (scrollY > 0) {
        this.isScrolled = true
        console.log(this.isScrolled)
      } else {
        this.isScrolled = false
        console.log(this.isScrolled)
      }
    }
  }
}
</script>

<style>
.navbar-logo {
  width: 50px;
}

.navbar-dark .navbar-toggler-icon {
  background-image: none;
}

.navbar {
  background-color: transparent !important;
  -webkit-transition: all 0.3s !important;
  -moz-transition: all 0.3s !important;
  transition: all 0.3s !important;
}

nav.navbar.scrolled {
  position: fixed;
  padding: 12px;
  background-color: white !important;
  box-shadow: 0px 7px 36px -20px rgba(0, 0, 0, 1);
  width: 100%;
  -webkit-transition: all 0.3s !important;
  -moz-transition: all 0.3s !important;
  transition: all 0.3s !important;
}

.scrolled .navbar-logo {
  width: 25px;
}

.scrolled.navbar-dark .navbar-nav .nav-link {
  color: #434343;
}

.abs-center-x {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 40px 0;
}

.router-link-active a {
  font-weight: 900;
  opacity: 1;
  border-top: 0px solid;
  color: #fbd233 !important;
}
</style>

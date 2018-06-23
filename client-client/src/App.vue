<template>
  <div id="app">
    <Navbar/>
      <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
/* CSS Starters */

.row {
  margin: 0;
}

html {
  min-height: 100%;
  width: 100%;
}
body {
  background: #fafcfb;
  height: 100%;
  width: 100%;
  font-family: avenir;
  -webkit-font-smoothing: antialiased;
}
.no-padding {
  padding: 0;
}
h1 {
  font-weight: 900;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.route-header {
  /* padding: 190px 0px 130px; */
  background-image: url('./assets/img/top-header-image-color.jpg');
  background-size: cover;
  background-position:center;
  color: white;
  text-transform: uppercase;
  letter-spacing: 9px;
  margin-bottom: 90px;
}

.route-header .title {
  padding: 190px 0px 130px;
  margin: 0;
}

.card-text div {
  display: inline !important;
}

.card-text img, .card-text br  {
  display:none !important;
}

.card-body>a.btn {
  display: block;
  margin-top: 20px;
}

.card-text, .card-text p, .card-text h1, .card-text h2, .card-text h3, .card-text h4, .card-text h5, .card-text div {
  font-size: 1rem !important;
  font-weight: 400 !important;
  display: inline !important;
  text-align: left !important;
  margin: 20px 0;
}

.card-text ol, .card-text li {
  list-style: none !important;
  padding: 0 !important;
  display: inline !important;
}

.card-text p {
  text-align: left !important;
}

.route-header hr {
    border-top: 2px solid;
    width: 120px;
    margin-bottom: 0;
}

.route-header h1 {
  font-weight: 900;
}

.btn {
  font-weight: 900;
  padding: 10px 20px;
  border-radius: 50px;
}
</style>

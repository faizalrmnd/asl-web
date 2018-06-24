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

.route-header>.title:after {
  content: ' ';
  position: static;
  display: block;
  margin: 20px auto 0;
  text-align: center;
  width: 80px;
  border: 1.5px solid white;
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

.btn-primary:hover {
    color: #fff;
    background-color: #a67070;
    border-color: #fff;
}

.btn-primary.focus, .btn-primary:focus {
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.0);
}
.btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show>.btn-primary.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.0);
}

.btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle {
    color: #fff;
    background-color: #a67070;
    border-color: #fff;
}

@media only screen and (min-width: 768px) and (max-width: 1024px) {
  nav.navbar {
    position: fixed;
    padding: 12px;
    background-color: white !important;
    box-shadow: 0px 7px 36px -20px rgba(0, 0, 0, 1);
    width: 100%;
    -webkit-transition: all 0.3s !important;
    -moz-transition: all 0.3s !important;
    transition: all 0.3s !important;
  }

  .navbar-logo, .scrolled .navbar-logo {
    width: 20px;
  }

  .navbar-dark .navbar-nav .nav-link {
    color: #434343;
  }

  .navbar-toggler-icon {
    width:20px;
  }
  .navbar-toggler {
    padding:0
  }
  .top-header {
    padding: 145px 0 55px !important;
  }
  .top-header .image img {
    width: 100%;
    padding: 0 37px;
  }
  .company-desc {
      color: white !important;
      text-align: left!important;
      padding: 20px !important;
  }
  .company-desc h5 {
    font-size: 15px;
    font-weight:400;
  }
  .container {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
  section.articles {
    padding: 30px 0 !important;
  }
  .route-header {
    margin-bottom: 30px !important;
  }
  .route-header .title {
    padding: 150px 0px 70px !important;
    margin: 0 !important;
    font-size: 25px !important;
  }
  .article-content img, .about-text img {
    width:100% !important;
  }
  .article-content, .about-text {
    padding: 20px !important;
  }
  .abs-center-x {
    left: 0 !important;
    transform: translateX(0) !important;
  }
}

@media only screen and (max-width: 767px)  {
  nav.navbar {
    position: fixed;
    padding: 12px;
    background-color: white !important;
    box-shadow: 0px 7px 36px -20px rgba(0, 0, 0, 1);
    width: 100%;
    -webkit-transition: all 0.3s !important;
    -moz-transition: all 0.3s !important;
    transition: all 0.3s !important;
  }

  .navbar-logo, .scrolled .navbar-logo {
    width: 20px;
  }

  .navbar-dark .navbar-nav .nav-link {
    color: #434343;
  }

  .navbar-toggler-icon {
    width:20px;
  }
  .navbar-toggler {
    padding:0
  }
  .top-header {
    padding: 75px 0 55px !important;
  }
  .top-header .image img {
    width: 100%;
    padding: 0 37px;
  }
  .company-desc {
      color: white !important;
      text-align: left!important;
      padding: 20px !important;
  }
  .company-desc h5 {
    font-size: 15px;
    font-weight:400;
  }
  .container {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
  section.articles {
    padding: 5px 0 !important;
  }
  .route-header {
    margin-bottom: 10px !important;
  }
  .route-header .title {
    padding: 150px 0px 70px !important;
    margin: 0 !important;
    font-size: 25px !important;
  }
  .article-content img, .about-text img {
    width:100% !important;
  }
  .article-content, .about-text {
    padding: 20px !important;
  }
  .abs-center-x {
    left: 0 !important;
    transform: translateX(0) !important;
  }
  .services {
    padding: 10px !important;
    background-image: none !important;
  }
  .service-text {
    min-height: unset !important;
    border: 2px solid #e8e8e8 !important;
    border-top: 0px solid !important;
    padding: 25px !important;
  }
  .services img {
    display: block !important;
  }
  .card-body {
    padding: 25px !important;
  }
}
</style>

<template>
  <div class="home-wrapper">
    <!-- <img src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <h1>This is home page</h1> -->
    <TopHeader/>
    <WhatWeDo/>
    <CompanyDetails/>
    <ArticleListHome/>
  </div>
</template>

<script>
// @ is an alias to /src
import TopHeader from '../components/TopHeader.vue'
import WhatWeDo from '../components/WhatWeDo.vue'
import CompanyDetails from '../components/CompanyDetails.vue'
import ArticleListHome from '../components/ArticleListHome.vue'

export default {
  components: {
    TopHeader,
    WhatWeDo,
    CompanyDetails,
    ArticleListHome
  }
}
</script>

<style>
.home-wrapper {
  height:100%;
}
.home-wrapper .articles {
  padding-bottom: 0;
}
.top-header {
  background-image: url('../assets/img/top-header-image-color.jpg');
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  text-align: center;
}
/* .top-header .image img,
.company-desc {
  position: absolute;
  top: 55%;
  transform: translateY(-50%)
} */

.company-desc {
  color: white;
  text-align: justify;
  padding: 0px 100px 20px 60px;
}

.company-desc h1 {
  font-weight: bold;
}

.btn-primary {
  background-color: #fdd200;
  box-shadow: 0px 5px 0px 0px #d1a809;
  border: none;
  border-color: transparent;
}

section.what-we-do,
section.articles {
  padding: 120px 0
}

.title {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 100px;
}

.sub-title {
  font-weight: bold;
  text-align: left;
}

.what-we-do img {
  width: 100px;
  margin-bottom: 30px;
}

.what-we-do .row>div {
  text-align: right
}

.what-we-do .row>div>p {
  text-align: justify
}

section.company-details {
  color: #fff
}

section.company-details .row>div {
  padding: 90px 50px
}

section.company-details .merchandise {
  background-color: #f7bb33;
}

section.company-details .event {
  background-color: #5cc7cd;
}

/* section.articles {} */

.articles .article h5,
.articles .article p {
  padding: 45px 45px 25px;
}

.articles .article p {
  padding-top: 0
}

.card {
  border: none;
  box-shadow: 0px 57px 63px -37px rgba(0, 0, 0, 0.35);
}

.slide-in-left {
  animation-name: slide-in-left
}

.slide-in-right {
  animation-name: slide-in-right
}

@keyframes slide-in-left {
  from {
    transform: translate(-100%, -50%);
    visibility: visible;
    opacity: 0;
  }

  to {
    transform: translate(-50%, -50%);
    opacity: 1
  }
}

@keyframes slide-in-right {
  from {
    transform: translate(100%, -50%);
    opacity: 0
  }

  to {
    transform: translate(0%, -50%);
    opacity: 1
  }
}
</style>

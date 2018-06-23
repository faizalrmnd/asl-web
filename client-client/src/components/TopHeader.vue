<template>
  <section class="container-fluid top-header">
    <div class="row flex-wrapper">
      <div class="col-md-5 offset-md-2 image animated slideInDown">
        <img class="" src="../assets/img/top-header-left.svg" alt="">
      </div>
      <div class="col-md-5 company-desc animated slideInUp">
        <h1>Artistik Salindia Lima</h1>
        <h5>Lorem ipsum dolor sit amet, pharetra platea congue nec netus quis, lorem mi dolor. </h5>
        <br>
        <a href="#what-we-do">
          <button type="button" class="btn btn-primary animated slideInUp">More Details</button>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
}
</script>

<style>
.flex-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
}

.company-desc {
  margin-top: auto;
  margin-bottom: auto;
}

.top-header {
  padding: 140px 0 55px;
}

.flex-wrapper>div {
  display: flex;
  flex-direction: column;
}
</style>

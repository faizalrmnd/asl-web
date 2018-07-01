<template>
  <div class="mb-5">
    <div class="route-header">
      <h1 class="title animated fadeIn">Contact Us</h1>
    </div>
    <div class="container mb-5">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <ContactForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactForm from '../components/FormContact.vue'

export default {
  components: {
    ContactForm
  }
}
</script>

<style>

</style>

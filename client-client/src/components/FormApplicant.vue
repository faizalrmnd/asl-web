<template>
  <div>
    <!-- {{event}} -->
    <h1 class="mb-3 pb-3">Applicant Form</h1>
    <form>
      <div class="form-group">
        <label for="name">Nama *</label>
        <input v-model="name" v-validate="'required'" name="name" type="text" class="form-control">
        <small>{{ errors.first('name') }}</small>
      </div>
      <div class="form-group">
        <label for="email">Alamat Email *</label>
        <input v-validate="'required|email'" name="email" v-model="email" type="text" class="form-control" required>
        <small>{{ errors.first('email') }}</small>
      </div>
      <div class="form-group">
        <label for="phone">Nomor Telfon *</label>
        <input v-validate="'numeric'" name="phone" v-model="phone" type="text" class="form-control" required>
        <small>{{ errors.first('phone') }}</small>
      </div>
      <p style="font-weight:900; font-style: italic;">*Harus di isi</p>
      <br>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div class="alert alert-success" role="alert" v-if="success">
          {{message}}
        </div>
        <div class="alert alert-danger" role="alert" v-if="error">
          {{message}}
        </div>
      </transition>
      <button type="submit" @click.prevent="createApplicant" class="btn btn-primary mt-1" :disabled="success || errors.items.length != 0">
        Submit
        <div class="loading-button" v-if="isLoading">
          <img src="../assets/img/loading-icon.svg" alt="">
        </div>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ApplicantForm',
  data () {
    return {
      name: '',
      email: '',
      phone: '',
      success: false,
      error: false,
      message: ''
    }
  },
  methods: {
    createApplicant () {
      let payload = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        event: this.$route.params.id
      }

      this.$store.dispatch('applicant/createApplicant', payload)
        .then(message => {
          this.name = ''
          this.email = ''
          this.phone = ''
          this.success = true
          this.message = message
          setTimeout(() => {
            this.success = false
            this.message = ''
          }, 1500)
        })
        .catch(message => {
          this.name = ''
          this.email = ''
          this.phone = ''
          this.error = true
          this.message = message
          setTimeout(() => {
            this.error = false
            this.message = ''
          }, 1500)
        })
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'applicant/isLoading'
    })
  }
}
</script>

<style>
</style>

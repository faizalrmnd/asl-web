<template>
  <form>
    <div class="form-group">
      <label for="name">Nama *</label>
      <input v-validate="'required'" v-model="user" type="text" name="name" class="form-control">
      <small>{{ errors.first('name') }}</small>
    </div>
    <div class="form-group">
      <label for="email">Alamat Email *</label>
      <input v-validate="'required|email'" v-model="email" name="email" type="text" class="form-control">
      <small>{{ errors.first('email') }}</small>
    </div>
    <div class="form-group">
      <label for="telephone">Nomor Handphone</label>
      <input v-validate="'numeric'" v-model="phone" name="phone" type="text" class="form-control">
      <small>{{ errors.first('phone') }}</small>
    </div>
    <div class="form-group">
      <label for="pertanyaan">Pertanyaan *</label>
      <textarea v-validate="'required'" v-model="content" name="content" class="form-control" rows="3"></textarea>
      <small>{{ errors.first('content') }}</small>
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
    <button type="submit" @click.prevent="createEnquiry" class="btn btn-primary mt-1" :disabled="success || errors.items.length != 0">
      Submit
      <div class="loading-button" v-if="isLoading">
        <img src="../assets/img/loading-icon.svg" alt="">
      </div>
    </button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ContactForm',
  data () {
    return {
      user: '',
      email: '',
      phone: '',
      content: '',
      success: false,
      error: false,
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'contact/isLoading'
    })
  },
  methods: {
    createEnquiry () {
      let payload = {
        user: this.user,
        email: this.email,
        phone: this.phone,
        content: this.content,
        isResponded: false
      }

      this.$store.dispatch('contact/createContact', payload)
        .then(message => {
          this.user = ''
          this.email = ''
          this.phone = ''
          this.content = ''
          this.success = true
          this.message = message
          setTimeout(() => {
            this.success = false
            this.message = ''
          }, 1500)
        })
        .catch(message => {
          this.user = ''
          this.email = ''
          this.phone = ''
          this.content = ''
          this.error = true
          this.message = message
          setTimeout(() => {
            this.error = false
            this.message = ''
          }, 1500)
        })
    }
  }
}
</script>

<style>
</style>

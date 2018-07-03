<template>
    <div>
        <h1>About</h1>
        <a class="btn btn-primary" @click="selectedMenu = 1">
            <img class="icon" src="../assets/img/edit-icon.svg" alt="">
            Ubah About
        </a>
        <hr>
        <div v-if="selectedMenu === 0">
           <div class="form-group">
                <span v-html="template"></span>                
            </div>
        </div>
        <div v-else-if="selectedMenu === 1">
            <wysiwyg v-model="template" />
            <br>
            <button class="btn btn-primary ml-1" @click="createUpdateAbout()">
                <img class="icon" src="../assets/img/submit-icon.svg" alt="">Ubah/Buat
            </button>
            <button class="btn btn-danger ml-1" @click="goBack">
                <img class="icon" src="../assets/img/back-icon.svg" alt="">
                Batal
            </button>
        </div>
        <div v-if="isLoading" class="loading-state">
            <img src="../assets/img/loading-icon.svg" alt="">
        </div>
        <transition 
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut">
            <div class="loading-state success" v-if="success">
                <div class="card">
                    <img src="../assets/img/success-icon.svg" alt=""> 
                    <p>{{message}}</p>
                </div>
            </div>
        </transition>
        <transition 
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut">
            <div class="loading-state error" v-if="error">
                <div class="card">
                    <img src="../assets/img/delete-icon.svg" alt=""> 
                    <p>{{message}}</p>
                </div>
            </div>
        </transition>
        <!-- <div v-else>Men</div> -->
    </div>
</template>

<script>
import '../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            selectedMenu: 0,
            template: '',
            message: '',
            success: false,
            error: false
        }
    },
    computed: {
        ...mapGetters({
            isLoading: 'about/isLoading'
        })
    },
    methods: {
        createUpdateAbout () {
            this.$store.dispatch('about/createUpdateAbout', {template: this.template})
            .then(message => {
                this.success = true
                this.message = message
                setTimeout(() => {
                    this.success = false
                    this.message = ''
                }, 1500)
                this.selectedMenu = 0
                window.scrollTo(0, 0)
                // alert(message)
            })
            .catch(message => {
                this.error = true
                this.message = message
                setTimeout(() => {
                    this.error = false
                    this.message = ''
                }, 1500)
                this.selectedMenu = 0
                window.scrollTo(0, 0)
                alert(message)
            })
        },

        updateTestimony () {

        },

        deleteTestimony () {
            
        },

        goBack () {
            //this.$router.go(-1)
            this.selectedMenu = 0
            window.scrollTo(0, 0)
        }
    },

    beforeCreate () {
        this.$store.dispatch('about/getAbout')
        .then(() => {
          this.template = this.$store.state.about.about.template
        })
        .catch(message => {
            alert(message)
        })
    },
    created () {
        
    }
}
</script>

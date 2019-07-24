<template>
    <div>
        <div v-if="this.$route.params.change">
            <form>
                <fieldset>
                    <div class="form-group">
                        <label>Judul Artikel</label>
                        <input type="text" class="form-control" placeholder="Masukan Judul" v-model="title">
                    </div>
                    <div class="form-group featured-image">
                        <img :src="image" :style="{display: (typeof image === 'string') ? 'block' : 'none'}"/>
                        <label>Featured Image</label>
                        <input type="file" accept="image/*" class="form-control" placeholder="Masukan Featured image" @change="saveImage">
                    </div>
                    <div class="form-group">
                        <wysiwyg v-model="articleTemplate" />
                    </div>

                    <button class="btn btn-primary ml-1" @click.prevent="updateArticle">
                        <img class="icon" src="../assets/img/submit-icon.svg" alt="">
                        Update
                    </button>
                    <button class="btn btn-danger ml-1" @click.prevent="goBack">
                        <img class="icon" src="../assets/img/back-icon.svg" alt="">
                        Batal
                    </button>
                </fieldset>
            </form>
        </div>
        <div v-else>
            <img :src="selectedArticle.image" alt="">
            <br>
            <h1>{{selectedArticle.title}}</h1>
            <br>
            <span v-html="selectedArticle.template"></span>
            <br>
            <br>
            <button class="btn btn-primary ml-1" @click.prevent="goBack">
                <img class="icon" src="../assets/img/back-icon.svg" alt="">
                Kembali
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
                    <p>Gagal merubah article</p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import '../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            title: '',
            articleTemplate: '',
            image: '',
            id: 0,
            message: '',
            success: false,
            error: false
        }
    },

    methods: {
        updateArticle () {
            let payload = new FormData()
            payload.append('title', this.title)
            payload.append('template', this.articleTemplate)
            payload.append('image', this.image)
            payload.append('id', this.id)

            this.$store.dispatch('article/updateArticle', payload)
            .then(message => {
                this.success = true
                this.message = message
                setTimeout(() => {
                    this.success = false
                    this.message = ''
                    this.$router.push('/artikel')
                }, 1500)
            })
            .catch(message => {
                this.error = true
                this.message = message
                setTimeout(() => {
                    this.error = false
                    this.message = ''
                    this.$router.push('/artikel')
                }, 1500)
            })
        },

        saveImage(event) {
            // Reference to the DOM input element
            var input = event.target            
            
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                console.log(input.files[0])                
                this.image = input.files[0]
            }
        },

        goBack () {
            this.$router.go(-1)
        }
    },

    computed: {
        selectedArticle () {
            return this.$store.state.article.selectedArticle
        },
        ...mapGetters({
            isLoading: 'article/isLoading'
        })
    },
    
    beforeCreate () {
        this.$store.dispatch('article/getArticle', this.$route.params.id)
        .then(() => {
          this.title = this.$store.state.article.selectedArticle.title,
          this.articleTemplate =  this.$store.state.article.selectedArticle.template,
          this.image = this.$store.state.article.selectedArticle.image,
          this.id = this.$store.state.article.selectedArticle._id,
          window.document.title = this.$store.state.article.selectedArticle.title
        })
        .catch(message => {
            alert(message)
        })
    }
}
</script>

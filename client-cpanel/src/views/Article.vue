<template>
    <div>
        <h1>Artikel</h1>
        <a class="btn btn-primary" @click="selectedMenu = 1">
            <img class="icon" src="../assets/img/add-icon.svg" alt="">
            Buat Artikel Baru
        </a>
        <hr>  
        <table class="table" v-if="selectedMenu === 0">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Created</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>

            <paginate
              name="articles"
              :list="articles"
              :per="10"
              tag="tbody"
            >
                <tr v-for="(article, index) in paginated('articles')" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ article.title }}</td>
                    <td>{{article.createdAt | moment("from")}}</td>
                    <td>
                        <div class="row">
                            <router-link class="btn btn-primary ml-1" :to="{ name:'artikel-detail', params:{ id: article._id } }">Lihat</router-link>
                            <router-link class="btn btn-warning ml-1" :to="{ name:'artikel-detail', params:{ id: article._id, change: true } }">Ubah</router-link>
                            <a class="btn btn-danger ml-1" @click="deleteArticle(article)">Hapus</a>
                        </div>
                    </td>
                </tr>
            </paginate>
        </table>
        <div v-else-if="selectedMenu === 1">
            <small>* Harus di isi</small>
            <hr>
            <form>
                <div class="form-group">
                    <label>Judul Artikel *</label>
                    <input v-validate="'required'" name="title" type="text" class="form-control" placeholder="Masukan Judul" v-model="title">
                    <small>{{ errors.first('title') }}</small>
                </div>
                <div class="form-group featured-image">
                    <label>Featured Image *</label>
                    <input v-validate="'required'" type="file" accept="image/*" class="form-control" placeholder="Masukan Featured image" @change="saveImage" required>
                </div>
                <!-- {{this.$refs.image}} -->
                <div class="form-group">
                    <label>Article Content *</label>
                    <wysiwyg v-model="articleTemplate" />
                    <!-- <small>{{ errors.first('content') }}</small> -->
                </div>

                <button class="btn btn-primary ml-1" @click.prevent="createArticle" :disabled="errors.items.length != 0 || !image.name || !articleTemplate || !title">
                    <img class="icon" src="../assets/img/submit-icon.svg" alt="">
                    Submit
                </button>
                <button class="btn btn-danger ml-1" @click.prevent="goBack">
                    <img class="icon" src="../assets/img/back-icon.svg" alt="">
                    Batal
                </button>
            </form>            
        </div>
        <paginate-links
        v-if="selectedMenu === 0"
        :async="true"
        for="articles"
        :show-step-links="true"
        :step-links="{
          next: 'Next',
          prev: 'Prev'
        }"
        :hide-single-page="true"></paginate-links>
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
    </div>
</template>

<script>
import '../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            selectedMenu: 0,
            articleTemplate: '',
            title: '',
            image: '',
            message: '',
            success: false,
            error: false,
            paginate: ['articles']
        }
    },

    methods: {
        createArticle () {
            let payload = new FormData()
            payload.append('title', this.title)
            payload.append('template', this.articleTemplate)
            payload.append('image', this.image)

            this.title = ''
            this.articleTemplate = ''
            this.image = ''

            this.$store.dispatch('article/createArticle', payload)
            .then(message => {
                this.success = true
                this.message = message
                setTimeout(() => {
                    this.success = false
                    this.message = ''
                    this.selectedMenu = 0
                }, 1500)
            })
            .catch(message => {
                this.error = true
                this.message = message
                setTimeout(() => {
                    this.error = false
                    this.message = ''
                    this.selectedMenu = 0
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

        deleteArticle (article) {
            this.$store.dispatch('article/deleteArticle', article)
            .then(message => {
                this.success = true
                this.message = message
                setTimeout(() => {
                    this.success = false
                    this.message = ''
                }, 1500)
            })
            .catch(message => {
                this.error = true
                this.message = message
                setTimeout(() => {
                    this.error = false
                    this.message = ''
                }, 1500)
            })
        },

        goBack () {
            this.selectedMenu = 0
        }
    },

    beforeCreate () {
        this.$store.dispatch('article/getAllArticles')
        .catch(message => {
            alert(message)
        })
    },

    computed: {
        // articles () {
        //     return this.$store.state.article.articles
        // },
        ...mapGetters({
            isLoading: 'article/isLoading',
            articles: 'article/getArticles'
        })
    }
}
</script>

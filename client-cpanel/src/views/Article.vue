<template>
    <div>
        <ul class="nav">
            <li class="nav-item"><a class="nav-link" @click="selectedMenu = 0">Lihat Semua artikel</a></li>
            <li class="nav-item"><a class="nav-link" @click="selectedMenu = 1">Buat artikel</a></li>                
        </ul>     
        <table class="table" v-if="selectedMenu === 0">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(article, index) in articles" :key="index">
                    <th scope="row">{{ index }}</th>
                    <td>{{ article.title }}</td>
                    <td>
                        <div class="row">
                            <div class="col-4"><router-link :to="{ name:'artikel-detail', params:{ id: article._id } }">Lihat</router-link></div>
                            <div class="col-4"><router-link :to="{ name:'artikel-detail', params:{ id: article._id, change: true } }">Ubah</router-link></div>
                            <div class="col-4"><a @click="deleteArticle(article)">Hapus</a></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else-if="selectedMenu === 1">
            <form>
                <div class="form-group">
                    <label>Judul Artikel</label>
                    <input type="text" class="form-control" placeholder="Masukan Judul" v-model="title">
                </div>
                <div class="form-group">
                    <label>Featured Image</label>
                    <input type="file" accept="image/*" class="form-control" placeholder="Masukan Featured image" @change="saveImage">
                </div>

                <div class="form-group">
                    <wysiwyg v-model="articleTemplate" />
                </div>

                <button class="btn btn-primary" @click.prevent="createArticle">Submit</button>
            </form>            
        </div>
    </div>
</template>

<script>
import '../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css'

export default {
    data () {
        return {
            selectedMenu: 0,
            articleTemplate: '',
            title: '',
            image: ''
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
                alert(message)
            })
            .catch(message => {
                alert(message)
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
                alert(message)
            })
            .catch(message => {
                alert(message)
            })
        }
    },

    beforeCreate () {
        this.$store.dispatch('article/getAllArticles')
        .catch(message => {
            alert(message)
        })
    },

    computed: {
        articles () {
            return this.$store.state.article.articles
        }
    }
}
</script>

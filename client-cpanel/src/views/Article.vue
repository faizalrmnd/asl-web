<template>
    <div>
        <div class="pure-menu pure-menu-horizontal">
            <ul class="pure-menu-list">
                <li class="pure-menu-item"><a class="pure-menu-link" @click="selectedMenu = 0">Lihat Semua artikel</a></li>
                <li class="pure-menu-item"><a class="pure-menu-link" @click="selectedMenu = 1">Buat artikel</a></li>                
            </ul>
        </div>        
        <table class="pure-table pure-table-horizontal" v-if="selectedMenu === 0">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Options</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(article, index) in articles" :key="index">
                    <td>{{ index }}</td>
                    <td>{{ article.title }}</td>
                    <td>
                        <div class="pure-g">
                            <div class="pure-u-1-2"><router-link :to="{ name:'artikel-detail', params:{ id: article._id } }">Lihat</router-link></div>
                            <div class="pure-u-1-2"><router-link :to="{ name:'artikel-detail', params:{ id: article._id, change: true } }">Ubah</router-link></div>
                            <div class="pure-u-1-2"><a @click="deleteArticle(article)">Hapus</a></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else-if="selectedMenu === 1">
            <form class="pure-form pure-form-stacked">
                <fieldset>
                    <input type="text" placeholder="Masukan Judul" v-model="title">

                    <wysiwyg v-model="articleTemplate" />

                    <button class="pure-button pure-button-primary" @click.prevent="createArticle">Submit</button>
                </fieldset>
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
            title: ''
        }
    },

    methods: {
        createArticle () {
            let payload = {
                title: this.title,
                template: this.articleTemplate
            }

            this.title = ''
            this.articleTemplate = ''

            this.$store.dispatch('article/createArticle', payload)
            .then(message => {
                alert(message)
            })
            .catch(message => {
                alert(message)
            })
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

<template>
    <div>
        <div v-if="this.$route.params.change">
            <form>
                <fieldset>
                    <div class="form-group">
                        <label>Judul Artikel</label>
                        <input type="text" class="form-control" placeholder="Masukan Judul" v-model="title">
                    </div>
                    <div class="form-group">
                        <wysiwyg v-model="articleTemplate" />
                    </div>

                    <button class="btn btn-primary" @click.prevent="updateArticle">Submit</button>
                </fieldset>
            </form>
        </div>
        <div v-else>
            <span v-html="selectedArticle.template"></span>
        </div>
        
    </div>
</template>

<script>
import '../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css'

export default {
    data () {
        return {
            title: this.$store.state.article.selectedArticle.title,
            articleTemplate: this.$store.state.article.selectedArticle.template
        }
    },

    methods: {
        updateArticle () {
            let payload = {
                title: this.title,
                template: this.articleTemplate,
                id: this.$route.params.id
            }

            this.$store.dispatch('article/updateArticle', payload)
            .then(message => {
                alert(message)
            })
            .catch(message => {
                alert(message)
            })
        }
    },

    computed: {
        selectedArticle () {
            return this.$store.state.article.selectedArticle
        }
    },
    
    created () {
        this.$store.dispatch('article/getArticle', this.$route.params.id)
        .catch(message => {
            alert(message)
        })
    }
}
</script>

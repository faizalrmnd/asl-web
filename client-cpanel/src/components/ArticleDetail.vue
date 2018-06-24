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
                        <img :src="image"/>
                        <label>Featured Image</label>
                        <input type="file" accept="image/*" class="form-control" placeholder="Masukan Featured image" @change="saveImage">
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
            articleTemplate: this.$store.state.article.selectedArticle.template,
            image: this.$store.state.article.selectedArticle.image,
            id: this.$store.state.article.selectedArticle._id
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

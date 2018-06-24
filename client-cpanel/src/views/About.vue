<template>
    <div>
         <ul class="nav">
            <li class="nav-item"><a class="nav-link" @click="selectedMenu = 0">Lihat About</a></li>
            <li class="nav-item"><a class="nav-link" @click="selectedMenu = 1">Ubah About</a></li>            
        </ul>
        <div v-if="selectedMenu === 0">
           <div class="form-group">
                <span v-html="template"></span>                
            </div>
        </div>
        <div v-else-if="selectedMenu === 1">
            <wysiwyg v-model="template" />
            <button class="btn btn-primary" @click="createUpdateAbout()">Ubah/Buat</button>
        </div>
    </div>
</template>

<script>
import '../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css'

export default {
    data () {
        return {
            selectedMenu: 0,
            template: this.$store.state.about.about.template
        }
    },

    methods: {
        createUpdateAbout () {
            this.$store.dispatch('about/createUpdateAbout', {template: this.template})
            .catch(msg => {
                alert(msg)
            })
        },

        updateTestimony () {

        },

        deleteTestimony () {
            
        }
    },

    beforeCreate () {
        this.$store.dispatch('about/getAbout')
        .catch(message => {
            alert(message)
        })
    }
}
</script>

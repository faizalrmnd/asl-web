<template>
    <div>
        <h1>Testimoni</h1>
        <a class="btn btn-primary" @click="selectedMenu = 1">
            <img class="icon" src="../assets/img/add-icon.svg" alt="">
            Buat Testimoni Baru
        </a>
        <hr>
        <table class="table" v-if="selectedMenu === 0">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Dari</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(testimony, index) in testimonies" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ testimony.testimoner }}</td>
                    <td>{{ testimony.from }}</td>
                    <td>
                        <div class="row">
                            <a class="btn btn-primary ml-1" data-toggle="modal" :data-target="'#modal'+index" @click="setSelected(testimony)">Lihat</a>
                            <a class="btn btn-danger ml-1" @click="deleteTestimony(testimony)">Hapus</a>
                        </div>

                        <div class="modal fade" :id="'modal'+index" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Testimoni</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                    <div class="form-group">
                                        <label>Nama</label>
                                        <input type="text" class="form-control" v-model="selectedTestimony.testimoner"/>
                                    </div>
                                    <div class="form-group">
                                        <label>Testimoni</label>
                                        <textarea class="form-control" cols="30" rows="10" v-model="selectedTestimony.testimony"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>Asal</label>
                                        <input type="text" class="form-control" v-model="selectedTestimony.from"/>
                                    </div>
                                    <div class="form-group">
                                        <label>Gambar</label>
                                        <img :src="selectedTestimony.image">
                                        <input type="file" accept="image/*" class="form-control" placeholder="Masukan Gambar" @change="updateImage"/>
                                    </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">
                                    <img class="icon" src="../assets/img/back-icon.svg" alt="">
                                    Batal
                                </button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateTestimony">
                                    <img class="icon" src="../assets/img/submit-icon.svg" alt="">
                                    Simpan
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else-if="selectedMenu === 1" class="col-md-6 offset-md-3">
            <div class="form-group">
                <label>Nama</label>
                <input type="text" class="form-control" v-model="testimoner"/>
            </div>
            <div class="form-group">
                <label>Testimoni</label>
                <textarea cols="30" rows="10" class="form-control" v-model="testimony"></textarea>
            </div>
            <div class="form-group">
                <label>Asal</label>
                <input type="text" class="form-control" v-model="from"/>
            </div>
            <div class="form-group">
                <label>Gambar</label>
                <input type="file" accept="image/*" class="form-control" placeholder="Masukan Gambar" @change="saveImage"/>
            </div>
            <button class="btn btn-primary ml-1" @click="createTestimony">
                <img class="icon" src="../assets/img/submit-icon.svg" alt="">
                Simpan
            </button>
            <button class="btn btn-danger ml-1" @click="selectedMenu = 0">
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            selectedMenu: 0,
            selectedTestimony: {},
            image: '',
            testimoner: '',
            testimony: '',
            from: '',
            message: '',
            success: false,
            error: false
        }
    },

    methods: {
        saveImage(event) {
            // Reference to the DOM input element
            var input = event.target            
            
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                console.log(input.files[0])                
                this.image = input.files[0]
            }
        },

        updateImage(event) {
            // Reference to the DOM input element
            var input = event.target            
            
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                console.log(input.files[0])                
                this.selectedTestimony.image = input.files[0]
            }
        },

        setSelected (testimony) {
            this.selectedTestimony = {...testimony}
        },

        createTestimony () {
            let payload = new FormData()
            payload.append('testimoner', this.testimoner)
            payload.append('testimony', this.testimony)
            payload.append('from', this.from)
            payload.append('image', this.image)

            this.testimoner = ''
            this.testimony = ''
            this.from = ''
            this.image = ''

            this.$store.dispatch('testimony/createTestimony', payload)
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

        updateTestimony () {
            let payload = new FormData()
            payload.append('testimoner', this.selectedTestimony.testimoner)
            payload.append('testimony', this.selectedTestimony.testimony)
            payload.append('from', this.selectedTestimony.from)
            payload.append('image', this.selectedTestimony.image)
            payload.append('id', this.selectedTestimony._id)

            this.$store.dispatch('testimony/updateTestimony', payload)
            .then(message => {
                this.success = true
                this.message = message
                //quick fix
                this.$store.dispatch('testimony/getAllTestimonies')
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

        deleteTestimony (testimony) {
            this.$store.dispatch('testimony/deleteTestimony', testimony)
            .then(message => {
                this.success = true
                this.message = message
                setTimeout(() => {
                    this.success = false
                    this.message = ''
                }, 1500)
            })
            .catch(msg => {
                this.error = true
                this.message = message
                setTimeout(() => {
                    this.error = false
                    this.message = ''
                }, 1500)
            })
        }
    },

    beforeCreate () {
        this.$store.dispatch('testimony/getAllTestimonies')
        .catch(message => {
            alert(message)
        })
    },

    computed: {
        testimonies () {
            return this.$store.state.testimony.testimonies
        },
        ...mapGetters({
            isLoading: 'testimony/isLoading'
        })
    }
}
</script>

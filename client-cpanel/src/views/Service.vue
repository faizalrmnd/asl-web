<template>
    <div>
        <h1>Service</h1>
        <a class="btn btn-primary" @click="selectedMenu = 1">
            <img class="icon" src="../assets/img/add-icon.svg" alt="">
            Buat Service Baru
        </a>
        <hr>
        <table class="table" v-if="selectedMenu === 0">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Deskripsi</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>

            <paginate
              name="services"
              :list="services"
              :per="10"
              tag="tbody"
            >
                <tr v-for="(service, index) in paginated('services')" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ service.name }}</td>
                    <td>{{ service.description | truncate(80) }}</td>
                    <td>
                        <div class="row">
                            <a class="btn btn-primary ml-1" data-toggle="modal" :data-target="'#modal'+index" @click="setSelected(service)">Lihat</a>
                            <a class="btn btn-danger ml-1" @click="deleteService(service)">Hapus</a>
                        </div>

                        <div class="modal fade" :id="'modal'+index" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Service/Product</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                    <div class="form-group">
                                        <label>Nama</label>
                                        <input type="text" class="form-control" v-model="selectedService.name"/>
                                    </div>
                                    <div class="form-group">
                                        <label>Deskripsi</label>
                                        <textarea class="form-control" cols="30" rows="10" v-model="selectedService.description"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>Gambar</label>
                                        <img :src="selectedService.image" :style="{display: (typeof selectedService.image === 'string') ? 'block' : 'none'}">
                                        <input type="file" accept="image/*" class="form-control" placeholder="Masukan Gambar" @change="updateImage"/>
                                    </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">
                                    <img class="icon" src="../assets/img/back-icon.svg" alt="">
                                    Batal
                                </button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateService">
                                    <img class="icon" src="../assets/img/submit-icon.svg" alt="">
                                    Simpan
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </td>
                </tr>
            </paginate>
        </table>
        <div v-else-if="selectedMenu === 1" class="col-md-6 offset-md-3">
            <small>* Harus di isi</small>
            <hr>
            <div class="form-group">
                <label>Nama *</label>
                <input v-validate="'required'" type="text" class="form-control" name="name" v-model="name"/>
                <small>{{ errors.first('name') }}</small>
            </div>
            <div class="form-group">
                <label>Deskripsi *</label>
                <textarea v-validate="'required'" cols="30" rows="10" class="form-control" name="description" v-model="description"></textarea>
                <small>{{ errors.first('description') }}</small>
            </div>
            <div class="form-group">
                <label>Gambar *</label>
                <input type="file" accept="image/*" class="form-control" placeholder="Masukan Gambar" @change="saveImage"/>
            </div>
            <button class="btn btn-primary ml-1" @click="createservice" :disabled="errors.items.length != 0 || !image.name || !name || !description">
                <img class="icon" src="../assets/img/submit-icon.svg" alt="">
                Simpan
            </button>
            <button class="btn btn-danger ml-1" @click="selectedMenu = 0">
                <img class="icon" src="../assets/img/back-icon.svg" alt="">
                Batal
            </button>
        </div>
        <paginate-links
        v-if="selectedMenu === 0"
        :async="true"
        for="services"
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
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            selectedMenu: 0,
            selectedService: {},
            image: '',
            name: '',
            description: '',
            message: '',
            success: false,
            error: false,
            paginate: ['services']
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
                this.selectedService.image = input.files[0]
            }
        },

        setSelected (service) {
            this.selectedService = {...service}
        },

        createservice () {
            let payload = new FormData()
            payload.append('name', this.name)
            payload.append('description', this.description)
            payload.append('image', this.image)

            this.name = ''
            this.description = ''
            this.image = ''

            this.$store.dispatch('service/createService', payload)
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

        updateService () {
            let payload = new FormData()
            payload.append('name', this.selectedService.name)
            payload.append('description', this.selectedService.description)
            payload.append('image', this.selectedService.image)
            payload.append('id', this.selectedService._id)

            this.$store.dispatch('service/updateService', payload)
            .then(message => {
                this.success = true
                this.message = message
                //quick fix
                this.$store.dispatch('service/getAllService')
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

        deleteService (service) {
            this.$store.dispatch('service/deleteService', service)
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
        }
    },

    beforeCreate () {
        this.$store.dispatch('service/getAllService')
        .catch(message => {
            alert(message)
        })
    },

    computed: {
        services () {
            return this.$store.state.service.services
        },
        ...mapGetters({
            isLoading: 'service/isLoading'
        })
    }
}
</script>

<template>
    <div>
        <h1>Merchandise</h1>
        <a class="btn btn-primary" @click="selectedMenu = 1">
            <img class="icon" src="../assets/img/add-icon.svg" alt="">
            Buat Merchandise Baru
        </a>
        <hr>
        <table class="table" v-if="selectedMenu === 0">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Deskripsi</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>

            <paginate
              name="merchandises"
              :list="merchandises"
              :per="10"
              tag="tbody"
            >
                <tr v-for="(merchandise, index) in paginated('merchandises')" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ merchandise.name }}</td>
                    <td>{{ merchandise.description }}</td>
                    <td>{{ merchandise.price | currency }}</td>
                    <td>
                        <div class="row">
                            <a class="btn btn-primary ml-1" data-toggle="modal" :data-target="'#modal'+index" @click="setSelected(merchandise)">Lihat</a>
                            <a class="btn btn-danger ml-1" @click="deleteMerchandise(merchandise)">Hapus</a>
                        </div>

                        <div class="modal fade" :id="'modal'+index" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Merchandise</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                    <div class="form-group">
                                        <label>Nama</label>
                                        <input type="text" class="form-control" v-model="selectedMerchandise.name"/>
                                    </div>
                                    <div class="form-group">
                                        <label>Deskripsi</label>
                                        <textarea class="form-control" cols="30" rows="10" v-model="selectedMerchandise.description"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>Price</label>
                                        <input type="number" class="form-control" min="0" v-model="selectedMerchandise.price"/>
                                    </div>
                                    <div class="form-group">
                                        <label>Gambar</label>
                                        <img :src="selectedMerchandise.image" :style="{display: (typeof selectedMerchandise.image === 'string') ? 'block' : 'none'}">
                                        <input type="file" accept="image/*" class="form-control" placeholder="Masukan Gambar" @change="updateImage"/>
                                    </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">
                                    <img class="icon" src="../assets/img/back-icon.svg" alt="">
                                    Batal
                                </button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateMerchandise">
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
                <label>Price *</label>
                <input v-validate="'required|numeric'" type="number" min="0" class="form-control" name="price" v-model="price"/>
                <small>{{ errors.first('price') }}</small>
            </div>
            <div class="form-group">
                <label>Gambar *</label>
                <input type="file" accept="image/*" class="form-control" placeholder="Masukan Gambar" @change="saveImage"/>
            </div>
            <button class="btn btn-primary ml-1" @click="createMerchandise" :disabled="errors.items.length != 0 || !image.name || !name || !description || !price">
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
        for="merchandises"
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
            selectedMerchandise: {},
            image: '',
            name: '',
            description: '',
            price: 0,
            message: '',
            success: false,
            error: false,
            paginate: ['merchandises']
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
                this.selectedMerchandise.image = input.files[0]
            }
        },

        setSelected (merchandise) {
            this.selectedMerchandise = {...merchandise}
        },

        createMerchandise () {
            let payload = new FormData()
            payload.append('name', this.name)
            payload.append('description', this.description)
            payload.append('price', this.price)
            payload.append('image', this.image)

            this.name = ''
            this.description = ''
            this.image = ''
            this.price = 0

            this.$store.dispatch('merchandise/createMerchandise', payload)
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

        updateMerchandise () {
            let payload = new FormData()
            payload.append('name', this.selectedMerchandise.name)
            payload.append('description', this.selectedMerchandise.description)
            payload.append('price', this.selectedMerchandise.price)
            payload.append('image', this.selectedMerchandise.image)
            payload.append('id', this.selectedMerchandise._id)

            this.$store.dispatch('merchandise/updateMerchandise', payload)
            .then(message => {
                this.success = true
                this.message = message
                //quick fix
                this.$store.dispatch('merchandise/getAllMerchandise')
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

        deleteMerchandise (merchandise) {
            this.$store.dispatch('merchandise/deleteMerchandise', merchandise)
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
        this.$store.dispatch('merchandise/getAllMerchandise')
        .catch(message => {
            alert(message)
        })
    },

    computed: {
        merchandises () {
            return this.$store.state.merchandise.merchandises
        },
        ...mapGetters({
            isLoading: 'merchandise/isLoading'
        })
    }
}
</script>

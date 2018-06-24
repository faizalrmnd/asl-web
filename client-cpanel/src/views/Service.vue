<template>
    <div>
         <ul class="nav">
            <li class="nav-item"><a class="nav-link" @click="selectedMenu = 0">Lihat Semua service/produk</a></li>
            <li class="nav-item"><a class="nav-link" @click="selectedMenu = 1">Buat service/produk</a></li>                
        </ul>
        <table class="table" v-if="selectedMenu === 0">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Deskripsi</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(service, index) in services" :key="index">
                    <th scope="row">{{ index }}</th>
                    <td>{{ service.name }}</td>
                    <td>{{ service.description }}</td>
                    <td>
                        <div class="row">
                            <div class="col-4"><a data-toggle="modal" :data-target="'#modal'+index" @click="setSelected(service)">Lihat</a></div>
                            <div class="col-4"><a @click="deleteService(service)">Hapus</a></div>
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
                                        <textarea cols="30" rows="10" v-model="selectedService.description"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>Gambar</label>
                                        <img :src="selectedService.image">
                                        <input type="file" accept="image/*" class="form-control" placeholder="Masukan Gambar" @change="updateImage"/>
                                    </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateService">Simpan</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else-if="selectedMenu === 1">
            <div class="form-group">
                <label>Nama</label>
                <input type="text" class="form-control" v-model="name"/>
            </div>
            <div class="form-group">
                <label>Deskripsi</label>
                <textarea cols="30" rows="10" class="form-control" v-model="description"></textarea>
            </div>
            <div class="form-group">
                <label>Gambar</label>
                <input type="file" accept="image/*" class="form-control" placeholder="Masukan Gambar" @change="saveImage"/>
            </div>
            <button class="btn btn-primary" @click="createservice">Simpan</button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            selectedMenu: 0,
            selectedService: {},
            image: '',
            name: '',
            description: ''

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
            .then(msg => {
                alert(msg)
            })
            .catch(msg => {
                alert(msg)
            })
        },

        updateService () {
            let payload = new FormData()
            payload.append('name', this.selectedService.name)
            payload.append('description', this.selectedService.description)
            payload.append('image', this.selectedService.image)
            payload.append('id', this.selectedService._id)

            this.$store.dispatch('service/updateService', payload)
            .then(msg => {
                alert(msg)
            })
            .catch(msg => {
                alert(msg)
            })
        },

        deleteService (service) {
            this.$store.dispatch('service/createservice', service)
            .then(msg => {
                alert(msg)
            })
            .catch(msg => {
                alert(msg)
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
        }
    }
}
</script>

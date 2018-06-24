<template>
    <div>
         <ul class="nav">
            <li class="nav-item"><a class="nav-link" @click="selectedMenu = 0">Lihat Semua Merchandise</a></li>
            <li class="nav-item"><a class="nav-link" @click="selectedMenu = 1">Buat Merchandise</a></li>                
        </ul>
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

            <tbody>
                <tr v-for="(merchandise, index) in merchandises" :key="index">
                    <th scope="row">{{ index }}</th>
                    <td>{{ merchandise.name }}</td>
                    <td>{{ merchandise.description }}</td>
                    <td>{{ price.name }}</td>
                    <td>
                        <div class="row">
                            <div class="col-4"><a data-toggle="modal" :data-target="'#modal'+index" @click="setSelected(merchandise)">Lihat</a></div>
                            <div class="col-4"><a @click="deleteMerchandise(merchandise)">Hapus</a></div>
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
                                        <textarea cols="30" rows="10" v-model="selectedMerchandise.description"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>Price</label>
                                        <input type="number" class="form-control" min="0" v-model="selectedMerchandise.price"/>
                                    </div>
                                    <div class="form-group">
                                        <label>Gambar</label>
                                        <img :src="selectedMerchandise.image">
                                        <input type="file" accept="image/*" class="form-control" placeholder="Masukan Gambar" @change="updateImage"/>
                                    </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateMerchandise">Simpan</button>
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
                <label>Price</label>
                <input type="number" min="0" class="form-control" v-model="price"/>
            </div>
            <div class="form-group">
                <label>Gambar</label>
                <input type="file" accept="image/*" class="form-control" placeholder="Masukan Gambar" @change="saveImage"/>
            </div>
            <button class="btn btn-primary" @click="createMerchandise">Simpan</button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            selectedMenu: 0,
            selectedMerchandise: {},
            image: '',
            name: '',
            description: '',
            price: 0

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
            .then(msg => {
                alert(msg)
            })
            .catch(msg => {
                alert(msg)
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
            .then(msg => {
                alert(msg)
            })
            .catch(msg => {
                alert(msg)
            })
        },

        deleteMerchandise (merchandise) {
            this.$store.dispatch('merchandise/createMerchandise', merchandise)
            .then(msg => {
                alert(msg)
            })
            .catch(msg => {
                alert(msg)
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
        }
    }
}
</script>

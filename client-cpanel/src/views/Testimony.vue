<template>
    <div>
         <ul class="nav">
            <li class="nav-item"><a class="nav-link" @click="selectedMenu = 0">Lihat Semua testimoni</a></li>
            <li class="nav-item"><a class="nav-link" @click="selectedMenu = 1">Buat testimoni</a></li>                
        </ul>
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
                    <th scope="row">{{ index }}</th>
                    <td>{{ testimony.testimoner }}</td>
                    <td>{{ testimony.from }}</td>
                    <td>
                        <div class="row">
                            <div class="col-4"><a data-toggle="modal" :data-target="'#modal'+index" @click="setSelected(testimony)">Lihat</a></div>
                            <div class="col-4"><a @click="deleteTestimony(testimony)">Hapus</a></div>
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
                                        <textarea cols="30" rows="10" v-model="selectedTestimony.testimony"></textarea>
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
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateTestimony">Simpan</button>
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
            <button class="btn btn-primary" @click="createTestimony">Simpan</button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            selectedMenu: 0,
            selectedTestimony: {},
            image: '',
            testimoner: '',
            testimony: '',
            from: ''

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
            .then(msg => {
                alert(msg)
            })
            .catch(msg => {
                alert(msg)
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
            .then(msg => {
                alert(msg)
            })
            .catch(msg => {
                alert(msg)
            })
        },

        deleteTestimony (testimony) {
            this.$store.dispatch('testimony/deleteTestimony', testimony)
            .then(msg => {
                alert(msg)
            })
            .catch(msg => {
                alert(msg)
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
        }
    }
}
</script>

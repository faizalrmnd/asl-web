<template>
    <div>
        <h1>Events</h1>
        <a class="btn btn-primary" @click="selectedMenu = 1">
            <img class="icon" src="../assets/img/add-icon.svg" alt="">
            Buat Event Baru
        </a>
        <hr>
        <table class="table" v-if="selectedMenu === 0">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Alamat</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <paginate
              name="events"
              :list="events"
              :per="10"
              tag="tbody"
            >
                <tr v-for="(event, index) in paginated('events')" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ event.name }}</td>
                    <td>{{ event.date | moment("dddd, MMMM Do YYYY, h:mma") }}</td>
                    <td>{{ event.address }}</td>
                    <td>
                        <div class="row">
                            <router-link class="btn btn-primary ml-1 mb-1" :to="{ name:'event-detail', params:{ id: event._id } }">Lihat Applikan</router-link>
                            <a class="btn btn-warning ml-1" data-toggle="modal" :data-target="'#modal'+index" @click="setSelected(event)">Ubah</a>
                            <a class="btn btn-danger ml-1" @click="deleteEvent(event)">Hapus</a>
                        </div>

                        <div class="modal fade" :id="'modal'+index" tabindex="-1" role="dialog" >
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
                                    <input type="text" class="form-control" v-model="selectedEvent.name"/>
                                </div>
                                <div class="form-group">
                                    <label>Deskripsi</label>
                                    <textarea cols="30" rows="10" class="form-control" v-model="selectedEvent.description"></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Tanggal</label>
                                    <!-- <input type="date" class="form-control" v-model="selectedEvent.date"/> -->
                                    <datetime :minute-step=15 type="datetime" v-model="selectedEvent.date"></datetime>
                                </div>
                                <div class="form-group">
                                    <label>Alamat</label>
                                    <input id="newaddress" type="text" class="form-control" v-model="selectedEvent.address" @input="updateAddressLatLong"/>
                                    <googlemap :name="'map'+index" :latitude="selectedEvent.latitude" :longitude="selectedEvent.longitude" @emit-place="emitUpdatePlace"></googlemap>
                                </div>
                                <div class="form-group">
                                    <label>Gambar</label>
                                    <img :src="selectedEvent.image" :style="{display: (typeof selectedEvent.image === 'string') ? 'block' : 'none'}">
                                    <input type="file" accept="image/*" class="form-control" placeholder="Masukan Gambar" @change="updateImage"/>
                                </div>
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">
                                    <img class="icon" src="../assets/img/back-icon.svg" alt="">
                                    Close
                                </button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateEvent">
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
                <input v-validate="'required'" name="name" type="text" class="form-control" v-model="name"/>
                <small>{{ errors.first('name') }}</small>
            </div>
            <div class="form-group">
                <label>Deskripsi *</label>
                <textarea v-validate="'required'" name="description" cols="30" rows="10" class="form-control" v-model="description"></textarea>
                <small>{{ errors.first('description') }}</small>
            </div>
            <div class="form-group">
                <label>Tanggal dan waktu *</label>
                <!-- <input v-validate="'required'" name="date" type="date" class="form-control" v-model="date"/> -->
                <datetime :minute-step=15 type="datetime" v-model="date"></datetime>
                <!-- <small>{{ errors.first('date') }}</small> -->
            </div>
            <div class="form-group">
                <label>Alamat *</label>
                <input v-validate="'required'" id="newaddress" name="address" type="text" class="form-control" :value="address" @input="setAddressLatLong"/>
                <small>{{ errors.first('address') }}</small>
                <googlemap name="example" :latitude="latitude" :longitude="longitude" @emit-place="emitPlace"></googlemap>
            </div>
            <div class="form-group">
                <label>Gambar *</label>
                <input type="file" accept="image/*" class="form-control" placeholder="Masukan Gambar" @change="saveImage"/>
            </div>
            <button class="btn btn-primary ml-1" @click="createEvent" :disabled="errors.items.length != 0 || !image.name || !date || !address || !name || !description">
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
        for="events"
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
import googlemap from '../components/GoogleMap'
import { mapGetters } from 'vuex'

export default {
    components: {
        googlemap
    },
    data () {
        return {
            selectedMenu: 0,
            selectedEvent: {},
            image: '',
            name: '',
            description: '',
            date: '',
            address: '',
            latitude: '',
            longitude: '',
            message: '',
            success: false,
            error: false,
            paginate: ['events']
        }
    },

    methods: {
        emitPlace (payload) {
            this.address = payload.formatted_address
            this.latitude = payload.geometry.location.lat()
            this.longitude = payload.geometry.location.lng()
        },
        emitUpdatePlace (payload) {
            this.selectedEvent.address = payload.formatted_address
            this.selectedEvent.latitude = payload.geometry.location.lat()
            this.selectedEvent.longitude = payload.geometry.location.lng()
        },
        setAddressLatLong (event) {
            let input = document.getElementById('newaddress')            
            let searchBox = new google.maps.places.Autocomplete(input)

            let self = this

            searchBox.addListener('place_changed', function() {
                    let place = searchBox.getPlace()

                    self.address = place.formatted_address
                    self.latitude = place.geometry.location.lat()
                    self.longitude = place.geometry.location.lng()
                    
                })

            // let geocoder = new google.maps.Geocoder()
            // geocoder.geocode( { 'address': this.address}, function(results, status) {
            //     if (status == 'OK') {
            //         self.latitude = results[0].geometry.location.lat()
            //         self.longitude = results[0].geometry.location.lng()
            //     } else {
            //         console.log('Geocode was not successful for the following reason: ' + status)
            //     }
            // })
        },
        updateAddressLatLong (event) {
            this.address = event.target.value

            let input = document.getElementById('newaddress')            
            let searchBox = new google.maps.places.Autocomplete(input)

            let self = this

            searchBox.addListener('place_changed', function() {
                    let place = searchBox.getPlace()

                    self.selectedEvent.address = place.formatted_address
                    self.selectedEvent.latitude = place.geometry.location.lat()
                    self.selectedEvent.longitude = place.geometry.location.lng()
                    
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

        updateImage(event) {
            // Reference to the DOM input element
            var input = event.target            
            
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                console.log(input.files[0])                
                this.selectedEvent.image = input.files[0]
            }
        },

        setSelected (event) {
            this.selectedEvent = {...event}
        },

        createEvent () {
            let payload = new FormData()
            payload.append('name', this.name)
            payload.append('description', this.description)
            payload.append('date', this.date)
            payload.append('address', this.address)
            payload.append('latitude', this.latitude)
            payload.append('longitude', this.longitude)
            payload.append('image', this.image)

            this.name = ''
            this.description = ''
            this.date = ''
            this.address = ''
            this.latitude = ''
            this.longitude = ''
            this.image = ''

            this.$store.dispatch('event/createEvent', payload)
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

        updateEvent () {
            let payload = new FormData()
            payload.append('name', this.selectedEvent.name)
            payload.append('description', this.selectedEvent.description)
            payload.append('date', this.selectedEvent.date)
            payload.append('address', this.selectedEvent.address)
            payload.append('latitude', this.selectedEvent.latitude)
            payload.append('longitude', this.selectedEvent.longitude)
            payload.append('image', this.selectedEvent.image)
            payload.append('id', this.selectedEvent._id)            

            this.$store.dispatch('event/updateEvent', payload)
            .then(message => {
                this.success = true
                this.message = message
                //quick fix
                this.$store.dispatch('event/getAllEvent')
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

        deleteEvent (event) {
            this.$store.dispatch('event/deleteEvent', event)
            .then(message => {
                this.success = true
                this.message = message
                setTimeout(() => {
                    this.success = false
                    this.message = ''
                }, 1500)
            })
            .catch(message => {
                this.success = true
                this.message = message
                setTimeout(() => {
                    this.success = false
                    this.message = ''
                }, 1500)
            })
        }
    },

    beforeCreate () {
        this.$store.dispatch('event/getAllEvent')
        .catch(message => {
            alert(message)
        })
    },

    computed: {
        events () {
            return this.$store.state.event.events
        },
        ...mapGetters({
            isLoading: 'event/isLoading'
        })
    }
}
</script>

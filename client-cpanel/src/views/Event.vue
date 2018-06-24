<template>
    <div>
         <ul class="nav">
            <li class="nav-item"><a class="nav-link" @click="selectedMenu = 0">Lihat Semua event</a></li>
            <li class="nav-item"><a class="nav-link" @click="selectedMenu = 1">Buat event</a></li>                
        </ul>
        <table class="table" v-if="selectedMenu === 0">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Alamat</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(event, index) in events" :key="index">
                    <th scope="row">{{ index }}</th>
                    <td>{{ event.name }}</td>
                    <td>{{ event.date }}</td>
                    <td>{{ event.address }}</td>
                    <td>
                        <div class="row">
                            <div class="col-4"><router-link :to="{ name:'event-detail', params:{ id: event._id } }">Lihat Applikan</router-link></div>
                            <div class="col-4"><a data-toggle="modal" :data-target="'#modal'+index" @click="setSelected(event)">Ubah</a></div>
                            <div class="col-4"><a @click="deleteEvent(event)">Hapus</a></div>
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
                                    <input type="date" class="form-control" v-model="selectedEvent.date"/>
                                </div>
                                <div class="form-group">
                                    <label>Alamat</label>
                                    <input id="newaddress" type="text" class="form-control" v-model="selectedEvent.address" @input="updateAddressLatLong"/>
                                    <googlemap :name="'map'+index" :latitude="selectedEvent.latitude" :longitude="selectedEvent.longitude" @emit-place="emitUpdatePlace"></googlemap>
                                </div>
                                <div class="form-group">
                                    <label>Gambar</label>
                                    <img :src="selectedEvent.image"/>
                                    <input type="file" accept="image/*" class="form-control" placeholder="Masukan Gambar" @change="updateImage"/>
                                </div>
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateEvent">Simpan</button>
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
                <label>Tanggal</label>
                <input type="date" class="form-control" v-model="date"/>
            </div>
            <div class="form-group">
                <label>Alamat</label>
                <input id="newaddress" type="text" class="form-control" :value="address" @input="setAddressLatLong"/>
                <googlemap name="example" :latitude="latitude" :longitude="longitude" @emit-place="emitPlace"></googlemap>
            </div>
            <div class="form-group">
                <label>Gambar</label>
                <input type="file" accept="image/*" class="form-control" placeholder="Masukan Gambar" @change="saveImage"/>
            </div>
            <button class="btn btn-primary" @click="createEvent">Simpan</button>
        </div>
    </div>
</template>

<script>
import googlemap from '../components/GoogleMap'

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
            date: new Date(),
            address: '',
            latitude: '',
            longitude: ''
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
                alert(message)
            })
            .catch(message => {
                alert(message)
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
                alert(message)
            })
            .catch(message => {
                alert(message)
            })
        },

        deleteEvent (event) {
            this.$store.dispatch('event/deleteEvent', event)
            .then(message => {
                alert(message)
            })
            .catch(message => {
                alert(message)
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
        }
    }
}
</script>

<template>
    <div>
        <h1>Enquiry</h1>
        <hr>
        <!-- <h4>Enquiry belum di balas</h4> -->
        <table class="table" v-if="contacts">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Email</th>
                    <th scope="col">No. Telpon</th>
                    <th scope="col">Pesan</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>

            <paginate
              name="contacts"
              :list="contacts"
              :per="10"
              tag="tbody">
                <tr v-for="(contact, index) in paginated('contacts')" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ contact.user }}</td>
                    <td>{{ contact.email }}</td>
                    <td>{{ contact.phone }}</td>
                    <td>{{ contact.content }}</td>
                    <td>
                        <div class="row">
                            <a data-toggle="modal" class="btn btn-primary ml-1" :data-target="'#modal'+index" @click="setSelected(contact)">Balas</a>
                            <a class="btn btn-danger ml-1" @click="deleteContact(contact)">Hapus</a>
                        </div>

                        <div class="modal fade" :id="'modal'+index" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Balas</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                    <div class="form-group">
                                        <label>Subject</label>
                                        <input type="text" class="form-control" v-model="subject"/>
                                    </div>
                                    <div class="form-group">
                                        <label>Message</label>
                                        <textarea class="form-control" cols="30" rows="10" v-model="message"></textarea>
                                    </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="respondContact">Simpan</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </td>
                </tr>
            </paginate>
        </table>
        <paginate-links
        :async="true"
        for="contacts"
        :show-step-links="true"
        :step-links="{
          next: 'Next',
          prev: 'Prev'
        }"
        :hide-single-page="true"></paginate-links>
        <br>
        <!-- <h4>Enquiry sudah di balas</h4>
        <table class="table" v-if="contacts">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Email</th>
                    <th scope="col">No. Telpon</th>
                    <th scope="col">Pesan</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>

            <paginate
              name="contacts"
              :list="contacts"
              :per="10"
              tag="tbody">
                <tr v-for="(contact, index) in paginated('contacts')" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ contact.user }}</td>
                    <td>{{ contact.email }}</td>
                    <td>{{ contact.phone }}</td>
                    <td>{{ contact.content }}</td>
                    <td>
                        <div class="row">
                            <a data-toggle="modal" class="btn btn-primary ml-1" :data-target="'#modal'+index" @click="setSelected(contact)">Balas</a>
                            <a class="btn btn-danger ml-1" @click="deleteContact(contact)">Hapus</a>
                        </div>

                        <div class="modal fade" :id="'modal'+index" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Balas</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                    <div class="form-group">
                                        <label>Subject</label>
                                        <input type="text" class="form-control" v-model="subject"/>
                                    </div>
                                    <div class="form-group">
                                        <label>Message</label>
                                        <textarea class="form-control" cols="30" rows="10" v-model="message"></textarea>
                                    </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="respondContact">Simpan</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </td>
                </tr>
            </paginate>
        </table>
        <paginate-links
        :async="true"
        for="contacts"
        :show-step-links="true"
        :step-links="{
          next: 'Next',
          prev: 'Prev'
        }"
        :hide-single-page="true"></paginate-links> -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            selectedMenu: 0,
            selectedContact: {},
            subject: '',
            message: '',
            paginate: ['contacts']
        }
    },

    methods: {
        setSelected (contact) {
            this.selectedContact = {...contact}
        },

        respondContact () {
            this.selectedContact.id = this.selectedContact._id
            this.selectedContact.subject = this.subject
            this.message = this.message

            let payload = {...this.selectedContact}

            this.selectedContact = {}
            this.subject = ''
            this.message = ''

            this.$store.dispatch('contact/respondContact', payload)
            .then(msg => {
                alert(msg)
            })
            .catch(msg => {
                alert(msg)
            })
        },

        deleteContact (contact) {
            this.$store.dispatch('contact/deleteContact', contact)
            .then(msg => {
                alert(msg)
            })
            .catch(msg => {
                alert(msg)
            })
        }
    },

    beforeCreate () {
        this.$store.dispatch('contact/getAllcontacts')
        .catch(message => {
            alert(message)
        })
    },

    computed: {
        contacts () {
            return this.$store.state.contact.contacts
        }
    }
}
</script>
